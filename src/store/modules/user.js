
import { login, getInfo, getUserDetailById } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken(),
  userInfo: {}
}
const mutations = {
  // 修改token
  setToken(state, payload) {
    state.token = payload
    // 修改coke里面的的token
    setToken(payload)
    // console.log(state.token)
  },
  // 删除token
  removeToken(state) {
    // 清楚token
    state.token = null
    removeToken()
  },
  updataUserInfo(state, payload) {
    state.userInfo = payload
  },
  // 清除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async  login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  },

  // 用户信息的修改
  async getUserInfo(context) {
    const result = await getInfo() // 获取返回值
    const baseInfo = await getUserDetailById(result.userId)
    context.commit('updataUserInfo', { ...result, ...baseInfo }) // 将整个的个人信息设置到用户的vuex数据中
    return result // 这里为什么要返回 为后面埋下伏笔
  },
  // 登出
  logout({ commit }) {
    commit('removeToken')
    commit('removeUserInfo')
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

