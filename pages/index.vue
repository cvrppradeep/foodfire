<template>
  <div>
    <Header />
    <div class="fx hero">
      <nuxt-link
        class="section banner food blue"
        to="/food"
      >
        <img src="/food-tray.svg" />
        <h1>Food Order</h1>
        <div>Misiki Food Mela</div>
      </nuxt-link>
      <nuxt-link
        class="section banner travel red"
        to="/travel"
      >
        <img src="/cab.svg" />
        <h1>Book a Taxi</h1>
        <div>Misiki Taxi</div>
      </nuxt-link>
    </div>
    <div class="fx hero">
      <nuxt-link
        class="fx green banner"
        to="/food/chefs"
      >
        <img
          src="/chef.png"
          style="width:30px"
        />
        <div class="abs">Registered Chefs.</div>
      </nuxt-link>
      <nuxt-link
        class="fx blue banner"
        to="/food/chef"
      >
        <img
          src="/chef.png"
          style="width:30px"
        />
        <div class="abs">Join as Chef.</div>
      </nuxt-link>
    </div>
    <Notification/>
    <!-- <nuxt-link
      class="fx banner yellow"
      to="/food"
    >
      <img
        src="/cycle.svg"
        style="width:30px;"
      />
      <div class="abs">Food delivery only to Sunabeda Township.</div>
    </nuxt-link> -->
    <!-- <div class="fx hero">
      <nuxt-link
        class="section banner groceries blue"
        to="/grocery"
      >
        <img src="/cab.svg" />
        <h1>Groceries</h1>
        <div>Get Delivered at home</div>
      </nuxt-link>
    </div> -->
    <div
      class="fx hero-banner"
      @click="go('/food/steps')"
    >
      <img
        v-lazy="'food-mela.jpg'"
        class="backgroundimg"
      />
    </div>
    <nuxt-link
      class="fx banner yellow"
      to="/food/steps"
    >
      <img
        src="/paper-plane.svg"
        style="width:20px"
      />
      <div class="abs">Know more about Food Festival...???</div>
      <!-- <div>14th April' 2019</div> -->
    </nuxt-link>
    <div class="footer">
      <nuxt-link to="/food/terms">Food Mela Terms</nuxt-link>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
const Notification = () => import("~/components/Notification");
export default {
  components: { Header, Notification },
  layout: "none",
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped lang="scss">
.footer {
  position: relative;
  margin-top: 20px;
  padding: 20px;
}
.section {
  font-size: 0.75rem;
  font-weight: 700;

  h1 {
    margin-top: 5px;
  }
  img {
    width: 30px;
  }
  div {
    margin-top: 5px;
    margin-left: 0px;
    font-size: 0.9rem;
    font-weight: 300;
  }
}
.hero-banner {
  flex: 1;
  padding: 1rem;
  border-radius: 3px;
  width: 100%;
}
// .narrow-banner {
//   padding: 1rem;
//   border-radius: 3px;
//   width: 100%;
//   margin: 10px;
// }
.banner .abs {
  color: #fff;
}
</style>

