import {
  recordsPerScroll,
  currency,
  sorts,
} from "~/config";
export default {
  data() {
    return {
      showFilters: false,
      filtersButtonsFixed: false,
      selectedFilters: {},
      fl: {},
      sorts,
      loadingPrice: true,
      brands: [],
      features: [],
      currency,
      q: "",
      skip: recordsPerScroll,
      busy: false,
      loading: false, // To remove flash of product not found message
      loadingWishlist: false,
      initialSpin: false,
      loadmoreSpin: false,
      sub_filter: false,
      filterSidebar: false,
      meta: {
        skip: 0,
        limit: recordsPerScroll,
        sort: null, // null will honour the search result weight
        search: "",
        end: false
      },
      products: [],
      all: {
        brands: [],
        colors: [],
        categories: [],
        sizes: [],
        price: [],
        sort: {},
        features: { Type: [], Fit: [], Fabric: [], Neck: [], Color: [] }
      },
      skeletonProducts: [
        { name: "..." },
        { name: "..." },
        { name: "..." },
        { name: "..." }
      ],
      count: 0,
      wishlist: []
    }
  },
  methods: {
    changed(val) {
      // Not fired on page load. Only fired when selection changes
      this.fl[val.model] = val.checked;
      let url = "";
      let i = 0;
      for (let f in this.fl) {
        if (this.fl[f]) {
          let el = this.fl[f];
          if (el && el.length > 0) {
            if (i == 0) {
              url += f == "sort" ? "?sort=" + el : "?" + f + "=" + el.join(",");
            } else {
              url += f == "sort" ? "&sort=" + el : "&" + f + "=" + el.join(",");
            }
            i++;
          }
        }
      }
      this.$router.push(url);
    },
    // checkCategory() {},
    go(slug) {
      this.$router.push("/c/" + slug);
    },
    filterRemoved(filter, name, data, multiple) {
      // if (name == "price") {
      //   let list = this.$route.query[name];
      // } else {
      let list = this.$route.query[name].split(",");
      // }
      list.splice(list.indexOf(filter), 1);
      let mappedList = list.map(b => {
        return b;
      });
      this.fl[name] = mappedList;
      this.changed({ model: name, checked: mappedList });
    },

    clearAllFilters() {
      this.fl = {
        // brands: [],
        // categories: [],
        // colors: [],
        // sizes: [],
        // price: priceRange,
        // sort: null,
        // features: { Type: [], Fit: [], Fabric: [], Neck: [], colors: [] }
      };
    },
    async getData({ q, scrolled }) {
      q = q || {};
      if (this.meta.busy || this.meta.end) return;
      q.limit = this.meta.limit || recordsPerScroll || 0;
      q.skip = this.meta.skip || 0;
      let search = this.$route.params.q || null;
      if (scrolled) {
        this.loadmoreSpin = true;
        this.meta.skip = parseInt(q.skip) + parseInt(q.limit);
      }
      q.type = this.meta.type || {};
      this.loading = true;
      try {
        this.meta.busy = true;
        // let result = await this.$axios.$get("products/public", { params: q });
        if (search === "") search = null;
        let result = await this.$axios.$get("products/search/" + search, {
          params: q
        });
        let data = result.data;
        this.count = result.count;
        this.meta.busy = false;
        this.loadmoreSpin = false;
        if (data) {
          this.mergeToWishlist(data, this.wishlist);
          this.meta.filtered = parseInt(data.length) + parseInt(q.skip);
          this.products = scrolled ? this.products.concat(data) : data;
          if (data.length >= q.limit) {
            this.meta.skip = this.meta.filtered;
            this.meta.end = false;
          } else {
            // When 8 records requested but received < 8 means we reached end of query
            this.meta.end = true;
          }
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
      } finally {
        this.loading = false;
      }
    },
    async mergeToWishlist(products, wishlist) {
      try {
        // Merge wishlist items into products search result
        // let wishlist = await this.$axios.$get("wishlists/my"); // Removed from here and added into page load
        if (wishlist.length > 0) {
          products.map(p => {
            for (const w of wishlist) {
              if (
                p._id == w.product._id &&
                p.variants[0]._id == w.variant._id
              ) {
                p.wished = true;
              }
            }
          });
        }
      } catch (e) { }
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
    },
    filter(q = {}, scrolled) {
      // let prices = this.$route.query.price;
      // let sort = this.$route.query.sort;
      let f = [],
        Ids = null;
      this.fl["sort"] = null; // Required: else the sort radio text removes: when no sort value
      for (let i in this.$route.query) {
        Ids = this.$route.query[i];
        if (Ids && Ids.split(",").length > 0 && i != 1) {
          if (i == "sort") {
            this.fl[i] = Ids; // Required: else the sort radio text removes: when sort value
          } else {
            this.fl[i] = Ids.split(",");
          }
          if (i == "brands") {
            f.push({ brandNameName: { $in: Ids.split(",") } });
          } else if (i == "categories") {
            f.push({ "categories.slug": { $in: Ids.split(",") } });
          } else if (i == "sizes") {
            f.push({ "variants.size": { $in: Ids.split(",") } });
          } else if (i == "price") {
            f.push({
              "variants.price": {
                $gt: Ids.split(",")[0],
                $lt: Ids.split(",")[1]
              }
            });
          } else if (i == "sort") {
            q.sort = Ids;
          } else {
            f.push({
              "features.key": i,
              "features.val": { $in: Ids.split(",") }
            });
          }
        }
      }

      if (f.length > 0) {
        q.where = { $and: f };
      } else {
        q.where = {};
      }
      this.q = q; // Save for later so that loadmore can take its advantage
      this.getData({ q, scrolled });
    },
    async getAllData() {
      // console.log("getAllData..................");
      try {
        // this.loading = true;
        this.all.brands = await this.$axios.$get(
          "brands/filtered/" + this.$route.params.q
        );
        // this.all.colors = await this.$axios.$get("colors/filtered");
        this.all.sizes = await this.$axios.$get(
          "sizes/filtered/" + this.$route.params.q
        );
        const features = await this.$axios.$get(
          "products/features2/" + this.$route.params.q
        );
        // this.all.categories = await this.$axios.$get("categories/filtered");
        this.features = features;
        // this.features = await this.$axios.$get("features", {
        //   params: {
        //     where: {
        //       isFilter: true,
        //       $or: [
        //         { "categories.slug": this.c },
        //         { "categories.0": { $exists: false } }
        //       ]
        //     }
        //   }
        // });
        // this.loading = false;
      } catch (e) {
        // this.loading = false;
      } finally {
        // this.loading = false;
      }
    },
    getFL() {
      // this.searchParam = this.$route.query.q;
      // this.searchParam
      //   ? this.searchProducts(this.searchParam)
      //   : this.checkCategory(); // Required on keyup for search
      // if (this.$route.query.brands) {
      //   // If brands parameter is present, split from comma and return brands with matching slug
      //   let brands = this.$route.query.brands.split(",").map(b => {
      //     return { slug: b };
      //   });
      //   this.fl.brands = brands;
      // }
      // if (this.$route.params.c) {
      //   let categories = this.$route.params.c
      //     .replace(/[^a-zA-Z0-9- ]/g, "")
      //     .split(",")
      //     .map(b => {
      //       return { slug: b };
      //     });
      //   this.fl.categories = categories;
      // } else if (this.$route.query.categories) {
      //   let categories = this.$route.query.categories.split(",").map(b => {
      //     return { slug: b };
      //   });
      //   this.fl.categories = categories;
      // }
      // if (this.$route.query.colors) {
      //   let colors = this.$route.query.colors.split(",").map(b => {
      //     return { name: b };
      //   });
      //   this.fl.colors = colors;
      // }
      // if (this.$route.query.sizes) {
      //   let sizes = this.$route.query.sizes.split(",").map(b => {
      //     return { name: b };
      //   });
      //   this.fl.sizes = sizes;
      // }
      // if (this.$route.query.price) {
      //   this.fl.price = this.$route.query.price.split(",");
      // }
      // if (this.$route.query.sort) {
      //   this.fl.sort = this.$route.query.sort;
      // }
    },
    async getWishlist() {
      let user = (this.$store.state.auth || {}).user || null;
      if (user) {
        try {
          let auth = this.$cookies.get("Authorization");
          this.$axios.setToken(auth, "Bearer");
          this.wishlist = await this.$axios.$get("wishlists/my");
        } catch (e) { }
      } else {
      }
    }
  }
}