<template>
  <div>
    <div>
      <Header />
    </div>
    <div class="container head">
      <div>
        <div v-if="order">
          <div class="row align-items-center">
            <div class="card-align">
              <div>
                <div class="card svgcard">
                  <img
                    class="svgheight"
                    src="/circleright.svg"
                  />
                  <h3 class="text-primary-light font-weight-bold">Thank You!!!</h3>
                </div>
                <br>
                <div>
                  <h2>
                    Your order request has been received <small>successfully.</small>
                  </h2>
                  <p class="font13">Order No: <span class="font-weight-bold">{{order["orderNo"]}}</span></p>
                  <p>You will receive a message or call regarding the confirmation of the product.</p>
                  <h5><strong>Note: </strong>Your order will be sent to you, usually within 1-24hrs.</h5>
                </div>
                <div>
                  Address: <strong
                    class=""
                    v-if="order.address"
                  >{{order.address.address}}</strong><br />
                </div>
              </div>
              <div>
                <div class="products ">
                  <div class="order-margin">
                    <span class="order-header"> ORDER SUMMARY</span>
                  </div>
                  <product
                    v-for="(p,ix) in order.items"
                    :key="ix"
                    :class="{'border':ix!=0}"
                    :product="{_id:p.pid,name:p.name,img:[p.img],slug:p.slug,variants:[{_id:p.vid,size:p.size,mrp:p.mrp,price:p.price}]}"
                    :showcart="true"
                  />
                  <!-- <div
                    class="product"
                    v-for="(p, index) in order.items"
                    :key="index"
                  >
                    <div class="flex-row flex-space-between border-radius product-card columns">
                      <div class="image">
                        <img
                          v-lazy="p.img.small"
                          alt=""
                        />
                      </div>
                      <div>
                        <span>{{ p.name }}</span>
                      </div>
                      <div class="price-align">
                        <div class="big">{{p.price | currency}}</div>
                      </div>
                    </div>
                  </div> -->
                </div>
                <!-- <h6 v-if="$store.state.settings">
                  <u>For customer service</u><br> Please contact:<router-link
                    class="cursor"
                    to=""
                  > {{$store.state.settings.shopEmail}}</router-link>
                </h6> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-align footer">
      <div class="btn btn-block btn-white back-to-menu-btn">
        <div>
          <img
            class="height35"
            src="/backarrow.svg"
          />
        </div>
        <div>
          <router-link
            to="/grocery"
            class="btnclr"
          >Grocery Menu</router-link>
        </div>
      </div>
    </div>
    <!-- <router-link to="/my/orders" class="button is-dark">Find My Previous Orders</router-link> -->
  </div>
</template>
<script>
import { clearCart } from "~/config";
const Product = () => import("~/components/Product");
const Header = () => import("~/components/Header");
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
    if (store.getters["cart/getTotal"] <= 0) {
      redirect("/");
    }
    try {
      order = await $axios.$get(`orders/public/${route.query.id}`);
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
    try {
      await $axios.$post("cart", { items: [] });
    } catch (e) {}
    if (clearCart) store.commit("cart/clearCart", {});

    return { order };
  },
  created() {
    if (!process.server) {
      this.lastVisit = localStorage.getItem("lastVisit") || "/";
    }
  },
  methods: {
    cancelOrder() {
      console.log("Cancel order  requested");
    }
  },

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
<style scoped>
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
.container {
  width: 100%;
  padding-top: 0px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.border-0 {
  border: 0 !important;
}
.shadow-lg {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: linear-gradient(50deg, #67d44d 0, #0a8e12 100%) !important;
  background-clip: border-box;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
}
.product-card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
  width: 100%;
}
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.order-margin {
  margin-top: 1rem !important;
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
.btn-align {
  min-height: 0;
  padding-top: 9px;
  padding-bottom: 0px;
}
.card-align {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding: 10px;
  text-align: center;
}

a {
  color: black;
  cursor: pointer;
  text-decoration: none;
}

h2 {
  font-size: 13px;
  margin-top: -10px;
}
small {
  color: #09a709;
  font-size: 13px;
}
.svgheight {
  height: 29px;
  margin-top: 13px;
}
.svgcard {
  width: 100%;
  padding-top: 0px;
  padding-right: 11px;
  padding-left: 9px;
  margin-right: auto;
  margin-left: auto;
  height: 79px;
  border-radius: 0%;
}
h3 {
  letter-spacing: 1px;
  text-transform: initial;
  margin-top: 8px;
  font-size: 1.125rem;
  font-family: sans-serif;
  color: white;
}
/* h4 {
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  padding-left: 10px;
  padding-right: 10px;
  color: slategray;
} */
h5 {
  margin-top: -4px;
  font-size: 13px;
}
br {
  line-height: 19px;
}
.font13 {
  font-weight: bold;
  font-size: 13px;
}
.name {
  font-size: 18px;
  color: #3a3ac9;
}
.cursor {
  cursor: pointer;
}
.color {
  color: aliceblue;
}
/* .products {
   margin: 0 1rem; 
} */
.product {
  align-items: flex-start;
  display: flex;
  text-align: left;
  padding-top: 1rem;
}
strong {
  color: red;
  font-weight: 700;
}
/* .image {
  width: 104px;
}
.image img {
  border-radius: 50px;
} */
.border {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
.order-header {
  font-weight: 700;
  font-family: sans-serif;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.head {
  position: relative;
  left: 0;
  width: 100%;
  text-align: center;
  margin-bottom: 18px;
}
.back-to-menu-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.height35 {
  height: 35px;
  padding-top: 7px;
}
</style>
