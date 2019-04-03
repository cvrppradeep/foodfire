<template>
    <div  class="bg"> 
         <h1>Add Credit Card</h1>
         <div class="t-center">
             <img class="img" src="card.png">
              </div>
              <div class="card column"> 
                  <div style="margin: 1rem">
                  <div>
                  <span class="span-text">Enter your credit card details </span></div>
<div class="pt-1"> 
    <span class="span-text1">Card Number </span>
<div class="pt-1"><input class="input pt-1" placeholder="Card Number"> </div>
</div>
<div class="row pt-1"> 
               <div>
                   <span class="span-text1">Expire Date</span>
                 <div class="pt-1">  <input class="input1 pt-1" placeholder="00/00"></div>
                   </div> 
              <div style="margin-right: 0.5rem">
                   <span class="span-text1">Security code</span>
                 <div class="pt-1">  <input class="input1 pt-1" placeholder="cvv"></div>
                   </div> 
           </div>
           <div class="pt-1"> <button class="button-lg input">
          <span style="font-size: 1rem">Save Card Details</span>
          </button> </div>
              </div>
              </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
.bg{
    background-color: rgb(255, 255, 255);;
}
h1{
    text-shadow: 1px 1px #3c3333;
    font-size: 1rem;
    padding-left: 1rem;
    text-align:center;
}
.t-center{
    text-align:center;
    text-align: -webkit-center;
    padding-top: 2rem;
    padding-bottom: 2rem;
   }
   .img
{
    height: 12rem;
    width: auto;
}
.card{
    background-color: white;
    margin-left: 1rem;
    margin-right: 1rem;
    border-radius: 0.4rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;

}
.pt-1{
    padding-top: 1rem;
   
}
.pl-1{
    padding-left: 0.1rem;
}
.pb-1{
    padding-bottom: 1rem;
}
.row{
    display: flex;
        flex-direction: row ;
        justify-content: space-between;
}
.column{
        display: flex;
        flex-direction: column
    }
    .input{
    width: 18rem;
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
    border-radius: 0.4rem;
    padding-bottom: 1rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(4, 212, 240, 0.175) !important;

}
 .input1{
    width: 8rem;
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
    border-radius: 0.4rem;
    padding-bottom: 1rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(4, 212, 240, 0.175) !important;

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
.span-text{
        font-size: 1.5rem;
        font-weight: 600;
        color: #3f3f9c;
    }
    .span-text1{
        font-size: 1rem;
        font-weight: 600;
    }
</style>
