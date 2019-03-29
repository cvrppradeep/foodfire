<template>
  <div>
    {{food.img}}
    {{food.name}}
    {{food.description}}
    {{food.vendor_name}}
    {{food.deliveryDate | date}}
    {{food.rate}}
    {{food.qty}}
    <input v-model="address" />
    <input v-model="qty" />
    <button
      @click="order(food)"
      placeholder="QrNo"
    >Order Now</button>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const food = await $axios.$get("foods/" + route.params.id);
    let user = await $axios.$get("users/me");
    return { qty: 1, food, address: user.address.qrno };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    async order(food) {
      try {
        let order = await this.$axios.$post("food-orders", {
          pid: food._id,
          qty: this.qty,
          address: { qrno: this.address }
        });
      } catch (e) {
        if (e.response.status == 401) this.$router.push("/food/login");
      }
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || {};
    }
  }
};
</script>

<style scope>
</style>
