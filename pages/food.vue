<template>
  <div>
    <div
      v-for="(f,ix) in foods"
      :key="ix"
    >
      <label>{{f}}</label>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const foods = await $axios.$get("foods/group");
    return { foods };
  }
};
</script>

<style scope>
</style>
