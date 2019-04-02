<template>
  <div>
    <Header />
    <div class="fx hero">
      <div
        class="section banner food blue"
        @click="go('/food')"
      >
        <img src="/food-tray.svg" />
        <h1>Food Order</h1>
        <div>Misiki Food Mela</div>
      </div>
      <div
        class="section banner travel red"
        @click="go('/travel')"
      >
        <img src="/cab.svg" />
        <h1>Book a Taxi</h1>
        <div>Misiki Taxi</div>
      </div>
    </div>
    <div
      class="fx banner yellow"
      @click="go('/food/login')"
    >
      <img
        src="/paper-plane.svg"
        style="width:20px"
      />
      <div class="abs">Join as Chef</div>
      <div>13th April' 2019</div>
    </div>
    <div
      class="fx hero-banner"
      @click="go('/food')"
    >
      <img
        v-lazy="'food-festival.png'"
        class="backgroundimg"
      />
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
  components: { Header },
  layout: "none",
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped lang="scss">
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
</style>

