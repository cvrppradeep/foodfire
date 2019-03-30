<template>
<div>
  <div>
       <!-- <label>{{f._id.deliveryDate}}</label> -->
<div>

    <div class="img-height backgroundimg" v-lazy:background-image="'/images'+food.img"           alt="">
     
</div>

<div class="border container">
  <div class="a-row s-b">
  <div>
    <a class="pink">{{food.deliveryDate}}</a>
  </div>
  <div>
    <span class="pink">trterte</span>
  </div>
  </div>
  <div class="fontbold">
    <a>{{food.name}}</a>
  </div>
   <div class="address">
    <div class="p-6">
      <span> {{food.description}}</span>
      </div> 
      <!-- <div class="p-6 m-1">
        <strong>.</strong>
        </div>
         <div>
           <span> 3.4 kms away</span>
         </div> -->
  </div>
  <div>
    <div class="review">
      <span><Ratingcircle/></span>
<span class="p-1">98 reviews</span>
    </div>
  </div>
</div>
<div class="amount border">
      <div>
        <span class="price">Price: {{food.rate}}</span>
      </div>
      <div>
        <Foodcartbutton/>
      </div>
      </div>
<div>
<div class="button-container">
  <button class="button"  >
    <span >Order Online</span>
    <span><img class="img-style" src='/backarrow.svg'/></span>
  </button>
    </div>
    </div>
    </div>
    <div class="card" >
      <div class="a-row">
      <div>
<img class="img-size" src='/eagle.png'/>
      </div>
      <div class="p-1">
        <div class="instagold">
  <span>{{food.vendor_name}}</span>
        </div>
        <div class="f-weightforcode">gghgh</div>
      </div>
      </div>
      <div>
   <img class="" src='/rightarrow-1.svg'/>
</div>
</div>
  </div>
</div>
  <!-- <div>
    {{food.img[0]}}
    {{food.name}}
    {{food.description}}
    {{food.vendor_name}}
    {{food.deliveryDate | date}}
    {{food.qty}}
    <button @click="order(food)">Order Now</button>
  </div> -->
</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");
 const Foodcartbutton = () => import("~/components/Foodcartbutton");

export default {
  components:{Ratingcircle,Foodcartbutton},
  async asyncData({ $axios, route }) {
    const food = await $axios.$get("foods/" + route.params.id);
    return { food };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    async order(food) {
      try {
        let order = await this.$axios.$post("food-orders", {
          img: food.img[0],
          name: food.name,
          description: food.description,
          vendor_name: food.vendor_name,
          vendor_email: food.vendor_email,
          vendor_phone: food.vendor_phone,
          vendor_id: food.vendor_id,
          deliveryDate: food.deliveryDate,
          qty: food.qty
        });
        console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzz", order);
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
body{
  font-family: Karla, Roboto, sans-serif;
}
.container{
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.backgroundimg{
/* background: url('/hero.jpeg') ; */
background-repeat: no-repeat;
background-size: cover;
background-position: 50%;
border-radius: 5px;
}
.img-height{
  height: 30vh;
  width: 100%;
}
.pink{
  color: rgb(255, 0, 104);
  font-size: 15px;
  font-weight: 700;
  margin-left: 0.2rem;
  letter-spacing: 1px;
}
.fontbold{
  font-weight: bolder;
  font-size: 2rem;
  letter-spacing: -1px;
  /* margin-left: -0.1rem; */
  padding-top: 9px;
}
  .address{
    font-size: 15px;
    font-weight: 500;
    color: grey;
    padding-top:10px;
    display: flex;
    flex-direction: row;
    
  }
  .review{
    font-size: 15px;
    font-weight: 500;
    color: grey;
    height: 3rem;
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
}
.amount{
  display: flex;
  flex-direction: row;
  height: 3rem;
    justify-content: space-around;
    align-items: center;
}
.p-6{
  padding-right: 0.5rem;
}
.a-row{
  display: flex;
  flex-direction: row;
}
.p-1{
  padding-left: 1rem;
  margin-top: 0.1rem;
}
.m-1{
margin-top: -0.5rem;
    font-size: 1.3rem;
}
  .border {
  border-bottom: 1px solid hsla(0, 12%, 82%, 0.34);
}
.button-container{
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
}
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: none;
    color: #fff;
    background: linear-gradient(87deg, #5cacf8 0, #0536d6 100%) !important;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    font-family: Karla, Roboto, sans-serif;
    font-size: 1.5rem;
    border-radius: 2.3rem;
    padding:0.5rem;
    outline: none;
    border: none;
    width: 14rem;
}
.card{
     padding: 2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: space-between;
    -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
    box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
    margin-top: 0.5rem;
    flex-direction: row;
    align-items: center;
}
.button img {
  transform: rotate(180deg);
margin-left: 1rem;
   margin-top: 0.5rem;
}
.img-size{
width:3rem;
height:3rem;
    }
.instagold{
  font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.4rem;
}
.f-weightforcode{
  font-weight: 500;
    color: grey;
}
.price{
  font-size: 1.5rem;
    font-weight: 700;
}
.s-b{
  justify-content:space-between;
}
</style>
