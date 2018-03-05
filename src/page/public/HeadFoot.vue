<template>
    <footer>
       <div class="footavatar">
         <img :src="baseUrl+info.img" class="footphoto">
         <ul class="footinfo">
           <p class="fname"><a href="/dancesmile" >{{info.netname}}</a>  </p>
           <p class="finfo">职业: {{info.profession}}</p>
           <p>QQ：{{info.qq}}</p></ul>
       </div>
       <section class="visitor">
         <h2>最近访客</h2>
          <ul>
            <li><a href="/"><img src="__IMG__/s0.jpg"></a></li>
            <li><a href="/"><img src="__IMG__/s7.jpg"></a></li>
          </ul>
       </section>
       <div class="Copyright">
         <ul>
            Design by：{{info.title}}
         </ul>
       </div>
    </footer>
</template>
<script type="text/javascript">
   import { getInfo } from '../../api/getData';
   import { baseUrl } from '../../config/env';
   export default{
      data(){
        return {
          info: {},
          baseUrl
        }
      },
      created(){
        this.getData();
      },
      methods:{
        async getData(){
          var res = JSON.parse(await getInfo());
          if(res.errcode == 0){
             this.info = res.data[0];
          }else{ 
             this.$message.error(res.msg);
          }
        }
      }
   }
</script>