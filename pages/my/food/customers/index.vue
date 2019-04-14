<template>
  <div>
    <Header />
    <div class="heading">Customer Orders</div>
    <div>
      <ul class="p-left">
        <li
          class="card"
          v-for="(o,ix) in orders"
          :key="ix"
        >
          <h1 class="seller">{{o.address.recipient_name}} ({{o.phone}})</h1>
          <h3 class="fx customer">
            <div>{{o.rate | currency}} * {{o.qty}} = {{o.amount | currency}}</div>
            <div>QrNo: {{o.address.qrno}}</div>
          </h3>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
  async asyncData({ $axios }) {
    try {
      let orders = await $axios.$get("food-orders/my-customers");
      return { orders };
    } catch (e) {}
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
ul > li {
  list-style: none;
  margin: 10px;
  padding: 10px;
  /* border-bottom: 1px solid grey; */
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
.seller{
  font-size: 1.4rem;
}
.customer{
  padding: 1rem;
    font-size: 1.2rem;
    color: blue;
    font-weight: 500;
}
</style>

