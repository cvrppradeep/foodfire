<template>
  <div>
    <Header />
    <div class="heading">Food Mela Terms</div>
    <div class="banner yellow">
      Misiki looking for Chefs who can set our taste bud on fire and earn a few bucks from d comfort of home. Register for free and know more
    </div>
    <div class="banner blue">
      Housewives, show your Chef side and earn from Home! Register @Misiki
    </div>
    <div class="banner red">
      Wanna showcase your cooking skills? Earn while others relish the taste...Misiki Food...a new online platform for food lovers. Join as chef
    </div>
    <div class="banner yellow">
      Be the Master Chef of Sunabeda and earn from home!
      Coming soon..Misiki Food/Eats..join as Chef!
    </div>
    <ul>
      <li>Housewives may register themselves online as Chef!!</li>
      <li>they have to provide name of three dishes they r (damn) good at.</li>
      <li>they can then post the qty(in multiples of 5) in Misiki app for buying/booking by public.</li>
      <li>they just need to prepare n pack in the standard packing boxes(paper/plastic/aluminium foils etc) and delivery boy will pick d same from your quarter.</li>
      <li>chefs can upload the dish by 10am of the day for distribution to buyers between 7 to 8pm d same day.</li>
      <li>Upto 20 plates/box etc chefs should prepare/keep atleast one box/plate extra to adjust for any damage/loss during transit etc.</li>
      <li>Dishes must be homemade and not bought from outside/restaurant.</li>
      <li>Chef's identity will not be revealed to general public. they can choose any nickname for online display.</li>
      <li>Once dish has been posted, it cannot be removed unless for a very genuine n compelling reasons </li>
      <li>Customers will rate every chef for their dishes. After review lowly rated chefs may be asked to go.</li>
      <li>Food must be prepared in best hygenic condition and only fresh and good quality oils should be used.</li>
      <li> Random food quality checks will be carried out by our designated food inspectors.</li>
      <li>Pricing will be decided by us based on the cost input provided.</li>
      <li>Food shall be prepared based on advance orders. Misiki will not be responsible if something remains unsold.</li>
      <li>Rules may change as things evolve.</li>
    </ul>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
import { HOST, TITLE, DESCRIPTION, KEYWORDS, sharingLogo } from "~/config";

export default {
  components: { Header },
  head() {
    return {
      title: "Order placed successfully",
      meta: [
        {
          hid: "description",
          name: "description",
          content: ""
        },
        {
          hid: "og:description",
          name: "Description",
          property: "og:description",
          content: ""
        },
        {
          hid: "keywords",
          name: "Keywords",
          property: "keywords",
          content: ""
        },
        {
          hid: "og:title",
          name: "og:title",
          property: "og:title",
          content: "Order placed successfully"
        },
        // Twitter
        {
          name: "twitter:title",
          content: "Order placed successfully"
        },
        {
          name: "twitter:description",
          content: ""
        }
      ]
    };
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 10px;
}
ul > li {
  border-bottom: 1px solid #eee;
  padding: 10px;
  margin-bottom: 3px;
}
</style>
