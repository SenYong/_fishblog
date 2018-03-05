import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = r => require.ensure([], () => r(require('../page/index')), 'index');
const abouts = r => require.ensure([], () => r(require('../page/abouts')), 'abouts');
const artInfo = r => require.ensure([], () => r(require('../page/artInfo')), 'artInfo');
const article = r => require.ensure([], () => r(require('../page/article')), 'article');
const journal = r => require.ensure([], () => r(require('../page/journal')), 'journal');
const journalInfo = r => require.ensure([], () => r(require('../page/journalInfo')), 'journalInfo');
const say = r => require.ensure([], () => r(require("../page/say")), 'say');
const sayInfo = r => require.ensure([], ()=>r(require("../page/sayInfo")), 'sayInfo');
const board = r => require.ensure([], () => r(require('../page/board')), 'board');

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
    }
  ]
})
