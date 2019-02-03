import Vue from 'vue'
import Vuex from 'vuex'
import { menuItems, cartName } from '~/config'
Vue.use(Vuex);

export const state = () => ({
  menuItems,
  categories: [],
  settings: {},
  loading: false,
  error: {},
  isError: null // Only required to inform App.vue that an error is there hence initiate the snackbar
})
export const getters = {
  loading(state) {
    return state.loading
  }
}
export const mutations = {
  categories(state, payload) {
    state.categories = payload
  },
  settings(state, payload) {
    state.settings = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  success(state, msg) {
    this.$toast.success(msg).goAway(2000);
  },
  warning(state, msg) {
    this.$toast.warning(msg).goAway(5000);
  },
  info(state, msg) {
    this.$toast.info(msg).goAway(5000);
  },
  clearError(state) {
    // console.log('global ClearError at [store/index].....', err);
    state.error = {}
  },
  setErr(state, err) {
    if (err && err.response && err.response.data) {
      err = err.response.data;
    } else if (err && err.response) {
      err = err.response;
    }
    if (this.$toast) // On server it will be undefined. Hence required
      this.$toast.error(err).goAway(5000);
  }
}
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req }) {
    let auth = this.$cookies.get('Authorization')
    try {
      let categories = await this.$axios.$get('categories/megamenu')
      commit('categories', categories)
    } catch (err) {
      commit('setErr', err)
    }
    try {
      let settings = await this.$axios.$get('settings')
      commit('settings', settings[0])
    } catch (err) {
      commit('setErr', err)
    }

    if (auth) {
      this.$axios.setToken(auth, 'Bearer')
      // Cart
      if (this.$cookies) {
        commit('cart/storeCart', this.$cookies.get(cartName))
        dispatch('cart/fetch')
        // return true
      } else {
        // return false
      }
      try {
        await dispatch('auth/fetch')
        return true
      }
      catch (error) {
        // console.log('fetch user error', error)
        this.$axios.setToken(null)
        return false
      }
    } else {
      this.$axios.setToken(null)
      return false
    }

  },
  async nuxtClientInit({ commit, dispatch }, context) {
    // console.log('nuxtClientInitzzzzzzzzzzzzzzzzzzzzzzzzzzz');
    let auth = this.$cookies.get('Authorization')
    // try {
    //   let categories = await this.$axios.$get('categories', { params: { where: { active: true } } })
    //   commit('categories', categories)
    // } catch (err) {
    //   commit('setErr', err, { root: true })
    // }
    // try {
    //   let settings = await this.$axios.$get('settings')
    //   commit('settings', settings[0])
    // } catch (err) {
    //   commit('setErr', err, { root: true })
    // }

    // Cart
    if (this.$cookies) {
      try {
        commit('cart/storeCart', this.$cookies.get(cartName))
        // await dispatch('cart/fetch') // Fetch from database
        // return true
      }
      catch (error) {
        console.log('fetch cart error', error)
        // return false
      }
    } else {
      // return false
    }

    // Authorization
    // console.log('clientAuth..........', auth);
    if (auth) {
      this.$axios.setToken(auth, 'Bearer')
      try {
        await dispatch('auth/fetch')
        return true
      }
      catch (error) {
        // console.log('fetch user error', error)
        this.$axios.setToken(null)
        return false
      }
    } else {
      this.$axios.setToken(null)
      return false
    }
  }
}
