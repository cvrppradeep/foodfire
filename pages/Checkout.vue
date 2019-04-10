<template>
 <div>
     <div><h2>Your Food Cart </h2></div>
      <div class="product-card">
          <div class="a-listing">
            <div class="height ">
              <img
                src="hero.jpeg"
                class="backgroundimg"
              />
            </div>
            <div class="card-container">
              <div class="a-contain pl-1">
                  <div><img class="img-size" src="eagle.png"/> </div>
                  <div class="a-listing">
                <div class="text-bold "> Store Name</div>
                <div class="a-contain pl-1">
                    <div class="pt-img" ><img class="img-loacte" src="blocate.png"/></div>
                <div class="text-small">Address hal township</div>
                </div>
                  </div>
                </div>
                <div class="dotted">
                </div>
              <div class="a-contain pl-1">
                  <div><img class="img-size" src="eagle.png"/> </div>
                  <div class="a-listing">
                <div class="text-bold ">User Name</div>
                <div class="a-contain pl-1">
                    <div class="pt-img"><img class="img-loacte" src="bulocate.png"/></div>
                <div class="text-small"> Address hal township</div>
                </div>
                  </div>
                </div>
                </div>
       </div>
          </div>
             <div> <h3>Payment Method</h3></div>
               <div class="b-card ">
                   <div class="a-contain">
                       <div class="pl-1">
                          <img class="img-size" src="atm.png"/> 
                     </div>
                     <span class="span-text">Credit/Debit Card</span>
                   </div>
                    </div>
                    <div class="b-card ">
                   <div class="a-contain">
                       <div class="pl-1">
                          <img class="img-size" src="cash.png"/> 
                     </div>
                     <span class="span-text">Cash on Delivery</span>
                   </div>
                    </div>
                     <div class="b-card ">
                   <div class="a-contain">
                       <div class="pl-1">
                          <img class="img-size" src="paypal.png"/> 
                     </div>
                     <span class="span-text">Paypal</span>
                   </div>
                    </div>
                    <div class="pt-1 center pb-1"> <button class="button-lg">
          <span style="font-size: 1rem">Submit Order</span>
          </button> </div>
          </div>
        </template>
<script>
export default {
    
}
</script>

<style>
h2{
    text-shadow: 1px 1px #3c3333;
    font-size: 1.2rem;
    padding-left: 1rem;
    text-align: center;
    padding-top: 1rem;
    }
    h3{
    text-shadow: 1px 1px #3c3333;
    font-size: 1.2rem;
    padding-left: 1rem;
    
    }
.product-card {
  display: flex;
  background-color: rgb(247, 247, 247);
  justify-content: center;
  border-radius: 0.2rem;
  margin: 0.5rem;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important;
  /* width: calc(50% - 1rem); */
}
@media (min-width: 650px) {
  .product-card {
    width: calc(25% - 1rem);
  }
}
@media (min-width: 1000px) {
  .product-card {
    width: calc(20% - 1rem);
  }
}
.backgroundimg {
  border-radius: 0.3rem 0.3rem 0 0;
  min-height: 126px;
  /* box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.175) !important; */
  background-size: cover;
background-attachment: fixed;
position: relative;
width: 100%;
height: 20vh;
}
.pt-img{
    padding-top: 0.5rem;
}
.a-listing {
  display: flex;
  flex-direction: column;
}
.img-size{
        width: 3rem;
    height: 3rem;
}
.a-contain {
  display: flex;
  flex-direction: row;
  }
  .pl-1{
  padding-left: 0.5rem;
}
.p-name {
  font-size: 1.2rem;
  line-height: 1rem;
}
.align-row {
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
.name {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.text-bold {
font-size: 1.2rem;
    /* letter-spacing: 1px; */
    padding-left: 1rem;
    font-weight: 700;
}
.text-small{
  font-size: 0.8rem;
    /* letter-spacing: 1px; */
    padding-top: 0.7rem;
    font-weight: 700; 
    color: grey; 
}
.card-container {
  padding: 0.4rem;
}
.dotted{
    border-left: 3px dotted #b7b6b6;
    /* -webkit-transform: rotate(90deg); */
    transform: rotate(180deg);
    width: 4rem;
    padding-top: 3rem;
    margin-top: 0rem;
    margin-left: -1.8rem;
}
.img-loacte{
    width: 1rem;
    height: 1rem;
}
.b-card{
   padding: 0.5rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
border-radius: 0.5rem;
height: 4rem;
 margin: 1rem;
}
.span-text{
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 700;
}
.button-lg {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: none;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 0.3rem;
  border: none;
  padding: 0.9rem 6rem;
  outline: none;
  background: linear-gradient(87deg, #4068fb 0, #1ad0de 100%) !important;
  border-color: #69beda;
}
.center{
    text-align:center;
    text-align: -webkit-center;
   }
   .pt-1{
    padding-top: 1rem;
}
.pb-1{
    padding-bottom: 1rem;
}
</style>
