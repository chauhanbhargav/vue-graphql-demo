// Import External Dependency
import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import {
    ApolloClient
} from 'apollo-client'
import {
    createHttpLink
} from 'apollo-link-http'
import {
    InMemoryCache
} from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// Import Vue dependencies
import store from './store'

// Import Material Styles
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import './assets/styles.scss'

// Init Vue Libraries
Vue.use(VueMaterial)
Vue.use(VueApollo)
Vue.config.productionTip = false

// HTTP connection to the API
const httpLink = createHttpLink({
    uri: 'https://graphqlzero.almansi.me/api',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

// Create the apollo provider
const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
})

new Vue({
    store,
    render: h => h(App),
    apolloProvider
}).$mount(
    '#app'
)