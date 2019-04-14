<template>
  <div>
    <Header />
    <div
      class="hero"
      @click="go('/')"
    >
      <center>
        <div class="circle">
          <h1>
            <center v-if="profile.firstName">{{profile.firstName.charAt(0)}}{{profile.lastName.charAt(0)}}</center>
          </h1>
        </div>
        <div
          class="content"
          v-if="profile"
        >
          <h2>{{profile.firstName}} {{profile.lastName}}</h2>
          <br />
          <p class="email">{{profile.phone}}</p>
        </div>
      </center>
    </div>
    <div class="links">
      <ul>
        <li>
          <img src="/profile.svg" />
          <nuxt-link to="/my/profile"> My Profile</nuxt-link>
        </li>
        <li>
          <img
            src="/fastfood.svg"
            width="25px"
          />
          <nuxt-link to="/my/food/orders"> My Food Orders</nuxt-link>
        </li>
        <li v-if="user && user.role=='chef'">
          <img src="/orders.svg" />
          <nuxt-link to="/my/food/dishes"> My Dishes</nuxt-link>
        </li>
        <li v-if="user && user.role=='chef'">
          <img src="/orders.svg" />
          <nuxt-link to="/my/food/customers"> My Customer Orders</nuxt-link>
        </li>
        <li>
          <img
            src="/car.svg"
            width="25px"
          />
          <nuxt-link to="/travel/bookings"> My Taxi Bookings</nuxt-link>
        </li>
        <!-- <li>
          <img src="/orders.svg" />
          <nuxt-link to="/my/food/orders"> Food Orders</nuxt-link>
        </li> -->
        <!-- 
        <li>
          <img src="/orders.svg" />
          <nuxt-link to="/my/grocery/orders"> Grocery Orders</nuxt-link>
        </li> -->
        <!-- <li>
          <img src="/contact.svg" />
          <nuxt-link to="/contact-us"> Contact Us</nuxt-link>
        </li>
        <li>
          <img src="/share.svg" />
          <nuxt-link to="/my/share"> Share</nuxt-link>
        </li> -->
        <li>
          <img src="/logout.svg" />
          <a @click="logout"> Logout</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user) return redirect("/login?return=/my");
  },
  async asyncData({ store }) {
    let profile = {};
    let userDetails = await store.dispatch("auth/fetch");
    profile = Object.assign({}, userDetails);
    return { profile };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    }
  },
  components: { Header },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;
    return {
      title: "My Account"
    };
  }
};
</script>

<style scoped>
.hero {
  background: linear-gradient(87deg, #6f19a2 0, #ce0683 100%) !important;
  /* background:  ; */
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
}

.links {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin: 0 auto;
}
h1 {
  font-size: 32px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
}
h2 {
  margin-bottom: -0.7rem;
  font-size: 22px;
}
.email {
  font-size: 1rem;
}
.circle {
  height: 100px;
  width: 100px;
  padding-top: 8px;
  padding-left: 3px;
  border-radius: 50%;
  border: 5px solid #b367c2;
  background-color: #fff;
  color: #6f19a2;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
}
.content {
  color: #fff;
}
ul {
  list-style: none;
}
ul > li {
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 30px;
  font-size: 20px;
  color: #6f19a2;
}
ul > li > a {
  text-decoration: none;
  font-weight: bold;
  color: #6f19a2;
  cursor: pointer;
}
ul > li > img {
  margin-right: 20px;
  /* https://codepen.io/sosuke/pen/Pjoqqp */
  filter: invert(10%) sepia(98%) saturate(4964%) hue-rotate(278deg)
    brightness(84%) contrast(92%);
}
</style>
