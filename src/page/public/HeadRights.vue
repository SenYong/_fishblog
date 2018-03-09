<template>
    <div>
        <aside>
              <div class="tuijian">
                <h2>最新文章</h2>
                <ol>
                  <!-- <li v-for="(item, index) in art"><span><strong>{{index+1}}</strong></span><a href="/">{{item.a_name}}</a></li> -->
                </ol>
              </div>
              <div class="toppic">
                <h2>最新说说</h2>
                <ul>
                  <li v-for="(item, index) in say">
                     <!-- <a href="/"><img :src="baseUrl+item.s_img">{{item.s_content}}<p>伤不起</p></a> -->
                  </li>
                </ul>
              </div>
              <div class="clicks">
                <h2>最新日志</h2>
                <ol>
                  <!-- <li v-for="(item, index) in log"><span><a href="/">慢生活</a></span><a href="/">{{item.l_name}}</a></li> -->
                </ol>
              </div>
              <div class="search">
                <form class="searchform" method="get" action="#">
                  <input type="text" name="s" value="Search" onfocus="this.value=''" onblur="this.value='Search'">
                </form>
              </div>
              <div class="viny">
                <dl>
                  <dt class="art"><img src="images/artwork.png" alt="专辑"></dt>
                  <dd class="icon-song"><span></span>南方姑娘</dd>
                  <dd class="icon-artist"><span></span>歌手：赵雷</dd>
                  <dd class="icon-album"><span></span>所属专辑：《赵小雷》</dd>
                  <dd class="icon-like"><span></span><a href="/">喜欢</a></dd>
                  <dd class="music">
                    <audio src="images/nf.mp3" controls></audio>
                  </dd>
                </dl>
              </div>
        </aside>
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
        navTo(path,id){
          this.$router.push({path, query:{id}})
        }
      } 
   }
</script>