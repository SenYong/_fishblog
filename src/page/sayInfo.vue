<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                  <h2><a href="{:U('/say')}">畅所欲言</a>  >  详情</h2>
                  <div class="mood">
                      <span class="tutime">{{sayData.s_time}}</span>
                      <p class="p1"><a href="#" class="cont">{{sayData.s_content}}</a></p>
                      <img :src="baseUrl+sayData.s_img" class="sayImg" v-if="sayData.s_img">
                      <p class="p2"><a class="span1" href="">浏览({{sayData.s_hit}})</a><a class="span2" href="">评论({{sayData.s_num}})</a></p>
                  </div> 
                  <div class="nextpage" v-if="prev">
                    <b>上一条:</b>
                    <a @click="LogTo(prev.s_id)">{{prev.s_content}}</a>
                  </div>
                   <div class="nextpage" v-if="prev">
                      <b>下一篇:</b>
                      <a @click="LogTo(prev.l_id)">{{prev.l_name}}</a>
                  </div>
                  <!-- <div class="cont">
                    <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 20}" placeholder="请输入内容" resize="none" v-model="lc_content"></el-input>
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
                  </div>  --> 
                  <!-- <div class="board" v-if="comment.length > 0">
                      <div class="titles">
                         <div class="lt">评论</div>
                         <div class="rt"><span>{{comment.length}}</span>人参与,<span>{{comment.length}}</span>条评论</div>
                      </div>
                      <div class="bList" v-for="(item, index) in comment">
                         <div class="lItem">
                             <img :src="baseUrl+item.lc_img" class="logo">
                             <div class="lCont">
                                <p class="p1">
                                  <span class="s1"><b class="name">{{item.lc_name}}</b>[{{item.lc_ip}}]</span>
                                  <span class="s2">{{item.lc_time}}</span>
                                </p>
                                <p class="p2" v-html="emoji(item.lc_content)"></p>
                             </div>
                         </div>
                         <div class="lItem rItem" v-if="item.lc_retime">
                            <img :src="baseUrl + item.lc_reimg" class="logo">
                            <div class="lCont">
                               <p class="p1">
                                 <span class="s1"><b class="name">{{item.lc_rename}}</b>回复<b class="name1">{{item.lc_name}}</b></span>
                                 <span class="s2">{{item.lc_retime}}</span>
                               </p>
                               <p class="p2" v-html="emoji(item.lc_recontent)"></p>
                            </div>
                         </div>
                      </div>
                  </div> -->
               </div><!--topnews-->
            </div><!--l_box f_l-->
            <head-right></head-right>
        </article>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import vueEmoji from '../components/emoji.vue';
    import { sayDetail, prevSay } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
              sayData: {},
              sc_id: '',
              baseUrl,
              next: {},
              prev: {}
            }
        },
        components: {headTop, headRight, vueEmoji},
        created(){
            if(this.$route.query.id){
               this.sc_id = this.$route.query.id;
               this.getData(this.$route.query.id);
            }
        },
        methods: {
            async getData(id){
                Promise.all([sayDetail({id}), prevSay({id})]).then(res => {
                    for(var i = 0; i < res.length; i++){
                        res[i] = JSON.parse(res[i]);
                    }
                    if(res[0].errcode == 0){
                       res[0].data['s_time'] = this.timestampToTime(res[0].data['s_time']);
                       this.sayData = res[0].data;
                    }
                    if(res[1].errcode == 0){
                       this.prev = res[1].data;
                    }
                    console.log(this.prev)
                    //console.log(res)
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
        }
    }
</script>

<style>
    .sayImg{
      width:100px;
      height:100px;
      margin-bottom:20px;  
    }
</style>