 <template>
  <nav
    role="navigation"
    aria-label="main navigation"
    class="header has-shadow is-primary"
  >
    <div class="flex-space-between-header">
      <div class="header-logo">
        <a class="header-item flex-center">
          <router-link to="/">
            Misiki
            <!-- <img
              class="logo"
              src="/logo48x48.png"
              alt="Misiki"
              height="28"
            > -->
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
        >
          <img src="/search.svg" />
        </button>
      </form>
      <div class="flex-center icon-margin">
        <div class="flex-center person-logo">
          <a
            role="button"
            class="flex-center logo-size"
            aria-label="menu"
            v-if="user"
            @click="go('/my')"
          ><img
              class="img"
              src="/person.svg"
            />
          </a>
          <a
            role="button"
            class="flex-center logo-size"
            aria-label="menu"
            v-else
            @click="go('/login?return=/grocery')"
          >
            <img
              class="img"
              src="/person.svg"
            />
          </a>
        </div>
        <div class="flex-center cartbag-logo">
          <a
            role="button"
            class="flex-center "
            aria-label="menu"
            @click="go('/grocery/cart')"
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
      this.$router.push("/grocery/search/" + this.search);
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
          vm.$router.push("/grocery/search/" + value);
        }, vm.typingTimeout);
      }
    },
    "$route.params.q": {
      immediate: true,
      handler(value) {
        let pathName = null;
        // if (this.$route.name) pathName = this.$route.name.substr(0, 8);
        // if (pathName === "category") return;
        if (!value || value == "undefined") value = "";
        if (value == "") return;
        if (this.search == "") this.search = value;
      }
    }
  }
};
</script>
<style scoped>
.header-logo {
  font-size: 1.5rem;
}
.header-logo a {
  color: #fff;
}
a.header-item {
  cursor: pointer;
}
.header-item {
  position: relative;
    -webkit-box-flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0.5rem 0.75rem;
}
.header-logo {
      -webkit-box-align: stretch;
    align-items: stretch;
    display: flex;
    flex-shrink: 0;
    min-height: 3.25rem;
}
.searchIcon {
  position: absolute;
  right: 0;
  top: 2px;
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
  position: relative;
  background-color: white;
  border-radius: 0.3rem;
}
@media screen and (min-width: 600px) {
  .search {
    width: 70%;
  }
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
.cartbag-logo {
  width: 92%;
  height: 100%;
  padding-left: 3px;
  padding-right: 10px;
}
.person-logo {
  width: 100%;
  height: 100%;
  padding-left: 0px;
  padding-top: 1px;
}
.Header.is-primary .Header-logo > a.header-item:hover {
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
}
img {
  height: auto;
  max-width: 100%;
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
.icon-margin {
  margin-left: 10px;
  flex-direction: row;
}
.logo-size {
  width: 82%;
  height: 100%;
}
.flex-space-between-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
 width: 3.5rem;
    margin-top: 3px;
    margin-left: 3px;
}
.img {
  width: 42px;
  height: 28px;
  border-radius: 54px;
}
.p-top{
padding-top: 0.4rem;
}
</style>

    