<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
               <div class="banner">
                    <div id="slide-holder">
                        <div id="slide-runner">
                           <a href="/" target="_blank">
                               <img id="slide-img-1" src="../assets/img/a1.jpg">
                            </a>
                            <a href="/" target="_blank">
                               <img id="slide-img-2" src="../assets/img/a2.jpg">
                            </a>
                            <a href="/" target="_blank">
                               <img id="slide-img-3" src="../assets/img/a3.jpg">
                            </a>
                            <a href="/" target="_blank">
                               <img id="slide-img-4" src="../assets/img/a4.jpg">
                            </a>
                            <div id="slide-controls" style="display:block;">
                                <p id="slide-client" class="text">
                                    <strong></strong>
                                     <span></span>
                                </p>
                                <p id="slide-desc" class="text"></p>  
                                <p id="slide-nav"></p>                          
                            </div>
                       </div> 
                    </div>
                </div>
                <div class="topnews">
                    <h2>文章推荐</h2>
                    <div class="blogs" v-for="(item, index) in list">
                        <figure><img :src="baseUrl+item.a_img"></figure>
                        <ul>
                            <h3><a @click="artDetail(item.a_id)">{{item.a_name}}</a></h3>
                            <p>{{item.a_desc}}</p>
                            <p class="autor">
                                <span class="lm f_l"><a href="/">{{item.a_keyword}}</a></span>
                                <span class="dtime f_l">{{item.a_time}}</span>
                                <span class="viewnum f_r">浏览（<a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.a_hit}}</a>）</span>
                                <span class="pingl f_r">评论（<a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.a_num}}</a>）</span>
                            </p>
                        </ul>
                    </div>
                </div><!--topnews-->
            </div><!--l_box f_l-->
            <head-right></head-right>
        </article>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import { getArticle, newArt, newLog, newSay } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
        data(){
            return {
                list: [],
                baseUrl
            }
        },
        components: {headTop, headRight},
        created(){
           this.init();
        },
        methods: {
           async init(){
             var res = JSON.parse(await getArticle());
             if(res.errcode == 0){
                for(var i = 0; i < res.data.length; i++){
                    res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                }
                this.list = res.data;
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
           artDetail(id){
              this.$router.push({ path: '/artInfo', query: {id}});
           }
        }
    }
</script>