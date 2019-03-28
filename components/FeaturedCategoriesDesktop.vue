<template>
  <div class="featured-categories">
    <div
      class="store-categories-list__item"
      data-test-id="l0-category"
      v-for="(c,ix) in categories"
      :key="ix"
      @click="go(`/search/${c.slug}`)"
    >
      <div class="category-image">
        <div class="img-loader__wrapper__wrapper">
          <div class="img-loader__wrapper">
            <img
              class="img-loader__img img-loader__img--shown "
              :alt="c.name"
              v-if="c.img"
              :src="c.img.small"
            />
            <span class="img-loader__placeholder img-loader__placeholder--circle img-loader__img img-loader__img--hidden img-loader__placeholder--category-card"></span></div>
        </div>
      </div>
      <div class="category-name">
        <div class="category-name__discount">Up to 71% off</div>
        <div class="category-name__name">{{c.name}}</div>
        <div
          class="category-name__description"
          :title="c.description"
          style="overflow: hidden; text-overflow: ellipsis; -webkit-box-orient: vertical; display: -webkit-box; -webkit-line-clamp: 2;"
        >{{c.description}}</div>
      </div>
      <div class="category-icon">
        <div class="category-icon__icon"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["categories"],
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style scoped>
.featured-categories {
  background-color: #eee;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.store-categories-list__item .category-name__description {
  font-size: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  color: #888;
  font-size: 13px;
  line-height: 1;
  max-height: 3.2em;
  overflow: hidden;
}
.store-categories-list__item .category-name__name {
  color: #333;
  font-weight: 500;
  margin-bottom: 10px;
}
.store-categories-list__item .category-name__discount {
  color: #54b226;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.store-categories-list__item .category-icon {
  border-left: 1px solid #f8f8f8;
  color: #e96125;
  width: 40px;
}
.store-categories-list__item .category-name {
  box-sizing: border-box;
  font-size: 16px;
  margin: 0;
  padding: 0 0 0 12px;
  width: 60%;
}
.store-categories-list__item .category-image {
  width: 40%;
  background-position: 50%;
  background-repeat: no-repeat;
}
.store-categories-list__item {
  border-bottom: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
  border-radius: 0;
  margin: 8px 0;
  min-width: 200px;
  padding: 20px;
  width: 300px;
}
.store-categories-list__item {
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  /* border: 1px solid #eee; */
  box-sizing: border-box;
  cursor: pointer;
  display: -ms-flexbox;
  display: flex;
  /* margin: 5px 15px; */
  padding: 8px 0;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
</style>


