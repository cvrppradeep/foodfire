<template>
  <div>
    <Header class="noprint" />
    <div class="heading noprint">Today's Orders</div>
    <button
      @click="printOut()"
      class="noprint"
    >Print</button>
    <div>
      <div class="fx noprint">
        <h2>{{todayTotal.count}}</h2>
        <h1>{{todayTotal.total | currency}}</h1>
        <div>{{orders && orders[0] && orders[0].createdAt | date}}</div>
      </div>
      <ul class="p-left fx">
        <li
          class="card"
          v-for="(o,ix) in orders"
          :key="ix"
        >
          <h1 style="color:red">QrNo: {{o.address.qrno}}</h1>
          <p>{{o.address.recipient_name}} ({{o.phone}})</p>
          <p>{{o.item.name}}</p>
          <p> {{o.rate | currency}} * {{o.qty}} = <span class="big">{{o.amount | currency}}</span> </p>
          <h3 style="text-align: right;"> {{o.vendor.restaurant}} </h3>
          <div class="statusbar noprint">
            <v-btn-toggle
              v-model="o.status"
              @change='save(o)'
            >
              <v-btn
                flat
                value="Cancelled"
                class="btn4 font"
              >
                Cancelled
              </v-btn>
              <v-btn
                flat
                value="Prepared"
                class="btn1 font"
              >
                Prepared
              </v-btn>
              <v-btn
                flat
                value="Out For Delivery"
                class="btn2 font"
              >
                Out For Delivery
              </v-btn>
              <v-btn
                flat
                value="Delivered"
                class="btn3 font"
              >
                Delivered
              </v-btn>
            </v-btn-toggle>
          </div>
          <div style="color:violet;font-size:0.7rem;text-align:right">{{o.createdAt | date}}</div>
        </li>
      </ul>
    </div>
    <nuxt-link
      to="/my/food/customers/old/"
      class="history-button noprint"
    >Old Customers</nuxt-link>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
import io from "socket.io-client";
import { WS_URL } from "~/config";
let socket = io(WS_URL);
export default {
  async asyncData({ $axios }) {
    let orders = [],
      status = "Received",
      todayTotal = null;
    try {
      orders = await $axios.$get("food-orders/my-customers");
      todayTotal = await $axios.$get("food-orders/my/today");
    } catch (e) {}
    return { orders, todayTotal };
  },
  async created() {
    let axios = this.$axios;
    let vm = this;
    socket.on("food-order" + ":save", async function(item) {
      vm.orders = await axios.$get("food-orders/my-customers");
    });
  },
  components: { Header },
  methods: {
    printOut() {
      if (process.client) {
        window.print();
      }
    },
    async save(o) {
      try {
        await this.$axios.$put("food-orders/" + o._id, { status: o.status });
      } catch (e) {}
    },
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.big {
  font-weight: 700;
  font-size: 2rem;
}
h1 {
  margin: 0px 0px 10px 0px;
}
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  /* border-bottom: 1px solid grey; */
}
.card {
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.5rem;
  width: 330px;
}
@media print {
  .noprint {
    display: none !important;
  }
}
.p-left {
  padding-left: 0px;
}
.font {
  padding-left: 1rem;
}
.seller {
  font-size: 1.4rem;
}
.customer {
  padding: 1rem;
  font-size: 1.2rem;
  color: blue;
  font-weight: 500;
}
.statusbar {
  text-align: center;
  padding-top: 1rem;
}

.btn1--active:before,
.btn1:hover:before,
.btn1:focus:before {
  background-color: red;
}
.btn2--active:before,
.btn2:hover:before,
.btn2:focus:before {
  background-color: orange;
}
.btn3--active:before,
.btn3:hover:before,
.btn3:focus:before {
  background-color: blue;
}
.btn4--active:before,
.btn4:hover:before,
.btn4:focus:before {
  background-color: green;
}
.font {
  font-size: 0.7rem;
  padding-left: 0.5rem !important;
  font-weight: 900;
}
</style>
