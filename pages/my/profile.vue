<template>
  <div>
    <Header />
    <center class="title">
      <strong>My Profile</strong>
    </center>
    <form
      novalidate
      @submit.stop.prevent="updateProfile(profile)"
      v-if="profile"
    >
      <div class="form">
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
const Header = () => import("~/components/Header");
export default {
  components: {
    Header
  },
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user)
      return redirect("/login?return=my/profile");
  },
  async asyncData({ store }) {
    let profile = {};
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
    })
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