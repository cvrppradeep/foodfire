<template>
  <div>
    <h1>Travel</h1>
    <div class="grey">
      <div
        class="card"
        v-for="(b,ix) in bookings"
        :key="ix"
      >
        <div class="fx center">
          <div class="fx center">
            <!-- <v-icon>place</v-icon> -->
            <h2>{{b._id.source}}
              <!-- <v-icon>arrow_right_alt</v-icon> -->
              {{b._id.destination}}</h2>
            <!-- <v-icon>date_range</v-icon> -->
            <h2>{{b._id.date}}</h2>
          </div>
          <div class="fx sb vcenter">
            <button
              @click="go('/post')"
              class="warning"
              round
              small
              flat
            >
              <v-icon>add</v-icon> POST YOUR REQUIREMENT
            </button>
            <button
              @click="showDetails(b)"
              class="primary"
              round
            >
              <!-- <v-icon>more_horiz</v-icon> DETAILS -->
            </button>
          </div>
        </div>
        <div class="divider" />
        <div
          class="fx scroll"
          @click="showDetails(b)"
        >
          <div
            class="car m10"
            :class="{taxi:d.type=='Offer'}"
            v-for="(d,ix) in b.data"
            :key="ix"
          >
            <div>{{d.seats}} seat<span v-if="d.seats>1">s</span> {{d.type==="Request" ? "Required" : "Available"}}</div>
            <div>{{d.time | time12}}</div>
            <img
              src="/seat.svg"
              width="50"
              v-if="d.type=='Request'"
            />
            <img
              src="/car.svg"
              width="50"
              v-else-if="d.type=='Offer' && d.role=='driver'"
            />
            <img
              src="/car-personal.svg"
              width="50"
              v-else-if="d.type=='Offer'"
            />
          </div>
        </div>
      </div>
      <div>
        <div class="list pa-1">
          <div class="fx center">
            <!-- <v-icon>date_range</v-icon> -->
            <h1 v-if="selectedBooking._id">{{selectedBooking._id.date}}</h1>
          </div>
          <div class="fx center">
            <h1 v-if="selectedBooking._id">{{selectedBooking._id.source}}
              <!-- <v-icon>arrow_right_alt</v-icon> -->
              {{selectedBooking._id.destination}}</h1>
          </div>
        </div>
        <div class="divider" />
        <br />
        <div class="fx column">
          <div
            class="car stretch"
            :class="{taxi:d.type=='Offer'}"
            v-for="(d,ix) in selectedBooking.data"
            :key="ix"
          >
            <div>{{d.seats}} seat<span v-if="d.seats>1">s</span> {{d.type==="Request" ? "Required" : "Available"}}</div>
            <h2> {{d.time | time12}}</h2>
            <p>{{ d.name }} - {{ d.phone }}</p>
            <img
              src="/seat.svg"
              width="50"
              v-if="d.type=='Request'"
            />
            <img
              src="/car.svg"
              width="50"
              v-else-if="d.type=='Offer' && d.role=='driver'"
            />
            <img
              src="/car-personal.svg"
              width="50"
              v-else-if="d.type=='Offer'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import ListImage from "@/components/ListImage";
import moment, { duration } from "moment";
import { difference, filter } from "lodash";
import { places, seatsList, timesList } from "@/config";
export default {
  components: { ListImage },
  // fetch({ store, redirect }) {
  //   if (!store.getters["auth/hasRole"]("driver")) return redirect("/owner");
  // },
  data: () => {
    return {
      selectedBooking: {},
      drawer: false,
      panel: [true],
      places: places,
      seatsList: seatsList,
      timesList: timesList,
      source: "SBD",
      destination: "VZM",
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
    // user() {
    //   return (this.$store.state.auth || {}).user || null;
    // }
  },
  // watch: {
  // "$store.state.auth.user.token": {
  //   immediate: true,
  //   async handler(value) {
  //     if (value && value != "undefined") {
  //       this.loggedIn = true;
  //     } else {
  //       this.loggedIn = false;
  //     }
  //   }
  // }
  // },
  methods: {
    ...mapMutations({
      showLoginModal: "showLoginModal"
    }),
    showDetails(b) {
      if (!this.user) return this.$router.push("/login?return=/my");
      this.drawer = true;
      this.selectedBooking = b;
    },
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
      if (!this.loggedIn) {
        this.showLoginModal({ show: true, initiator: "header" });
      } else {
        this.book();
      }
    },
    async book() {
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
    this.bookings = await this.$axios.$get("bookings/group");
    this.date = moment().format("YYYY-MM-DD");
    this.time = moment()
      .add(1, "hour")
      .format("h A");
  },
  head() {
    return {
      title: "Book a cab"
    };
  }
};
</script>

<style scoped>
.car {
  background-color: lightblue;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 2px 3px 12px 0px rgba(181, 174, 181, 1);
}
.taxi {
  background-color: lightyellow;
}
.stretch {
  margin: 10px;
  flex: 1 100%;
  justify-content: center;
}
.grey {
  background-color: grey;
}
.card {
  margin-bottom: 20px;
}
.scroll {
  overflow-x: auto;
}
.car {
  text-align: center;
}
.m10 {
  margin-right: 10px;
}
.fx {
  display: flex;
}
.column {
  flex-direction: column;
}
.sb {
  justify-content: space-between;
}
.sa {
  justify-content: space-around;
}
.vcenter {
  align-items: center;
}
.center {
  justify-content: center;
}
img {
  margin: 10px;
}
</style>
