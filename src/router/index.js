import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const index = r => require.ensure([], () => r(require('../page/index')), 'index');
const artInfo = r => require.ensure([], () => r(require('../page/artInfo')), 'artInfo');
const article = r => require.ensure([], () => r(require('../page/article')), 'article');
const journal = r => require.ensure([], () => r(require('../page/journal')), 'journal');
const journalInfo = r => require.ensure([], () => r(require('../page/journalInfo')), 'journalInfo');
const say = r => require.ensure([], () => r(require("../page/say")), 'say');
const sayInfo = r => require.ensure([], ()=>r(require("../page/sayInfo")), 'sayInfo');

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },{
      path: '/artInfo',
      component: artInfo
    },{
      path: '/article',
      component: article
    },{
      path: '/journal',
      component: journal
    },{
      path: '/journalInfo',
      component: journalInfo
    },{
      path:'/say',
      component: say
    },{
      path: '/sayInfo',
      component: sayInfo
    }
  ]
})
