<template>
  <div>
    <Header />
    <v-container>
      <form
        @submit.stop.prevent="submit"
        novalidate
        autocomplete="off"
      >
        <v-expansion-panel
          v-model="panel"
          expand
        >
          <v-expansion-panel-content>
            <div slot="header">
              <div class="title"> <i v-if="user">{{user.name}}!</i> where you wish to go?</div>
            </div>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs6>
                  <v-autocomplete
                    :attach="true"
                    v-model="source"
                    label="From"
                    :items="places"
                    box
                    item-text="name"
                    item-value="val"
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-autocomplete
                    :attach="true"
                    v-model="destination"
                    label="To"
                    :items="toPlaces"
                    box
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
                  >
                  </v-select>
                </v-flex>
                <v-spacer />
              </v-layout>
              <v-layout
                wrap
                v-if="user"
              >
                <v-flex xs6>
                  <v-text-field
                    v-if="!user.firstName"
                    label="First Name"
                    name="firstName"
                    v-model="firstName"
                    box
                  />
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-if="!user.lastName"
                    label="Last Name"
                    name="lastName"
                    v-model="lastName"
                    box
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="yellow"
                round
                block
                type="submit"
              >
                <v-icon>search</v-icon> Search
              </v-btn>
            </v-card-actions>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </form>
    </v-container>
    <v-container>
      <center>
        <v-btn
          flat
          @click="go('/travel/bookings')"
        > Show my booking history </v-btn>
      </center>
    </v-container>
    <!-- <v-container v-if="bookings.length>0">
      <h3>Your current taxi request</h3>
      <v-layout>
        <v-flex
          xs12
          lg6
        >
          <v-card>
            <v-container
              fluid
              grid-list-lg
            >
              <v-layout row>
                <v-flex xs12>
                  <div v-if="bookings[0]">
                    <div class="title">{{bookings[0].source}} <v-icon>arrow_forward</v-icon> {{bookings[0].destination}}
                      &nbsp;&nbsp;&nbsp;&nbsp;<v-icon>date_range</v-icon> {{bookings[0]._id}}
                    </div>
                    <div class="fx">
                      <div>{{bookings[0].data.length}} traveller<span v-if="bookings[0].data.length>1">s</span></div>
                    </div>
                    <div>
                      <v-list three-line>
                        <div
                          v-for="i in bookings[0].data"
                          :key="i._id"
                        >

                          <v-list-tile
                            avatar
                            :class="{'yellow':(i.role=='driver' || i.role=='owner')}"
                          >
                            <v-list-tile-avatar>
                              <img
                                :src="'/cars/'+i.model+'.jpg'"
                                v-if="i.role=='driver' || i.role=='owner'"
                              />
                              <list-image
                                :text="i.name"
                                v-else
                              />
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                              <v-list-tile-title> {{i.phone}} (<b>{{i.name}}</b>)</v-list-tile-title>
                              <v-list-tile-title> {{i.seats}} seat <span v-if="i.role=='driver' || i.role=='owner'">available</span><span v-else>required</span> <span v-if="i.rate">({{i.rate}} / person)</span> </v-list-tile-title>
                              <v-list-tile-sub-title>{{i.date | date}}</v-list-tile-sub-title>
                              <v-btn
                                icon
                                absolute
                                right
                                @click="remove(i._id)"
                                class="grey--text"
                                v-if="i.phone===$store.state.auth.user.phone"
                              >
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-divider />
                        </div>
                      </v-list>
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container> -->
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import moment, { duration } from "moment";
import { difference, filter } from "lodash";
import { places, seatsList, timesList } from "@/config";
const Header = () => import("~/components/HeaderFood");
const ListImage = () => import("~/components/ListImage");

export default {
  components: { ListImage, Header },
  async fetch({ store, redirect, $axios }) {
    if (!!store.getters["auth/hasRole"]("driver"))
      return redirect("/travel/owner");
    try {
      await $axios.get("/users/me");
    } catch (e) {
      return redirect("/login?return=/travel/post");
    }
  },
  data: () => {
    return {
      firstName: "",
      lastName: "",
      bookings: [],
      panel: [true],
      places: places,
      seatsList: seatsList,
      timesList: timesList,
      source: "SBD",
      destination: "VSKP",
      seats: 1,
      type: "Request",
      date: null,
      time: null,
      menu: false,
      modal: false,
      menuDate: false,
      menuTime: false,
      loggedIn: false,
      bookings: []
    };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    toPlaces() {
      let vm = this;
      return filter(this.places, function(o) {
        return o.val !== vm.source;
      });
      return difference(this.places, this.source);
    }
  },
  // watch: {
  //   "$store.state.auth.user.token": {
  //     immediate: true,
  //     async handler(value) {
  //       if (value && value != "undefined") {
  //         this.loggedIn = true;
  //       } else {
  //         this.loggedIn = false;
  //       }
  //     }
  //   }
  // },
  methods: {
    ...mapMutations({
      showLoginModal: "showLoginModal"
    }),
    async remove(i) {
      this.$swal({
        title: "Are you sure to delete?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async result => {
        if (result.value) {
          await this.$axios.$delete("bookings/" + i);
          this.bookings = await this.$axios.$get(
            "bookings/group/" +
              this.source +
              "/" +
              this.destination +
              "/" +
              this.date
          );
        }
      });
    },
    // ifExists(val) {
    //   let x = !val || val == "undefined";
    //   return !x;
    // },
    calculatePrice(count, source, destination) {
      if (
        (source == "SBD" && destination == "VZM") ||
        (source == "VZM" && destination == "SBD")
      )
        // return Math.round(1500 / count);
        return 400;
      else if (
        (source == "SBD" && destination == "VSKP") ||
        (source == "VSKP" && destination == "SBD")
      )
        // return Math.round(2000 / count);
        return 500;
    },
    go(url) {
      this.panel = null;
      this.$router.push(url);
    },
    async submit() {
      this.book();
    },
    async book() {
      if (!this.user.firstName) {
        if (!this.firstName || this.firstName == "") {
          this.$store.commit("setErr", "Please enter First Name");
          return;
        } else if (!this.lastName || this.lastName == "") {
          this.$store.commit("setErr", "Please enter Last Name");
          return;
        }
        let user = { firstName: this.firstName, lastName: this.lastName };
        const data = await this.$axios.$put("/users/profile", user);
      }
      let type = "Request";
      let source = this.source;
      let destination = this.destination;
      let seats = this.seats;
      let date = moment(this.date + " " + this.time, "YYYY-MM-DD h a");
      if (date.diff(moment()) < 0) {
        this.$store.commit("setErr", "The time choosen is invalid");
        return;
      }
      let data = {
        source,
        destination,
        date,
        seats,
        type
      };
      try {
        const res = await this.$axios.$post("bookings", data);
        this.panel = [false];
        this.bookings = await this.$axios.$get(
          "bookings/group/" +
            this.source +
            "/" +
            this.destination +
            "/" +
            this.date
        );
        if (this.bookings[0].data.length == 1) {
          this.$swal({
            title: "No co-traveller yet.",
            text:
              "I could not find anyone travelling towards " +
              this.destination +
              ". But a new request has been registered. Please check back after some time to find if someone is interested to travel.",
            type: "warning",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK"
          });
        } else {
          let text = "Request received.";
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
        if (e.response) this.$store.commit("setErr", e.response.data);
        else this.$store.commit("setErr", e.response);
      }
    }
  },
  async created() {
    let vm = this;
    // this.bookings = await this.$axios.$get("bookings/my");
    this.date = moment().format("YYYY-MM-DD");
    this.time = moment()
      .add(1, "hour")
      .format("h A");
    // this.bookings = await this.$axios.$get("bookings/my");
  },
  head() {
    return {
      title: "Book a cab"
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
.v-avatar {
  height: 100% !important;
}
.yellow {
  background-color: yellow;
}
</style>

