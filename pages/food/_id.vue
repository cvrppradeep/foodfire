<template>
  <div>
    <!-- <Header /> -->
    <!-- <label>{{f._id.deliveryDate}}</label> -->
    <div
      class="img-height backgroundimg"
      v-lazy:background-image="'/images'+food.img"
      alt=""
    >
    </div>
    <div class="border container">
      <div class="a-row s-b">
        <div>
          <a class="font-pink">{{food.deliveryDate | date}}</a>
        </div>
        <div>
          <span
            class="font-pink small"
            v-if="food.stock>0"
          >Only {{food.stock}} left</span>
          <span
            class="font-pink small"
            v-else
          >Sold Out</span>
        </div>
      </div>
      <div class="fontbold">
        {{food.name}}
      </div>
      
      <div>
        <div class="review">
          <div>
            <Ratingcircle :rating="avg" />
            <span
              class="p-1"
              v-if="reviews.length>0"
            >{{reviews.length}} reviews</span>
          </div>
          <div
            v-if="food.type=='V'"
            class="fx"
          >
            <img
              src="/veg.png"
              style="width:20px;height:20px;"
            /> Veg
          </div>
          <div
            v-else
            class="fx"
          >
            <img
              src="/non-veg.png"
              style="width:20px;height:20px;"
            /> Non-Veg
          </div>
        </div>
      </div>
       <div class="p-top font-pink">
            <span>By: {{food.resturant}}</span>
        </div>
    </div>
   
    <div class="amount border">
      <div>
        <span class="price">{{food.rate * qty | currency}}</span>
      </div>
      <div>
        <Foodcartbutton
          :qty="qty"
          @add="add"
        />
      </div>
    </div>
    <div>
      <div class="button-container">
        <div
          class="center"
          v-if="user.phone"
        >
          <span style="margin-top:-10px"> QrNo: &nbsp; </span><input
            class="input"
            style="max-width:100px;margin-bottom:0.5rem"
            v-model="address"
            placeholder="Your QrNo"
          />
        </div>
        <button
          class="button-lg blue"
          v-if="user.phone"
          :disabled="food.stock<=0"
          @click="order(food)"
        > <span  v-if="user.phone"
          :disabled="food.stock<=0">Sold Out</span>
          <span v-else>Place Order</span>
          <span><img 
              class="img-style"
              src='/backarrow.svg'
            /></span>
        </button>
        <button
          v-else
          :disabled="food.stock<=0"
          class="button-lg blue"
          @click="go('/login?return=/food/'+$route.params.id)"
        >
          <span>Login To order</span>
          <span><img
              class="img-style"
              src='/backarrow.svg'
            /></span>
        </button>
      </div>
    </div>
    <!-- <div class="card" >
      <div class="a-row">
      <div>
<img class="img-size" src='/eagle.png'/>
      </div>
      <div class="p-1">
        <div class="instagold">
  <span>{{food.vendor_name}}</span>
        </div>
        <div class="f-weightforcode">gghgh</div>
      </div>
      </div>
      <div>
   <img class="" src='/rightarrow-1.svg'/>
</div>
</div> -->
    <div class="fx">
      <h3>Reviews</h3>
      <h3 style="padding-right:1rem">
        <nuxt-link :to="'/food/reviews/'
          +food._id">Rate Now</nuxt-link>
      </h3>
    </div>
    <div
      class="card"
      v-for="r in reviews"
      :key="r._id"
    >
      <div class="a-row">
        <div>
          <img
            class="img-size"
            src='/personlogo.png'
          />
        </div>
        <div>
          <div class="instagold">
            <span>
              <Ratingcircle :rating="r.rating" /></span>
          </div>
          <div class="f-weightforcode">{{r.firstName}} {{r.lastName}}</div>
          <span class="span-msg">{{r.message}}</span>
        </div>
      </div>
    </div>
    <!-- <div style="padding: 1rem;">
        <div class="a-column">
          <div style="padding-bottom: 1rem;"> <input class="input"/></div>
          <button
            type="submit"
            class="big-button blue"
          ><span>Submit</span>
          </button>
        </div>
      </div> -->

  </div>
</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");
const Foodcartbutton = () => import("~/components/Foodcartbutton");
const Header = () => import("~/components/HeaderFood");
export default {
  components: { Ratingcircle, Foodcartbutton, Header },
  async asyncData({ $axios, route }) {
    let address = "";
    const food = await $axios.$get("foods/" + route.params.id);
    try {
      let user = await $axios.$get("users/me");
      if (user && user.address) {
        address = user.address.qrno;
      }
    } catch (e) {}
    return { qty: 1, food, address };
  },
  data() {
    return {
      qty: 1,
      reviews: [],
      total: 0,
      avg: 0
    };
  },
  async created() {
    this.reviews = await this.$axios.$get(
      "reviews/product/" + this.$route.params.id
    );
    let total = 0;
    for (let r of this.reviews) {
      total += r.rating;
    }
    const avg = Math.round((total / this.reviews.length) * 10) / 10;
    this.total = total;
    this.avg = avg;
  },
  methods: {
    add(qty) {
      if (qty < 1 && this.qty <= 1) return;
      if (qty > 0 && this.qty > 2) {
        this.$store.commit("setErr", "Sorry! Maximum 3 qty allowed.");
        return;
      }
      this.qty += qty;
    },
    go(url) {
      this.$router.push(url);
    },
    async order(food) {
      if (!this.address) {
        this.$store.commit("setErr", "Please enter QrNo");
        return;
      }
      this.$swal({
        title: "Are you sure?",
        text: "Order once placed can not be cancelled!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Place Order!"
      }).then(async result => {
        if (result.value) {
          try {
            let order = await this.$axios.$post("food-orders", {
              pid: food._id,
              qty: this.qty,
              address: { qrno: this.address }
            });
            this.$router.push("/food/success?id=" + order._id);
          } catch (e) {
            if (e.response.status == 401) this.$router.push("/login");
            this.$store.commit("setErr", e.response.data);
          }
        }
      });
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || {};
    }
  }
};
</script>

<style scoped>
.small {
  font-size: 0.6rem;
}
h3 {
  font-size: 1.2rem;
  padding-left: 1rem;
  padding-top: 1rem;
  color: grey;
}
.container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.backgroundimg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.175) !important;
  /* border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px; */
}
.img-height {
  height: 30vh;
  width: 100%;
}
.font-pink {
  color: rgb(255, 0, 104);
  font-weight: 700;
  margin-left: 0.2rem;
  letter-spacing: 1px;
}
.fontbold {
  font-weight: 700;
  font-size: 2rem;
  padding-top: 9px;
}
.address {
  font-size: 15px;
  font-weight: 500;
  color: grey;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
}
.review {
  color: grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding-top: 1rem;
}
.amount {
  display: flex;
  flex-direction: row;
  height: 3rem;
  justify-content: space-around;
  align-items: center;
}
.p-6 {
  padding-right: 0.5rem;
}
.a-row {
  display: flex;
  flex-direction: row;
}
.a-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
}
.p-1 {
  padding-left: 2rem;
}
.m-1 {
  margin-top: -0.5rem;
  font-size: 1.3rem;
}
.border {
  border-bottom: 1px solid hsla(0, 12%, 82%, 0.34);
}
.button-container {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
}

.card {
  padding: 1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: space-between;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  margin-top: 0.5rem;
  flex-direction: row;
  align-items: center;
}
.img-size {
 width: 3rem;
    height: 3rem;
  border: 1px solid #999;
  border-radius: 50%;
  margin-right: 1rem;
}
.instagold {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}
.f-weightforcode {
  font-weight: 900;
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  /* width: 79px; */
}
.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #555;
}
.s-b {
  justify-content: space-between;
}
.fx {
  display: flex;
  align-items: center;
}
.input {
  border: 1px solid #187de0;
  padding: 0.8rem 1rem;
  border-radius: 30px;
  outline: none;
}
.big-button {
  text-transform: none;
  text-transform: initial;
  color: #fff;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
}

.span-msg {
  color: grey;
  font-weight: 500;
  font-size: 0.8rem;
}
.p-top{
  padding-top: 1rem;
}

</style>
