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
        // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", e.response);
        this.$store.commit("setErr", e.response.data);
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
