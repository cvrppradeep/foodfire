<template>
  <div>
    <Header />
    <div class="heading">Old Delivery</div>
    <div>
      <ul class="p-left">
        <li
          class="card"
          v-for="(o,ix) in orders"
          :key="ix"
        >
          <div class="font1">
            <h1 class="seller">{{o._id.restaurant}} - {{o._id.phone}}</h1>
          </div>
          <div
            v-for="(i,ixx) in o.data"
            :key="'i-'+ixx"
            @click="go('/my/food/delivery/'+i._id)"
            class="fx customer"
          >
            <div style="color:#333">{{i.item}}</div>
            <div  class="p-top">{{i.name}} ({{i.phone}})</div>
            <div  class="p-top">{{i.qty}} * {{i.rate | currency}} = {{i.amount | currency}}</div>
            <div style="color:red">{{i.qrno}}</div>
          </div>
           <div class="center p-top">
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
      to="/my/food/delivery/"
      class="history-button"
    >Today's Delivery</nuxt-link>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
  async asyncData({ $axios }) {
    let orders = [],status='Received';
    try {
      orders = await $axios.$get("food-orders/old-group");
    } catch (e) {}
    return { orders };
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
.font1 {
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
.p-top{
  padding-top: 1rem;
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

