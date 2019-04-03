
<template>
   <div>
       <div class="img-align"> 
           <img class="img-size" src="p3.png"/>
       </div>
       <div class="contains"> 
           <div><h2> Complete Your Profile</h2> </div>
           <div class="column"> 
               <span  class="font">Your Name </span> 
              <span class="pt-1 pl-1"> <input class="input" placeholder="Name"></span>
           </div>
           <div class="column pt-1"> 
               <span class="font">Gender</span> 

            <div class="row pt-1"> 
               <span><button class="button1">Male</button></span> 
              <span><button class="button2">Female</button> </span>
           </div>
           </div>
            <div class="column pt-1"> 
               <span  class="font">Home Address</span> 
              <span class="pt-1 pl-1"> <input class="input" placeholder="Address"></span>
           </div>
      
       </div>
        <div class="t-center">
             <button class="button-lg input">
          <span>Complete Sign up</span>
          </button>
       </div>
   </div> 
</template>

<script>
export default {

}
</script>

<style>
.img-align{
    text-align: center;
    padding-top: 1rem;
    }
    .img-size{
       
        height: 11rem;
    }
    .contains{
        padding-left: 2rem;
        padding-top: 0.5rem;
    }
    .column{
        display: flex;
        flex-direction: column
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
        flex-direction: row 
}
.button1{
    width: 9rem;
    height: 2.5rem;
    background-color: white;
    border-radius: 0.4rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(4, 212, 240, 0.175) !important;

}
.button2{
    width: 9rem;
    height: 2.5rem;
    background-color: white;
    border-radius: 0.4rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(4, 212, 240, 0.175) !important;

}

.button1:hover{
    color: blue;
    border-color: blue;
}
.button2:hover{
    color: red;
    border-color: red;
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
.font{
    font-size: 1.1rem;
    font-weight: 600;
}
.input{
    width: 18rem;
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
    border-radius: 0.4rem;
  box-shadow: 0 -0.1rem 1.1rem rgba(4, 212, 240, 0.175) !important;

}
.input:hover{
    border-color: #40c8fb;
}
h2{
    text-shadow: 1px 1px #3c3333;
}
.t-center{
    text-align:center;
    text-align: -webkit-center;
    padding-top: 2rem;
}
</style>
