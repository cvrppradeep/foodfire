<template>
  <div>
    <Header />
    <div class="heading">My Dishes </div>
    <div class="container fx center">
      <button
        class="button-lg blue"
        style="margin-bottom:20px"
        @click="go('/my/food/dishes/new')"
      >Add New</button>
      <div class="align-row">
        <div
          v-for="d in foods"
          :key="d._id"
          @click="go('/food/'+d._id)"
          class="listingcard"
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
                  class="pinky"
                  v-if="d.stock>0"
                >Only {{d.stock}} left</div>
                <div
                  class="green"
                  v-else
                >Sold out</div>
                <img
                  v-if="d.type=='N'"
                  src="/non-veg.png"
                  class="image-size"
                />
                <img
                  v-else
                  src="/veg.png"
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
const Header = () => import("~/components/HeaderFood");

export default {
  fetch({ store, redirect }) {
    if (!store.getters["auth/hasRole"]("chef")) return redirect("/login");
  },
  components: { Header },
  data() {
    return {
      loading: false,
      foods: []
    };
  },
  async created() {
    this.loading = true;
    try {
      this.foods = await this.$axios.$get("foods/my");
    } catch (e) {
      return;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  },
  layout: "none",
  head() {
    return {
      title: "Post Your Food"
    };
  }
};
</script>
<style scoped>
body {
  font-family: Oswald;
}
.big-button {
  text-transform: initial;
  color: #fff;
  background: linear-gradient(87deg, #fb6340 0, #da1c5f 100%) !important;
  border-color: #fb6340;
  -webkit-box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
    0 1px 3px rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  width: 100%;
  display: block;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  padding: 7px;
  outline: none;
  font-family: Karla, Roboto, sans-serif;
}
.big-button .loading {
  -webkit-animation: fadeIn 3s infinite;
  -moz-animation: fadeIn 3s infinite;
  -o-animation: fadeIn 3s infinite;
  animation: fadeIn 3s infinite;
}
.listingcard {
  /* height: 29vh;  */
  border-radius: 0.2rem;
  background-color: rgb(247, 247, 247);
  display: flex;
  justify-content: center;
  margin: 0.2rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  width: 156px;
}
@media (min-width: 650px) {
  .listingcard {
    height: 22vh;
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
  line-height: 1.2rem;
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
.pinky {
  color: rgb(255, 0, 104);
  letter-spacing: 1px;
}
.card-container {
  padding: 0.4rem;
}
.time {
  font-size: 0.8rem;
  color: #eee;
}
</style>

