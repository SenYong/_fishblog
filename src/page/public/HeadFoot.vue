<template>
  <div>
      <footer>
        <div class="footer-mid">
          <div class="link">
            <h2>友情链接</h2>
            <ul>
              <li><a href="/">杨青个人博客</a></li>
              <li><a >3DST技术服务中心</a></li>
            </ul>
          </div>
          <div class="visitors">
            <h2>最新评论</h2>
            <dl v-for="(item,index) in newArt">
              <dt><img :src="baseUrl+item.a_img"></dt>
              <dd>{{item.ac_name}}
                <time>{{item.ac_time}}</time>
              </dd>
              <dd>在 <a  class="title">{{item.a_name}} </a>中评论：</dd>
              <dd v-html="emoji(item.ac_content)"></dd>
            </dl>
          </div>
          <section class="flickr">
            <h2>摄影作品</h2>
            <ul>
              <li v-for="(item,index) in sayImg"><a  @click="navTo(item.s_id)" v-if="item.s_img != null"><img :src="baseUrl+item.s_img"></a></li>
            </ul>
          </section>
        </div>
        <div class="footer-bottom">
          <p>Copyright 2013 Design by <a href="http://www.yangqq.com">DanceSmile</a></p>
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
                console.log(res)
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
          //时间戳转换成时间
          timestampToTime (time) {
             var date = new Date(time * 1000);
             var year = date.getFullYear() + '-';
             var month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
             var day = date.getDate() + ' ';
             return year + month + day;
          },
          navTo(id){
            this.$router.push({ path: '/sayInfo', query: {id}});
          }
        }
    }
</script>