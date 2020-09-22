import $axios from '@/helpers/axios'

import axios from "axios";

export default {
    namespaced: true,
    state: {
        faq: []
    },
    mutations: {
        SET_FAQ(state, faq) {
            state.faq = faq
        }
    },
    actions: {
        fetchFAQ({ commit }) {
            return $axios.get('http://134.122.108.145:8000/api/v1/faqs').then((response) => {
                commit('SET_FAQ', response.data.data)
            })
        },
        contactus({ commit }, payload) {

            return new Promise((resolve, reject) => {
                axios({
                        method: "POST",
                        data: payload,
                        url: 'http://134.122.108.145:8000/api/v1/customers/contact',
                    })
                    .then(res => {
                        console.log(res)
                        alert(res.data.message)
                        resolve(res);
                    })
                    .catch(err => {
                        console.log("error in request", err);
                    });
            });

        },
    },
    getters: {
        getFAQ(state) {
            return state.faq
        }
    }
}