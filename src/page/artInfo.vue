<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                    <h2 class="t_nav"><a href="/">网站首页</a><a href="/">慢生活</a></h2>
                    <input type="hidden" value="{$info.a_id}" id="ac_pid">
                    <input type="hidden" value="" id="ac_name">
                    <input type="hidden" value="" id="ac_img">
                    <div class="artContent">
                        <div class="artTitle">{{artData.a_name}}</div>
                        <p class="box">发布时间：{{artData.a_time}}<span>编辑：{{artData.a_root}}</span>阅读（{{artData.a_hit}}）</p>
                        <div class="info" v-html="artData.a_content"></div>
                    </div>
                    <div class="copyright_author">
                        <p>
                          <strong>版权声明：</strong>
                          本站原创文章，于{{artData.a_time}}，由
                          <a>{{artData.a_root}}</a>
                          发表
                        </p>
                        <p class="p-hidden">
                          <strong>转载请注明：</strong>
                          <a>{{artData.a_name}}</a>
                           | 
                          <a href="https://www.fishblog.top/">小鱼博客</a>
                        </p>
                    </div>   
                    <div class="nextpage" v-if="next">
                        <b>上一篇:</b>
                        <a @click="ArtTo(next.a_id)">{{next.a_name}}</a>
                    </div>
                    <div class="nextpage" v-if="prev">
                          <b>下一篇:</b>
                          <a @click="ArtTo(prev.a_id)">{{prev.a_name}}</a>
                    </div>
                    <div class="cont">
                     <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="ac_content"></el-input>
                     <div class="icon clearfix">
                      <i class="icon iconfont icon-face" @click="showEmoji = !showEmoji"></i>
                      <el-button type="success" size="small" @click="submit" class="submit">提交</el-button>
                      <transition name="fade" mode="">
                         <div class="emoji-box" v-if="showEmoji" >
                            <el-button  class="pop-close"  :plain="true"  type="danger"  size="mini" icon="close" @click="showEmoji = false"></el-button>
                            <vue-emoji @select="selectEmoji"></vue-emoji>
                            <span class="pop-arrow arrow"></span>
                         </div>       
                      </transition>
                    </div>
                  </div>  
                  <div class="board" v-if="comment.length > 0">
                    <div class="titles">
                       <div class="lt">评论</div>
                       <div class="rt"><span>{{comment.length}}</span>人参与,<span>{{comment.length}}</span>条评论</div>
                    </div>
                      <div class="bList" v-for="(item, index) in comment">
                         <div class="lItem">
                             <img :src="baseUrl+item.ac_img" class="logo">
                             <div class="lCont">
                                <p class="p1">
                                  <span class="s1"><b class="name">{{item.ac_name}}</b>[{{item.ac_city}}]</span>
                                  <span class="s2">{{item.ac_time}}</span>
                                </p>
                                <p class="p2" v-html="emoji(item.ac_content)"></p>
                             </div>
                         </div>
                         <div class="lItem rItem" v-if="item.ac_retime">
                           <img :src="baseUrl + item.ac_reimg" class="logo">
                           <div class="lCont">
                              <p class="p1">
                                <span class="s1"><b class="name">{{item.ac_rename}}</b>回复<b class="name1">{{item.ac_name}}</b></span>
                                <span class="s2">{{item.ac_retime}}</span>
                              </p>
                              <p class="p2" v-html="emoji(item.ac_recontent)"></p>
                           </div>
                         </div>
                      </div>
                  </div>
               </div><!--topnews-->
            </div><!--l_box f_l-->
            <head-right @select="select"></head-right>
        </article>
        <div class="clear"></div>
        <head-foot></head-foot>
    </div>
</template>
<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import vueEmoji from '@/components/emoji.vue';
    import { artDetail, prevArt, nextArt, addArtHit, userArtComment, getAllUser} from '@/api/getData';
    import { baseUrl } from '@/config/env';
    export default{
       data(){
         return {
            artData:{},
            prev: {},
            next: {},
            showEmoji: false,
            ac_content: '',
            data: [],
            ac_pid: '',
            comment: [],
            baseUrl
         }
       },
       components: {headTop, headRight, headFoot, vueEmoji},
       created(){
          if(this.$route.query.id){
             this.ac_pid = this.$route.query.id;
             this.getData(this.$route.query.id);
          }
       },
       methods: {
          async getData(id){
             Promise.all([artDetail({id}), prevArt({id}), nextArt({id}), getAllUser({id}), addArtHit({id})]).then(res=>{
                for(var i = 0; i < res.length; i++){
                   res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   res[0].data.a_time = this.timestampToTime(res[0].data.a_time);
                   this.artData = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.prev = res[1].data;
                }
                if(res[2].errcode == 0){
                   this.next = res[2].data;
                }
                if(res[3].errcode == 0){
                   for(var i = 0; i < res[3].data.length; i++){
                      res[3].data[i].ac_time = this.timestampToTime(res[3].data[i].ac_time);
                      res[3].data[i].ac_retime = res[3].data[i].ac_retime ? this.timestampToTime(res[3].data[i].ac_retime) : '';
                   }
                   this.comment = res[3].data;
                }
             })
          },
          ArtTo(id){
              this.$router.push({ path: '/artInfo', query: {id}});
              Promise.all([artDetail({id}), prevArt({id}), nextArt({id}), getAllUser({id}), addArtHit({id})]).then(res=>{
                for(var i = 0; i < res.length; i++){
                   res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                   res[0].data.a_time = this.timestampToTime(res[0].data.a_time);
                   this.artData = res[0].data;
                }
                if(res[1].errcode == 0){
                   this.prev = res[1].data;
                }
                if(res[2].errcode == 0){
                   this.next = res[2].data;
                }
                if(res[3].errcode == 0){
                   for(var i = 0; i < res[3].data.length; i++){
                      res[3].data[i].ac_time = this.timestampToTime(res[3].data[i].ac_time);
                      res[3].data[i].ac_retime = res[3].data[i].ac_retime ? this.timestampToTime(res[3].data[i].ac_retime) : '';
                   }
                   this.comment = res[3].data;
                }
             })
          },
          selectEmoji (code) {
            this.showEmoji = false
            this.ac_content += code
          },
          //提交
          async submit () {
            if(this.ac_content == ''){
               this.$message.success('回复内容不能为空');
               return false;
            }
            var data = {};
            var ran = 1 + Math.ceil(Math.random() * 199);
            data.ac_pid = this.ac_pid;
            data.ac_name = '游客';
            data.ac_img = '/public/static/default/'+ ran +'.png';
            data.ac_content = this.ac_content;
            var res = JSON.parse(await userArtComment(data));
            if(res.errcode == 0){
               var allUser = JSON.parse(await(getAllUser({id: this.ac_pid})));
               if(allUser.errcode == 0){
                   for(var i = 0; i < allUser.data.length; i++){
                      allUser.data[i].ac_time = this.timestampToTime(allUser.data[i].ac_time);
                      allUser.data[i].ac_retime = allUser.data[i].ac_retime ? this.timestampToTime(allUser.data[i].ac_retime) : '';
                   }
                   this.comment = allUser.data;
               }
               this.$message.success(res.msg);
            }else{
               this.$message.error(res.msg);
            }
            this.ac_content = ''
          },
          //选择
          select(id){
            this.ArtTo(id)
          }
       }
    }
</script>

<style lang="scss">
ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.cont {
  .icon {
    position: relative;
    margin-top: 20px;
    .iconfont {
      cursor: pointer;
      color: #F7BA2A;
    }
    .emoji-box {
      position: absolute;
      z-index: 10;
      left: -10px;
      top: 24px;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;
      .el-button {
        position: absolute;
        border: none;
        color: #FF4949;
        right: 12px;
        top: 12px;
        z-index: 10;
      }
      .arrow {
        left: 10px;
      }
    }
    .submit {
      float: right;
    }
  }
  .comment {
    margin-top: 20px;
    .item {
      margin-top: 20px;
      padding: 10px;
      margin: 0;
      border-top: 1px solid #bfcbd9;
    }
  }
}

.clearfix {
  &:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}

.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter, .fade-leave-active { opacity: 0; }
.fade-move { transition: transform .4s; }

.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter, .list-leave-active { opacity: 0; transform: translateX(30px); }
.list-leave-active { position: absolute !important; }
.list-move { transition: all .5s;}
h2.t_nav { border-bottom: #247979 3px solid; font-size: 12px; font-weight: normal; line-height: 48px; height: 40px }
h2.t_nav a { padding: 10px; }
h2.t_nav a:first-child { background: #247979; color: #fff; }
h2.t_nav a:last-child { background: #59BCBC; color: #fff; }
.box { border: #ccc 1px dashed; text-align: center; padding: 5px 0; margin: 0 30px 10px 30px; color: #666 }
.box span { margin: 0 10px }
.l_box .info{width: 670px;}
</style>
