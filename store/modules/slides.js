import $axios from '@/helpers/axios'
import axios from "axios";
axios.defaults.withCredentials = false;

export default {
    namespaced: true,
    state: {
        slides: []
    },
    mutations: {
        SET_SLIDES(state, slides) {
            state.slides = slides
        }
    },
    actions: {
        fetchSlides({ commit }) {
            return $axios.get('http://134.122.108.145:8000/api/v1/slides').then((response) => {
                commit('SET_SLIDES', response.data.data)
            })
        },

    },
    getters: {
        getSlides(state) {
            return state.slides
        }
    }
}