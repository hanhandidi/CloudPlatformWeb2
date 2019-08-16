import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    //是否收起侧边栏
    isCollapse: false,
    openedTabs: [],//所有打开的路由
    activeIndex:''//激活状态

}
//包含多个由action触发直接更新state的函数
const mutations = {
    //更改侧边栏是否收缩
    CHANGE_COLLAPSE(state) {
        let isCollapse = state.isCollapse
        state.isCollapse = !isCollapse
    },
    // 添加tabs
    add_tabs (state, data) {
        state.openedTabs.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
        let index = 0;
        for (let option of state.openedTabs) {
            if (option.route === route) {
                break;
            }
            index++;
        }
        state.openedTabs.splice(index, 1);
    },
    //清空tabs
    clear_tabs(state){
        state.openedTabs = [];
    },
    //关闭其他标签
    close_others_tabs(state,route){
        state.openedTabs = state.openedTabs.filter(item => {
            return item.route === route;
        });
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
        state.activeIndex = index;
    },
}
//包含多个由对应事件触发的回调函数的对象间接更新state的函数
const actions = {
    //提交对mutation的请求->更改Collapse
    changeCollapse({commit}) {
        commit('CHANGE_COLLAPSE')
    },

}

const getters = {}

export default new Vuex.Store({

    state,//状态对象
    mutations,//包含多个更新state函数的对象
    actions,//包含多个对应事件的回调函数的对象
    getters//包含多个getter计算属性的对象
})
