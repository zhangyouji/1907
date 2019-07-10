<template>
    <div id="box2">
        <div id="head">
            <ul class="headlist">
                <li @click="gocity">北京</li>
                <li>影院</li>
                <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA2CAMAAABQrCHsAAABlVBMVEVHcEwaGh8/Pz8ZGxszMzMZGhwZGhsZGhsZGhsZGhscHBwnJycZGhskJCQaGh0fHx8ZGhsaGiMeHh4ZGhsZGhsbGxsZJiYaGhsZGhsZGhwZGhwZGxsZGxsaGhsfHx8ZGhsbGxsqKioaGhsbGxsZGxsbGxsZGhwaGh8ZGhskJCQZGxsZHh4ZGxsZGhsaGh0aGhsZGhsZMzMaGh0ZGhseHh4ZGhsZGhseHh4ZGhsZGhsZHh4aGh0aGhsZGhwbGxsaGh4ZIiIbGxsZGhwbGxsZGxsaGh1/f38aGhsZGxshISEZGxsZGxsZGhsZGhwfHx8aGh4aGhsdHR0ZGxv///8ZGhsqKioaGhwbGxtVVVUaGhwbGxsaGh8ZGhsZGxsaGhwZGxsaGhwaGhwgICAiIiIcHBwZGhsZGxsbGxsZGhsZGxsaGhwbGxsZGhsaGiAZGhwaGhsZGxsaGhwZGxsZGhwaGhsZHBwaGhwZHBwaGhwaGh0aGh0ZGhwbGxsaGh0aGhoZGhwaGiEZGxsZHBwZHR0aGhsaGhsZGhsIL5M3AAAAhnRSTlMAOQTsBeP76P73SA3qB2kY+B0i/fRBFKbfx62elq8QtzgG11V5L70w/BXOO6DeV6T2CnLwKsDWIenVMla5mUo6HhysQs9NAsSXF4uE06IITJwjggHMDFhxA5BAMd3Zj52Iah8PG/JmUuCDfS7LJ7aSqXVl0etQYlp8X2i+JXtz0CZ6Wzy4w4GfxwoAAAJjSURBVBgZrcEFUxQBAIbh77qL7m4ElFCxCQWDUFBQaaXDwu56f7cwzHLHsXe7N+Pz6D9pfPehovJvZcWHd42yx1n4uISkkseFTlmZejRHurlHU8pqaJpDruLN6Nvfb6ObxS4OTQ8pM/dVDoQXnszKMPtkIcyBq25lUNQHFDwI6aTQgwKgr0imejuArphOi3UBHb0yEfNAS7fMdbeAJ6ZTIqXQE1QmwR4ojSjdGHgLlVmhF8aU5hfwSdlEgfc6IVICo8puFEpqlWoGfA+V3UMfzCjFMxdEZSUKrmdKWoN5p6w452FNSXuwLGvLsKdjoTj+57L23E88JEM97MiOHaiX4QVsyY4teCFDGazLjnUok6EUamSHA0pl2IAV2bECGzLEISI7IhCXYR+KZEcR7MvwBrZlxza8keEPBGVHEKplKIfXsuM1lMvwCl7KjpfwSoZdWK2VtdpV2NWxOgjKWhDqlLQExbJWDEtKegr+Zllp9sNTpRiEK7JyBQaV6ocXrim7a+D9ohMqwJWnbPJcUKGTWj3QH1JmoX7wtCrNpbNQfU6ZnKuGs5d0ymWgLSFziTbgskx8BXztMtPuAy7myczHOOSfuaF0N87kgx/CDplx+IDAnftKdf9OAPB9C0CgU2YSlRy6d9dx+5akW7cdd+9xqDKhmjD4G2Tq+ghHvJ7vHi9HRq7rwIXzQLlbpm6WFZCqoOymjlQ1AZ+rZG58YnLYlw/k+4YnJ8Z1zL0I1OUpM+dA44BT6Rr8EHYoV/UBCHQqVzUXwf9TubpwHih3K0dVTUCTWzlyLwLvlbOGlkCzctca0z9q9NKFAyAIHQAAAABJRU5ErkJggg==" alt=""></li>
            </ul>
            <ul class="headetab">
                <li @click="show">{{name}}</li>
                <li>App订票</li>
                <li>最近去过</li>
            </ul>
            <ul class="districtName" v-show="booler">
              <li @click="addresss">全城</li>
              <li v-for="(item,index) in adders" :key="index" @click="address(item)">{{item}}</li>
            </ul>
        </div>
        <div id="main">
            <ul class="mainlist">
             <li v-for="(item,index) in datas" :key="index">
              <div class="address">
                <p>{{item.name}}</p>
                <span>{{item.address}}</span>
              </div>
              <div class="Price">
                <span>￥</span>
                <span>{{item.lowPrice.toString().substring(0,2)}}</span>
                <span>起</span>
                <p>距离未知</p>
              </div>
            </li>
            </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { Indicator } from 'mint-ui';
axios.interceptors.request.use((config)=>{
  Indicator.open();
  return config
})
axios.interceptors.response.use((res)=>{
 Indicator.close();
  return res;
}) 
export default{
    components:{
    },
    data(){
        return {
            datas:[],
            adders:[],
            booler:false,
            arr1:[],
            name:"全城"
        }
    },
    created(){
    this.$axios.get("/mz/gateway?cityId=110100&ticketFlag=1&k=913997",
   {'headers':{ 
     "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"15624963671236950581260"}`,
      "X-Host":`mall.film-ticket.cinema.list`
   }}).then((res)=>{
      //  console.log(res)
      this.datas=res.data.data.cinemas
      var set=new Set([]);
      this.datas.forEach((item)=>{
        set.add(item.districtName)
      })
     this.adders=[...set]   
    })    
    },
    methods: {
      show(){
        this.booler=!this.booler;
      },
      gocity(){
  		this.$router.push("/city")
  	},
      address(item){
        this.name=item;
        this.booler=false;
        var arr=[];
    this.$axios.get("/mz/gateway?cityId=110100&ticketFlag=1&k=913997",
   {'headers':{ 
     "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"15624963671236950581260"}`,
      "X-Host":`mall.film-ticket.cinema.list`
   }}).then((res)=>{
          this.arr1=res.data.data.cinemas
          for(var i=0;i<res.data.data.cinemas.length;i++){
          var a=res.data.data.cinemas[i].districtName
          if(item===a){
              arr.push(res.data.data.cinemas[i])
          }
        }
        
        this.datas=arr

   })
      },
      addresss(){
        this.booler=false;
        this.datas=this.arr1

      }
    }
};
</script>
<style lang="scss">
    #box2{
        height:0.88rem;
        .headlist{
            width:100%;
            display: flex;

        }
        .headetab{
            width:100%;
            display: flex;
        }
    }
    .districtName{
      display: block;
      display: flex;
      flex-wrap:wrap;
      position: fixed;
      top:1.82rem;
      background-color: #fff
    }
    .districtName>li{
      width:1.5rem;
      height:0.6rem;
      border: 1px solid #f1f1f1;
      margin: 0.15rem;
      text-align: center;
      line-height: 0.6rem;
    }
    .headlist>li{
       width:33.3%;
       text-align: center;
       line-height: 0.88rem;
     }
     .headlist>li>img{
         width:0.36rem;
         height:0.36rem;
         
     }
     .headetab>li{
        width:33.3%;
        height:0.976rem;
       text-align: center;
       line-height: 0.976rem;
     }
     #main{
         height:10.514rem;
         overflow: auto;
     }
     .mainlist>li{
        padding: 15px;
        height:1.5rem;
        display: flex;
}
.address{
    padding-right: 15px;
    width:5.2rem;
    text-align: left;
    padding-right: 15px;
    float: left;
    height:0.9rem;
    font-size: 14px;
    

}
.main>ul>li>div:nth-child(2){
    width: 1.4rem;;
    text-align: center;
    float: right;
    margin-right: -5px;
    height:0.9rem;
}
.Price>span{
  color: tomato;
  display: inline-block;
  margin-top: 8px;
}
.Price>span:nth-child(2){
  font-size: 16px;
}
.Price>p{
  margin-top: 5px;
}
</style>