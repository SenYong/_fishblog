<template>
   <div>
       <div class="r_box f_r">
         <div class="tit01">
              <h3>关注我</h3>
              <div class="gzwm">
                <ul>
                 <li><a class="xlwb" href="https://weibo.com/u/1854068535" target="_blank">新浪微博</a></li>
                 <li><a class="txwb" href="http://t.qq.com/sen1157927284" target="_blank">腾讯微博</a></li>
                 <li><a class="rss" href="#" target="_blank">RSS</a></li>
                 <li><a class="wx" href="#" target="_blank">邮箱</a></li>
                </ul>
              </div>
          </div> 
          <div class="ad300x100">
             <img src="../../assets/img/wh.jpg">
          </div>
          <div class="tab" id="lp_right_select">    
             <div class="tab-top">
                <ul class="hd" id="tb">
                  <li v-for="(item,index) in navBar" :class=" item.bool ? 'cur' : '' " @click="change(index)"><a>{{item.title}}</a></li>
              </ul>
            </div>
            <div class="tab-main" id="tb-main">
                <div class="bd bd-news" v-show="navBar[0].bool">
                  <ul>
                      <li v-for="(item, index) in art"><a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.a_name}}</a></li>
                  </ul>
                </div>
                <div class="bd bd-news" v-show="navBar[1].bool">
                   <ul>
                      <li v-for="(item, index) in log"><a href="{:U('/loginfo-'.$vo['l_id'])}">{{item.l_name}}</a></li>
                  </ul>
                </div>
                <div class="bd bd-news" v-show="navBar[2].bool">
                   <ul>
                      <li v-for="(item, index) in say"><a href="{:U('/sayinfo-'.$vo['s_id'])}">{{item.s_content}}</a></li>
                   </ul>
                </div>
            </div>
          </div>
          <div class="cloud">
               <h3>标签云</h3>
               <ul>
                  <li v-for="(item,index) in cat"><a href="{:U('/cat-'.$vo['c_id'])}">{{item.c_name}}</a></li>
              </ul>
          </div>
          <div class="tuwen">
             <h3>点击排行</h3>
             <ul>
                <li v-for="(item,index) in hit"><a href="{:U('/artinfo-'.$vo['a_id'])}"><img :src="baseUrl+item.a_img"><b>{{item.a_name}}</b></a>
                   <p>
                     <span class="tulanum"><a href="{:U('/cat-'.$vo['c_id'])}">{{item.c_name}}</a></span>
                     <span class="tutime">{{item.a_time}}</span>
                   </p>
                </li>
             </ul>
          </div>
          <div class="ad"><img src="../../assets/img/03.jpg"></div>
          <div class="links">
             <h3><span><a href="/">申请友情链接</a></span>友情链接</h3>
             <ul>
               <li><a href="/">醉牛逼的武魂生涯</a></li>
               <li><a href="/">观察者网</a></li>
               <li><a href="/">中国投资</a></li>
               <li><a href="/">强国论坛</a></li>
               <li><a href="/">车讯网</a></li>
               <li><a href="http://www.genban.org">跟版模板网</a></li>
               <li><a href="/">一带一路门户网</a></li>
             </ul>
          </div>
      </div>
      <div class="clear"></div>
   </div>
</template>

<script type="text/javascript">
   import { newArt, newLog, newSay, getCat, artHit} from '../../api/getData';
   import { baseUrl } from '../../config/env';
   export default{
      data(){
        return {
          navBar: [{title: '最新文章', bool: true}, {title: '最新日志', bool: false}, {title: '最新说说', bool: false}],
          art: [],
          log: [],
          say: [],
          cat: [],
          hit: [],
          baseUrl
        }
      },
      created(){
        this.init();
      },
      methods: {
        async init(){
            Promise.all([newArt(), newLog(), newSay(), getCat(), artHit()]).then( res => {
                for(var i = 0; i < res.length; i++){
                    res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   this.art = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.log = res[1].data;
                }
                if(res[2].errcode == 0){
                   this.say = res[2].data;
                }
                if(res[3].errcode == 0){
                   this.cat = res[3].data;
                }
                if(res[4].errcode == 0){
                   for(var i = 0; i < res[4].data.length; i++){
                     res[4].data[i].a_time = this.timestampToTime(res[4].data[i].a_time);
                   }
                   this.hit = res[4].data;
                }
                console.log(res)
            })
        },
        change(index){
          for(var i = 0; i < this.navBar.length; i++){
             this.navBar[i].bool = false;
          }
          this.navBar[index].bool = true;
        },
        //时间戳转换成时间
        timestampToTime (time) {
          var date = new Date(time * 1000);
          var year = date.getFullYear() + '-';
          var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          var day = date.getDate() + ' ';
          return year + month + day;
        },
      } 
   }
</script>