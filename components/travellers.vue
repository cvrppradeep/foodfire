<template>
  <v-card>
    <v-container
      fluid
      grid-list-lg
    >
      <v-layout row>
        <v-flex xs12>
          <div>
            <div class="title">{{b.source}} <v-icon>arrow_forward</v-icon> {{b.destination}}
              &nbsp;&nbsp;&nbsp;&nbsp;<v-icon>date_range</v-icon> {{b._id.date}}
            </div>
            <div class="fx">
              <div>{{b.data.length}} traveller <span v-if="b.data.length>1">s</span></div>
            </div>
            <div>
              <v-list three-line>
                <div
                  v-for="(i,ix) in b.data"
                  :key="i._id"
                >
                  <v-divider v-if="ix!==0" />
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
                        :text="i.firstName+ ' '+i.lastName"
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
                        v-if="i.phone===user.phone"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-list-tile-content>
                  </v-list-tile>
                </div>
              </v-list>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
const ListImage = () => import("~/components/ListImage");

export default {
  props: ["b"],
  components: { ListImage },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
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
          this.$emit("removed");
        }
      });
    },
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
    }
  }
};
</script>

