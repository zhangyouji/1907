<template>
  <div class="box" v-gd="vis" dis="210">
    <div class="myheader" v-show="vis.flag">
      电影
      <div class="nav">
        <h2>
          <router-link to="/home/film/nowplaying">正在上映</router-link>
        </h2>
        <h2>
          <router-link to="/home/film/comingSoon">即将上映</router-link>
        </h2>
      </div>
    </div>
    <div class="swiper">
      <mySwiper />
    </div>
    <div class="nav">
      <h2>
        <router-link to="/home/film/nowplaying">正在上映</router-link>
      </h2>
      <h2>
        <router-link to="/home/film/comingSoon">即将上映</router-link>
      </h2>
    </div>
    <ul id="list" v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10">
      <li v-for="(item,index) in list"  class="row" @click="godetail(item.filmId)" :key="index">
        <div>
          <img :src="item.poster" />
        </div>
        <div>
          <h2>
            <b>{{item.name}}</b>
            <span>{{item.filmType.name}}</span>
          </h2>
          <p>
            <s v-show="item.grade>=0">
              观众评分
              <i>{{item.grade}}</i>
            </s>
          </p>
          <p>
            主演：
            <span v-for="(act,index) in item.actors" :key="index">{{act.name}}</span>
          </p>
          <p v-if="type==='nowplaying'">{{item.nation}} | {{item.runtime}}</p>
          <p v-else>{{item.premiereAt}}</p>
        </div>
        <!-- <div>
          <span class="name">{{item.name}}</span>
        <span>{{item.filmType.name}}</span>
        </div>
        <span>{{item.category}}</span>
        <span>{{item.director}}</span>
        <span>{{item.grade}}</span>
        <span>{{item.language}}</span>
        <span>{{item.nation}}</span>
        <span>{{item.runtime}}</span>
        <span>{{item.synopsis}}</span>-->
      </li>
    </ul>
  </div>
</template>
<script>
import mySwiper from "./mySwiper";
import { Toast } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
export default {
  data() {
    return {
      type: "",
      page:1,
      loading:false,
      list: [],
      vis: {
        flag: false
      }
    };
  },
  created() {
    this.$router.push("/home/film/nowplaying");
  },
  components: {
    mySwiper
  },
  methods: {
    loadMore(){ //下拉滚动加载新数据
              this.page++;             
              this.getData();
           },
           godetail(id){ //到详情页面
             this.$router.push('/detail/'+id)
           },
    getData() {
      if(this.page>5){
              Toast({
                message:'已经到底了',
                position:'bottom',
                duration:2000
              })
              return;
            }
      var type = this.type === "nowplaying" ? 1 : 2;
       this.loading=true; //表示同时只能发一次请求
      this.$axios.get(`/mz/gateway?`, {
          params: {
            cityId: 110100,
            pageNum: this.page,
            pageSize: 10,
            type,
            k: Date.now()
          },
          headers: {
            "X-Client-Info": `{"a":"3000","ch":"1002","v":"5.0.4","e":"156202977077309412156"}`,
            "X-Host": `mall.film-ticket.film.list`
          }
        }).then(res => {
          console.log(res);
          this.list = this.list.concat(res.data.data.films);
          this.loading=false;
        });
    },
    resetList(){
            this.list=[];
            this.loading=false;
            this.page=1;
          }
  },
  watch: {
    $route: {
      handler(newV) {
       if(newV.path==="/home/film"){
              this.$router.push("/home/film/nowplaying")
            }
            else{
              this.type=newV.params.type;
              this.resetList();
              this.getData();
            }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped>
.box {
  position: fixed;
  top: 0;
  bottom: 0.98rem;
  right: 0;
  left: 0;
  overflow: auto;
}
.swiper {
  width: 100%;
  height: 4.2rem;

  background: #ccc;
}
.myheader {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  text-align: center;
  background: #fff;
}
#list {
  width: 7.2rem;
  height: 24.8rem;
  font-size: 0.24rem;
  background: #ffffff;
  padding-left: 0.3rem;
}
#list li {
  width: 6.9rem;
  height: 1.88rem;
  padding: 0.3rem 0.3rem 0.3rem 0;
}
#list li img {
  width: 1.32rem;
}

#list li div {
  float: left;
}
#list li div img {
  width: 100%;
}
#list li div:nth-child(1) {
  width: 66px;
}
#list li div:nth-child(2) {
  flex: 1;
  padding: 0 10px;
  width: calc(100% - 116px);
}
#list li div h2 {
  margin: 0;
  padding: 0;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#list li div h2 b {
  color: #191a1b;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
  max-width: calc(100% - 25px);
}
#list li div h2 span {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
}
#list li div p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-size: 13px;
  color: #797d82;
  margin: 0;
  padding: 0;
  line-height: 21px;
  height: 21px;
}

#list li div p s {
  text-decoration: none;
}
#list li div p s i {
  color: #ffb232;
  font-size: 14px;
  font-style: normal;
  margin-left: 5px;
}
</style>
