import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.0,
    error: '/1x1.svg', //https://placeholder.pics/svg/300/E1E1E1-E4E4E4/CACACA-F5F5F5/Loading...
    loading: '/loading.svg',
    attempt: 1,
    observer: true
    // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
    // listenEvents: ['scroll']
})