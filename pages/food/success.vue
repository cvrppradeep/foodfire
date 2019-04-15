<template>
<div>
  <Header/>
  <div class="center column p-top" v-if="order">
    <img class="img" src="/Tick_Mark.png"/>
    <h2>Order Successfully Placed</h2>
    <div class="border-top center">
<h3 class="border-bottom">Your Order No is <span class="redclr">{{order["orderNo"]}}</span></h3>
    </div>
    
    <div class="phoneno column center">
      <h4>You'll recieve the confirmation message shortly to </h4>
      <span style=" padding-top: 0.4rem;">Phone No.<strong class="greenclr">9878765441</strong> </span>
      <div style="padding-top: 0.4rem;">
           Delivery Address: <strong
                class="blueclr"
                v-if="order.address"
              >{{order.address.qrno}}</strong><br />
            </div>
    </div>
    </div>
    <div class="row jc-sa order"  v-for="(p, index) in order.items"
                    :key="index">
      <span>
        ORDER TOTAL
      </span>
      <span>
     {{p.price | currency}}
      </span>
    </div>
    <div class="row jc-sa payment">
      <span>
       Payment Method
      </span>
      <span>
       COD
      </span>
    </div>
    <div class="center column">
    <p>Delivery will start 14-Apr-2019 6:00PM - 8:00PM</p>
              <h5><strong class="redclr">Note: </strong>Order once booked can not be cancelled.</h5>
              </div>
    <div class=" btn1  center">
     
        <router-link
            to="/my/food/orders"
      class="button1 ">
My Orders
        </router-link>
     
     
    </div>
    <div class=" footer">
      <div class="btn btn-block btn-white back-to-menu-btn">
        <div>
          <img
            class="height35"
            src="/backarrow.svg"
          />
        </div>
        <div>
          <router-link
            to="/food"
            class="btnclr"
          >Food Mela</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { clearCart } from "~/config";
const Product = () => import("~/components/Product");
const Header = () => import("~/components/HeaderFood");
export default {
  components: { Header, Product },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  async asyncData({ params, query, route, redirect, $axios, store }) {
    let order = [],
      err = null;
    try {
      order = await $axios.$get(`food-orders/public/${route.query.id}`);
      err = null;
    } catch (e) {
      order = {};
      if (e && e.response && e.response.data) {
        err = e.response.data;
      } else if (e && e.response) {
        err = e.response;
      } else {
        err = e;
      }
      console.log("err...", `${err}`);
    }
    // try {
    //   await $axios.$post("cart", { items: [] });
    // } catch (e) {}
    // if (clearCart) store.commit("cart/clearCart", {});

    return { order };
  },
  methods: {
    cancelOrder() {
      console.log("Cancel order  requested");
    }
  },
  middleware: "back",
  head() {
    return {
      title: "Order placed successfully",
      meta: [
        {
          hid: "description",
          name: "description",
          content: ""
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content: ""
        },
        {
          hid: "keywords",
          name: "Keywords",
          property: "keywords",
          content: ""
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Order placed successfully"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Order placed successfully"
        },
        {
          name: "twitter:description",
          content: ""
        }
      ]
    };
  }
};
</script>
</script>
<style>
h2{
  color: #10b310;
  font-size: 1.8rem;
    font-weight: 600;
    padding-bottom: 2rem;
}
.center{
  text-align: center;
}
.img{
  width: 6rem;
  height: 7rem;
}
.column{
  display: flex;
  flex-direction: column;
}
.p-top{
padding-top: 1.5rem;
}
.border-top{
  border-top:2px solid #eae3e3;
  padding-top: 2rem;
  width: 100%;
}
.border-bottom{
  border-bottom: 2px solid #eae3e3;;
   padding-bottom: 2rem;
   width: 100%;
}
.redclr{
  color: red;
}
.greenclr{
color: #10b310;
font-size: 1.2rem;
    font-weight: 500;
   
}
.phoneno{
  padding-top: 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    color: gray;
}
.row{
  display: flex;
  flex-direction: row;
}
.jc-sa{
  justify-content:space-around;
  padding-top: 1.2rem;
}
.order{
  font-size: 1.2rem;
  font-weight: 500;
}
.payment{
  font-size: 1rem;
  font-weight: 500;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
}
.button1{
  
  text-transform: initial;
  border-style: solid;
  
  border-color: black;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 10rem;
  
  font-size: 1.2rem;
  line-height: 1.5;
 border-radius: 0.4rem;
  padding: 7px;
  outline: none;
}

.jc-se{
  justify-content: space-evenly
}
.width{
  width: 10rem;
}
.btn1{
  padding-top: 2rem;
}
.blueclr{
  color: blue;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.btn {
  position: relative;
  text-transform: uppercase;
  -webkit-transition: all 0.15s ease;
  transition: all 0.15s ease;
  will-change: transform;
  letter-spacing: 0.025em;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
}
.btn-block {
  display: block;
  width: 100%;
}

.btn {
  padding: 7px;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
/* .btn-align {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
} */
.height35 {
  height: 35px;
  padding-top: 7px;
}
.back-to-menu-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.btnclr {
  color: white;
  text-decoration: none;
  padding-left: 1px;
}
.btn-white {
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  border-color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
