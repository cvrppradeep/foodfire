<template>
<div>
<div  v-for="(f,ix) in foods"
      :key="ix" >
      <h1 class="datemsg">{{f._id.deliveryDate}} <span class="time">6:00 PM</span></h1>
      <div class="align-row">
    <div class="listingcard" v-for="d in f.data"
        :key="d._id"
        @click="go('/food/'+d._id)" >
      
        <div class="a-listing">
           <div class="height ">
             <img v-lazy="'/images'+d.img" class="backgroundimg"/>
           </div>
           <!-- <div style="text-align:right">
            <img src="non-veg.png" class="image-size"/>
            </div> -->
            <div class="card-container">
        <div class="a-contain">
          <div class="pink"> Only 5left</div>
            <img src="non-veg.png" class="image-size"/>
        </div> 
        <div class="p-name">{{d.name}}</div>
        </div>
        </div>
    </div>
    </div>
    </div>
   </div>
    </template>
<script>
 const Ratingcircle = () => import("~/components/Ratingcircle");
 const CartButtons = () => import("~/components/CartButtons");
export default {
  components:{Ratingcircle,CartButtons},
  async asyncData({ $axios }) {
    const foods = await $axios.$get("foods/group");
    return { foods };
  },
  methods: {
    go(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style scoped>
body{
  font-family: Karla, Roboto, sans-serif;
}
.listingcard{
   /* height: 29vh;  */
    border-radius: 0.2rem;
    background-color:rgb(247, 247, 247);
    display: flex;
    justify-content: center;
    margin:0.2rem;
    box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
    max-width: 173px;
    
    }
 @media (max-width: 2000px) and (min-width:650px){
    .listingcard{
        height: 22vh; 
      }
    }
.backgroundimg{
  border-radius: 0.3rem 0.3rem 0 0;
}
.datemsg{
 text-align: center;
    color: #666;
    border-bottom: 1px solid #e6e0e0;
    padding-bottom: 1rem;
   }
.a-listing{
  display: flex;
  flex-direction: column;
}
.image-size{
  width:1.5rem;
  height:1.5rem;
  
}
.a-contain{
  display: flex;
  justify-content:space-between;
  align-items:center;

}
.p-name{
  font-size: 0.8rem;
  line-height: 1rem;
  
}
.align-row{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
    /* @media (min-width:300px) and (max-width:800px ) {
     .align-row{
        display: flex;
    flex-direction: row;
    } 
    } */
.name
    {
 
  padding-left: 0.5rem;
  padding-right: 0.5rem;
    }
    .pink{
  color: rgb(255, 0, 104);
 font-size: 0.6rem;
 
  letter-spacing: 1px;
}
.card-container{
  padding: 0.4rem;
}
.time{
  font-size: 1rem;
    color: darkgray;
}
</style>
