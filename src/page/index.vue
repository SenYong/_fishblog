<template>
    <div>
        <head-top></head-top>
        <div id="mainbody">
          <div class="info">
            <figure> <img src="../images/art.jpg"  alt="Panama Hat">
              <figcaption><strong>渡人如渡己，渡已，亦是渡</strong> 当我们被误解时，会花很多时间去辩白。 但没有用，没人愿意听，大家习惯按自己的所闻、理解做出判别，每个人其实都很固执。与其努力且痛苦的试图扭转别人的评判，不如默默承受，给大家多一点时间和空间去了解。而我们省下辩解的功夫，去实现自身更久远的人生价值。其实，渡人如渡己，渡已，亦是渡人。</figcaption>
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
                info: ""
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
                    for(let i = 0; i < res[0].length; i++){
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
               var day = date.getDate() + ' ';
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
