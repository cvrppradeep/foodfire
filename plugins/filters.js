import Vue from 'vue'
import moment from 'moment'
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
Vue.filter('pluralize', function (noun) {
    if (typeof noun !== 'string') { return noun; }

    let rules = [
        { regex: /octopus/gi, suffix: 'octopusses' },
        { regex: /person/gi, suffix: 'people' },
        { regex: /ox/gi, suffix: 'oxen' },
        { regex: /bison|buffalo|deer|duck|fish|moose|pike|plankton|salmon|sheep|squid|swine|trout|sheap|equipment|information|rice|money|species|series|news/i, suffix: '$&' }, // bison -> bison
        { regex: /(x|ch|ss|sh)$/gi, suffix: '$1es' }, // dish -> dishes, kiss -> kisses
        { regex: /(hetero|canto|photo|zero|piano|pro|kimono|portico|quarto)$/gi, suffix: '$1s' }, // kimono -> kimonos
        { regex: /(?:([^f])fe|([lr])f)$/, suffix: '$1$2ves' }, // knife -> knives, calf -> calves
        { regex: /o$/gi, suffix: 'oes' }, // hero -> heroes
        { regex: /([^aeiouy]|qu)y$/gi, suffix: '$1ies' }, // cherry -> cherries
        { regex: /s$/gi, suffix: 's' }, // cats -> cats
        { regex: /$/gi, suffix: 's' } // cat -> cats
    ];

    for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        if (noun.match(rule.regex)) {
            noun = noun.replace(rule.regex, rule.suffix);
            break;
        }
    }

    return noun;
})
Vue.filter('date', function (value) {
    const date = new Date(value)
    return date.toLocaleString(['en-US'], { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
})
Vue.filter('datedm', function (value) {
    const date = moment(value, "hhmm").add(5, 'hours').add(30, 'minutes')
    return date.format('ddd, Do MMM')
})
Vue.filter('time', function (value) {
    const date = moment(value, "hhmm").add(5, 'hours').add(30, 'minutes')
    return date.format("hA");
})
Vue.filter('time12', function (value) {
    const date = moment(value, "hhmm").add(5, 'hours').add(30, 'minutes')
    return date.format("hh:mm A");
})
// Vue.filter('truncate', function (text, length, clamp) {
//     clamp = clamp || '...';
//     let node = document.createElement('div');
//     node.innerHTML = text;
//     let content = node.textContent;
//     return content.length > length ? content.slice(0, length) + clamp : content;
// })
Vue.filter('truncate', function (text, stop, clamp) {
    if (text)
        return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
    else
        return ""
})
Vue.filter('nl2br', function (text, stop, clamp) {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br />')
})
Vue.filter('kb', function (num) {
    num = parseInt(num)
    if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('Expected a number');
    }

    var exponent;
    var unit;
    var neg = num < 0;
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (neg) {
        num = -num;
    }

    if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
    }

    exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
    num = (num / Math.pow(1024, exponent)).toFixed(2) * 1;
    unit = units[exponent];

    return (neg ? '-' : '') + num + ' ' + unit;
});