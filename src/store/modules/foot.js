import { newArtComment, getSayList } from "@/api/getData";
const foot = {
    state: {
       newArt:[],
       sayImg: []
    },
    mutations: {
       SET_NEWART: (state, newArt) => {
          state.newArt = newArt
       },
       SET_SAYIMG: (state, sayImg) => {
          state.sayImg = sayImg
       }
    },
    actions: {
        async newComment({commit}){
           var res = JSON.parse(await newArtComment());
           if(res.errcode == 0){
             commit('SET_NEWART', res.data)
           }
        },
        async newSayImg({commit}, obj){
          var res = JSON.parse(await getSayList(obj))
          if(res.errcode == 0){
            commit('SET_SAYIMG', res.data)
          }
        }
    }
}

export default foot