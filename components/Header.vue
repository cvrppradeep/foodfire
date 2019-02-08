<template>
  <nav
    role="navigation"
    aria-label="main navigation"
    class="Header header has-shadow is-primary"
  >
    <div class="headeralign">
      <div class="Header-brand">
        <a class="Header-item a1">
          <router-link to="/">
            <img
              class="logo"
              src="~/static/logo.png"
              alt="FoodFire"
              height="28"
            >
          </router-link>
        </a>
      </div>
      <form
        class="search"
        novalidate
        autocomplete="off"
        @submit.stop.prevent="submit()"
      >
        <input
          type="text"
          v-model="search"
          placeholder="Type here to search for groceries..."
        >
        <button
          type="submit"
          class="searchIcon"
        ><img src="/search.svg" /></button>
      </form>
      <div class="iconcenter">

        <div class="iconalign2">
          <a
            role="button"
            class="Headeritem boxbtn1"
            aria-label="menu"
            v-if="user"
            @click="go('/my')"
          >
            <img
              class="img"
              src="/person.svg"
            />
          </a>
          <a
            role="button"
            class="Headeritem boxbtn1"
            aria-label="menu"
            v-else
            @click="go('/login')"
          >
            <img
              class="img"
              src="/person.svg"
            />
          </a>
        </div>
        <div class="iconalign">
          <a
            role="button"
            class="Headeritem boxbtn"
            aria-label="menu"
            @click="go('/cart')"
          >
            <img src="/bag.svg" />
          </a>
        </div>
        <!-- <div class="iconalign">
          <a
            role="button"
            class="Headeritem boxbtn"
            aria-label="menu"
            @click="go('/my/orders')"
          >
            <img src="/orderstatus.svg" />
          </a>
        </div> -->
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { typingTimeout } from "~/config";
export default {
  data() {
    return {
      search: "",
      typingTimeout
    };
  },
  methods: {
    submit() {
      this.$router.push("/search/" + this.search);
    },
    closeSidebar() {
      this.sidebar = false;
    },
    logout() {
      this.$store.dispatch("auth/logout").then(() => {});
    },
    go(url) {
      this.$router.push(url);
    },
    ...mapActions({
      addToCart: "cart/addToCart",
      fetch: "cart/fetch"
    }),
    async checkAndAddToCart(item) {
      try {
        this.adding = true;
        await this.addToCart(item);
        this.adding = false;
      } catch (e) {
        console.log("err...", e.response.data);
      }
      this.refreshStock(); // Not required, because stock is being queried from database through addToCart... On page load stock need to be refreshed and added to items variable. Hence this is also required
    },
    async refreshStock() {
      // Each items stock is checked on page load
      try {
        this.items = await this.$axios.$post(
          `products/refresh`,
          this.cartItems
        );
      } catch (e) {
        this.items = [];
      }
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    ...mapGetters({
      cartItems: "cart/getItems",
      getQty: "cart/getQty",
      getSubtotal: "cart/getSubtotal",
      getTaxes: "cart/getTaxes",
      getShipping: "cart/getShipping",
      getTotal: "cart/getTotal",
      checkCart: "cart/checkCart",
      getTotalCount: "cart/getTotalCount",
      showCart: "cart/showCart"
    })
  },
  watch: {
    search: {
      immediate: false,
      handler(value, oldValue) {
        if (!oldValue) return; // Do not trigger on page load
        clearTimeout(this.typingTimer);
        let vm = this;
        this.typingTimer = setTimeout(function() {
          if (!value || value == "undefined") value = ""; // When clear button clicked
          vm.searchString = value;
          vm.$router.push("/search/" + value);
        }, vm.typingTimeout);
      }
    },
    "$route.params.q": {
      immediate: true,
      handler(value) {
        let pathName = null;
        if (this.$route.name) pathName = this.$route.name.substr(0, 8);
        if (pathName === "category") return;
        if (!value || value == "undefined") value = "";
        if (value == "") return;
        if (this.search == "") this.search = value;
      }
    }
  }
};
</script>
<style scoped>
.searchIcon {
  position: absolute;
  right: 0;
  top: 5px;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  border: 1px solid #fff;
  background-color: #fff;
  width: 44px;
  border-radius: 2px;
  cursor: pointer;
  padding: 4px 0 0 0;
  outline: none;
}
.searchIcon img {
  margin-right: -7px;
}
.search {
  width: 57%;
  position: relative;
}
.Header-item img {
  max-height: 2.3rem;
}
.Header-brand {
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}
.Header.has-shadow {
  box-shadow: 0 2px 0 0 #f5f5f5;
}
.Header.is-primary {
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
}
.Header {
  background-color: #fff;
  min-height: 3.25rem;
  z-index: 30;
}
.iconalign {
  display: flex;
  align-items: center;
  width: 92%;
  height: 100%;
  padding-left: 7px;
  padding-right: 14px;
}
.iconalign1 {
  display: flex;
  align-items: center;
  width: 78%;
  height: 100%;
  padding-left: 0px;
}
.iconalign2 {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-top: 1px;
}
.Header.is-primary .Header-brand > a.Header-item:hover {
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
}
img {
  height: auto;
  max-width: 100%;
}
.Header-item img {
  max-height: 1.75rem;
}
a {
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
}
.Header-menu {
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1);
  padding: 0.5rem 0;
  display: none;
}
.Header-link,
a.Header-item {
  cursor: pointer;
}
.Header-item,
.Header-link {
  color: #4a4a4a;
  display: block;
  /* line-height: 1.5; */
  padding: 0.5rem 0.75rem;
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
}
.a1 {
  display: flex;
  align-items: center;
}
.icon {
  width: 7rem;
  height: 7rem;
}
.shadow,
.profile-page .card-profile .card-profile-image img {
  -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
    0 5px 15px rgba(0, 0, 0, 0.07) !important;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.button.is-danger {
  border-color: transparent;
  color: #fff;
}
.iconcenter {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.boxbtn {
  width: 82%;
  height: 100%;
  display: flex;
  align-items: center;
}
.boxbtn1 {
  width: 67%;
  height: 100%;
  display: flex;
  align-items: center;
}
.headeralign {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 31px;
  margin-top: 3px;
}
.img {
  width: 42px;
  height: 28px;
  border-radius: 54px;
}
</style>

    