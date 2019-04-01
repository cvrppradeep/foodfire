import Vue from 'vue'
import { currency as currencyConfig } from '~/config'
Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
        // Focus the element
        el.focus()
    }
})
Vue.filter('currency', function (value, currency, decimals) {
    const digitsRE = /(\d{3})(?=\d)/g
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : currencyConfig.symbol
    decimals = decimals != null ? decimals : 0
    let stringified = Math.abs(value).toFixed(decimals)
    let _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
    let i = _int.length % 3
    let head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
    let _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
    let sign = value < 0 ? '-' : ''
    return sign + currency + ' ' + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float
})
Vue.filter('ago', function (dt) {
    var created_date = new Date(dt);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = created_date.getFullYear();
    var month = months[created_date.getMonth()];
    var date = created_date.getDate();
    var hour = created_date.getHours();
    var min = created_date.getMinutes();
    var sec = created_date.getSeconds();
    var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;    // final date with time, you can use this according your requirement
    return time
})
Vue.filter('date', function (value) {
    const date = new Date(value)
    return date.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
})
Vue.filter('datedm', function (value) {
    return moment(value).format('ddd, Do MMM')
})
Vue.filter('time', function (value) {
    return moment(value).format('hA')
})