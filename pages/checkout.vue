<template>
  <div>
    <Header />
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit()"
      class="container center"
    >
      <!-- <div class="img1">
        <img src="/personlogo.png">
      </div> -->
      <div class="card shadow columns">

        <!-- <h1>Qr No: </h1> -->
        <div class="margin">
          <label>Address:</label>
          <input
            type="text"
            class="address"
            name='address'
            ref="address"
            v-model="address"
            placeholder="Qr No."
            required
          />
        </div>
      </div>
      <div class="footer">
        <a v-if="!cartItems.length==0">
          <div class="cart-total footer">
            <div class="card shadow w100">
              <div class="is-mobile">
                <div class="flex-row-checkout">
                  <div class="amount-align">
                    <p class="gray">Total Amount</p>
                  </div>
                  <div>
                    <h2>{{getTotal | currency}}</h2>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="button"
                    :disabled="getTotal==0 || loading"
                  ><span :class="{'fadeIn':loading}">{{text}}</span>
                  </button>
                </div>
              </div>
              <!-- <div class="is-mobile">
                    <p class="green">Please allow us 45mins for delivery</p>
                  </div> -->
              <div class="cart-total-after"></div>

            </div>
          </div>

        </a>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const Product = () => import("~/components/Product");
const Header = () => import("~/components/Header");
export default {
  props: ["products"],
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=checkout");
  },
  data() {
    return {
      loading: false,
      text: "Place order",
      address: null
    };
  },
  components: { Product, Header },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || {};
    },
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      getTotal: "cart/getTotal"
    })
  },
  async created() {
    let address = await this.$axios.$get("users/me");
    this.address = address.address;
  },
  methods: {
    ...mapActions({
      checkout: "cart/checkout"
    }),
    async submit() {
      this.err = null;
      try {
        this.loading = true;
        let c = await this.checkout({
          address: { address: this.address },
          paymentMethod: "COD"
        });
        if (c == 401) {
          // this.$store.commit("setErr", "Enter your phone no"); // Not working with redirect
          this.$router.push("/login");
        } else {
          this.text = "Please Wait. . .";
        }
      } catch (e) {
        this.err = null;
        this.text = "Place Order";
        if (e && e.response && e.response.status == 401) {
          // this.$store.commit("setErr", "Enter your phone no"); // Not working with redirect
          this.$router.push("/login");
        } else if (e && e.response && e.response.data) {
          this.err = e.response.data._message || e.response.data.msg;
        } else if (e == "Add some items into cart.") {
          // this.$store.commit("setErr", "Add some items into cart."); // Not working with redirect
          this.$router.push("/");
        } else {
          this.err = e;
        }
        this.$store.commit("setErr", this.err);
      } finally {
        this.loading = false;
      }
    }
  },
  head() {
    return {
      title: "Checkout with the products in your cart",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "After this checkout process we will ship the item and it should be delivered within 7 working days"
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content:
            "After this checkout process we will ship the item and it should be delivered within 7 working days"
        },

        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Checkout with the products in your cart"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Checkout with the products in your cart"
        },
        {
          name: "twitter:description",
          content:
            "After this checkout process we will ship the item and it should be delivered within 7 working days"
        }
      ]
    };
  }
};
</script>
<style scoped>
.address {
  height: 45px;
  font-size: 20px;
  border: 1px solid #da1c5f;
  width: 100%;
  padding: 5px 10px;
  border-radius: 3px;
}
.cart-total-after {
  margin-bottom: 10px;
}
.flex-row-checkout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
h1 {
  font-size: 14px;
  padding-left: 26px;

  color: #3baaec;
}
h5 {
  font-size: 17px;
  margin-top: 0px;
  color: #3baaec;
  text-align: -webkit-center;
}
h3 {
  font-size: 23px;
}
h4 {
  font-size: 14px;
  padding-left: 26px;
  color: #3baaec;
}
.border {
  border: none;
  outline: none;
  padding-top: 10px;
  text-align: -webkit-center;
}
.margin {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 0;
  padding-top: 10px;
}
.margin-phn {
  padding-left: 28px;
  padding-right: 28px;
}
textarea {
  height: 60px;
  margin-top: -11px;
}
/* .padding {
  padding-top: 25px;
} */
.footer {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.columns {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  padding-left: 0px;
  padding-right: 0px;
  height: auto;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
.button {
  text-transform: uppercase;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  padding: 7px;
  outline: none;
  color: #f6f7fa;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  border: none;
  border-radius: 0.3rem;
  border-color: #fb6340;
}
.button .loading {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.gray {
  font-size: 23px;
  color: gray;
}
.shadow-lg2 {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0 1.5rem;
}
.top-padding {
  padding-top: 50px;
  font-size: 17px;
}
.img1 {
  text-align: -webkit-center;
  /* height: 92px; */
  padding-top: 3px;
}
img {
  height: 92px;
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
.disable {
  color: #f6f7fa;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  border-color: #fb6340;
}
.email {
  letter-spacing: 1px;
  text-transform: capitalize;
}
</style>

