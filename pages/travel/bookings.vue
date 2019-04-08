<template>
  <div>
    <Header />
    <v-container v-if="bookings.length>0">
      <h3>Your travel history</h3>
      <v-layout>
        <v-flex
          xs12
          lg6
          v-if="bookings.length>0"
        >
          <div
            v-for="b in bookings"
            :key="b._id"
          >
            <travellers
              for="b in bookings"
              :key="b._id"
              :b="b"
              @removed="getAll()"
            ></travellers>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else>
      <v-layout>
        <v-flex>
          <v-responsive>
            <center>
              <h5 class="display-1">
                <v-icon size="72">warning</v-icon>No Bookings
              </h5>
              <p>You did not book anything yet!</p>
            </center>
          </v-responsive>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
const travellers = () => import("~/components/travellers");
const Header = () => import("~/components/HeaderFood");

export default {
  async asyncData({ $axios }) {
    let bookings = [];
    try {
      bookings = await $axios.$get("bookings/my");
    } catch (e) {}
    return { bookings };
  },
  data: () => {
    return {
      bookings: []
    };
  },
  components: { Header, travellers },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    ...mapMutations({
      showLoginModal: "showLoginModal"
    }),
    go(to) {
      this.$router.push(to);
    },
    async getAll() {
      this.bookings = await this.$axios.$get("bookings/my");
    }
  },
  head() {
    return {
      title: "My Bookings"
    };
  }
};
</script>
