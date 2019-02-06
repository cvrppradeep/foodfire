<template>
  <div v-if="settings">
    <Header />
    <!-- <hero :closed="settings.closed" /> -->
    <!-- <info /> -->
    <div
      v-infinite-scroll="loadMore"
      :infinite-scroll-distance="3"
      :infinite-scroll-immediate-check="true"
    >
      <nuxt-child
        :products="products"
        :count="count"
        :showcart="true"
      />
    </div>
    <overlay :closed="settings.closed" />
    <cart-bar />
    <loading-dots :active="loading" />
  </div>
</template>
<script>
const Overlay = () => import("~/components/Overlay");
const Info = () => import("~/components/Info");
const Hero = () => import("~/components/Hero");
const CartBar = () => import("~/components/CartBar");
const Header = () => import("~/components/Header");
const LoadingDots = () => import("~/components/LoadingDots");
import {
  recordsPerScroll,
  priceRange,
  HOST,
  TITLE,
  DESCRIPTION,
  KEYWORDS
} from "~/config";
import search from "~/mixins/search.js";
import { mapMutations, mapActions } from "vuex";

export default {
  mixins: [search],
  async asyncData({ $axios, params }) {
    const settings = await $axios.$get("settings");
    let products = [],
      count = 0,
      err = null;
    try {
      const search = params.q || null,
        result = await $axios.$get("products/search/" + search, {
          params: { limit: recordsPerScroll }
        });
      products = result.data;
      count = result.count;
      return { settings: settings[0], products, count, err: null };
    } catch (e) {
      if (e && e.response && e.response.data) {
        err = e.response.data;
      } else if (e && e.response) {
        err = e.response;
      } else {
        err = e;
      }
      console.log("err...", `${err}`);
      return { settings: settings[0], products: [], count: 0, err };
    }
  },
  data() {
    return {
      closed: true
    };
  },
  watch: {
    "$route.query": {
      handler(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) return;
        this.flush();
        this.filter();
      }
    },
    "$route.params.q": {
      handler(value, oldValue) {
        if (value == oldValue) return;
        this.getAllData();
        this.flush();
        this.filter();
      }
    }
  },
  methods: {
    ...mapMutations(["setErr"]),

    error(err) {
      this.setError(err.err);
    },
    loadMore() {
      if (!this.q) {
        // When back button is pressed and landed into this page
        this.filter();
      } else {
        this.getData({ q: this.q, scrolled: true });
      }
    },
    sortNow() {
      this.flush(); // To allow http get request
      this.filter();
    },
    flush() {
      // console.log("Flush.............");
      this.meta.end = false;
      this.meta.skip = 0;
      this.meta.limit = recordsPerScroll;
      this.products = []; // Reset query parameters
    }
  },
  async created() {},
  components: { Overlay, Info, Hero, CartBar, Header, LoadingDots },
  head() {
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
          content: HOST + "/search/" + this.params
        },
        {
          name: "og_image",
          property: "og:image",
          content: HOST + "/uploads/large/email_logo-742266670944.png"
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
<style scoped>
.products {
  margin: 0 1rem;
}
</style>
