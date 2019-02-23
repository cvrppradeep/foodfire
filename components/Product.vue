<template>
  <div class="product">
    <div
      class="image pull-up"
      v-if="product.img && product.img[0]"
    >
      <img
        v-lazy="product.img[0].small"
        alt=""
      />
    </div>
    <div class="product-name">
      <strong>{{product.name}} {{selectedVariant.size}}</strong>
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
    </div>
    <div class="price">
      <div class="font-bold">{{selectedVariant.price | currency}}</div>
      <cart-buttons
        :product="{_id:product._id}"
        :variant="selectedVariant"
        :userSelectedVariant="userSelectedVariant"
        v-if="showcart"
      />
    </div>
  </div>
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


