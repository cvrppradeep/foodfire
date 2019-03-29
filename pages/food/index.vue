<template>
  <div>
    <div
      v-for="(f,ix) in foods"
      :key="ix"
    >
      <label>{{f._id.deliveryDate}}</label>
      <div
        v-for="d in f.data"
        :key="d._id"
        @click="go('/food/'+d._id)"
      >
        {{d.img}}
        {{d.name}}
        {{d.description}}
        {{d.vendor_name}}
        {{d.deliveryDate}}
        {{d.qty}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    const foods = await $axios.$get("foods/group");
    return { foods };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scope>
</style>
