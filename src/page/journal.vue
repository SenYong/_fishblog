<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
                <div class="topnews">
                    <h2><a href="{:U('/article')}">抚今追昔</a></h2>
                    <div id="list" v-if="list.length > 0">
                        <div class="blogs" v-for="(item,index) in list">
                            <figure><img :src="baseUrl+item.l_img"></figure>
                            <ul>
                                <h3><a @click="logTo(item.l_id)">{{item.l_name}}</a></h3>
                                <p>{{item.l_desc}}</p>
                                <p class="autor">
                                    <span class="lm f_l"><a href="/">{{item.l_name}}</a></span>
                                    <span class="dtime f_l">{{item.l_time}}</span>
                                    <span class="viewnum f_r">浏览（<a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.l_hit}}</a>）</span>
                                    <span class="pingl f_r">评论（<a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.l_num}}</a>）</span>
                                </p>
                            </ul>
                        </div>
                    </div>
                    <div class="more" v-else>暂无日志</div>
                    <div class="more" v-if="isShow">查看更多</div>
                </div><!--topnews-->
            </div><!--l_box f_l-->
        </article>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import { getLogList } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
       data(){
         return {
            list: [],
            num: 0,
            page: 2,
            baseUrl,
            isShow: true
         }
       },
       components: {headTop},
       created(){
          this.getData(this.num, this.page);
       },
       methods:{
          async getData(num, page){
            var res = JSON.parse(await getLogList({num,page}));
            if(res.errcode == 0){
                if(res.data.length > 0){
                    for(var i = 0; i < res.data.length; i++){
                       res.data[i]['l_time'] = this.timestampToTime(res.data[i]['l_time']);
                    }
                    this.isShow = true;
                    this.list = res.data;
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
          logTo(id){
             this.$router.push({ path: '/journalInfo', query: {id}});
          }
       }
    }
</script>