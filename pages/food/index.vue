<template>
  <div>
    <HeaderFood />
    <!-- <v-layout
      row
      justify-center
    >
      <v-dialog
        v-model="openclose"
        persistent
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">Thank You</v-card-title>
          <v-card-text>Restaurant closed for the day</v-card-text>
        </v-card>
      </v-dialog>
    </v-layout> -->
    <div>
      <div class="heading">Food Orders <span class="time">Live Now</span></div>
      <Notification />
      <div class="fx">
        <v-btn-toggle
          v-model="daily"
          @change="filter(daily,type)"
          class="fz6"
        >
          <v-btn
            flat
            value="false"
          >
            Home
          </v-btn>
          <v-btn
            flat
            value="null"
          >
            All
          </v-btn>
          <v-btn
            flat
            value="true"
          >
            Restaurant
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-model="type"
          @change="filter(daily,type)"
          class="fz6"
        >
          <v-btn
            flat
            value="V"
          >
            Veg
          </v-btn>
          <v-btn
            flat
            value="null"
          >
            All
          </v-btn>
          <v-btn
            flat
            value="N"
          >
            Non Veg
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="align-row">
        <div
          class="product-card"
          v-for="d in foods"
          :key="d._id"
          @click="go('/food/'+d._id)"
        >
          <div class="column">
            <div class="height ">
              <img
                v-lazy="IMAGEKIT+'/images'+d.img"
                class="backgroundimg"
              />
            </div>
            <div class="fx">
            <div></div>
          <div class="m-choice m-align" v-if="d.recommended">
                misiki choice
              </div>
            </div>
            <div class="restroname">
              {{d.name}}
            </div>
            <div class="card-container">
              <div class="a-contain">
                <div style="font-weight:600;min-width: 3rem;">
                  {{d.rate | currency}}
                </div>
                <div
                  class="f-pink"
                  v-if="!openclose"
                >Open 6AM - 6PM</div>
                 <div
                  class="f-pink"
                  v-else-if="d.stock>0"
                > Only {{d.stock}} left</div>
                <div
                  class="f-pink"
                  v-else
                > Sold out on <br />{{d.updatedAt | date}}</div>
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
              <div class="p-name">By : {{d.restaurant}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  HOST,
  TITLE,
  DESCRIPTION,
  KEYWORDS,
  sharingLogo,
  IMAGEKIT
} from "~/config";
const Ratingcircle = () => import("~/components/Ratingcircle");
const CartButtons = () => import("~/components/CartButtons");
const HeaderFood = () => import("~/components/HeaderFood");
const Notification = () => import("~/components/Notification");
import { SocketService } from "~/service/socket";
let ss = new SocketService();
export default {
  components: { Ratingcircle, CartButtons, HeaderFood, Notification },
  async asyncData({ $axios }) {
    let foods = [],
      openclose = false;
    try {
      foods = await $axios.$get("foods/group?daily=false");
    } catch (e) {
      foods = [];
    }
    try {
      openclose = await $axios.$get("foods/openclose");
    } catch (e) {
      openclose = false;
    }
    return { foods, openclose };
  },
  data() {
    return {
      IMAGEKIT,
      daily: "false",
      type: "null"
    };
  },
  async created() {
    await ss.syncUpdates("food", this.foods);
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    async filter(daily, type) {
      this.foods = await this.$axios.$get(
        "foods/group?daily=" + daily + "&type=" + type
      );
    }
  },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;
    return {
      title: TITLE,
      meta: [
        {
          hid: "description",
          name: "description",
          content: DESCRIPTION
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content: DESCRIPTION
        },
        {
          name: "Keywords",
          content: KEYWORDS
        },
        {
          hid: "og:title",
          name: "og_title",
          property: "og:title",
          content: TITLE
        },
        {
          name: "og_url",
          property: "og:url",
          content: host
        },
        {
          name: "og_image",
          property: "og:image",
          content: host + sharingLogo
        },

        {
          name: "twitter:title",
          content: TITLE
        },
        {
          hid: "twitter_description",
          name: "twitter:description",
          content: DESCRIPTION
        }
      ]
    };
  }
};
</script>

<style scoped>
.v-btn--active {
  border-bottom: 2px solid red;
}
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

.column {
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
  font-size: 0.9rem;
  line-height: 1rem;
  color: #3279ff;
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
 
.f-pink {
  color: rgb(255, 0, 104);
  font-size: 0.7rem;
  letter-spacing: 1px;
  font-weight: 500;
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
.restroname {
  padding-left: 0.4rem;
  padding-top: 0.4rem;
  font-weight: 400;
  color: #0c921e;
}
.fz6 button {
  padding-left: 1rem;
  font-size: 0.8rem;
  padding-left: 0.5rem !important;
}
.m-choice{
  border: none;
    background-color: darkorange;
    border-radius: 0 1rem;
   padding: 0.2rem 0.8rem;
    color: cornsilk;
    font-size: 0.8rem;
} 
.m-align{
  margin-top: -0.7rem;
    margin-right: 0.2rem;
}
</style>
