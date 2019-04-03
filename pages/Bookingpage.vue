<template>
<div>
    <div class="bgclr">
    <div class="contain js-sa">
    <div>
        <img class="arrow" src="rightarrow-1.svg"/>
    </div>
    <div class="column">
        <span class="span-1">Cuisine of Antebellum Amrica
        </span> 
         <span class="span-2">Cuisine of Antebellum Amrica
        </span>
        
    </div>
    <div> 
        <img src="shopping_basket.1.svg"/>
    </div>
    </div>
    <div class="contain-b">
        <div>
            <img class="dining-img" src="table.png"/>
        </div>
         <div class="tick-align">
            <img class="checkmark-img"  src="tick.png"/> <br>
                <span class="confirmtext"> Confirmed Booking</span>
        </div>
    </div>
    <div class="contain-c box">
        
            <span class="span-name">Advit j. singh</span>
    <div class="contain">
        <div>
            <img src="watch.svg"/>
             </div>
         <span class="pl-1">Time</span>
          <span class=" p-1"> . </span>
           <span>Dayname</span>
            <span class=" p-1"> . </span>
           <span >Date</span>
    </div>
    <div class="contain blacktext pb-1">
        <div> 
            <img src="peoples.svg"/>
        </div>
        <span class=" pl-1"> 4 guest </span>
         </div>
         <div class="contain border pb-1 pt-1">
        <span class=" bluetext"> Edit </span>
        
        <span class=" pl-1 f-w">Cancel Booking</span>
         </div>
    </div>
    </div>
    <div class="footer"> 
        <div class="contain footer-align" > 
            <span style="font-weight: 700"> Having any issues ?</span>
            <span class="pl-1 bluetext" > Support</span>
            <div class="pl-1"><img class="que-mark " src="quemark.svg"/> </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.bgclr{
    background-color: #d5f7ff;
    height: 46vh;
    border-radius:0 0 85% 85% / 19%;
width: 100%;
background-size: cover;
background-attachment: fixed;
position: relative;

}
.column{
    display: flex;
    flex-direction: column;
}
.arrow{
   transform: rotate(90deg);
   height: 2,5rem;
  width: 2.1rem;
    margin-top: -0.9rem;
  
}
.contain{
    display: flex;
    flex-direction:row;
    align-items: center;
    }
.js-sa
   {
    justify-content: space-around;
    padding-top: 1rem;
    /* border-bottom: 1px solid #d0c7c7; */
}
.span-1{
    font-size: 1rem;
    font-weight: 800;
}
.span-2{
    font-size: 0.9rem;
    color: grey;
    margin-top: 0.3rem;
}
.dining-img{
    width: 15rem;
}
.contain-b{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
       align-items: center;
       padding-top: 2rem;
}
.checkmark-img{
    width: 2.3rem;
    border-radius: 0.9rem;
}
.confirmtext{
    font-size: 0.7rem;
    font-family: cursive;
    color: grey;
}
.tick-align{
    text-align: center;
   padding-top: 3rem;
}
.contain-c{
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    padding-left: 1rem;
      
}
.pt-1{
    padding-top: 1rem;
   
}
.blacktext{
     color: black;
}
.span-name{
    font-size: 1.5rem;
    font-weight: bolder;
    letter-spacing: -0.1rem;
}
.pl-1{
    padding-left: 1rem;
}
.p-1{
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    margin-bottom: 1rem;
    font-size: 2rem;
}
.box{
    border: 2px solid #f1f1f1;
    margin: 1rem;
}
.border{
 border-top: 1px solid #f1f1f1;
 
}
.pb-1{
    padding-bottom: 1rem;
}
.bluetext{
    color: #0072ff;
    font-weight: 600;
}
.f-w{
        font-weight: 700;
}
.footer {
  background: #fff;
  box-shadow: 0 -1rem 3rem rgba(0, 0, 0, 0.175) !important;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 3rem;
}
.que-mark{
    height: 1.3rem;
    width: 1.3rem;
}
.footer-align{
  justify-content:center;
  padding: 0.5rem;  
}
</style>

