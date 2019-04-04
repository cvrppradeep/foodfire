<template>
  <div v-if="settings">
    <Header />
    <!-- <hero :closed="settings.closed" /> -->
    <!-- <info /> -->
    <featured-categories
      :categories="categories"
      class="only-mobile"
    />
    <featured-categories-desktop
      :categories="categories"
      class="only-desktop"
    />

    <overlay :closed="settings.closed" />
    <cart-bar />
  </div>
</template>
<script>
const Overlay = () => import("~/components/Overlay");
const Info = () => import("~/components/Info");
const CartBar = () => import("~/components/CartBar");
const Header = () => import("~/components/Header");
const FeaturedCategories = () => import("~/components/FeaturedCategories");
const FeaturedCategoriesDesktop = () =>
  import("~/components/FeaturedCategoriesDesktop");
import {
  recordsPerScroll,
  currency,
  sorts,
  priceRange,
  TITLE,
  DESCRIPTION,
  KEYWORDS
} from "~/config";
import { mapMutations, mapActions } from "vuex";

export default {
  async asyncData({ $axios }) {
    let categories = [],
      settings = {},
      err = null;
    try {
      categories = await $axios.$get("categories/featured");
      settings = await $axios.$get("settings");
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data;
      } else if (e && e.response) {
        err = e.response;
      } else {
        err = e;
      }
      console.log("err...", `${err}`);
    }
    return { categories, settings: settings[0], err };
  },
  data() {
    return {
      closed: true
    };
  },

  async created() {},
  components: {
    Overlay,
    Info,
    CartBar,
    Header,
    FeaturedCategories,
    FeaturedCategoriesDesktop
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;
    return {
      title: this.title || TITLE,
      meta: [
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content: this.description || DESCRIPTION
        },
        {
          hid: "keywords",
          name: "Keywords",
          property: "keywords",
          content: this.keywords || KEYWORDS
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: this.title || TITLE
        },
        // Google+ / Schema.org
        {
          name: "og_url",
          property: "og:url",
          content: host + "/grocery/search/" + this.params
        },
        {
          name: "og_image",
          property: "og:image",
          content: host + "/uploads/large/email_logo-742266670944.png"
        },
        // Twitter
        {
          name: "twitter:title",
          content: this.title || TITLE
        },
        {
          name: "twitter:description",
          content: this.description || DESCRIPTION
        }
      ]
    };
  }
};
</script>
<style>
</style>
