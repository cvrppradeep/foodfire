<template>
  <div>
    <div
      v-for="(f,ix) in foods"
      :key="ix"
    >
      <div class="datemsg"> <label>{{f._id.deliveryDate}}</label></div>
      <div class="align-row">
        <div
          class="listingcard"
          v-for="d in f.data"
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
            <div class="a-contain">
              <div class="name">
                <span class="name">{{d.name}}</span>
              </div>
              <div style="width: 30%">
                <img
                  src="veg.png"
                  class="image-size"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="listingcard">
        <div class="a-listing">
        <div class=" height">
            <img src="hero.jpeg" class="backgroundimg"/>
        </div>
        <div class="a-contain">
        <div style="margin-top: 1.2rem">
            <span class="name">Name</span>
        </div>
        <div>
            <img src="nnveg.png" class="img-size"/>
            </div>
        </div>
        </div>
    </div> -->
  </div>

  <!-- <div
      v-for="(f,ix) in foods"
      :key="ix"
    >
      <label>{{f._id.deliveryDate}}</label>
      <div
        v-for="d in f.data"
        :key="d._id"
        @click="go('/food/'+d._id)"
      >
        {{d.img}}
        {{d.name}}
        {{d.description}}
        {{d.vendor_name}}
        {{d.deliveryDate}}
        {{d.qty}}
      </div>
    </div> -->

</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");
const CartButtons = () => import("~/components/CartButtons");

export default {
  components: { Ratingcircle, CartButtons },
  async asyncData({ $axios }) {
    const foods = await $axios.$get("foods/group");
    return { foods };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scope>
.listingcard {
  height: 29vh;
border-radius: 1rem;
  background-color: rgb(247, 247, 247);
  display: flex;
  justify-content: center;
  margin: 0.2rem;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.backgroundimg {
  /* background: url('/hero.jpeg') ; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  border-radius: 1rem 1rem 0 0;
}
.height {
  width: 100%;
}
.datemsg {
  background-color: #f3f3f3;
  text-align: center;
  padding: 1rem;
}
.a-listing {
  display: flex;
  flex-direction: column;
}
.image-size {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1rem;
  margin-top: -1rem;
}
.a-contain {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}
.name {
  font-size: 1rem;
  font-weight: 500;
}
.align-row {
  display: flex;
  flex-direction: row;
}
.name {
  margin-top: 1.2rem;
  width: 70%;
  padding-left: 1rem;
}
</style>
