import $axios from '@/helpers/axios'

export default {
    namespaced: true,
    state: {
        tracks: [],
        status: 'INIT',
    },
    mutations: {
        SET_TRACKS(state, tracks) {
            state.tracks = tracks;
        },
        SET_STATUS(state, status) {
            state.status = status;
        }
    },
    actions: {
        fetchOrderById({ commit }, id) {
            commit('SET_STATUS', 'pending');
            return $axios
                .get(`http://134.122.108.145:8000/api/v1/orders/track/${id}`)
                .then((response) => {
                    commit('SET_STATUS', 'success');
                    commit('SET_TRACKS', response.data.data)
                })
                .catch(() => {
                    commit('SET_STATUS', 'fail');
                });
        }
    },
    getters: {
        getTracks(state) {
            return state.tracks;
        },
        getStatus(state) {
            return state.status;
        }
    }
}