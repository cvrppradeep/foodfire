<template>
  <div>
    <Header />
    <div class="heading">How to ???</div>
    <h2 style="padding-left: 0.5rem">Housewives</h2>
    <ul>
      <li><span>Step-1:</span>
        <nuxt-link to="/food/chef">Register as Chef</nuxt-link>
      </li>
      <li><span>Step-2:</span> We will contact you. Tell us what and how much you wish to make</li>
      <li><span>Step-3:</span> You decide the price</li>
      <li><span>Step-4:</span> Upon confirmation your dish will be live on 14th April Morning 6AM</li>
      <li><span>Step-5:</span> Users will book your dish for the evening</li>
      <li><span>Step-6:</span> Based on the booked quantity, you will prepare the food and get ready by 6PM</li>
      <li><span>Step-7:</span> Our delivery boy will reach your home and collect from you</li>
      <li><span>Step-8:</span> Next day the booked amount will be transfered to you</li>
    </ul>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
import { HOST, TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from "~/config";

export default {
  components: { Header },
  head() {
    const host = process.server
      ? this.$ssrContext.req.headers.host
      : window.location.host;
    return {
      title: this.title || TITLE,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description || DESCRIPTION
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content: this.description || DESCRIPTION
        },
        {
          name: "Keywords",
          content: this.keywords || KEYWORDS
        },
        {
          hid: "og:title",
          name: "og_title",
          property: "og:title",
          content: this.title || TITLE
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
          content: this.title || TITLE
        },
        {
          hid: "twitter_description",
          name: "twitter:description",
          content: this.description || DESCRIPTION
        }
      ]
    };
  }
};
</script>
<style scoped>
ul {
  list-style: none;
}
ul > li {
  margin-bottom: 5px;
  padding: 10px;
}
ul > li span {
  color: #999;
}
</style>

