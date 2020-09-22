export default {
    namespaced: true,
    state: {
        total: 0,
        icon_animated: false
    },
    mutations: {
        SET_ICON_ANIMATED(state, value) {
            state.icon_animated = value
        },
        INCREMENT_TOTAL_ITEMS(state) {
            state.total++
        },
        DECREMENT_TOTAL_ITEMS(state) {
            state.total--
        }
    },
    actions: {},
    getters: {
        getIconAnimated(state) {
            return state.icon_animated
        },
        getCartTotalItems(state) {
            return state.total
        }
    }
}
