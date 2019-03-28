<template>
  <div>
    <Header />
    <div class="head">
      <center class="title">
        <strong>My Cart</strong>
      </center>
    </div>
    <div class="products">
      <div v-if="cartItems.length==0">
        <center>
          <div class="container">
            <div class="card">
              <div> <img
                  class="image"
                  src="/empty_cart_teaser.jpg"
                /></div>
              <h2> There's nothing in here </h2>
              <h5>You have not added any items to your cart yet.</h5>
              <div class="footer">
                <a>
                  <div class="cart-total footer">
                    <div class="card shadow w100">
                      <div class="is-mobile">
                        <div class="empty-cart">
                          <button
                            class="big-button "
                            @click="go('/')"
                          >
                            <div class="center">
                              <img src="/backarrow.svg" />
                              Back to Menu
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </center>
      </div>
      <div
        class=""
        v-else
      >
        <cart-product
          v-for="(p,ix) in cartItems"
          :key="ix"
          :product="p"
          :showcart="true"
        />
      </div>
    </div>
    <div class="footer">
      <a v-if="!cartItems.length==0">
        <div class="cart-total footer">
          <div>
            <div class="card shadow w100">
              <div>
                <div class="is-mobile">
                  <div class="flex-row-nocenter flex-space-between  ">
                    <div class="amount-align">
                      <p class="gray">Total Amount</p>
                    </div>
                    <div>
                      <h2 class="big">{{getTotal | currency}}</h2>
                    </div>
                  </div>
                  <div>
                    <button
                      class="big-button "
                      :disabled="getTotal==0 || loading"
                      @click="go('/checkout')"
                    >Add Address
                    </button>
                  </div>
                </div>
                <!-- <div class="is-mobile">
                  <p class="green">Please allow us 45mins for delivery</p>
                </div> -->
                <div class="cart-total-after"> </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const CartProduct = () => import("~/components/CartProduct");
const Header = () => import("~/components/Header");
export default {
  props: ["products"],
  data() {
    return {
      loading: false
    };
  },
  components: { CartProduct, Header },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: "cart/checkCart",
      getTotal: "cart/getTotal"
    })
  },
  methods: {
    ...mapActions({
      checkout: "cart/checkout",
      addToCart: "cart/addToCart"
    }),
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.products {
  margin: 10px auto;
  max-width: 450px;
}
.cart-total-after {
  margin-bottom: 10px;
}

.footer {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.amount-align {
  padding-top: 9px;
}
.empty-cart {
  padding-bottom: 10px;
  padding-top: 10px;
}
/* .image {
  padding-left: 0%;
  width: 80%;
  margin-top: -0.8rem;
} */
/* .empty-cart-msg { */
/* text-transform: initial;
  font-style: oblique;
  font-weight: bolder;
  margin-top: -2.8rem; */
/* } */
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  padding-top: 20px;
}

.h2 {
  font-size: 23px;
  color: #8a6224;
  font-family: monospace;
}
.shadow {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0 1.5rem;
}
.head {
  /* margin-right: 10px; */
  /* position: relative;
  left: 0;
  right: 0;
  text-align: center;
  margin-bottom: 175px; */
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.fadeIn {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.gps-svg {
  padding-top: 3px;
  padding-left: 6px;
}
</style>

