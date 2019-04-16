<template>
  <div>
    <Header />
    <div class="heading">Today's Delivery</div>
    <a href="/api/food-orders/export/500">Export</a>
    <div>
      <ul class="p-left">
        <li
          class="card"
          v-for="(o,ix) in orders"
          :key="ix"
        >
          <div class="font">
            <h1 class="seller">{{o._id.restaurant}} - {{o._id.phone}}</h1>
          </div>
          <div
            v-for="(i,ixx) in o.data"
            :key="'i-'+ixx"
            @click="go('/my/food/delivery/'+i._id)"
            class="fx customer"
          >
            <div style="color:#333">{{i.item}}</div>
            <div>{{i.name}} ({{i.phone}})</div>
            <div>{{i.qty}} * {{i.rate | currency}} = {{i.amount | currency}}</div>
            <div style="color:red">{{i.qrno}}</div>
          </div>
        </li>
      </ul>
    </div>
    <nuxt-link
      to="/my/food/delivery/old/"
      class="history-button"
    >Old Delivery</nuxt-link>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
  async asyncData({ $axios }) {
    let orders = [];
    try {
      orders = await $axios.$get("food-orders/group");
    } catch (e) {}
    return { orders };
  },
  components: { Header },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 0px 0px 10px 0px;
}
li .customer {
  border-bottom: 1px solid #ccc;
}
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
}
.card {
  padding: 1rem;
  margin: 1rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.5rem;
}
.p-left {
  padding-left: 0px;
}
.font {
  padding-left: 1rem;
}
.seller {
  font-size: 1.4rem;
}
.customer {
  padding: 1rem;
  font-size: 1.2rem;
  color: blue;
  font-weight: 500;
}
</style>

