<template>
    <div class="card" >
     
    </div>
</template>
<script>
const Ratingcircle = () => import("~/components/Ratingcircle");

export default {
  components: {Ratingcircle}
    
}
</script>
<style>

.card {
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

</style>
