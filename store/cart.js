import { currency, cartName } from '~/config'
import Router from 'vue-router'
const router = new Router({ mode: 'history' })
// import { createToken } from 'vue-stripe-elements-plus'

const state = (state) => ({
    added: [],
    items: [],
    skuArray: [],
    variantsArray: [],
    checkoutStatus: null,
    currency: currency,
    discount: 0,
    freeShipping: false,
    shipping: {},
    showCart: false
})

// getters
const getters = {
    // checkoutStatus: state => state.checkoutStatus,
    showCart(state) {
        return state.showCart
    },
    getItems(state) {
        return (state.items && state.items.length > 0) ? state.items : []
    },
    // toNumber: (state, value, x) => {
    //     value *= 1;
    //     return isNaN(value) ? 0 : value;
    // },

    getTotalDiscount(state) {
        let amount = 0;
        let mrp = 0;
        let price = 0;
        if (state.items) {
            const sum = state.items.reduce((subtotal, item) => {
                return subtotal + (item.mrp - item.price || 0) * (item.qty || 1)
            }, 0)
            return +state.discount ? sum - +state.discount : sum
        } else {
            return 0
        }
    },

    getDiscount(state) {
        return +state.discount
    },

    getTotalCount(state) {
        if (!state.items) return 0
        else
            return (state.items.length === 0) ? 0 : state.items.reduce((prevVal, elem) => prevVal + elem.qty, 0)
    },
    getQty: state => ({ _id, vid }) => {
        for (let i in state.items) {
            if (state.items[i]._id === _id && state.items[i].vid === vid) {
                return state.items[i].qty
            }
        }
    },
    checkCart: state => ({ _id, vid }) => { // Returns true when there is item in cart
        return state.skuArray.includes(_id) && state.variantsArray.includes(vid)
    },

    getSubtotal(state) { // After discount
        if (state.items) {
            const sum = state.items.reduce((subtotal, item) => {
                return subtotal + (item.price || 0) * (item.qty || 1)
            }, 0)
            return +state.discount ? sum - +state.discount : sum
        } else {
            return 0
        }
    },

    getTaxes(state, getters) {
        return 0;//getters.getSubtotal * 0.18
    },

    getShipping(state, getters, rootState) {
        if (rootState && rootState.settings && rootState.settings.shipping) {
            if (+rootState.settings.shipping.free <= +getters.getSubtotal)
                return 0
            else
                return +rootState.settings.shipping.charge || 0
        } else {
            return 0
        }
        // Individual item shipping charge
        // const sum = state.items.reduce((subtotal, item) => {
        //     return subtotal + (item.shipping || 0) * (item.qty || 1)
        // }, 0)
        // return state.freeShipping ? 0 : sum
    },

    // getShippingAmount(state, getters, rootState) {
    //     return +rootState.settings.shippingCharge || 0
    // },

    getTotal(state, getters) { //After shipping
        // const discount = state.discount || 0
        return +getters.getSubtotal + +getters.getTaxes + +getters.getShipping
    }

    // orderOnLimit = state => state.profile.data.limit <= total(state)
}

// actions
const actions = {
    async fetch({ commit }) {
        try {
            const data = await this.$axios.$get('cart/my')
            commit('setCart', data)
            return data
        }
        catch (err) { }
    },
    // async getBestShipper({ commit, state, getters }, payload) {
    //     // getters.loadItems
    //     let weight = getters.getTotalWeight().toString()
    //     let cartValue = getters.getTotalAmount().toString()
    //     try {
    //         let res = await axios.get('/api/shippings/best?weight=' + weight + '&cartValue=' + cartValue)
    //         commit('getBestShipper', res.data[0])
    //     } catch (err) { }
    // },
    async addToCart({ commit, getters, state, rootState }, payload) {
        // getters will not be accessible inside mutations
        commit('setLoading', true, { root: true })
        payload = payload || {}
        const { pid, vid, qty, shipping } = payload
        payload.shipping = { method: 'Standard Delivery', price: getters.getShipping }
        try {
            const { product, variant } = await this.$axios.$get(`products/${pid}/${vid}`)
            commit('addToCart', { product, variant, qty, shipping })
            if (!rootState.auth.user) return
            try {
                let res = await this.$axios.$post('cart', { items: state.items })
            } catch (e) {
                console.log('cart post error because of ', state.items);
                throw e
            }
        } catch (e) {
            commit('addToCart', { product: { _id: pid }, variant: { _id: vid }, qty: -100000, shipping })
            throw 'Sorry! product not found'
        }
        finally {
            commit('setLoading', false, { root: true })
        }
    },
    applyDiscount({ commit }, payload) {
        commit('applyDiscount', payload)
    },
    async checkout({ commit, state, rootState, getters }, { paymentMethod, address }) {
        const user = (rootState.auth || {}).user || {}
        let cartItems = state.items;
        const exchange_rate = currency.exchange_rate || 1
        const currency_code = currency.code || '₹'
        paymentMethod = paymentMethod || 'COD'
        let err = null
        if (!address || address == "") {
            err = "Please enter Qr No"
            throw err;
        }
        if (cartItems.length < 1) {
            err = "Add some items into cart."
            throw err;
        }
        switch (paymentMethod) {
            case "COD":
                let items = [];
                for (let ix in cartItems) {
                    let i = cartItems[ix]
                    items.push({
                        vendor_id: i.vendor_id, vendor_name: i.vendor_name, vendor_email: i.vendor_email,
                        pid: i._id, sku: i.sku, name: i.name, slug: i.slug, description: i.slug,
                        vid: i.vid, size: i.size, color: i.color, img: i.img, mrp: i.mrp, price: i.price, stock: i.stock, qty: i.qty, currency: currency_code
                    })
                }
                if (state.discount > 0 && cartItems.length > 0)
                    items.push({ name: 'Coupon Discount', slug: '-', description: '-', price: -discount, qty: 1, currency: currency_code })
                let orderDetails = {
                    address, items,
                    shipping: { qty: getters.getTotalCount },
                    amount: { total: +getters.getTotal, currency: currency_code, exchange_rate, details: { qty: +getters.getTotalCount, discount: +getters.getDiscount, shipping: +getters.getShipping, taxes: getters.getTaxes, subtotal: +getters.getSubtotal } }
                }
                try {
                    commit('setLoading', true, { root: true })
                    let order = await this.$axios.$post('orders', orderDetails)
                    commit('setLoading', false, { root: true })
                    this.$router.push('/grocery/success?id=' + order._id + '&amount=' + orderDetails.amount.total)
                } catch (err) {
                    // Start: Remove from cart and add to wishlist in case of error (e.g. stock=0 or item has been deleted from databse)
                    commit('setLoading', false, { root: true })
                    if (err && err.response && err.response.data) {
                        let msg = err.response.data.msg,
                            data = err.response.data.data
                        if (msg === 'Not enough stock') {
                            for (let item of data) {
                                let product = { _id: item.pid, sku: item.sku, name: item.name, slug: item.slug, img: [], vendor_email: item.vendor_email, vendor_name: item.vendor_name, vendor_id: item.vendor_id }
                                let variant = { _id: item.vid, size: item.size, color: item.color, price: item.price, mrp: item.mrp, stock: item.stock, img: item.img }
                                commit('addToCart', { product, variant, qty: -100000 });
                                if (user.email) {
                                    try {
                                        await this.$axios.$post("wishlists/add", { product, variant });
                                    } catch (err) {
                                    }
                                }
                            }
                        }
                    }
                    // End: Remove from cart and add to wishlist in case of error
                    else if (err.response) {
                        commit('setErr', err.response.msg, { root: true }) // used at order.controller
                    }
                    else {
                        commit('setErr', err.response, { root: true })
                    }
                    throw err;
                }
                break;
            // case "Instamojo":
            //     let formI = document.createElement("form");
            //     formI.setAttribute("id", "instamojoForm");
            //     formI.setAttribute("action", "/api/pay/instamojo");
            //     formI.setAttribute("method", "GET");
            //     formI.setAttribute("style", "display:none;");

            //     if (attrs !== null) {
            //         each(attrs, function (value, name) {
            //             if (value !== null) {
            //                 let input = document.createElement("input");
            //                 input.setAttribute("type", "hidden");
            //                 input.setAttribute("name", name);
            //                 input.value = value;
            //                 formI.append(input);
            //             }
            //         });
            //     }
            //     document.querySelector("body").append(formI);
            //     formI.submit();
            //     formI.remove();
            //     break;
            default:
                commit('setErr', 'The checkout service ' + method + ' not yet implemented', { root: true })
                console.log("Unknown checkout service: " + method);
                break;
        }
    },
    // async saveCart({ state, rootState }) {
    //     // this.commit('cart/storeCart', state.items);
    //     // let items = JSON.stringify(state.items)
    //     // localStorage.setItem('Tesoro_cart', items)
    //     // this.$cookies.set("Tesoro_cart", items)
    //     if (!rootState.auth.user.token || rootState.auth.user.token == 'undefined') {
    //         return
    //     }
    //     try {
    //         console.log('cart post error because of ', state.items);
    //         let res = await this.$axios.$post('cart', { items: state.items })
    //     } catch (e) { }
    // },
}

// mutations
const mutations = {
    setCart(state, data) {
        let items = data.items || []
        // let unique = state.items.map(itm => {
        //     items.find((item) => (item._id === itm._id && item.vid === itm.vid))
        // })
        let i = state.items.concat(items)
        let unique = i.filter(function ({ _id, vid }) {
            const key = `${_id}${vid}`;
            return !this.has(key) && this.add(key);
        }, new Set);
        state.skuArray = unique.map(a => a._id);
        state.variantsArray = unique.map(a => a.vid);
        this.$cookies.set(cartName, { shipping: state.shipping, items: unique })
    },
    // save items to local storage
    toggleCart(state, payload) {
        state.showCart = payload
    },
    storeCart(state, cart) { // Used from index.js
        if (!cart || cart.length === 0) { cart = {}; return; }
        state.shipping = cart.shipping
        const items = state.items = cart.items
        if (!items) return
        state.skuArray = items.map(a => a._id);
        state.variantsArray = items.map(a => a.vid);
    },

    clearCart(state, items) {
        state.shipping = { price: 0, method: null }
        state.items = []
        this.$cookies.set(cartName, [])
        state.items = []
        state.skuArray = []
        state.variantsArray = []
    },
    saveBestShipper(state, payload) {
        state.shipping = payload;
    },
    applyDiscount(state, amount) {
        state.discount = amount
    },
    // adds or remove an item from cart
    addToCart(state, { product, variant, qty }) {
        if (state.items.length <= 0) state.showCart = true // User training
        const record = state.items.find(p => p._id === product._id && p.vid === variant._id)
        if (record) { // If the product is already there in cart.
            if (+record.qty + +qty > +variant.stock) { // Check if there is enough stock available
                console.log('nis', +record.qty, +qty, +variant.stock);
                this.$toast.error("Not enough stock").goAway(2000);
                return;
            }
            record.qty = +record.qty + +qty
            if (+record.qty < 1) { // When required qty is <1, remove item from cart
                state.items = state.items.filter((r) => {
                    return r._id !== product._id || r.vid !== variant._id;
                });
            }
        } else {
            if (+qty < 1) { // It was removed from cart on 1st click. On consequent click and before the client received data from server the qty comes as -1 and the cart items = []. Hence it tries to add it to cart again
                return;
            } else if (+qty > +variant.stock) {
                this.$toast.error("Not enough stock").goAway(2000);
                return;
            }
            let img = ''
            if (variant.img && variant.img.length > 0) {
                img = variant.img[0]
            } else if (product.img && product.img.length > 0) {
                img = product.img[0]
            }
            const item = {
                _id: product._id, sku: product.sku, name: product.name, slug: product.slug,
                vid: variant._id, mrp: variant.mrp, price: variant.price, stock: variant.stock, shipping: variant.shipping, img, size: variant.size, color: variant.color, weight: variant.weight, qty,
                vendor_email: product.vendor_email, vendor_name: product.vendor_name, vendor_id: product.vendor_id
            }
            state.items.push(item)
        }
        if (state.items.length === 0) state.showCart = false // When all items are removed from cart
        state.skuArray = state.items.map(a => a._id);
        state.variantsArray = state.items.map(a => a.vid);
        // state.shipping = shipping
        this.$cookies.set(cartName, { shipping: 0, items: state.items })
        if (qty > 0) {
            this.$toast.success("Item added to cart").goAway(2000);
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

