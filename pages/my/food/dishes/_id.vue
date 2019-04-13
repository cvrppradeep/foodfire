<template>
  <div>
    <Header />
    <div class="heading">
      <nuxt-link to="/my/food/dishes">
        <img
          src="/backarrow.svg"
          style="width:30px; height:30px;margin-top: 8px;"
        />
      </nuxt-link>&nbsp;
      Add Food Details
    </div>
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
            <v-select
              :items="dishes"
              :attach="true"
              item-text="name"
              item-value="_id"
              return-object
              v-model="food"
              label="Name"
            >
            </v-select>
            <img
              v-if="food.img"
              :src="'/images/'+food.img"
            />
            <!--
              <v-text-field
              type="tel"
              name='name'
              ref="name"
              v-model="food.name"
              label="Name of Dish"
              required
            /> -->
            <div class="msg">{{msg}}</div>
          </div>
          <br />
          <!-- <div class="margin-phn">
            <v-textarea
              name='description'
              ref="description"
              v-model="food.description"
              label="Little Description"
              required
            />
            <div class="msg">{{msg}}</div>
          </div>
          <br />
          <div class="margin-phn">
            <v-menu
              ref="menuDate"
              :close-on-content-click="false"
              v-model="menuDate"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <v-text-field
                slot="activator"
                v-model="date"
                label="Date of Delivery"
                readonly
                box
              ></v-text-field>
              <v-date-picker
                v-model="date"
                @input="$refs.menuDate.save(date)"
              ></v-date-picker>
            </v-menu>
            <div class="msg">{{msg}}</div>
          </div>
          <br />
          <div class="margin-phn">
            <label for="phone">Time of Delivery</label>
            7 PM
          </div>
          <br /> -->
          <!-- <v-select
              label="Time of Delivery"
              name="time"
              v-model="time"
              v-validate="'required'"
              ref="time"
              :items="timesList"
              box
              required
            > </v-select> -->
          <!-- <div class="msg">{{msg}}</div> -->
          <div class="margin-phn">
            <Foodcartbutton
              :qty="qty"
              @add="add"
            />
            <!-- <input
              type="tel"
              class="phone"
              name='qty'
              ref="qty"
              v-model="food.stock"
              placeholder="Qty"
              required
            /> plate -->
            <!-- <div class="msg">{{msg}}</div> -->
          </div>
          <br />
          <!-- <div class="margin-phn">
            <label for="phone">Type</label>
            <input
              type="tel"
              class="phone"
              name='type'
              ref="type"
              v-model="food.type"
              placeholder="Veg / Non-Veg"
              required
            /> plate
            <div class="msg">{{msg}}</div>
          </div>
          <div class="margin-phn">
            <label for="phone">Price</label>
            <input
              type="tel"
              class="phone"
              name='price'
              ref="price"
              v-model="food.rate"
              placeholder="Price"
              required
            /> plate
            <div class="msg">{{msg}}</div>
          </div> -->
          <br />
        </div>
        <div class="footer">
          <div class="cart-total footer">
            <div class="card shadow-lg2 w100">
              <v-btn
                type="submit"
                color="pink"
                text-color="white"
                :disabled="loading"
              ><span :class="{'loading':loading}">Submit</span>
              </v-btn>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { timesList } from "~/config";
const Foodcartbutton = () => import("~/components/FoodcartbuttonAdmin");
const Header = () => import("~/components/HeaderFood");

export default {
  fetch({ store, redirect }) {
    if (!store.getters["auth/hasRole"]("chef")) return redirect("/login");
  },
  components: { Foodcartbutton, Header },
  data() {
    return {
      loading: false,
      fadeIn: "",
      msg: null,
      food: {},
      date: null,
      time: "7 PM",
      menu: false,
      modal: false,
      menuDate: false,
      menuTime: false,
      timesList: timesList,
      dishes: [],
      qty: 5
    };
  },
  async created() {
    try {
      const food = await this.$axios.$get("foods/" + this.$route.params.id);
      this.food = food;
    } catch (e) {}
    this.date = moment().format("YYYY-MM-DD");
    this.time = moment()
      .add(1, "hour")
      .format("h A");
    try {
      this.dishes = await this.$axios.$get("dishes/chef");
    } catch (err) {
      // this.$store.commit("setErr", err);
    }
  },
  methods: {
    add(qty) {
      if (qty < 5 && this.qty <= 5) return;
      // if (qty > 0 && this.qty >= 300) {
      //   this.$store.commit("setErr", "Sorry! Maximum 300 qty allowed.");
      //   return;
      // }
      this.qty += qty;
    },
    async submit() {
      let res = {};
      try {
        this.loading = true;
        let date = moment(this.date + " " + this.time, "YYYY-MM-DD h a");
        if (date.diff(moment()) < 0) {
          console.log("Delivery time is invalid");
          this.$store.commit("setErr", "Delivery time is invalid");
          return;
        }
        this.food.deliveryDate = date;
        if (this.$route.params.id == "new")
          res = await this.$axios.$post("foods", this.food);
        else
          res = await this.$axios.$put(
            "foods/" + this.$route.params.id,
            this.food
          );
        this.$router.push("/food");
      } catch (e) {
        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", e.toString());
        this.$store.commit("setErr", e.toString());
        return;
      } finally {
        this.loading = false;
      }
    }
  },
  layout: "none",
  head() {
    return {
      title: "Post Your Food"
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

