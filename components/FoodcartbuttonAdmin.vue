<template>
  <div class="fx">
    Qty: &nbsp;
    <button
      type="button"
      class="cart-button buttonrounded "
      @click="add(-5)"
      v-if="qty>1"
    >
      <img src="/minus.svg" />
    </button>
    <span class="product-id">{{qty}}</span>
    <button
      type="button"
      class="cart-button button.is-danger buttonrounded btnplus-clr"
      @click="add(5)"
    >
      <img src="/plus.svg" />
    </button>
  </div>
</template>
<script>
export default {
  props: ["qty"],
  methods: {
    add(qty) {
      this.$emit("add", qty);
    }
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
  outline: none;
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
.fx {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-icon {
  padding-bottom: 3px;
  padding-left: 5px;
}
.addalign {
  padding-top: 4px;
}
</style>
