import $axios from '@/helpers/axios'

export default {
    namespaced: true,
    state: {
        testimonials: []
    },
    mutations: {
        SET_TESTIMONIALS(state, testimonials) {
            state.testimonials = testimonials
        }
    },
    actions: {
        fetchTestimonials({ commit }) {
            return $axios.get('http://134.122.108.145:8000/api/v1/testimonials', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                commit('SET_TESTIMONIALS', response.data.data)
            })
        }
    },
    getters: {
        getTestimonails(state) {
            return state.testimonials
        }
    }
}