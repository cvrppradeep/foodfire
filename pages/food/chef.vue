<template>
  <div>
    <Header />
    <center class="title">
      <strong>Join as Chef</strong>
    </center>
    <form
      novalidate
      @submit.stop.prevent="save(profile)"
      v-if="profile"
    >
      <div class="form">
        <div class="form-element">
          <label>Display Name:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.restaurant"
            placeholder="Display Name"
          /> &nbsp;&nbsp;<span style="color:red">(Public)</span>
        </div>
        <div class="form-element">
          <label>First Name:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.firstName"
            placeholder="First Name"
          /> <span style="color:green">(Private)</span>
        </div>
        <div class="form-element">
          <label>Last Name:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.lastName"
            placeholder="Last Name"
          /><span style="color:green"> (Private)</span>
        </div>
        <div class="form-element">
          <label>Email Address:</label>
          <input
            type="text"
            name="email"
            v-model="profile.email"
            placeholder="Email"
          /><span style="color:green"> (Private)</span>
        </div>
        <div class="form-element">
          <label>Quarter No:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.address.qrno"
            placeholder="Quarter No with zone"
          /><span style="color:green"> (Private)</span>
        </div>

        <!-- <div class="form-element">
          <label>Dish 1:</label>
          <input
            type="text"
            name="Dish 1"
            v-model="profile.dish1"
            placeholder="Dish 1"
          />
        </div>
        <div class="form-element">
          <label>Dish 2:</label>
          <input
            type="text"
            name="dish2"
            v-model="profile.dish2"
            placeholder="Dish 2"
          />
        </div>
        <div class="form-element">
          <label>Dish 3:</label>
          <input
            type="text"
            name="dish3"
            v-model="profile.dish3"
            placeholder="Dish 3"
          />
        </div>
        <div class="form-element">
          <label>Dish 4:</label>
          <input
            type="text"
            name="dish4"
            v-model="profile.dish3"
            placeholder="Dish 4"
          />
        </div>
        <div class="form-element">
          <label>Dish 5:</label>
          <input
            type="text"
            name="dish5"
            v-model="profile.dish3"
            placeholder="Dish 5"
          />
        </div> -->
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <div class="footer">
        <div class="form-element">
          <button type="submit">Save Changes</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
const Header = () => import("~/components/HeaderFood");
export default {
  components: {
    Header
  },
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=/food/chef");
  },
  async asyncData({ store }) {
    let profile = { address: {} };
    let userDetails = await store.dispatch("auth/fetch");
    profile = Object.assign({}, userDetails);
    return { profile };
  },
  data() {
    return {
      user: null,
      showImageModal: false,
      userAvatar: null
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  },
  methods: {
    ...mapActions({
      updateProfile: "auth/updateProfile"
    }),
    save(profile) {
      if (!this.profile.restaurant) {
        this.$store.commit("setErr", "Please enter Display Name");
        return;
      } else if (!this.profile.firstName) {
        this.$store.commit("setErr", "Please enter firstName");
        return;
      } else if (!this.profile.lastName) {
        this.$store.commit("setErr", "Please enter lastName");
        return;
      } else if (!this.profile.address.qrno) {
        this.$store.commit("setErr", "Please enter qrno");
        return;
      }
      profile.role = "chef";
      this.updateProfile(profile);
      this.$router.push("/food/chefs");
    }
  },
  watch: {
    // userAvatar: function(avatar) {
    //   this.user.avatar = avatar;
    // }
  },
  created() {},
  head() {
    return {
      title: "Update your profile"
    };
  }
};
</script>