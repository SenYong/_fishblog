import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import indexs from "../page/index";
import abouts from "../page/abouts";
import artInfo from "../page/artInfo";
import article from "../page/article";
import journal from "../page/journal";
import journalInfo from "../page/journalInfo";
import say from "../page/say";
import sayInfo from "../page/sayInfo";
import board from "../page/board";
import index from "../page/indexs";

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      meta:[0]
    },
    {
      path: '/index',
      component: index,
      meta:[0]
    },{
      path: '/abouts',
      component: abouts,
      meta:[1]
    },{
      path: '/artInfo',
      component: artInfo,
      meta:[2]
    },{
      path: '/article',
      component: article,
      meta:[2]
    },{
      path: '/journal',
      component: journal,
      meta:[3]
    },{
      path: '/journalInfo',
      component: journalInfo,
      meta:[3]
    },{
      path:'/say',
      component: say,
      meta:[4]
    },{
      path: '/sayInfo',
      component: sayInfo,
      meta:[4]
    },{
      path: '/board',
      component: board,
      meta: [5]
    },{
      path: '/indexs',
      component: indexs
    }
  ]
})
