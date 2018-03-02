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
                <a v-for="(item, index) in header" @click="navBarTo(item.navTo)">{{item.content}}</a>
            </ul>
         </div>
      </header>
   </div>
</template>

<script type="text/javascript">
   export default{
      data(){
        return {
           header: [ {navTo: 'index', content: '首页'}, {navTo: '/abouts', content: '关于我'}, {navTo: '/article', content: '技术心得'}, {navTo: '/journal', content: '抚今追昔'}, {navTo: '/say', content: '畅所欲言'}, {navTo: '/board', content: '留言'}]
        }
      },
      methods:{
        navBarTo(index){
          this.$router.push(index)
        }
      }
   }
</script>