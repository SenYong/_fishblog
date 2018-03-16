import fetch from '../config/fetch';

/*
* 首页文章列表
*/
export const  getArticle = data => fetch('s=Index/Index/getArticle', data, 'post');

/*
 * 最新文章
 */
export const newArt = () => fetch('s=Index/Index/newArt', {}, 'post');

/*
 * 最新日志
 */
export const newLog = () => fetch('s=Index/Log/newLog', {}, 'post');

/*
 * 最新说说
 */
export const newSay = () => fetch('s=Index/Say/newSay', {}, 'post');

/*
 * 获取栏目
 */
export const getCat = () => fetch('s=Index/cat/getCat', {}, 'post');

/*
 * 获取点击排行
 */
export const artHit = () => fetch('s=Index/Index/artHit', {}, 'post');

/*
 * 获取文章详情 
 */
export const artDetail = data => fetch('s=Index/Index/artDetail', data, 'post');

/*
 * 上一篇文章 
 */
export const prevArt = data => fetch('s=Index/Index/prevArt', data, 'post');

/*
 * 下一篇文章 
 */
export const nextArt = data => fetch('s=Index/Index/nextArt', data, 'post');

/*
 * 文章评论
 */
export const userArtComment = data => fetch('s=Admin/Article/userArtComment', data, 'post');

/*
 * 获取指定文章的所有用户评论
 */
export const getAllUser = data => fetch('s=Admin/Article/getAllUser', data, 'post');

/*
 * 浏览器增加
 */
export const addArtHit = data => fetch('s=Admin/Article/addHit',data, 'post');

/*
 * 技术心得
 */
export const getArtList = data => fetch('s=Index/Article/getArtList', data, 'post');

/*
 * 技术心得分类
 */
export const artCatList = data => fetch('s=Index/Article/artCatList', data, 'post');

/*
 * 抚今追昔
 */
export const getLogList = data => fetch('s=Admin/Log/selectLog',data, 'post');

/*
 * 日志详情
 */
export const logDetail = data => fetch('s=Index/Log/logDetail',data, 'post');

/*
 * 上一篇日志
 */
export const prevLog = data => fetch('s=Index/Log/prevLog', data, 'post');

/*
 * 下一篇日志 
 */
export const nextLog = data => fetch('s=Index/Log/nextLog', data, 'post');

/*
 * 日志浏览器增加
 */
export const addLogHit = data => fetch('s=Admin/Log/addLogHit', data, 'post');

/*
 * 获取指定日志的所有用户评论
 */
export const getAllLogUser = data => fetch('s=Index/Log/getAllLogUser', data, 'post');

/*
 * 日志评论
 */
export const userLogComment = data => fetch('s=Index/Log/userLogComment', data, 'post');

/*
 * 畅所欲言
 */
export const getSayList = data => fetch('s=Index/Say/getSayList', data, 'post');

/*
 * 说说详情
 */
export const sayDetail = data => fetch('s=Index/Say/sayDetail', data, 'post');

/*
 * 上一条说说
 */
export const prevSay = data => fetch('s=Index/Say/prevSay', data, 'post');

/*
 * 下一条说说
 */
export const nextSay = data => fetch('s=Index/Say/nextSay', data, 'post');

/*
 * 获取说说的用户评论
 */
export const getAllSayUser = data => fetch('s=Index/Say/getAllSayUser', data, 'post');

/*
 * 日志浏览量增加
 */
export const addSayHit = data => fetch('s=Index/Say/addSayHit', data, 'post');

/*
 * 用户评论
 */
export const userSayComment = data => fetch('s=Index/Say/userSayComment', data, 'post');

/*
 * 获取留言板用户评论
 */
export const getUserComment = data => fetch('s=Index/Board/getUserComment', data, 'post');

/*
 * 用户留言
 */
export const userBoardComment = data => fetch('s=Index/Board/userBoardComment', data, 'post');

/*
 * 获取个人信息
 */
export const getInfo = () => fetch('s=Index/System/getInfo', {}, 'post');

/*
 * 关于我浏览量增加
 */
export const addAboutHit = data => fetch('s=Index/System/addAboutHit', data, 'post');

/*
 * 获取文章最新评论
 */
export const newArtComment = () => fetch("s=Index/Article/newArtComment", {}, "post");

/*
 * 获取随机音乐
 */
export const getMusic = data => fetch("s=Index/Index/getMusic", data, "post");

/*
 * 搜索音乐
 */
export const searchMusic = data => fetch("s=Index/Index/searchMusic", data, "post");