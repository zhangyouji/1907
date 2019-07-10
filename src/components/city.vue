<template>
    <div id="citysbox">
        <p class="back" @click="goto">&lt;</p>
        <div id="citysheade">
        </div>
        <div id="search">
            <input type="text" class="ss" @click="go" ref="souso">
            <span v-show="bloor" class="qx" @click="dj">取消</span>
        </div>
        <div id="list">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <h3 v-if="index===0 || index!==0 && list[index-1].letter!==item.letter" :ref="item.letter">
                    {{item.letter}}
                    </h3>
                    <p><span>{{item.name}}</span></p>
                </li>
            </ul>
            <ol class="listletter">
                <li v-for="(item,index) in letter" :key="index" @click="scrollp(item)">{{item}}</li>
            </ol>
                
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            list:[],
            bloor:false,
            letter:''
        }
    },
    methods:{
        go(){
            this.bloor=true;
            this.$refs.souso.style.width="6rem"
        },
        dj(){
            this.bloor=false;
            this.$refs.souso.style.width="100%";
        },
        getletters(){
          var str="";
          for(var i=65;i<91;i++){
              if(String.fromCharCode(i)==="U"|| String.fromCharCode(i)==="I" || String.fromCharCode(i)==="V"
              ||String.fromCharCode(i)==="O"){
                  continue;
              }
              str+=String.fromCharCode(i)
          }
          this.letter=str
      },
      scrollp(letter){
          var top = this.$refs[letter][0].offsetTop;
          document.documentElement.scrollTop=top-100
      },
      goto(){
          this.$router.go(-1)
      }
        
    },
    created() {
    this.getletters();
    this.$axios
      .get("/mz/gateway?k=3882485", {
        headers: {
          "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"15624041211103806597043"}`,
          "X-Host": `mall.film-ticket.city.list`
        }
      })
      .then(res => {
        this.list = res.data.data.cities.sort((a,b)=>{
            return a.pinyin.localeCompare(b.pinyin)
        }).map((item)=>{
            return {
                "letter":item.pinyin[0].toUpperCase(),
                "name":item.name
            }
        })
       
      });
  },

}
</script>
<style lang="scss">
    .back{
        width:0.5rem;
        height:0.5rem;
        text-align: center;
        font-size: 16px;
        position: fixed;
        top:0.2rem;
        left:0.2rem;
        background: #f1f1f1;
        border-radius:50%; 
    }
    #citysheade{
        width:100%;
        height:0.88rem;
        background: #000;
    }
    #search{
        width:100%;
        height:0.98rem;
        background: #f1f1f1;
        padding: 9.5px 15px;
        box-sizing: border-box;
    }
    .ss{
        width:100%;
        height:100%;
        border:none;
        outline: none;
    }
    .qx{
        width:0.6rem;
        height:0.6rem;
        text-align: center;
        line-height: 0.2rem;
        display: inline-block;
        margin-left: 0.1rem;
    }
    #list>ul>li{
        width:100%;
        // height:1rem;
        padding-left: 0.2rem;
        box-sizing: border-box;
    }
    // #list>ul>li>h3{
    //     height:50%;
  
    // }
    #list>ul>li>p{
       height:1rem;
        border-bottom: 1px solid #f1f1f1;
          line-height: 1rem;
    }
    #list>ul>li>h3{
        width: 6.9rem;
        background: #c9c9c9;
    }
    .listletter{
        position: fixed;
        right: 0.1rem;
        top:50%;
        transform: translateY(-50%)
    }
    *{

        padding:0;
        margin:0;
    }
</style>

