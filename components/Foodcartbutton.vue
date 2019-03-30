<template>
    <div class="flex-column ">
    <!-- <div
      v-if="!checkCart({_id:product._id, vid:variant._id})"
      :disabled="!variant || variant.price<1 || variant.stock<1 || $store.state.loading"
      @click="addToBag(1);"
    >
      <button class="cart-button buttonrounded">
        <img src="/plus.svg" />
      </button>
    </div> <div v-else></div> -->
    <div>
      <div class="flex-row-nocenter">
        <button
          class="cart-button buttonrounded "
          
        >
          <img src="/minus.svg" />
        </button>
        <span class="product-id">1</span>
        <button
          class="cart-button button.is-danger buttonrounded btnplus-clr"
          
        
        >
          <img src="/plus.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    
}
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
.flex-column {
  display: flex;
  flex-direction: column;
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
