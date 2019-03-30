<template>
  <div>
    <div class="heading">Login</div>
    <!-- <h2 class="center">Login</h2> -->
    <div class="container">
      <form
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit()"
        class="container center"
      >
        <div class="card shadow columns">
          <br />
          <div class="margin-phn">
            <label for="phone">Phone:</label>
            <input
              type="tel"
              class="phone"
              name='phone'
              ref="phone"
              v-model="user.phone"
              placeholder="Phone No"
              @keyup="onPhoneChange"
              required
            >
            <div class="msg">{{msg}}</div>
          </div>
          <br />
          <div
            class="margin-phn"
            v-show="showOTP"
          >
            <label for="OTP"></label>
            <div class="otp-container">
              <input
                type="tel"
                class="otp"
                id="otp1"
                name="otp1"
                ref="otp1"
                v-model="p.i1"
                maxlength="1"
                @keyup="onKeyUpEvent(1,$event)"
              />
              <input
                type="tel"
                class="otp"
                id="otp2"
                v-model="p.i2"
                maxlength="1"
                @keyup="onKeyUpEvent(2, $event)"
              />
              <input
                type="tel"
                class="otp"
                id="otp3"
                v-model="p.i3"
                maxlength="1"
                @keyup="onKeyUpEvent(3, $event)"
              />
              <input
                type="tel"
                class="otp"
                id="otp4"
                v-model="p.i4"
                maxlength="1"
                @keyup="onKeyUpEvent(4, $event)"
              />
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="cart-total footer">
            <div class="card shadow-lg2 w100">
              <button
                v-if="!showOTP"
                type="submit"
                class="big-button"
                :disabled="loading"
              ><span :class="{'loading':loading}">Verify Phone</span>
              </button>
              <button
                v-else
                type="submit"
                class="big-button"
                :disabled="loading"
              ><span :class="{'loading':loading}">Verify OTP</span>
              </button>
              <div class="cart-total-after"> </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
const Product = () => import("~/components/Product");
const Header = () => import("~/components/Header");
export default {
  props: ["products"],
  data() {
    return {
      loading: false,
      fadeIn: "",
      disable: "disable",
      p: {},
      showOTP: false,
      msg: null
    };
  },
  components: { Product, Header },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || {};
    },
    ...mapState({
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      getTotal: "cart/getTotal"
    })
  },
  created() {
    console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", this.$route.query.returnUrl);
  },
  methods: {
    onPhoneChange(e) {
      if (e.keyCode != 13) {
        this.showOTP = false;
        this.p = {};
        return;
      }
    },
    async submit() {
      let vm = this;
      this.err = null;
      this.msg = null;
      if (!this.user.phone || this.user.phone == "") {
        this.$store.commit("setErr", "Please enter your phone no");
        return;
      }
      if (!this.showOTP) {
        // When request OTP clicked 1st
        try {
          this.loading = true;
          const otp = await this.$axios.get("/users/phone/" + this.user.phone);
          if (otp.status == 200 || otp.status == 201) {
            this.showOTP = true;
            this.msg = "Please enter OTP sent to your Mobile";
            this.$refs.otp1.focus();
            return;
          }
        } catch (e) {
          this.showOTP = false;
          if (e && e.response && e.response.data) {
            this.err = e.response.data._message || e.response.data.msg;
            this.msg = this.err;
          }
          // this.$store.commit("setErr", this.err);
          return;
        } finally {
          this.loading = false;
        }
      } else {
        // To send OTP verification request 2nd
        try {
          this.loading = true;
          const password = this.p.i1 + this.p.i2 + this.p.i3 + this.p.i4;
          const status = await this.$store.dispatch("auth/login", {
            phone: this.user.phone,
            password
          });
          if (status == 200 || status == 201) {
            this.$store.commit("success", "Verified! Thank You.");
            let returnUrl = this.$route.query.returnUrl || "/food";
            this.$router.push(returnUrl);
          }
          // this.showOTP = false;
        } catch (e) {
        } finally {
          this.loading = false;
        }
      }
    },
    getCodeBoxElement(index) {
      return document.getElementById("otp" + index);
    },
    onKeyUpEvent(index, event) {
      const eventCode = event.which || event.keyCode;
      if (this.getCodeBoxElement(index).value.length === 1) {
        if (index !== 4) {
          this.getCodeBoxElement(index + 1).focus();
        } else {
          this.getCodeBoxElement(index).blur();
          this.submit(); // Submit code
        }
      }
      if (eventCode === 8 && index !== 1) {
        this.getCodeBoxElement(index - 1).focus();
      }
    },
    onFocusEvent(index) {
      // for (let item = 1; item < index; item++) {
      //   const currentElement = this.getCodeBoxElement(item);
      //   if (!currentElement.value) {
      //     currentElement.focus();
      //     break;
      //   }
      // }
    }
  },
  head() {
    return {
      title: "Login to Litekart",
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
.msg {
  font-size: 10px;
  color: #fb6340;
}
.otp-container {
  text-align: center;
}
.phone {
  height: 45px;
  border: 1px solid #da1c5f;
  padding: 5px 10px;
  border-radius: 3px;
}
.otp {
  height: 45px;
  width: 45px;
  font-size: 25px;
  text-align: center;
  border: 1px solid #fff;
  border-bottom: 1px solid #888;
}
.opt::-webkit-inner-spin-button,
.opt::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.cart-total-after {
  margin-bottom: 10px;
}
.align {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
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
.padding {
  padding-top: 25px;
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
  border: 0.0625rem solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}

.big-button .loading {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}

.gray {
  font-size: 23px;
  color: gray;
}
.shadow {
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.w100 {
  width: 100%;
  padding: 0.7rem 0.7rem 0;
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
</style>

