<template>
  <div>
    <Header />
    <center class="title">
      <strong>My Profile</strong>
    </center>
    <form
      novalidate
      @submit.stop.prevent="save(profile)"
      v-if="profile"
    >
      <div class="form">
        <!-- <div class="form-element">
          <label>Restaurant:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.restaurant"
            placeholder="Restaurant Name"
          />
        </div> -->
        <div class="form-element">
          <label>First Name:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.firstName"
            placeholder="First Name"
          />
        </div>
        <div class="form-element">
          <label>Last Name:</label>
          <input
            type="text"
            name="name"
            autofocus
            v-model="profile.lastName"
            placeholder="Last Name"
          />
        </div>
        <div class="form-element">
          <label>Email Address:</label>
          <input
            type="text"
            name="email"
            v-model="profile.email"
            placeholder="Email"
          />
        </div>
        <div class="form-element">
          <label>QrNo:</label>
          <input
            type="text"
            name="qrno"
            v-model="profile.address.qrno"
            placeholder="QrNo"
          />
        </div>
        <div v-if="user && user.role=='chef'">
          <div class="form-element">
            <label>Restaurant:</label>
            <input
              type="text"
              name="restaurant"
              v-model="profile.restaurant"
              placeholder="Restaurant"
            />
          </div>
          <!-- <div class="form-element">
            <label>Dish1:</label>
            <input
              type="text"
              name="dish1"
              v-model="profile.dish1"
              placeholder="Dish1"
            />
          </div>
          <div class="form-element">
            <label>Dish2:</label>
            <input
              type="text"
              name="dish2"
              v-model="profile.dish2"
              placeholder="Dish2"
            />
          </div>
          <div class="form-element">
            <label>Dish3:</label>
            <input
              type="text"
              name="dish3"
              v-model="profile.dish3"
              placeholder="Dish3"
            />
          </div>
          <div class="form-element">
            <label>Dish4:</label>
            <input
              type="text"
              name="dish4"
              v-model="profile.dish4"
              placeholder="Dish4"
            />
          </div>
          <div class="form-element">
            <label>Dish5:</label>
            <input
              type="text"
              name="dish5"
              v-model="profile.dish5"
              placeholder="Dish5"
            />
          </div> -->
        </div>
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
      return redirect("/login?return=/my/profile");
  },
  async asyncData({ store }) {
    let profile = { address: { qrno: "" } };
    let userDetails = await store.dispatch("auth/fetch");
    profile = Object.assign({}, userDetails);
    if (!profile.address) {
      profile.address = {};
    }
    return { profile };
  },
  data() {
    return {
      showImageModal: false,
      userAvatar: null
    };
  },
  computed: {
    ...mapGetters({
      loading: "loading"
    }),
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    ...mapActions({
      updateProfile: "auth/updateProfile"
    }),
    save(profile) {
      this.updateProfile(profile);
      this.$router.push("/my");
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