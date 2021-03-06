<template>
  <div>
    <Header />
    <center class="title">
      <strong class="font">My Order History</strong>
    </center>
    <div
      v-infinite-scroll="loadMore"
      :infinite-scroll-distance="3"
      :infinite-scroll-immediate-check="true"
      class="products"
    >
      <div
        v-for="o in orders"
        :key="o._id"
        :title="`${o.firstName} ${o.lastName} => ${o.address.address}`"
        class="container"
      >
        <div class="card shadow-lg2">
          <div class="border">
            <div class="flex-row-nocenter flex-space-between  orderno-margin">
              <div>
                <h2>ORDER No: {{o.orderNo}}</h2>
              </div>
              <div class="date">
                <h4>Date: {{o.createdAt | ago}} </h4>
              </div>
            </div>
            <div class="fx center">
              <div class="address">Address: {{o.address.address}}, {{o.address.city}}</div>
            </div>
          </div>
          <div class="columns is-mobile border ">

            <!-- <div
              class="is-mobile"
              v-for="(i,ix) in o.items"
              :key="ix"
            > -->
            <div class="container">
              <div class="products head">
                <product
                  v-for="(p,ix) in o.items"
                  :key="ix"
                  :class="{'border':ix!=0}"
                  :product="{_id:p.pid,name:p.name,img:[p.img],slug:p.slug,variants:[{_id:p.vid,size:p.size,mrp:p.mrp,price:p.price}]}"
                  :showcart="true"
                />
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <button
        v-if="!meta.end"
        class="loadmore fx"
        @click="loadMore"
      ><img src="/down-arrow.svg" />Load More ...</button>
    </div>
    <cart-bar />
    <loading-dots />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import { currency, sorts } from "~/config";
import { mapState, mapGetters, mapActions } from "vuex";
const Product = () => import("~/components/Product");
const Header = () => import("~/components/Header");
const CartBar = () => import("~/components/CartBar");
const LoadingDots = () => import("~/components/LoadingDots");
const recordsPerScroll = 5;
export default {
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/orders");
  },
  async asyncData({ params, $axios }) {
    let orders = [],
      err = null;
    try {
      orders = await $axios.$get("orders/my", {
        params: { limit: 5, skip: 0 }
      });
      err = null;
    } catch (e) {
      orders = [];
      err = e;
    }
    return { orders, err };
  },
  data() {
    return {
      q: "",
      busy: false,
      meta: {
        skip: recordsPerScroll,
        limit: recordsPerScroll,
        sort: null, // null will honour the search result weight
        search: "",
        end: false
      }
    };
  },
  components: { Header, Product, LoadingDots, CartBar },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
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
      this.loading = true;
      try {
        this.meta.busy = true;
        if (search === "") search = null;
        let result = await this.$axios.$get("orders/my", {
          params: q
        });
        let data = result;
        this.meta.busy = false;
        this.loadmoreSpin = false;
        if (data) {
          this.meta.filtered = parseInt(data.length) + parseInt(q.skip);
          this.orders = scrolled ? this.orders.concat(data) : data;
          if (data.length >= q.limit) {
            this.meta.skip = this.meta.filtered;
            this.meta.end = false;
          } else {
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
    async loadMore() {
      this.getData({ q: this.q, scrolled: true });
    }
  }
};
</script>
<style scoped>
.products {
  margin: 10px auto;
  max-width: 450px;
}
.address {
  font-weight: 700;
  margin-left: 15px;
}
.orderno-margin {
  margin-top: 14px;
}
center {
  font-size: 23px;
  font-weight: 700;
  padding-top: 10px;
}
.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  position: relative;
}
h1 {
  font-size: 14px;
  padding-left: 10px;
  color: #3a3ac9;
  letter-spacing: 0;
}
h2 {
  font-size: 12px;
  padding-left: 10px;
  color: #1cac7b;
  margin-top: 0px;
}
h3 {
  padding-right: 10px;
  margin-top: 6px;
}
h4 {
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0;
  margin-top: 1px;
}
h5 {
  text-align: -webkit-center;
  color: gray;
  padding-top: 0px;
  /* height: 0px; */
  margin-top: 7px;
}
h6 {
  margin-top: 7px;
  padding-left: 10px;
  font-size: 13px;
}
.is-mobile.columns.is-mobile {
  display: flex;
  flex-direction: column;
  /* line-height: 1px; */
}
/* .media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
} */
.columns {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  margin-top: -0.75rem;
  padding-top: 13px;
  padding-top: 13px;
  padding-left: 0px;
  padding-right: 0px;
}
.container {
  max-width: 1366px;
  margin: 0 auto;
  padding: 0 1px;
  width: 97%;
  padding-top: 10px;
}
.date {
  padding-right: 10px;
  color: black;
}
.border {
  padding-bottom: 10px;
  border-bottom: 1px solid hsla(0, 0%, 85.9%, 0.5);
}
img {
  height: auto;
  max-width: 59px;
}
/* .align {
  display: flex;
  flex-direction: row;
  align-items: center;
} */
.font {
  font-family: sans-serif;
}
/* .item-namealign {
  padding-left: 8px;
} */
p {
  margin-top: -19px;
  padding-left: 10px;
  font-size: 13px;
}
</style>

