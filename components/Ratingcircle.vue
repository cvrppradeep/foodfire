<template>
<ul class="circles">
  <li class="circle full"></li>
  <li class="circle full"></li>
  <li class="circle full"></li>
  <li class="circle half"></li>
  <li class="circle"></li>
</ul>
</template>
<script>
export default {
    
}
</script>
<style>

.circles{
  display:inline-block;
  /* margin:0 0 30px 0; */
  padding:0;
}


.circle{
  position:relative;
  display:inline-block;
  width:15px;
  height:15px;
  padding:2px;
  border-radius:50%;
  list-style:none;
  border:2px solid #88af29;
  overflow:hidden;
}

.circle.full:before{
  content:'';
  display:inline-block;
  background:#88af29;
  width:100%;
  height:100%;
  border-radius:50%;
  vertical-align:top;
}

.circle.half:before{  
  content:'';
  display:inline-block;
  background:#88af29;
  width:100%;
  height:100%;
  margin-left:-50%;
  vertical-align:top;
}

.circle.halfy:before {
  content:'';
  display:block;
    width: 5px;
    height: 7px;
    background-color: #88af29;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    border: 2x solid gray;
    border-right: 0;    
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.circle:after{
  content:'';
  position:absolute;
  top:0;
  left:0;
  width:calc(100% - 4px);
  height:calc(100% - 4px);
  border:2px solid #fff;
  border-radius:50%;
}
</style>
