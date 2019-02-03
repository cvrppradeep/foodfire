<template>
  <a class="product">
    <div class="image">
      <img
        v-lazy="'/800x800.svg'"
        alt="..."
      />
      <!-- <wish-button :variant="[]" :product="product"></wish-button> -->
    </div>
    <div>
      <p class="name ">...</p>
      <p class="price ">...</p>
    </div>
  </a>
</template>
<style scoped>
.see-other-variants {
  font-size: 12px;
  color: #999;
}
a {
  text-decoration: none;
}
.price {
  color: black;
  font-size: 1.5em;
}
.name {
  font-size: 1em;
  text-decoration: none;
}
.bestseller-badge {
  position: absolute;
  top: 0px;
  border-radius: 10px;
  background-color: #e936ef;
  color: #fff;
  font-size: 0.7em;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 80px;
  text-transform: titlecase;
  font-weight: 600;
  letter-spacing: 0.1em;
  overflow: hidden;
  height: 15px;
  -webkit-transition: all 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transition: all 0.35s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  -webkit-box-shadow: 0 2px 7px rgba(0, 0, 0, 0.48);
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.48);
}
.flex {
  display: flex;
  justify-content: center;
  text-align: center;
  /* font-size: 10px; */
}
.variants {
  display: none;
  /* position: absolute;
  bottom: -20px;
  z-index: 10000; */
}
.product-card {
  overflow: hidden;
  border-radius: 10px;
}
.product-card:hover .variants {
  display: inline !important;
}
.variants:hover {
  display: inline !important;
}
.variant-chip {
  height: 30px;
  cursor: pointer;
}
</style>


