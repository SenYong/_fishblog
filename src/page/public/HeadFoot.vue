<template>
  <div>
      <footer>
        <div class="footer-mid">
          <div class="link">
            <h2>友情链接</h2>
            <ul>
              <li><a href="http://www.fishblog.com">小鱼博客1.0版本</a></li>
            </ul>
          </div>
          <div class="visitors">
            <h2>最新评论</h2>
            <dl v-for="(item,index) in newArt">
              <dt><img :src="baseUrl+item.a_img"></dt>
              <dd>{{item.ac_name}}
                <time>{{item.ac_time}}</time>
              </dd>
              <dd>在 <a  class="title cur" @click="navTo('/artInfo', item.a_id)">{{item.a_name}} </a>中评论：</dd>
              <dd v-html="emoji(item.ac_content)"></dd>
            </dl>
          </div>
          <section class="flickr">
            <h2>摄影作品</h2>
            <ul>
              <li v-for="(item,index) in sayImg"><a  @click="navTo('/sayInfo', item.s_id)" v-if="item.s_img != null"><img :src="baseUrl+item.s_img"></a></li>
            </ul>
          </section>
        </div>
        <div class="footer-bottom">
          <p>Copyright 2018 Design by <a href="http://www.fishblogs.com">小鱼博客</a></p>
        </div>
    </footer>
  </div>
</template>
<script type="text/javascript">
    import { newArtComment, getSayList } from "../../api/getData";
    import { baseUrl } from "@/config/env"
    export default{
        data(){
          return {
             baseUrl,
             num: 0,
             page: 9,
          }
        },
        computed: {
          newArt() { return this.$store.getters.newArt },
          sayImg() { return this.$store.getters.sayImg }
        },
        created(){
          if(Array.prototype.isPrototypeOf(this.$store.getters.newArt) && this.$store.getters.newArt){
            this.$store.dispatch('newComment')
          }
          if(Array.prototype.isPrototypeOf(this.$store.getters.sayImg) && this.$store.getters.sayImg){
            this.$store.dispatch('newSayImg', {
              num: this.num,
              page: this.page
            })
          }
        },
        methods:{
          navTo(path, id){
            this.$router.push({ path, query: {id}});
          }
        }
    }
</script>