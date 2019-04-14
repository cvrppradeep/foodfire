<template>
  <div>
    <HeaderFood />
    <v-layout
      row
      justify-center
    >
      <!-- <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Live on Apr 14th, 2019</v-card-title>
          <v-card-text>Please visit back Tomorrow Morning</v-card-text>
        </v-card>
      </v-dialog> -->
    </v-layout>
    <div>
      <div class="heading">Food Orders <span class="time">Live Now</span></div>
      <div class="align-row">
        <div
          class="product-card"
          v-for="d in foods"
          :key="d._id"
          @click="go('/food/'+d._id)"
        >
          <div class="a-listing">
            <div class="height ">
              <img
                v-lazy="'/images'+d.img"
                class="backgroundimg"
              />
            </div>
            <div class="card-container">
              <div class="a-contain">
                <div
                  class="f-pink"
                  v-if="d.stock>0"
                > Only {{d.stock}} left</div>
                <div
                  class="f-pink"
                  v-else
                > Sold out </div>
                <img
                  v-if="d.type=='N'"
                  src="non-veg.png"
                  class="image-size"
                />
                <img
                  v-else
                  src="veg.png"
                  class="image-size"
                />
              </div>
              <div class="p-name">{{d.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");
const CartButtons = () => import("~/components/CartButtons");
const HeaderFood = () => import("~/components/HeaderFood");
export default {
  components: { Ratingcircle, CartButtons, HeaderFood },
  async asyncData({ $axios }) {
    const foods = await $axios.$get("foods/group");
    return { foods };
  },
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
.product-card {
  display: flex;
  background-color: rgb(247, 247, 247);
  justify-content: center;
  border-radius: 0.2rem;
  margin: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  width: calc(50% - 1rem);
}
@media (min-width: 650px) {
  .product-card {
    width: calc(25% - 1rem);
  }
}
@media (min-width: 1000px) {
  .product-card {
    width: calc(20% - 1rem);
  }
}
.backgroundimg {
  border-radius: 0.3rem 0.3rem 0 0;
  min-height: 126px;
  /* box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important; */
}

.a-listing {
  display: flex;
  flex-direction: column;
}
.image-size {
  width: 1.5rem;
  height: 1.5rem;
}
.a-contain {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.p-name {
  font-size: 0.8rem;
  line-height: 1rem;
}
.align-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
/* @media (min-width:300px) and (max-width:800px ) {
     .align-row{
        display: flex;
    flex-direction: row;
    } 
    } */
.name {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.f-pink {
  color: rgb(255, 0, 104);
  font-size: 0.9rem;
  letter-spacing: 1px;
}
.card-container {
  padding: 0.4rem;
}
.time {
  font-size: 0.8rem;
  color: #eee;
}
.v-dialog__content {
  background: rgba(0, 0, 0, 0.6);
}
</style>
