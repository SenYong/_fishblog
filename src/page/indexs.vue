<template>
    <div>
        <!-- <header>
          <nav id="nav">
            <ul>
              <li><a href="/" >网站首页</a></li>
              <li><a href="/download/" target="_blank" title="个人博客模板">个人博客模板</a></li>
              <li><a href="/book/" target="_blank" title="图书推荐">图书推荐</a></li>
              <li><a href="/web/" target="_blank" title="网站建设">网站建设</a></li>
              <li><a href="/newshtml5/" target="_blank" title="HTML5 / CSS3">HTML5 / CSS3</a></li>
              <li><a href="/jstt/" target="_blank" title="技术探讨">技术探讨</a></li>
              <li><a href="/news/s/" target="_blank" title="慢生活">慢生活</a></li>
              <li><a href="/newstalk/" target="_blank" title="碎言碎语">碎言碎语</a></li>
              <li><a href="/news/jsex/" target="_blank" title="JS 实例代码演示">JS实例</a></li>
            </ul>
          </nav>
        </header> -->
        <div id="mainbody">
          <div class="info">
            <figure> <img src="../images/art.jpg"  alt="Panama Hat">
              <figcaption><strong>渡人如渡己，渡已，亦是渡</strong> 当我们被误解时，会花很多时间去辩白。 但没有用，没人愿意听，大家习惯按自己的所闻、理解做出判别，每个人其实都很固执。与其努力且痛苦的试图扭转别人的评判，不如默默承受，给大家多一点时间和空间去了解。而我们省下辩解的功夫，去实现自身更久远的人生价值。其实，渡人如渡己，渡已，亦是渡人。</figcaption>
            </figure>
            <div class="card">
              <h1>我的名片</h1>
              <p>网名：DanceSmile | 即步非烟</p>
              <p>职业：Web前端设计师、网页设计</p>
              <p>电话：13662012345</p>
              <p>Email：dancesmiling@qq.com</p>
              <ul class="linkmore">
                <li><a href="/" class="talk" title="给我留言"></a></li>
                <li><a href="/" class="address" title="联系地址"></a></li>
                <li><a href="/" class="email" title="给我写信"></a></li>
                <li><a href="/" class="photos" title="生活照片"></a></li>
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
                      <h2 class="titles"><a href="/" target="_blank">{{item.a_name}}</a></h2>
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
        <!-- <footer>
          <div class="footer-mid">
            <div class="links">
              <h2>友情链接</h2>
              <ul>
                <li><a href="/">杨青个人博客</a></li>
                <li><a href="http://www.3dst.com">3DST技术服务中心</a></li>
              </ul>
            </div>
            <div class="visitors">
              <h2>最新评论</h2>
              <dl>
                <dt><img src="images/s8.jpg">
                <dt>
                <dd>DanceSmile
                  <time>49分钟前</time>
                </dd>
                <dd>在 <a href="http://www.yangqq.com/jstt/bj/2013-07-28/530.html" class="title">如果要学习web前端开发，需要学习什么？ </a>中评论：</dd>
                <dd>文章非常详细，我很喜欢.前端的工程师很少，我记得几年前yahoo花高薪招聘前端也招不到</dd>
              </dl>
              <dl>
                <dt><img src="images/s7.jpg">
                <dt>
                <dd>yisa
                  <time>2小时前</time>
                </dd>
                <dd>在 <a href="http://www.yangqq.com/news/s/2013-07-31/533.html" class="title">芭蕾女孩的心事儿</a>中评论：</dd>
                <dd>我手机里面也有这样一个号码存在</dd>
              </dl>
              <dl>
                <dt><img src="images/s6.jpg">
                <dt>
                <dd>小林博客
                  <time>8月7日</time>
                </dd>
                <dd>在 <a href="http://www.yangqq.com/jstt/bj/2013-06-18/285.html" class="title">如果个人博客网站再没有价值，你还会坚持吗？ </a>中评论：</dd>
                <dd>博客色彩丰富，很是好看</dd>
              </dl>
            </div>
            <section class="flickr">
              <h2>摄影作品</h2>
              <ul>
                <li><a href="/"><img src="images/01.jpg"></a></li>
                <li><a href="/"><img src="images/02.jpg"></a></li>
                <li><a href="/"><img src="images/03.jpg"></a></li>
                <li><a href="/"><img src="images/04.jpg"></a></li>
                <li><a href="/"><img src="images/05.jpg"></a></li>
                <li><a href="/"><img src="images/06.jpg"></a></li>
                <li><a href="/"><img src="images/07.jpg"></a></li>
                <li><a href="/"><img src="images/08.jpg"></a></li>
                <li><a href="/"><img src="images/09.jpg"></a></li>
              </ul>
            </section>
          </div>
          <div class="footer-bottom">
            <p>Copyright 2013 Design by <a href="http://www.yangqq.com">DanceSmile</a></p>
          </div>
        </footer> -->
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRights';
    import headFoot from './public/HeadRight';
    import { getArticle, newArt, newLog, newSay } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                list: [],
                baseUrl
            }
        },
        components: {headTop, headRight, headFoot},
        created(){
           this.init();
        },
        methods: {
           async init(){
             var res = JSON.parse(await getArticle());
             if(res.errcode == 0){
                for(var i = 0; i < res.data.length; i++){
                    res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                }
                this.list = res.data;
             }else{
                this.$message.error(res.msg);
             }
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
           }
        }
    }
</script>
<style lang="css" scoped>
@import "../style/styles.css";
@import "../style/animation.css";
@import "../style/lrtk.css";
</style>