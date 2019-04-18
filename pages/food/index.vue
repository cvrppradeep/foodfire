<template>
  <div>
    <HeaderFood />
    <!-- <v-layout
      row
      justify-center
    >
      <v-dialog
        v-model="openclose"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Thank You</v-card-title>
          <v-card-text>Restaurant closed for the day</v-card-text>
        </v-card>
      </v-dialog>
    </v-layout> -->
    <div>
      <div class="heading p-bottom">Food Orders <span class="time">Live Now</span></div>
      <div class="row p-top">
        <div class="p-left">
              <v-btn-toggle
              >
                <v-btn
                  flat
                  value="Order placed"
                  class="btn4 font"
                >
                  Home
                </v-btn>
                <v-btn
                  flat
                  value="Prepared"
                  class="btn1 font"
                >
                  All
                </v-btn>
                <v-btn
                  flat
                  value="Out For Delivery"
                  class="btn2 font"
                >
                  Restaurant
                </v-btn>
             
              </v-btn-toggle>
            </div>
       <div class="p-right">
              <v-btn-toggle
              >
                <v-btn
                  flat
                  value="Order placed"
                  class="btn4 font"
                >
                  Veg
                </v-btn>
                <v-btn
                  flat
                  value="Prepared"
                  class="btn1 font"
                >
                  All
                </v-btn>
                <v-btn
                  flat
                  value="Out For Delivery"
                  class="btn2 font"
                >
                  Non-veg
                </v-btn>
             
              </v-btn-toggle>
            </div>
          </div>
           </div>
      <div class="align-row p-top">
        <div
          class="product-card"
          v-for="d in foods"
          :key="d._id"
          @click="go('/food/'+d._id)"
        >
          <div class="a-listing">
            <div class="height ">
              <img
                v-lazy="'/images'+d.img"
                class="backgroundimg"
              />
            </div>
            <div class="restroname">
              {{d.name}}
            </div>
            <div class="card-container">
              <div class="a-contain">
                <div style="font-weight: 600;">
                  {{d.rate | currency}}
                </div>
                <div
                  class="f-pink"
                  v-if="!openclose"
                >Open 6AM - 5PM</div>

                <div
                  class="f-pink"
                  v-else-if="d.stock>0"
                > Only {{d.stock}} left</div>
                <div
                  class="f-pink"
                  v-else
                > Sold out </div>
                <img
                  v-if="d.type=='N'"
                  src="non-veg.png"
                  class="image-size"
                />
                <img
                  v-else
                  src="veg.png"
                  class="image-size"
                />
              </div>
              <div class="p-name">By : {{d.restaurant}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");
const CartButtons = () => import("~/components/CartButtons");
const HeaderFood = () => import("~/components/HeaderFood");
import { SocketService } from "~/service/socket";
let ss = new SocketService();
export default {
  components: { Ratingcircle, CartButtons, HeaderFood },
  async asyncData({ $axios }) {
    let foods = [],
      openclose = false;
    try {
      foods = await $axios.$get("foods/group");
    } catch (e) {
      foods = [];
    }
    try {
      openclose = await $axios.$get("foods/openclose");
    } catch (e) {
      openclose = false;
    }
    return { foods, openclose };
  },
  data() {
    return {};
  },
  async created() {
    await ss.syncUpdates("food", this.foods);
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  background-color: rgb(247, 247, 247);
  justify-content: center;
  border-radius: 0.2rem;
  margin: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  width: calc(50% - 1rem);
}
@media (min-width: 650px) {
  .product-card {
    width: calc(25% - 1rem);
  }
}
@media (min-width: 1000px) {
  .product-card {
    width: calc(20% - 1rem);
  }
}
.backgroundimg {
  border-radius: 0.3rem 0.3rem 0 0;
  min-height: 126px;
  /* box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important; */
}

.a-listing {
  display: flex;
  flex-direction: column;
}
.image-size {
  width: 1.5rem;
  height: 1.5rem;
}
.a-contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.p-name {
  font-size: 0.9rem;
  line-height: 1rem;
  color: #3279ff;
}
.align-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
/* @media (min-width:300px) and (max-width:800px ) {
     .align-row{
        display: flex;
    flex-direction: row;
    } 
    } */
.name {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.f-pink {
  color: rgb(255, 0, 104);
  font-size: 0.7rem;
  letter-spacing: 1px;
  font-weight: 500;
}
.card-container {
  padding: 0.4rem;
}
.time {
  font-size: 0.8rem;
  color: #eee;
}
.v-dialog__content {
  background: rgba(0, 0, 0, 0.6);
}
.restroname {
  padding-left: 0.4rem;
  padding-top: 0.4rem;
  font-weight: 400;
  color: #0c921e;
}
.center {
  text-align: cente
  
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
.row{
      display: flex;
    justify-content: space-between;
}
.v-btn-toggle {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    border-radius: 4rem;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    will-change: background, box-shadow;
}
.p-left{
  padding-left: 1rem;
}
.p-right{
  padding-right: 1rem;
}
.p-top{
  padding-top: 1rem;
}
.p-bottom{
  padding-bottom: 1rem;
}
</style>
