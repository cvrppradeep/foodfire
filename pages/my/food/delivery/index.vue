<template>
<div>
 <Header />
  <div class="heading">My Orders</div>
  <h3>14/04/2019</h3>
        <div class="card" >
            <div class="row f-weight">
     <span >To Pick up</span>
    <span >To Deliver</span>
   </div>
        <div class="row p-1">
     <span class="qtrborder redclr">QtrNO.1</span>
      <span class=" arrow">
    <img src="/rightarrow-1.svg"/>
      </span>
       <span class=" arrow">
    <img src="/cycle.svg"/>
       </span>
       <span class=" arrow">
    <img src="/rightarrow-1.svg"/>
       </span>
    <span class="qtrborder blueclr">QtrNO.2</span>
   </div>
    <div class="row f-weight">
        <div class="qtrborder gray column width">
     <span class="p-1">Seller Info.</span>
      <span class="details">Name: </span>
       <span class="p-1 details">Phone No.: </span>
     </div>
     <div  class="qtrborder gray column width">
    <span class="p-1">Customer Info.</span>
     <span class="details">Name: </span>
      <span class="p-1 details">Phone No.: </span>
    </div>
   </div>
   <div class="column qtrborder gray">
       <span class="font-order p-1 blueclr">Order No. :</span>
       <span class="font-order p-1 blueclr">Price to collect : </span>
   </div>
  </div>
  </div>
</template>
<script>
const Header = () => import("~/components/HeaderFood");
export default {
    components: {
    Header
  }
}
</script>

<style>
h3{
    
    font-size: 1.2rem;
    padding-left: 1rem;
    
    }
.card {
  padding: 0.5rem;
  -webkit-box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  box-shadow: 0 -0.1rem 1.1rem rgba(0, 0, 0, 0.175) !important;
  margin-top: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  margin-left: 0.5rem;
    margin-right: 0.5rem;
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

.qtrborder{
  border: 2px solid;
        padding: 0.5rem;
}
.blueclr{
    color: #2b73cc
}
.redclr{
    color: red;
}
.p-1{
    padding-top: 0.5rem;
padding-bottom: 0.5rem;
}
.f-weight{
    font-weight: 500;
}
.arrow{
    background-color: #9feff1;
    width: 5rem;
    text-align: center;
  color: #9feff1;
  border-radius: 1rem;
  border: 2px solid;
}
.column{
        display: flex;
        flex-direction: column
    }
    .font-order{
        font-size: 1.2rem;
    font-weight: 500;
    }
    .gray{
        color: gray;
    }
    .width{
        width: 50%;
    }
    .details{
        font-size: 0.8rem;
    color: darkslategray;
    }
</style>
