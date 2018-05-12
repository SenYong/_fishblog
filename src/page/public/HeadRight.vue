<template>
    <div>
        <aside>
          <div class="tuijian">
            <h2>最新文章</h2>
            <ol>
              <li v-for="(item, index) in art"><span><strong>{{index+1}}</strong></span><a @click="navTo('/artInfo', item.a_id)" class="cur">{{item.a_name}}</a></li>
            </ol>
          </div>
          <div class="toppic">
            <h2>最新说说</h2>
            <ul>
              <li v-for="(item, index) in say">
                 <a class="cur" @click="navTo('/sayInfo', item.s_id)"><img :src="baseUrl+item.s_img" class="sayImg"><span v-html="emoji(item.s_content)"></span><p>生活点滴</p></a>
              </li>
            </ul>
          </div>
          <div class="clicks">
            <h2>最新日志</h2>
            <ol>
              <li v-for="(item, index) in log"><span><a class="cur" @click="navTo('/journalInfo', item.l_id)">慢生活</a></span><a class="cur">{{item.l_name}}</a></li>
            </ol>
          </div>
          <div class="search">
            <form class="searchform">
               <input type="text" v-model="search" @focus="onfocus" @blur="onblur">
            </form>
          </div>
          <div class="viny">
            <dl>
              <dt class="art"><img :src="songInfo.songImgUrl" alt="专辑"></dt>
              <dd class="icon-song"><span></span>{{songInfo.title}}</dd>
              <dd class="icon-artist"><span></span>歌手：{{songInfo.author}}</dd>
              <dd class="icon-album"><span></span>所属专辑：《赵小雷》</dd>
              <dd class="icon-like"><span></span><a href="/">喜欢</a></dd>
              <dd class="music">
                <audio :src="songInfo.audioUrl" controls autoplay></audio>
              </dd>
            </dl>
          </div>
        </aside>
    </div>
</template>

<script type="text/javascript">
   import { newArt, newLog, newSay, getCat, artHit, getMusic, searchMusic} from '../../api/getData';
   import { baseUrl } from '@/config/env';
   export default{
      data(){
        return {
          navBar: [{title: '最新文章', bool: true}, {title: '最新日志', bool: false}, {title: '最新说说', bool: false}],
          baseUrl,
          songInfo:{},
          search: "Search"
        }
      },
      computed:{
        art() { return this.$store.getters.art },
        say() { return this.$store.getters.say },
        log() { return this.$store.getters.log },
      },
      created(){
        if(Array.prototype.isPrototypeOf(this.$store.getters.art) && this.$store.getters.art.length === 0){
          this.$store.dispatch('newArts')
        }
        if(Array.prototype.isPrototypeOf(this.$store.getters.say) && this.$store.getters.say.length === 0){
          this.$store.dispatch('newSays')
        }
        if(Array.prototype.isPrototypeOf(this.$store.getters.log) && this.$store.getters.log.length === 0){
          this.$store.dispatch('newLogs')
        }
        if(JSON.stringify(this.$store.getters.info) == '{}'){
          this.$store.dispatch('getInfos')
        }
        //this.init(this.randomPlay());
      },
      methods: {
        //随机播放不同民风的歌曲
        //type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
        randomPlay (){
          var arr = [1,2,11,12,16,21,22,23,24,25];
          return arr[Math.floor(Math.random() * arr.length)]
        },
        onfocus (){
            this.search = "";
        },
        onblur(){
            if(this.search == "") return false;
            this.searchSong()
        },
        async searchSong(search){
            var res = JSON.parse(await searchMusic({search}));
            if(res.errcode == 0){
               this.songInfo = res;
            }
        },
        change(index){
          for(var i = 0; i < this.navBar.length; i++){
             this.navBar[i].bool = false;
          }
          this.navBar[index].bool = true;
        },
        navTo(path,id){
          this.$router.push({path, query:{id}})
        }
      } 
   }
</script>