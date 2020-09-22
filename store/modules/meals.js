import $axios from '@/helpers/axios'

import axios from "axios";

export default {
    namespaced: true,
    state: {
        top: [],
        all_menu: [],
        extra: [],
        category: [],
        isDataLoaded: 0, //not loaded
        extra_meal_name: ""
    },
    mutations: {
        SET_TOP_MEALS(state, top) {
            state.top = top
        },
        SET_MEALS(state, all_menu) {
            state.all_menu = all_menu
        },
        SET_EXTRA(state, extra) {
            state.extra = extra
        },
        SET_CATEGORY(state, category) {
            state.category = category
        },
        SET_DATALOADED(state, isDataLoaded) {
            state.isDataLoaded = isDataLoaded
        },
        SET_EXTRA_MEAL_NAME(state, extra_meal_name) {
            state.extra_meal_name = extra_meal_name
        }
    },
    actions: {
        fetchTopMeals({ commit }) {
            return $axios.get('http://134.122.108.145:8000/api/v1/meals/top').then((response) => {
                commit('SET_TOP_MEALS', response.data.data)
            })
        },
        fetchAllMeals({ commit }) {
            return $axios.get('http://134.122.108.145:8000/api/v1/meals').then((response) => {
                commit('SET_MEALS', response.data.data)
            })
        },
        fetchAllCategory({ commit }, meal_id) {
            return new Promise((resolve, reject) => {
                axios({
                        method: "GET",
                        url: 'http://134.122.108.145:8000/api/v1/categories',
                    })
                    .then(res => {
                        console.log(res)
                        commit('SET_CATEGORY', res.data.data)
                        resolve(res);
                    })
                    .catch(err => {
                        console.log("error in request", err);
                    });
            });
        },
        extra({ commit }, payload) {
            commit('SET_DATALOADED', 0) //data empty
            console.log(payload.name)
            commit('SET_EXTRA_MEAL_NAME', payload.name) //data empty
            return new Promise((resolve, reject) => {
                axios({
                        method: "GET",
                        url: 'http://134.122.108.145:8000/api/v1/extra/' + payload.meal_id,
                    })
                    .then(res => {
                        console.log(res)
                        commit('SET_EXTRA', res.data.data)
                        if (res.data.data.length != 0) {
                            commit('SET_DATALOADED', 1) //data ok
                        } else {
                            commit('SET_DATALOADED', 2) //data empty
                        }
                        resolve(res);
                    })
                    .catch(err => {
                        console.log("error in request", err);
                    });
            });
        },
    },
    getters: {
        getTopMeals(state) {
            return state.top
        },
        getMeals(state) {
            return state.all_menu
        },
        getExtra(state) {
            return state.extra
        },
        getDataLoaded(state) {
            return state.isDataLoaded
        },
        getExtraMealName(state) {
            return state.extra_meal_name
        },
    }
}