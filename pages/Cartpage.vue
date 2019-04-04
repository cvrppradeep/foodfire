<template>
<div>
<div>
    <h2>Your Food Cart </h2>
</div>
    <div class="card" >
        <div class="row">
      <div class="column border">
          <button class="cart-button">
          <img src="/plus.svg" />
        </button>
        
        <span class="t-center">1</span>
        <button class="cart-button">
          <img src="/minus.svg" />
        </button>
      </div>
      <div class="img-align"> 
          <img class="img-size" src="eagle.png"/>
      </div>
        <div class="pl-1 pt-1">
            <div class="text-style">Food Name</div>
             <div class=" text-style price">$12.39</div>
             <div class=" text-style d-text">Description</div>
        </div>
        <div class="cross-align">
           <img class="cross" src="close.png"/>
            </div>
    </div>
  </div>
  <div class="butttoncard ">
  <div class="row">
  <div >
      <input class="promo-input" placeholder="Promo Code">
      </div>
      <div>
     <button class="button-lg1">Apply</button>
     </div>
  </div>
  </div>
    <div class="column">
      <div class="row j-sb p-1">
          <div class="price-text">Cart Total</div>
           <div class="amount-text">$2656.00</div>
      </div>  
      <div class="row j-sb p-1">
          <div class="price-text">Tax</div>
           <div class="amount-text">$25.00</div>
      </div>
      <div class="row j-sb p-1">
          <div class="price-text">Delivery</div>
           <div class="amount-text">$4.99</div>
      </div>
      <div class="row j-sb p-1  pb-1">
          <div class="price-text">Promo Discount</div>
           <div class="amount-text">-$0.00</div>
      </div>
      <div class="b-bottom"></div>
       <div class="row j-sb p-1">
          <div class="price-text">Subtotal</div>
           <div class="subtotal">$2565.00</div>
      </div>
 </div>
  <div class="pt-1 center"> <button class="button-lg">
          <span style="font-size: 1rem">Proceed To Checkout</span>
          </button> </div>
</div>
</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");

export default {
  components: {Ratingcircle}
    
}
</script>
<style>
h2{
    text-shadow: 1px 1px #3c3333;
    font-size: 1.2rem;
    padding-left: 1rem;
    }
.card {
  padding: 0.5rem;
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
  border-radius: 0.5rem;
  margin-left: 0.5rem;
    margin-right: 0.5rem;
}
.butttoncard{
   padding: 0.5rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
border-radius: 0.5rem;
height: 4rem;
    
    margin: 1rem;
}
.row{
    display: flex;
        flex-direction: row ;
        /* justify-content: space-between; */
}
.column{
        display: flex;
        flex-direction: column
    }
    .buttonrounded {
  border-radius: 50px;
  width: 33px;
}
.cart-button {
  outline: none;
    border: none;
    background-color: transparent;
}
.t-center{
    text-align: center;
}
.border{
    border: 1px solid #c7c7c7;
    border-radius: 0.3rem;
    padding: 0.2rem;
    margin-left: 0.5rem;
}
.img-size{
        width: 4rem;
    height: 4rem;
}
.img-align{
    padding-left: 1rem;
    text-align: center;
    padding-top: 0.5rem;
}
.pt-1{
    padding-top: 1rem;
}
.pb-1{
    padding-bottom: 1rem;
}
.pl-1{
    padding-left: 1rem;
}
.text-style{
    font-size: 0.9rem;
    font-weight: 800;
}
.price{
    padding-top: 0.5rem;
    color: skyblue;
}
.cross{
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
}
.cross-align{
    margin-left: 5rem;
    margin-top:  -0.5rem;
}
.promo-input{
    width: 13rem;
    height: 3rem;
    font-size: 1.2rem;
    outline: none;
    border: none;
}
.button-lg1 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: none;
  color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
 font-size: 1rem;
    border-radius: 0.3rem;
    border: none;
    padding: 0.9rem 2rem;
  outline: none;
  background: linear-gradient(87deg, #4068fb 0, #1ad0de 100%) !important;
  border-color: #69beda;
}
.shadow{
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;

}
.j-sb{
    justify-content: space-between;
}
.p-1{
  padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.5rem;
}
.d-text{
   color: grey;
   padding-top: 0.5rem;
}
.price-text{
    font-weight: 600;
    color: grey;
}
.amount-text{
     font-weight: 600;
}
.b-bottom{
    border-bottom: 1px solid #ccc4c4;
    margin-left: 1rem;
    margin-right: 1rem;
}
.subtotal{
   font-weight: 600;  
   font-size: 1.5rem;
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
  padding: 0.9rem 5rem;
  outline: none;
  background: linear-gradient(87deg, #4068fb 0, #1ad0de 100%) !important;
  border-color: #69beda;
}
.center{
    text-align:center;
    text-align: -webkit-center;
    
   }
</style>
