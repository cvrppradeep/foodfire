<template>
  <div>
    <Header />
    <div class="heading">Today's Orders</div>
    <div>
      <ul class="p-left">
        <li
          class="card"
          v-for="(o,ix) in orders"
          :key="ix"
        >
          <h1 class="seller">{{o.address.recipient_name}} ({{o.phone}})</h1>
          <h3 class="fx customer">
            <div><span style="color:#333">{{o.item.name}}</span> {{o.rate | currency}} * {{o.qty}} = {{o.amount | currency}}</div>
            <div style="color:red">QrNo: {{o.address.qrno}}</div>
          </h3>
          <div class="center">
          <v-btn-toggle v-model="o.status" @change='save(o)'>
              <v-btn flat value="Received" class="btn4 font" >
                Order placed
              </v-btn>
              <v-btn flat value="Prepared" class="btn1 font">
                Prepared
              </v-btn>
              <v-btn flat value="Out For Delivery" class="btn2 font" >
               Out For Delivery
              </v-btn>
              <v-btn flat value="Delivered" class="btn3 font" >
                Delivered
              </v-btn>
            </v-btn-toggle>
            </div>
        </li>
      </ul>
    </div>
    <nuxt-link
      to="/my/food/customers/old/"
      class="history-button"
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
    let orders = [],status='Received';
    try {
      orders = await $axios.$get("food-orders/my-customers");
    } catch (e) {}
    return { orders };
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
    async save(o){
      try {
await this.$axios.$put('orders/'+o._id,{status:o.status})
      }
      catch(e) {}
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
.center{
  text-align: center;
  padding-top:1rem;
}

.btn1--active:before, .btn1:hover:before, .btn1:focus:before {
    
    background-color: red;
}
.btn2--active:before, .btn2:hover:before, .btn2:focus:before {
  background-color: orange;
}
.btn3--active:before, .btn3:hover:before, .btn3:focus:before {
  background-color: blue;
}
.btn4--active:before, .btn4:hover:before, .btn4:focus:before {
  background-color: green;
}
.font{
  font-size: 0.7rem;padding-left: 0.5rem !important;font-weight: 900;
}
</style>

