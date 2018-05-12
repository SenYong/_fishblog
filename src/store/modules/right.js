import { newArt, newLog, newSay, getCat, artHit, getMusic, searchMusic, getInfo } from '../../api/getData'

const right = {
    state: {
        art: [],
        log: [],
        say: [],
        cat: [],
        hit: [],
        info: {}
    },
    mutations:{
        SET_ART: (state, art) => {
            state.art = art
        },
        SET_LOG: (state, log) => {
            state.log = log
        },
        SET_SAY: (state, say) => {
            state.say = say
        },
        SET_CAT: (state, cat) => {
            state.cat = cat
        },
        SET_HIT: (state, hit) => {
            state.hit = hit
        },
        SET_INFO: (state, info) => {
            state.info = info
        }
    },
    actions: {
        async newArts({commit}){
            var res =JSON.parse(await newArt())
            if(res.errcode == 0){
                commit('SET_ART', res.data)
            }
        },
        async newLogs({commit}){
            var res = JSON.parse(await newLog())
            if(res.errcode == 0){
                commit('SET_LOG', res.data)
            }
        },
        async newSays({commit}){
            var res = JSON.parse(await newSay())
            if(res.errcode == 0){
                commit('SET_SAY', res.data)
            }
        },
        async getInfos({commit}){
            var res =JSON.parse(await getInfo())
            if(res.errcode == 0){
                commit('SET_INFO', res.data[0])
            }
        }
    }
}

export default right