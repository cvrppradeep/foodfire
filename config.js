 const REMOTE_API_URL = 'https://api.iotutorials.com'
 const LOCAL_API_URL = 'https://api.iotutorials.com'
// const LOCAL_API_URL = 'http://localhost:9006'
const DOMAIN = (process.env.NODE_ENV === 'production') ? REMOTE_API_URL : LOCAL_API_URL
export const TITLE = "Misiki - The joy of sharing"
export const DESCRIPTION = "Wanna showcase your cooking skills? Earn while others relish the taste...Misiki Food...a new online platform for food lovers. Join as chef!"
export const KEYWORDS = "Be the Master Chef of Sunabeda and earn from home! Coming soon..Misiki Food / Eats..join as Chef!"
export const PROXY = DOMAIN
export const WS_URL = DOMAIN
export const API = DOMAIN
export const HOST = 'https://www.iotutorials.com'
export const IMAGEKIT = 'https://ik.imagekit.io/3wzatecz51w3i'
export const STRIPE_PUBLISHABLE_KEY = 'pk_test_srKHaSHynBIVLX03r33xLszb'
export const ANALYTICS_TRACKING_ID = 'UA-49421899-5'
export const GOOGLE_MAPS_API_KEY = ''
export const FACEBOOK_APP_ID = '169430647069214'
export const tokenExpiry = 60 * 60 * 24 * 365 // Login validity in seconds
export const typingTimeout = 700 // Used for searching e.g. search.vue
export const loadingTimeout = 500 // Used for showing the loading indicator at each page
export const snackTimer = 5000// Used for the snackbar
export const recordsPerScroll = 20
export const minCartValue = 1500 // Disable checkout button if condition not met
export const clearCart = true // Whether to clear the cart after order is placed. Useful while testing
export const priceRange = [1, 138250]
export const cartName = 'Foodfire_cart'
export const userRoles = ['user', 'shipper', 'food', 'driver', 'vendor', 'manager', 'admin'] // This should be in ascending order of authority. e.g. In this case guest will not have access to any other role, where as admin will have the role of guest+user+vendor+manager+admin
export const cities = ['Odisha', 'Delhi', 'Ranchi']
export const sorts = [
  { name: "Relevance", val: null },
  { name: "Whats New", val: "-createdAt" },
  { name: "Price low to high", val: "variants.price" },
  { name: "Price high to low", val: "-variants.price" }
]
export const countries = [
  {
    name: "India",
    value: "in",
    states: ["Punjab"]
  }
]

export const currency = {
  symbol: '₹',
  code: 'INR', // Shop currency
  paypal: 'USD',// Paypal currency code *** Please choose from https://developer.paypal.com/docs/classic/api/currency_codes/
  exchange_rate: '1' // Paypal currency code(USD) / Shop currency (INR) ***  exchange_rate should not be 0 else it will generate divided by 0 error
}
export const menuItems = [
  { text: 'Dashboard', url: '/my', icon: 'dashboard', authenticate: 'manager', color: 'black', dashboard: true },
  { text: 'Orders', url: '/my/orders', icon: 'watch_later', authenticate: 'user', color: 'pink', dashboard: true },
  { text: 'My Reviews', url: '/my/reviews', icon: 'stars', authenticate: 'user', color: 'blue', dashboard: true },
  { text: 'Manage Address', url: '/my/address', icon: 'location_on', authenticate: 'user', color: 'dark', dashboard: true },
  { text: 'My Wishlist', url: '/my/wishlist', icon: 'favorite', authenticate: 'user', color: 'green', dashboard: true },
  { text: 'Profile', url: '/account/profile', authenticate: 'user', icon: 'person_pin', color: 'purple' },
  { text: 'Change Password', url: '/account/change-password', authenticate: 'user', icon: 'lock', color: 'brown' }
]
export const utilityFields = []
export const places = [
  { name: "Sunabeda", val: "SBD" },
  { name: "Visakhapatnam", val: "VSKP" },
  { name: "Vizianagaram", val: "VZM" },
  { name: "Koraput", val: "KPT" },
  { name: "Damanjodi", val: "DMJ" }
]
export const seatsList = [
  { val: 1, name: "1 seat" },
  { val: 2, name: "2 seats" },
  { val: 3, name: "3 seats" },
  { val: 4, name: "4 seats" },
  { val: 5, name: "5 seats" },
  { val: 6, name: "6 seats" },
  { val: 7, name: "7 seats" }
]
export const timesList = [
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
  "12 AM"
]
export const carModels = [
  "Indigo",
  "Dzire",
  "Etios",
  "Ford Aspire",
  "Indica",
  "Innova",
  "Scorpio",
  "Tavera",
  "Verito",
  "Xylo",
  "Others"
]
export const manifest = {
  name: 'Misiki',
  short_name: 'Misiki',
  start_url: '/',
  display: 'standalone',
  background_color: '#fff',
  theme_color: '#555'
}
export const head = {
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' }
  ],
  meta: [
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { 'http-equiv': "Content-type", content: "text/html", charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=2.0' },
    { name: "robots", content: "noodp" },
    { hid: "author", name: "author", content: "Swadesh" },
    { name: "og_site_name", properly: "og:site:name", content: "Misiki" },
    { name: "twitter:creator", content: "@2lessons" },
    { name: "twitter:app:country", content: "pk" },
    { name: "al:ios:app_name", content: "Misiki" },
    { name: "twitter:card", content: "app" },
    { name: "twitter:site", content: "@misiki" },
    { name: "twitter:app:name:iphone", content: "Misiki" },
    { name: "twitter:app:name:ipad", content: "Misiki" },
    { name: "twitter:app:name:googleplay", content: "Misiki" },
    { name: "twitter:app:id:googleplay", content: "com.misiki.android" },
    { name: "application-name", content: "Misiki" },
    { name: "og_type", property: "og:type", content: "website" },
  ],
  noscript: [{ innerHTML: `We're sorry but Misiki.in doesn't work properly without JavaScript enabled. Please enable it to continue.` }],
  htmlAttrs: { lang: 'en' },
  __dangerouslyDisableSanitizers: ['script']
}
