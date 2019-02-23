<template>
  <div class="container">
    <div class="padding">
      <div class="row align-items-center">
        <div>
          <h1
            class="card border-0 shadow bg"
            v-for="o in orders"
            :key="o._id"
            :title="`${o.name} => ${o.address}`"
            :type="getStyle(o)"
          >
            <div class="columns is-mobile ">
              <div class="order-status">
                <h2>Name : {{o.name}}</h2>
                <h3>Address:{{o.address}}</h3>
                <h4>Total Amount:{{o.amount.total}}</h4>
                <div
                  class="circle"
                  v-bind:class="{active1: o.status=='PENDING',pending:o.status=='Pending'}"
                  native-value="Pending"
                  @input="changeStatus()"
                  @click="update('Pending')"
                >
                  <span>1</span>
                  <p
                    class="black-color spacing2px"
                    v-bind:class="{pending:o.status=='Pending'}"
                  >Pending</p>
                </div>
                <div
                  class="circle "
                  v-bind:class="{active2: o.status=='SHIPPED',shipped:o.status=='Shipped'}"
                  native-value="Shipped"
                  type="is-warning"
                  @input="changeStatus(o)"
                  @click="update('Shipped')"
                >
                  <span>2</span>
                  <p
                    class="black-color spacing2px"
                    v-bind:class="{shipped:o.status=='Shipped'}"
                  >Shipped</p>
                </div>
                <div
                  class="circle"
                  v-bind:class="{active3: o.status=='DELIVERED',delivered:o.status=='Delivered'}"
                  native-value="Delivered"
                  type="is-success"
                  @input="changeStatus(o)"
                  @click="update('Delivered')"
                >
                  <span class="margin">3</span>
                  <p
                    class="black-color font-deliver"
                    v-bind:class="{delivered:o.status=='Delivered'}"
                  >Delivered</p>
                </div>
                <div
                  class="circle"
                  v-bind:class="{active4: o.status=='CANCELLED',cancelled:o.status=='Cancelled'}"
                  native-value="Cancelled"
                  type="is-danger"
                  @input="changeStatus(o)"
                  @click="update('Cancelled')"
                >
                  <span class="margin">4</span>
                  <p
                    class="black-color font-cancel"
                    v-bind:class="{cancelled:o.status=='Cancelled'}"
                  > Cancelled</p>
                </div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div>
                <div
                  class="rows is-mobile"
                  v-for="(i,ix) in o.items"
                  :key="ix"
                >
                  <div class="media-content">
                    <div class="content">
                      <strong class="font15">{{ix+1}} - {{i.name}}</strong>
                      <small class="font15">{{i.price | currency}} (<strong>{{i.qty}}</strong>)</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["status"],
  methods: {
    update: function(updated) {
      alert("Do you want to submit for sure?");
      console.log(updated);
    },
    showMessage: function() {},

    changeStatus(o) {
      db.collection("orders")
        .doc(o[".key"])
        .update({
          status: o.status,
          updatedAt: new Date()
        });
    },
    getStyle(o) {
      let style = "";
      if (o.status === "Cancelled") {
        style = "is-danger";
      } else if (o.status === "Delivered") {
        style = "is-success";
      } else if (o.status === "Shipped") {
        style = "is-warning";
      }
      return style;
    }
  }
};
</script>
<style scoped>
.margin {
  margin-left: 19px;
}
h2,
h3,
h4 {
  font-size: 16px;
  text-align: -webkit-left;
  color: cadetblue;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.border-0 {
  border: 0 !important;
}
.shadow {
  -webkit-box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.padding {
  padding: 0rem !important;
}
.bg {
  background: whitesmoke;
}
.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.columns {
  margin-left: 1.25rem;
  margin-right: 1.25rem;
  margin-top: -0.75rem;
  padding-top: 13px;
  padding-bottom: 31px;
  padding-top: 13px;
  padding-bottom: 31px;
  padding-left: 0px;
  padding-right: 0px;
}
.media-content {
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  text-align: left;
}
.font15 {
  font-size: 15px;
}
.order-status div span {
  margin: 0 auto;
  display: block;
  border-radius: 100%;
  height: 30px;
  width: 36px;
  padding: 6px 0 0 0px;
  font-size: 20px;
}
.spacing2px {
  letter-spacing: 2px;
}
.font-deliver {
  letter-spacing: 1px;
  padding-left: 3px;
}
.font-cancel {
  letter-spacing: 1px;
  padding-left: 7px;
}
.order-status div p {
  text-align: center;
  line-height: 0;
  margin: 30px auto 25px;
  font-size: 11px;
}
h1 {
  font-family: Karla, Roboto, sans-serif;
  letter-spacing: 0px;
}
</style>

