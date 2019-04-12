<template>
  <div>
    <Header />
    <div class="heading">Registered Chefs</div>
    <div>
      <div
        class="fx"
        style="justify-content:center"
      >
        <nuxt-link
          to="/food/chef"
          class="button-lg blue"
          style="width:300px;height:3rem"
        > Register as Chef</nuxt-link>
        <!-- <nuxt-link to="/food/steps">Steps</nuxt-link> -->
      </div>
      <ul class="p-left">
        <li
          class="card"
          v-for="c in chefs"
          :key="c._id"
        >
          <div class="font">
            <h1>{{c.restaurant}}</h1>
            <Ratingcircle :rating="c.avg_rating" /><br /><br />
          </div>
          <v-chip
            v-if="c.dish1"
            class="red"
            text-color="white"
          >{{c.dish1}}</v-chip>
          <v-chip
            v-if="c.dish2"
            color="blue"
            text-color="white"
          >{{c.dish2}}</v-chip>
          <v-chip
            v-if="c.dish3"
            color="green"
            text-color="white"
          >{{c.dish3}}</v-chip>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
const Ratingcircle = () => import("~/components/Ratingcircle");

export default {
  components: {
    Header,
    Ratingcircle
  },
  async asyncData({ $axios }) {
    let chefs = null;
    try {
      let chefs = await $axios.$get("users/chefs");
      return { chefs };
    } catch (e) {}
  }
};
</script>
<style scoped>
h1 {
  margin: 20px 0;
}
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  /* border-bottom: 1px solid grey; */
}
.card {
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.5rem;
}
.p-left {
  padding-left: 0px;
}
.font {
  padding-left: 1rem;
}
</style>

