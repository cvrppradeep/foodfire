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
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit()"
      class="container center"
    >
      <div class="card shadow columns">
        <br />
        <div class="margin-phn">
          <!-- <v-checkbox
            v-model="food.active"
            @change="submit()"
            label="Open Kitchen"
          /> -->
          <v-text-field
            label="Dish Name"
            name="name"
            v-model="food.name"
            box
          />
          <v-text-field
            label="Description"
            name="description"
            v-model="food.description"
            box
          />
          <v-text-field
            label="Rate"
            name="rate"
            v-model="food.rate"
            box
          />
          <v-text-field
            label="Qty"
            name="qty"
            v-model="food.stock"
            box
          />
          <v-radio-group v-model="food.type">
            <v-radio
              label="Veg"
              value="V"
            ></v-radio>
            <v-radio
              label="Non Veg"
              value="N"
            ></v-radio>
          </v-radio-group>
          <single-image-upload
            :image="food.img"
            :name="food"
            folder="food"
            @remove="remove"
            @save="save"
          />

          <img
            v-if="food.img"
            :src="'/images/'+food.img"
          />
          <div class="msg">{{msg}}</div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
      <div class="footer">
        <div class="form-element">
          <button
            type="submit"
            v-if="$route.params.id == 'new'"
          >Add Dish</button>
          <button
            type="submit"
            v-else
          >Save Changes</button>
        </div>
      </div>
    </form>

  </div>
</template>
<script>
import moment from "moment";
import { timesList } from "~/config";
const Foodcartbutton = () => import("~/components/FoodcartbuttonAdmin");
const Header = () => import("~/components/HeaderFood");
import SingleImageUpload from "@/components/SingleImageUpload";

export default {
  fetch({ store, redirect }) {
    if (!store.getters["auth/hasRole"]("chef")) return redirect("/login");
  },
  components: { Foodcartbutton, Header, SingleImageUpload },
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
    // this.date = moment("2019-04-14 18:00:00").format("YYYY-MM-DD");
    // this.time = moment("2019-04-14 18:00:00").format("h A");
    try {
      this.dishes = await this.$axios.$get("dishes/chef");
    } catch (err) {
      // this.$store.commit("setErr", err);
    }
  },
  methods: {
    save(name, image) {
      this.food.img = image;
      this.submit();
    },
    remove(name) {
      this.food.img = "";
    },
    // add(qty) {
    //   if (qty < 5 && this.qty <= 0) return;
    //   // if (qty > 0 && this.qty >= 300) {
    //   //   this.$store.commit("setErr", "Sorry! Maximum 300 qty allowed.");
    //   //   return;
    //   // }
    //   this.qty += qty;
    // },
    async submit() {
      const vm = this;
      if (!vm.food.name) {
        this.$store.commit("setErr", "Please name your dish");
        return;
      } else if (!vm.food.type) {
        this.$store.commit("setErr", "Please select Veg or Non Veg");
        return;
      } else if (!vm.food.rate || vm.food.rate < 30) {
        this.$store.commit("setErr", "Rate must be atleast 30");
        return;
      }
      try {
        this.loading = true;
        // let date = moment(this.date + " " + this.time, "YYYY-MM-DD h a");
        // if (date.diff(moment()) < 0) {
        //   console.log("Delivery time is invalid");
        //   this.$store.commit("setErr", "Delivery time is invalid");
        //   return;
        // }
        // this.food.deliveryDate = date;
        if (this.food.stock == 0) {
          await vm.publishDish();
        } else if (this.food.stock > 0) {
          this.$swal({
            title: "Are you sure to activate this dish?",
            text: "This will be available for booking by users",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Publish!"
          }).then(async result => {
            if (result.value) {
              await vm.publishDish();
            }
          });
        } else {
          this.$store.commit("setErr", "Quantity must be >= 0");
          return;
        }
      } catch (e) {
        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", e.toString());
        this.$store.commit("setErr", e.toString());
        return;
      } finally {
        this.loading = false;
      }
    },
    async publishDish() {
      let res = {};
      if (this.$route.params.id == "new") {
        try {
          res = await this.$axios.$post("foods", this.food);
          this.$router.push("/my/food/dishes");
        } catch (e) {
          this.$store.commit("setErr", e);
        }
      } else {
        // if (!this.food.active) this.food.stock = 0;
        try {
          res = await this.$axios.$put(
            "foods/" + this.$route.params.id,
            this.food
          );
          this.$router.push("/my/food/dishes");
        } catch (e) {
          this.$store.commit("setErr", e);
        }
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

