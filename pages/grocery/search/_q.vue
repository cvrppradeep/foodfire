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
        >{{count}} products found</p>
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
      <div class="products-container only-desktop">
        <product-desktop
          v-for="(p,ix) in products"
          :key="ix"
          :class="{'border':ix!=0}"
          :product="p"
          :showcart="true"
        />
      </div>

      <div class="container only-mobile">
        <div class="productsfx head">
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
const ProductDesktop = () => import("~/components/ProductDesktop");
const Skeleton = () => import("~/components/Skeleton");

export default {
  props: ["products", "count", "loading"],
  components: { Product, ProductDesktop, Skeleton },
  data() {
    return {
      skeletonCount: 12
    };
  }
};
</script>
<style scoped>
@media screen and (min-width: 450px) {
  .products-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .products-container > section {
    align-items: center;
    display: flex;
    flex: 1 1 0;
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
    min-width: 200px;
    margin: 10px 20px;
    padding: 20px;
  }
  .products-container > section:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
    cursor: pointer;
  }
  .variants.selected {
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
  }
}
</style>
