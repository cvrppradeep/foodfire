<template>
  <div class="product">
    <div
      class="image pull-up"
      v-if="'/images'+product.img"
    >
      <img
        v-lazy="product.img"
        alt=""
      />
    </div>
    <div class="product-name">
      <strong>{{product.name}}</strong>
      <div class="fx">
        <div class="variants">
          <strong>{{product.qty}}</strong>
        </div>
      </div>
    </div>
    <div class="price">
      <div class="font-bold">{{product.price | currency}}</div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: ["product", "showcart"] // Used to hide the buttons at cart order page
};
</script>

<style scoped>
.product {
  align-items: flex-start;
  display: flex;
  text-align: left;
  padding-top: 1rem;
}
.product-name {
  flex: 1;
  margin-top: 5px;
  line-height: 1.2rem;
}
strong {
  color: #363636;
  font-weight: 700;
}
.image {
  width: 104px;
}
.image img {
  border-radius: 50px;
}
.border {
  border-top: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
.price {
  text-align: right;
  margin-top: 5px;
}
.font-bold {
  font-size: 1.5em;
  font-weight: 700;
}
.head {
  position: relative;
  left: 0;
  right: 0;
  text-align: center;
  margin-bottom: 50px;
}
</style>


