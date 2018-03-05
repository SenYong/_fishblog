<template>
    <div class="abouts">
        <head-top></head-top> 
        <div class="mainContent">
            <aside>
                <div class="avatar">
                  <a href="#"><span>青轻飞扬</span></a>
                </div>
                <section class="topspaceinfo">
                  <h1>{{info.motto}}</h1>
                  <p>{{info.saying}}</p>
                </section>
                <div class="userinfo"> 
                  <p class="q-fans"> 浏览量：<a href="/" target="_blank">{{info.hit}}</a></p> 
                  <p class="btns"><a href="{:U('/index')}">首页</a><a href="{:U('/board')}">留言</a><a href="/" target="_blank">相册</a></p>   
                </div>
                <section class="newpic">
                   <h2>最新照片</h2>
                   <ul>
                      <li v-for="(item,index) in imgList">
                         <a href="{:U('/artinfo-'.$vo['a_id'])}" v-if="item.s_img"><img :src="baseUrl+item.s_img"></a>
                      </li>
                   </ul>
                </section>
                <section class="taglist">
                   <h2>全部标签</h2>
                   <ul>
                       <li><a href="/" v-for="(item,index) in info.keyword">{{item}}</a></li>
                  </ul>
                </section>
            </aside>
            <div class="blogitem">
                <article>
                    <h2 class="title"><a href="/">关于我</a></h2>
                    <ul class="text">
                      <p><span>个人资料</span>：男，活泼的90后，射手座，IT界中打着瞌睡敲代码且最不着调的程序员~W_W~</p>
                      <p><span>爱好</span>：发呆、睡觉、打游戏、敲代码</p>
                      <p><span>个人简介</span>：90后，IT boy，手机控、电脑控、游戏控、仙侠小说控，喜欢自嘲、喜欢嘲讽、喜欢开玩笑、喜欢敲代码(此处省略一万字...)，业余时间唱歌、吃饭、看电影都是我的最爱，从业IT行业已经2年多了。从搬砖一样的生活方式换成了现在有"单"而居的日子。跟我的职业相比，告别了朝九晚五，躲过了风吹日晒，虽然不再有阶梯式的工资，但是偶尔可以给自己放放假，一起轻装旅行。人生就是一个得与失的过程，而我却是一个幸运者，得到的永远比失去的多。虽然刚开始入行时很辛苦，但是我仍然很享受那些熬得只剩下黑眼圈的日子，因为我在学习html、css、js、php...中激发了兴趣，然后越走越远...始终坚持原则问题，喜欢一句话"冥冥中该来则来，无处可逃"。。。</p>
                      <p><span>技能</span>：html、css、js、node.js、php、vue、jquery、bootstrap、thinkphp、tcp/ip、websocket</p>
                    </ul>
                </article>
            </div>
        </div>
        <footer>
           <div class="footavatar">
             <img :src="baseUrl+info.img" class="footphoto">
             <ul class="footinfo">
               <p class="fname"><a href="/dancesmile" >{{info.netname}}</a>  </p>
               <p class="finfo">职业: {{info.profession}}</p>
               <p>QQ：{{info.qq}}</p></ul>
           </div>
           <section class="visitor">
             <h2>最近访客</h2>
              <ul>
                <li><a href="/"><img src="__IMG__/s0.jpg"></a></li>
                <li><a href="/"><img src="__IMG__/s7.jpg"></a></li>
              </ul>
           </section>
           <div class="Copyright">
             <ul>
                Design by：{{info.title}}
             </ul>
           </div>
        </footer>
    </div>
</template>
<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headFoot from './public/HeadFoot';
    import { baseUrl } from '../config/env';
    import { getInfo, addAboutHit, getSayList } from '../api/getData';
    export default{
        data(){
            return {
                info: {},
                baseUrl,
                num: 0,
                page: 4,
                imgList: [],
                keyword: []
            }
        },
        components: {headTop, headFoot},
        created(){
           this.getData();
        },
        methods: {
           async getData(){
             Promise.all([ getInfo(), getSayList({num: this.num, page: this.page}) ]).then(res => {
                for(var i = 0; i < res.length; i++){
                   res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   res[0].data[0]['keyword'] = res[0].data[0]['keyword'].split(',');
                   this.info = res[0].data[0];
                }
                if(res[1].errcode == 0){
                   for(var i = 0; i < res[1].data.length; i++){
                     res[1].data[i]['s_img'] = res[1].data[i]['s_img'] ? res[1].data[i]['s_img'] : '';
                   }
                   this.imgList = res[1].data;
                }
             })
           }
        }
    }
</script>