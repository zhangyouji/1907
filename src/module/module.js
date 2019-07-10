import Vue from 'vue'
Vue.directive("gd",(el,binding)=>{
    var dis=Number(el.getAttribute("dis"));
    el.addEventListener("scroll",()=>{
        var st = el.scrollTop;
        if(st>dis){
            binding.value.flag=true;
        }else{
            binding.value.flag=false;
        }
    })
})