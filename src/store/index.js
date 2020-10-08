// Import External Dependancies
import Vue from 'vue'
import Vuex from 'vuex'
import {
    SET_CARD_DATA,
    SET_LOADING,
    SET_MESSAGE
} from './mutation';

// Initialize Vuex
Vue.use(Vuex)

// Setup Vuex
export default new Vuex.Store({
    state: {
        cardData: [],
        loading: true,
        duration: 5000,
        notification: {
            showSnackbar: false,
            message: ''
        }

    },
    mutations: {
        // Mutate State with cards data array
        [SET_CARD_DATA](state, data) {
            state.cardData = data;
        },
        // Mutate State with current loader
        [SET_LOADING](state, data) {
            state.loading = data;
        },
        // Mutate State with snackbar and message
        [SET_MESSAGE](state, data) {
            state.notification = data
        },
    }
})