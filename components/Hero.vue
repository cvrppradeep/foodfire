<template>

  <body>
    <nuxt-link to="/search/">
      <img
        class="blur"
        src="/banners/gro.jpg"
      />
      <div class="heading">
        <div
          class="link link--move"
          data-letters="Grocery"
        >Grocery
        </div>
      </div>
    </nuxt-link>
  </body>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: false,
      props: ["closed"]
    };
  }
};
</script>
<style scoped>
.heading {
  padding-left: 37px;
  margin-top: -90px;
  padding-bottom: 13px;
  font-size: 25px;
  color: snow;
}
.link {
  outline: none;
  text-decoration: none;
  position: relative;
  font-size: 25px;
  line-height: 1;
  color: snow;
  display: inline-block;
}
.link--move {
  /* text-transform: uppercase; */
  font-weight: 900;
  overflow: hidden;
  line-height: 0.75;
  color: snow;
}
.blur {
  filter: blur(1.5px);
  -webkit-filter: blur(1.5px);
}

.link--move:hover {
  color: #77f0f6;
}
.link--move::after {
  content: "";
  position: absolute;
  height: 16px;
  width: 100%;
  top: 50%;
  margin-top: -8px;
  right: 0;
  background: #f9f9f9;
  transform: translate3d(-100%, 0, 0);
  transition: transform 0.4s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.link--move:hover::after {
  transform: translate3d(100%, 0, 0);
}
.link--move::before {
  content: attr(data-letters);
  position: absolute;
  z-index: 2;
  overflow: hidden;
  color: #424242;
  white-space: nowrap;
  width: 0%;
  transition: width 0.4s 0.3s;
}
.link--kukuri:hover::before {
  width: 100%;
}
</style>



