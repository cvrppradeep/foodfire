<template>
  <div>
    <footer
      class="footer"
      v-if="getTotalCount!=0"
    >
      <nav class="header has-shadow is-primary">
        <div class="flex-center flex-space-between color shadow">
          <div style="padding-left: 13px;">
            <span>
              {{getTotalCount}} item<span v-if="getTotalCount>1">s</span> | {{getTotal | currency}}
            </span>
          </div>
          <div class="header-viewcart">
            <router-link
              class="items flex-center color "
              to="/grocery/cart"
            >
              <div class="flex-center">
                <div class="cart-icon">
                  <img src="/carticon.svg" />
                </div>
                <div>
                  VIEW CART
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </nav>
    </footer>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    ...mapGetters({
      getTotalCount: "cart/getTotalCount",
      getTotal: "cart/getTotal"
    })
  }
};
</script>
<style scoped>
.header-viewcart {
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}
.header.has-shadow {
  box-shadow: 0 2px 0 0 #f5f5f5;
}
.header.is-primary {
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
}
.header {
  background-color: #fff;
  min-height: 3.25rem;
  z-index: 30;
}
.header.is-primary .header-viewcart > a.items:hover {
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
}
img {
  height: auto;
  max-width: 100%;
}
a {
  /* color: #3273dc; */
  cursor: pointer;
  text-decoration: none;
}
.items {
  color: #4a4a4a;
  display: block;
  line-height: 1.5;
  padding: 0.5rem 0.75rem;
  flex-grow: 0;
  flex-shrink: 0;
}
.hero.is-primary .subtitle {
  color: hsla(0, 0%, 100%, 0.9);
}
.title:not(.is-spaced) + .subtitle {
  margin-top: -1.25rem;
}
article,
aside,
figure,
footer,
header,
hgroup {
  display: block;
}
profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
/* .imgsize {
  width: 128px;
  height: 90px;
  margin-left: -20px;
} */
.shadow,
.profile-page .card-profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.color {
  color: white;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
}
.cart-icon {
  padding-right: 6px;
  margin-top: 5px;
}
</style>
