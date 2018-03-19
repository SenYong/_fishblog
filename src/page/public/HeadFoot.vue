<template>
  <div>
      <footer>
        <div class="footer-mid">
          <div class="link">
            <h2>友情链接</h2>
            <ul>
              <li><a href="/">小鱼博客1.0版本</a></li>
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
          <p>Copyright 2018 Design by <a href="http://www.yangqq.com">小鱼博客</a></p>
        </div>
    </footer>
  </div>
</template>
<script>
    import { newArtComment, getSayList } from "../../api/getData";
    import { baseUrl } from "../../config/env"
    export default{
        data(){
            return {
               newArt: [],
               baseUrl,
               num: 0,
               page: 9,
               sayImg: []
            }
        },
        created(){
          this.init(this.num, this.page);
        },
        methods:{
          async init(num, page){
            Promise.all([newArtComment(), getSayList({num, page})]).then(res => {
                for(let i = 0; i < res.length; i++){
                    res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   for(let i = 0; i < res[0].data.length; i++){
                      res[0].data[i]["ac_time"] = this.timestampToTime(res[0].data[i]["ac_time"]);
                   }
                   this.newArt = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.sayImg = res[1].data;
                }
            })
          },
          navTo(path, id){
            this.$router.push({ path, query: {id}});
          }
        }
    }
</script>