<template>
  <v-app>
    <Header />
    <!-- <div class="img"/> -->
    <v-container>
      <form
        @submit.stop.prevent="submit"
        novalidate
        autocomplete="off"
      >
        <v-expansion-panel
          expand
          v-model="panel"
        >
          <v-expansion-panel-content>
            <div slot="header">
              <div class="title"> Post your cab</div>
            </div>
            <!-- <v-card class="white--text"> -->
            <!-- <v-card-title primary-title>
              <div class="title"> {{$store.state.auth.user.name}}! where you wish to go?</div>
            </v-card-title> -->
            <v-card-text>
              <v-layout wrap>
                <v-flex xs6>
                  <v-autocomplete
                    :attach="true"
                    v-model="source"
                    label="From"
                    :items="places"
                    box
                    class="w35"
                    item-text="name"
                    item-value="val"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    :attach="true"
                    v-model="destination"
                    label="To"
                    :items="places"
                    box
                    class="w35"
                    item-text="name"
                    item-value="val"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-menu
                    :attach="true"
                    ref="menuDate"
                    :close-on-content-click="false"
                    v-model="menuDate"
                    :nudge-right="40"
                    :return-value.sync="date"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    class="w35"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="Date"
                      readonly
                      box
                    ></v-text-field>
                    <v-date-picker
                      v-model="date"
                      @input="$refs.menuDate.save(date)"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :attach="true"
                    label="Time"
                    name="time"
                    v-model="time"
                    :items="timesList"
                    box
                    class="w35"
                  >
                  </v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :attach="true"
                    label="No of seats"
                    name="seats"
                    v-model="seats"
                    :items="seatsList"
                    box
                    item-text="name"
                    item-value="val"
                    class="w35"
                  >
                  </v-select>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Rate (₹)"
                    name="rate"
                    v-model="rate"
                    box
                    class="w35"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    :attach="true"
                    label="Car Model"
                    name="seats"
                    v-model="model"
                    :items="carModels"
                    box
                    class="w35"
                  >
                  </v-select>
                </v-flex>
                <v-flex>
                </v-flex>
              </v-layout>
              <v-spacer />
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="primary"
                round
                block
                type="submit"
              >
                <v-icon>directions_car</v-icon> Post
              </v-btn>
            </v-card-actions>
            <!-- </v-card> -->
          </v-expansion-panel-content>
        </v-expansion-panel>

      </form>
    </v-container>
    <!-- <v-container> -->
    <!-- <h3>Search results: 2 taxis + 3 personal cars</h3> -->
    <!-- </v-container> -->
    <v-container v-if="bookings.length>0">
      <h3>Travel details of all</h3>
      <div
        v-if="matchedBookings.length>0"
        v-for="(b,i) in matchedBookings"
        :key="i"
      >
        <travellers :b="b"></travellers>
      </div>
      <div
        v-if="unMatchedBookings.length>0"
        v-for="(b,ix) in unMatchedBookings"
        :key="ix+'x'"
      >
        <travellers
          :b="b"
          @removed="removed"
        ></travellers>
      </div>
    </v-container>
  </v-app>
</template>
<script>
import { mapMutations } from "vuex";
import travellers from "@/components/travellers";
import moment, { duration } from "moment";
import { filter, difference } from "lodash";
import { places, seatsList, timesList, carModels } from "@/config";
const Header = () => import("~/components/HeaderFood");

export default {
  components: { travellers, Header },
  fetch({ store, redirect }) {
    if (!(store.state.auth || {}).user) return redirect("/login?return=owner");
    let user = (store.state.auth || {}).user;
    if (!user.firstName || !user.lastName) {
      return redirect("/my/profile?return=/owner");
    }
  },
  data: () => {
    return {
      panel: [true],
      places: places,
      seatsList: seatsList,
      timesList: timesList,
      carModels: carModels,
      source: "SBD",
      destination: "VSKP",
      seats: 4,
      type: "Request",
      rate: "400",
      model: "Indigo",
      date: null,
      time: null,
      menu: false,
      modal: false,
      menuDate: false,
      menuTime: false,
      loggedIn: false,
      bookings: [],
      matchedBookings: [],
      unMatchedBookings: []
    };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    ...mapMutations({
      showLoginModal: "showLoginModal"
    }),
    removed() {},
    go(to) {
      this.panel = null;
      this.$router.push(to);
    },
    async submit() {
      if (!this.user) {
        this.showLoginModal({ show: true, initiator: "header" });
      } else {
        this.book();
      }
    },
    async getAll(from, destination) {
      this.bookings = await this.$axios.$get("bookings/group");
      let vm = this;
      this.matchedBookings = filter(this.bookings, function(o) {
        let cc = o.data.filter(function(d) {
          return d.phone == vm.$store.state.auth.user.phone;
        });
        return cc.length > 0;
      });
      this.unMatchedBookings = difference(this.bookings, this.matchedBookings);
    },
    async book() {
      let type = "Offer";
      let source = this.source;
      let destination = this.destination;
      let seats = this.seats;
      let rate = this.rate;
      let model = this.model;
      let date = moment(this.date + " " + this.time, "YYYY-MM-DD h a");
      if (date.diff(moment()) < 0) {
        this.$store.commit("setErr", "The time choosen is invalid");
        this.panel = [true];
        return;
      }
      let data = {
        source,
        destination,
        date,
        seats,
        type,
        model,
        rate
      };
      try {
        const res = await this.$axios.$post("bookings", data);
        this.panel = [false];
        this.getAll();
        if (this.bookings[0] && this.bookings[0].data.length == 1) {
          this.$swal({
            title: "Sorry. No co-traveller.",
            text:
              "I could not find anyone travelling towards " +
              this.destination +
              ". But a new request has been posted. I will get back to you as soon as someone else is interested to travel.",
            type: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          let text = "Request registered successfully.";
          this.$swal({
            title: "Success",
            text: text,
            // "You will be travelling with " +
            // " AAA " +
            // " and the effective fare would be Rs500 / person",
            type: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        }
      } catch (e) {
        this.$store.commit("setErr", e);
      }
    }
  },
  async created() {
    let vm = this;
    this.date = moment().format("YYYY-MM-DD");
    this.time = moment()
      .add(1, "hour")
      .format("h A");
    this.getAll();
  },
  head() {
    return {
      title: "Owner - Manage Cabs"
    };
  }
};
</script>
<style scoped>
.fx {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.text {
  width: 200px;
}
/* .img {
  background-image: url("/static/taxi2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 2px;
  height: calc(100vh / 3);
  margin: 0 auto;
  min-height: 170px;
  min-width: 1000px;
  max-height: 480px;
  max-width: 1440px;
  -webkit-transition: opacity 200ms ease-in;
  width: 100%;
} */
.w30 {
  width: 140px;
}
.w35 {
  width: 170px;
}
</style>

