<template>
  <div>
    <Header />
    <div class="heading">Today's Delivery</div>
    <a href="/api/food-orders/export/500">Export Today's</a>
    <a href="/api/food-orders/dailyTotalByChef">Total by date</a>
    <div>
      <div class="fx">
        <h2>{{todayTotal.count}}</h2>
        <h1>{{todayTotal.total | currency}}</h1>
      </div>
      <ul class="p-left">
        <li
          class="card"
          v-for="(o,ix) in orders"
          :key="ix"
        >
          <div class="font">
            <h1 class="seller">{{o._id.restaurant}} - {{o._id.phone}} <span style="color:green">{{o._id.qrno}}</span></h1>
          </div>
          <div
            v-for="(i,ixx) in o.data"
            :key="'i-'+ixx"
            class="customer"
          >
            <div class="p-bottom">{{i.name}} ({{i.phone}}) </div>
            <div class="items">
              <div
                class="p-bottom"
                style="color:#333"
              >{{i.item}}</div>
              <div class="p-bottom">{{i.qty}} * {{i.rate | currency}} = {{i.amount | currency}}</div>
              <div style="color:red">{{i.qrno}}</div>
            </div>
            <div class="center">
              <v-btn-toggle
                v-model="i.status"
                @change='save(i)'
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
            <div style="color:violet;font-size:0.7rem;text-align:center">{{i.createdAt | date}}</div>
          </div>

        </li>

      </ul>
    </div>
    <nuxt-link
      to="/my/food/delivery/old/"
      class="history-button"
    >Old Delivery</nuxt-link>
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
      orders = await $axios.$get("food-orders/group");
      todayTotal = await $axios.$get("food-orders/summary/today");
    } catch (e) {}
    return { orders, todayTotal };
  },
  async created() {
    let axios = this.$axios;
    let vm = this;
    socket.on("food-order" + ":save", async function(item) {
      vm.orders = await axios.$get("food-orders/group");
      vm.todayTotal = await axios.$get("food-orders/summary/today");
    });
  },
  components: { Header },
  methods: {
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
h1 {
  margin: 0px 0px 10px 0px;
}
li .customer {
  border-bottom: 1px solid #ccc;
}
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
}
.card {
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.5rem;
}
.p-left {
  padding-left: 0px;
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
.p-bottom {
  padding-bottom: 1rem;
}
.items {
  display: flex;
  justify-content: space-between;
}

.p-top {
  padding-top: 1rem;
}
.center {
  text-align: cente;
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
  padding-left: 1rem;
  font-size: 0.7rem;
  padding-left: 0.5rem !important;
  font-weight: 900;
}
</style>

