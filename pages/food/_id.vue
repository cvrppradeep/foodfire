<template>
  <div>
    {{food.img[0]}}
    {{food.name}}
    {{food.description}}
    {{food.vendor_name}}
    {{food.deliveryDate | date}}
    {{food.qty}}
    <button @click="order(food)">Order Now</button>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, route }) {
    const food = await $axios.$get("foods/" + route.params.id);
    return { food };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    async order(food) {
      try {
        let order = await this.$axios.$post("food-orders", {
          img: food.img[0],
          name: food.name,
          description: food.description,
          vendor_name: food.vendor_name,
          vendor_email: food.vendor_email,
          vendor_phone: food.vendor_phone,
          vendor_id: food.vendor_id,
          deliveryDate: food.deliveryDate,
          qty: food.qty
        });
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", order);
      } catch (e) {}
    }
  }
};
</script>

<style scope>
</style>
