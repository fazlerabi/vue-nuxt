import $axios from '@/helpers/axios'

import axios from "axios";

export default {
    namespaced: true,
    state: {
        customer_address: [],
        token: "",
        coverage: []
    },
    mutations: {
        SET_ADDRESS(state, customer_address) {
            state.customer_address = customer_address
        },
        SET_COVERAGE(state, coverage) {
            state.coverage = coverage
        }
    },
    actions: {
        fetchAllCustomerAddress({ commit }) {
            return new Promise((resolve, reject) => {
                axios({
                        method: "GET",
                        url: 'http://134.122.108.145:8000/api/v1/addresses/customer/' + this.$cookies.get('customer_id'),
                    })
                    .then(res => {
                        console.log(res)
                        commit('SET_ADDRESS', res.data.data)
                        resolve(res);
                    })
                    .catch(err => {
                        console.log("error in request", err);
                    });
            });
        },
        add_address({ commit }, payload) {

            return new Promise((resolve, reject) => {
                axios({
                        method: "POST",
                        data: payload,
                        url: 'http://134.122.108.145:8000/api/v1/addresses/customer/' + this.$cookies.get('customer_id'),
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
        login({ commit }, payload) {

            return new Promise((resolve, reject) => {
                axios({
                        method: "POST",
                        data: payload,
                        url: 'http://134.122.108.145:8000/api/v1/customers/login',
                    })
                    .then(res => {
                        console.log(res)
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });

        },
        get_coverage({ commit }) {

            return new Promise((resolve, reject) => {
                axios({
                        method: "GET",
                        url: 'http://134.122.108.145:8000/api/v1/coverages/',
                    })
                    .then(res => {
                        console.log(res)
                        commit('SET_COVERAGE', res.data.data)
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });

        },
    },
    getters: {
        getAddresses(state) {
            return state.customer_address
        },
        get_coverage(state) {
            return state.coverage
        }
    }
}