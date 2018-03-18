<template>
    <div>
        <head-top></head-top>
        <div id="mainbody">
          <div class="info">
            <figure> <img src="../images/index.png"  alt="Panama Hat">
              <figcaption><strong>致我们终将逝去的青春</strong> 这个世界上总有那么一个人，是你的念想，是你的温暖。就算她不远不近，只要想到她，就永远会觉得安定，觉得踏实，觉得心里有底。甚至连周围的空气，都变得笃定。世界只是一些影影绰绰的温柔。河还是原来的河，人还是原来的人。我仍然为你守候，那些小幸福，我认真，你随意。</figcaption>
            </figure>
            <div class="card">
              <h1>我的名片</h1>
              <p>姓名：{{info.username}}</p>
              <p>网名：{{info.netname}}</p>
              <p>职业：{{info.profession}}</p>
              <p>QQ：{{info.qq}}</p>
              <ul class="linkmore">
                <li><a @click="navTo('/board')" class="talk" title="给我留言"></a></li>
                <li><a @click="navTo('/abouts')" class="address" title="关于我"></a></li>
                <!--<li><a href="/" class="email" title="给我写信"></a></li>-->
                <!--<li><a href="/" class="photos" title="生活照片"></a></li>-->
                <li><a href="/" class="heart" title="关注我"></a></li>
              </ul>
            </div>
          </div>
          <!--info end-->
          <div class="blank"></div>
          <div class="blog">
                <ul class="bloglist">
                  <li v-for="(item, index) in list">
                    <div class="arrow_box">
                      <div class="ti"></div>
                      <div class="ci"></div>
                      <h2 class="titles"><a @click="artDetail(item.a_id)" target="_blank">{{item.a_name}}</a></h2>
                      <ul class="textinfo">
                        <a href="/"><img :src="baseUrl+item.a_img"></a>
                        <p> {{item.a_desc}}</p>
                      </ul>
                      <ul class="details">
                        <li class="likes"><a href="#">{{item.a_hit}}</a></li>
                        <li class="comments"><a href="#">{{item.a_num}}</a></li>
                        <li class="icon-time"><a href="#">{{item.a_time}}</a></li>
                      </ul>
                    </div>
                  </li>
                </ul>
                <!--bloglist end-->
                <head-right></head-right>
            </div>
        </div>
        <head-foot></head-foot>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import { getArticle, newArt, newLog, newSay, getInfo } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                list: [],
                baseUrl,
                page: 8,
                num: 0,
                info: "",
                total: 150,     // 记录总条数
                display: 10,   // 每页显示条数
                current: 1,   // 当前的页数
            }
        },
        components: {headTop, headRight, headFoot},
        created(){
           this.init(this.num, this.page);
        },
        methods: {
           async init(num, page){
             Promise.all([getArticle({num, page}), getInfo()]).then(res => {
                for(let i = 0; i < res.length; i++){
                   res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){

                    for(let i = 0; i < res[0].data.length; i++){
                        res[0].data[i]["a_time"] = this.timestampToTime(res[0].data[i]["a_time"]);
                    }
                    this.list = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.info = res[1].data[0];
                }
             })
           },
           //时间戳转换成时间
           timestampToTime (time) {

               var date = new Date(time * 1000);
               var year = date.getFullYear() + '-';
               var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
               var day = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
               return year + month + day;
           },
           artDetail(id){
              this.$router.push({ path: '/artInfo', query: {id}});
           },
           navTo (path){
              this.$router.push(path);
           }
        }
    }
</script>
