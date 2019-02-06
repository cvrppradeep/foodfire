<template>
  <div>
    <ul>
      <li>
        <nuxt-link to="/my/orders"> My Orders</nuxt-link>
      </li>
      <!-- <li>My Wishlist</li>
      <li>Help</li> -->
      <li><a @click="logout"> Logout </a> </li>
    </ul>
  </div>
</template>
<script>
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user) return redirect("/login?return=my");
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>

