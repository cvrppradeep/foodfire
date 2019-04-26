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
            @click="go('/login?return=/')"
          >
            <img
              class="img"
              src="/person.svg"
            />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { typingTimeout } from "~/config";
export default {
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(() => {});
    },
    go(url) {
      this.$router.push(url);
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
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
  position: relative;
}
@media screen and (min-width: 600px) {
  .search {
    width: 70%;
  }
}
.header-item img {
  max-height: 2.3rem;
}
.header-logo {
      -webkit-box-align: stretch;
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
.header-item img {
  max-height: 1.75rem;
}
a {
  color: #3273dc;
  cursor: pointer;
  text-decoration: none;
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
  width: 31px;
  margin-top: 3px;
}
.img {
  width: 42px;
  height: 28px;
  border-radius: 54px;
}
</style>

    