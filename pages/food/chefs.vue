<template>
  <div>
    <Header />
    <div class="heading">Registered Chefs</div>
    <div class="card">
      <ul>
        <li
          v-for="c in chefs"
          :key="c._id"
        >{{c.restaurant}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");

export default {
  components: {
    Header
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
  border-bottom: 1px solid grey;
}
</style>

