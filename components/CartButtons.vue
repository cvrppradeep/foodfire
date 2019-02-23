<template>
  <div class="flex-column align-top">
    <div
      v-if="!checkCart({_id:product._id, vid:variant._id})"
      :disabled="!variant || variant.price<1 || variant.stock<1 || $store.state.loading"
      @click="addToBag(1);"
    >
      <button class="cart-button buttonrounded">
        <img src="/plus.svg" />
      </button>
    </div>
    <div v-else>
      <div class="flex-row-nocenter">
        <button
          class="cart-button buttonrounded "
          @click="addToBag(-1)"
        >
          <img src="/minus.svg" />
        </button>
        <span class="product-id">{{getQty({_id:product._id, vid:variant._id})}}</span>
        <button
          class="cart-button button.is-danger buttonrounded btnplus-clr"
          :disabled="!variant || variant.price<1 || variant.stock<1 || $store.state.loading"
          @click="addToBag(1)"
        >
          <img src="/plus.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  props: ["product", "variant"],
  methods: {
    ...mapActions({ addToCart: "cart/addToCart" }),
    addToBag(qty) {
      if (!this.variant) this.$store.commit("setErr", "Please select a size");
      else
        this.addToCart({ pid: this.product._id, vid: this.variant._id, qty });
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
      checkviewdetails: "viewdetails/checkviewdetails",
      getQty: "cart/getQty"
    })
  }
};
</script>
<style>
.product-id {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.buttonrounded {
  border-radius: 50px;
  width: 33px;
}
.cart-button {
  border: 1px solid transparent;
  border-width: 1px;
  color: #32325d;
  cursor: pointer;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  background: #f5f5f5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.23);
}
.cart-button.is-danger {
  border-color: transparent;
  color: #fff;
}
.cart-button:hover {
  background: #ffdd57;
}
.btnplus-clr {
  background: #ffdd57;
}
.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.align-top {
  padding-top: 10px;
}
.cart-icon {
  padding-bottom: 3px;
  padding-left: 5px;
}
.addalign {
  padding-top: 4px;
}
</style>

