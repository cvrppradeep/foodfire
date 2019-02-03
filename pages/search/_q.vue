<template>
  <div>
    <section class="count">
      <div class="container">
        <div
          v-if="loading"
          class="center"
        ><img
            src="/loading.svg"
            alt="loading ..."
          /></div>
        <p
          class="center"
          v-if="count && !loading"
        >{{count}} product found</p>
      </div>
    </section>

    <section
      v-if="count===0 && !loading"
      class="products"
    >
      <div class="container">
        {{$route.params.q}} product not found
      </div>
    </section>

    <section
      v-else
      class="products"
    >
      <div class="container">
        <div class="products head">
          <product
            v-for="(p,ix) in products"
            :key="ix"
            :class="{'border':ix!=0}"
            :product="p"
            :showcart="true"
          />
        </div>
      </div>
      <div
        class="container"
        v-if="loading"
      >
        <skeleton
          v-for="(p,ix) in skeletonCount"
          :key="ix+'-1'"
        ></skeleton>
      </div>
    </section>
  </div>
</template>
<script>
const Product = () => import("~/components/Product");
const Skeleton = () => import("~/components/Skeleton");

export default {
  props: ["products", "count", "loading"],
  components: { Product, Skeleton },
  data() {
    return {
      skeletonCount: 12
    };
  }
};
</script>
