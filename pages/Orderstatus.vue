<template>
    <div>
        <h1> Order Status</h1>
        <div class="t-center">
            <img class="img" src="order.png"/>
             </div>
             <div class="contains"> <div class="contain-text">
             <span class="span-text">Your Food order is completed </span></div>
               <div>
                   <span style="color: grey">Description. Order Status module allows customers to check their orders status   </span>
             </div>
             </div>
             <div class="t-center pt-1"> 
                  <button class="button-lg input">
          <span>Order Again</span>
          </button>
             </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
h1{
    text-shadow: 1px 1px #3c3333;
    font-size: 1.5rem;
    padding-left: 1rem;
}
.img{
    height: 17rem;
}
.t-center{
    text-align:center;
    text-align: -webkit-center;
   
}
.contains{
    padding-left: 2rem;
    padding-top: 2.5rem;
      
    }
    .span-text{
        font-size: 1.5rem;
        font-weight: 600;
    }
    .contain-text{
    width: 13rem;
    padding-bottom: 1rem;
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
  padding: 0.5rem 2rem;
  outline: none;
  background: linear-gradient(87deg, #40c8fb 0, #1c45da 100%) !important;
  border-color: #69beda;
}
.input{
    width: 18rem;
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
    border-radius: 0.4rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(4, 212, 240, 0.175) !important;

}
.pt-1{
    padding-top: 6rem;
}
</style>
