<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="topnews">
                  <h2><a href="{:U('/say')}">畅所欲言</a></h2>
                  <div id="list" v-if="list.length > 0"> 
                     <div class="mood" v-for="(item, index) in list">
                        <span class="tutime">{{item.s_time}}</span>
                        <p class="p1"><a style="cursor:pointer" @click="sayTo(item.s_id)" class="cont" v-html="emoji(item.s_content)"></a></p>
                        <img :src="baseUrl+item.s_img" class="sayImg" v-if="item.s_img">
                        <p class="p2"><a class="span1" href="">浏览({{item.s_hit}})</a><a class="span2" href="">评论({{item.s_num}})</a></p>
                      </div>
                  </div>
                  <div class="more" v-else>暂无说说</div>
                  <div class="more" @click="getMore()" v-if="isShow">查看更多</div>
               </div><!--topnews-->
            </div><!--l_box f_l-->
            <head-right></head-right>
        </article>
        <div class="clear"></div>
        <head-foot></head-foot>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import headFoot from './public/HeadFoot';
    import { getSayList } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                num: 0,
                page: 6,
                list: [],
                baseUrl,
                isShow: true
            }
        },
        components: {headTop, headRight, headFoot},
        created(){
           this.getData(this.num, this.page);
        },
        methods: {
            async getData(num,page){
                var res = JSON.parse(await getSayList({num,page}));
                if(res.errcode == 0){
                  if(res.data.length > 0){
                    for(var i = 0; i < res.data.length; i++){
                       res.data[i]['s_time'] = this.timestampToTime(res.data[i]['s_time']);
                    }
                    this.list = this.num == 0 ? res.data : this.list.concat(res.data);
                  }else{
                    this.isShow = false;
                  }
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
            sayTo(id){
               this.$router.push({ path: '/sayInfo', query: {id}});
            },
            //查看更多
            getMore(){
               this.num += 1;
               this.getData(this.num * this.page, this.page);
            }
        }
    }
</script>

<style>
    .sayImg{
      width:150px;
      height:150px;
      margin-bottom:20px;  
    }
</style>