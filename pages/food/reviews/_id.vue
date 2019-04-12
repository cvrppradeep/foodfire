<template>
  <div>
    <Header />
    <div class="heading">Post Your Rating</div>
    <form
      novalidate
      autocomplete="off"
      @submit.stop.prevent="submit()"
      class="container center"
    >
      <div style="text-align:center">
        <v-rating
          v-model="review.rating"
          color="green"
        ></v-rating><br />
        <v-textarea
          style="width:22rem"
          v-focus
          box
          v-model="review.message"
          label="Write Your Review Here"
        ></v-textarea>
      </div>
      <div class="footer">
        <div class="form-element">
          <button type="submit">Publish Rating</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
  components: { Header },
  fetch({ store, redirect, route }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/food/reviews/" + route.params.id);
  },
  data() {
    return {
      review: {}
    };
  },
  methods: {
    submit() {
      const pid = this.$route.params.id;
      this.review.pid = pid;
      this.$axios.$post("reviews", this.review);
      this.$router.push("/food/" + pid);
    }
  }
};
</script>

<style scoped>
.phone {
  height: 45px;
  border: 1px solid #da1c5f;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>
