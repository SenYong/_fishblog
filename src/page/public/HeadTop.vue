<template>
   <div>
       <header>
          <div class="logo f_l">
           <a href="#">
              <img src="../../assets/img/logo.png">
           </a>
         </div>
         <div id="topnav" class="f_r">
             <ul>
                <a v-for="(item, index) in header" @click="navBarTo(item.navTo,index)" class="pointer" :class="item.bool ? 'active' : '' ">{{item.content}}</a>
            </ul>
         </div>
      </header>
   </div>
</template>
<script type="text/javascript">
   export default{
      data(){
        return {
           header: [ {navTo: '/index', content: '首页', bool:false}, {navTo: '/abouts', content: '关于我', bool:false}, {navTo: '/article', content: '技术心得', bool:false}, {navTo: '/journal', content: '抚今追昔', bool:false}, {navTo: '/say', content: '畅所欲言', bool:false}, {navTo: '/board', content: '留言', bool:false}]
        }
      },
      created(){
        for(var i = 0; i < this.header.length; i++){
          this.header[i].bool = false;
        }
        this.header[this.$route.meta[0]].bool = true;
      },
      methods:{
        navBarTo(navTo,index){
          this.$router.push({path:navTo})
        }
      }
   }
</script>