<template>
  <section>
    <div
      class="image pull-up"
      v-if="product.img && product.img[0]"
    >
      <img
        v-lazy="product.img[0].small"
        alt=""
      />
    </div>
    <h2>{{product.name}} {{selectedVariant.size}}</h2>
    <div class="fx">
      <div
        class="variants"
        :class="{'selected':selectedVariant._id==v._id}"
        v-for="(v,ix) in product.variants"
        :key="ix"
        @click="selectVariant(v)"
      >
        <strong>{{v.size}}</strong>
      </div>
    </div>
    <aside>
      <div>
        <strong>{{selectedVariant.price | currency}}</strong>
        <del>{{selectedVariant.mrp | currency}}</del>
      </div>
      <cart-buttons
        :product="{_id:product._id}"
        :variant="selectedVariant"
        :userSelectedVariant="userSelectedVariant"
        v-if="showcart"
      />
    </aside>
  </section>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
const CartButtons = () => import("~/components/CartButtons");

export default {
  props: ["product", "showcart"], // Used to hide the buttons at cart order page
  data() {
    return {
      selectedVariant: null,
      userSelectedVariant: null
    };
  },
  components: { CartButtons },
  created() {
    this.selectedVariant = this.product.variants[0];
  },
  methods: {
    ...mapActions({
      addToCart: "cart/addToCart"
    }),

    selectVariant(s) {
      this.selectedVariant = s;
      this.userSelectedVariant = s;
      this.selectedImgIndex = 0;
    }
  },
  computed: {
    ...mapState({
      shipping: state => state.shipping || {},
      totalAmount: state => state.cart.totalAmount || 0,
      cartItems: state => state.cart.items || []
    }),
    ...mapGetters({
      checkCart: "cart/checkCart",
      getQty: "cart/getQty"
    })
  }
};
</script>
<style scoped>
@media screen and (min-width: 450px) {
  h2 {
    font-size: 1rem;
  }
}
</style>
