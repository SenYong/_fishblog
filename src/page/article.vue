<template>
    <div>
        <head-top></head-top>
        <article>
            <div class="l_box f_l">
                <div class="topnews">
                    <h2>
                       <span>
                           <a v-for="(item, index) in cat" @click="catTo(item.c_id)">{{item.c_name}}</a>
                       </span>   
                       <a @click="catTo('')" style="color:red;">技术心得</a>
                    </h2>
                    <div id="list" v-if="list.length > 0">
                        <div class="blogs" v-for="(item, index) in list">
                            <figure><img :src="baseUrl+item.a_img"></figure>
                            <ul>
                                <h3><a @click="artTo(item.a_id)">{{item.a_name}}</a></h3>
                                <p>{{item.a_desc}}</p>
                                <p class="autor">
                                    <span class="lm f_l"><a href="/">{{item.c_name}}</a></span>
                                    <span class="dtime f_l">{{item.a_time}}</span>
                                    <span class="viewnum f_r">浏览（<a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.a_hit}}</a>）</span>
                                    <span class="pingl f_r">评论（<a href="{:U('/artinfo-'.$vo['a_id'])}">{{item.a_num}}</a>）</span>
                                </p>
                            </ul>
                        </div>
                   </div>
                   <div class="more" v-else>暂无文章</div>
                   <div class="more" @click="getMore()" v-if="isShow">查看更多</div>
                </div><!--topnews-->
            </div><!--l_box f_l-->
            <head-right></head-right>
        </article>
    </div>
</template>

<script type="text/javascript">
    import headTop from './public/HeadTop';
    import headRight from './public/HeadRight';
    import { getArtList, getCat, artCatList } from '../api/getData';
    import { baseUrl } from '../config/env';
    export default{
       data(){
          return {
             num: 0,
             page: 10,
             list: [],
             cat: [],
             baseUrl,
             isShow: true,
             cid: ''
          }
       },
       components: {headTop, headRight},
       created(){
          this.getData();
       },
       methods: { 
          async getData(){
            Promise.all([getArtList({num: this.num, page: this.page}), getCat()]).then(res => {
                for(var i = 0; i < res.length; i++){
                    res[i] = JSON.parse(res[i]);
                }
                if(res[0].errcode == 0){
                    if(res[0].data.length > 0){
                        for(var i = 0; i < res[0].data.length; i++){
                            res[0].data[i]['a_time'] = this.timestampToTime(res[0].data[i]['a_time']);
                        }
                        this.isShow = true;
                        this.list = res[0].data;
                    }
                }
                if(res[1].errcode == 0){
                    this.cat = res[1].data;
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
          //获取更多
          async getMore(){
             this.num += 1;
             var res = this.cid ? JSON.parse(await artCatList({id: this.cid, num: this.num * this.page, page: this.page})) : JSON.parse(await getArtList({num: this.num * this.page, page: this.page}));
             if(res.data.length > 0){
                for(var i = 0; i < res.data.length; i++){
                    res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                }
                this.list = this.list.concat(res.data); 
             }else{
                this.isShow = false;
             }
          },
          async catTo(id){
             this.num = 0;
             this.page = 10
             this.cid = id;
             var res = id ? JSON.parse(await artCatList({ id, num: this.num, page: this.page })) : JSON.parse(await getArtList({num: this.num * this.page, page: this.page}));
             if(res.errcode == 0){
                if(res.data.length > 0){
                   for(var i = 0; i < res.data.length; i++){
                      res.data[i]['a_time'] = this.timestampToTime(res.data[i]['a_time']);
                   }
                   this.isShow = true 
                }else{
                   this.isShow = false 
                }
                this.list = res.data;
             }else{
                this.$message.error(res.msg);
             }
          },
          artTo(id){
             this.$router.push({ path: '/artInfo', query: {id}});
          }
       }
    }
</script>