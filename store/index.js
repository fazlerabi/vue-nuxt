import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import $axios from '@/helpers/axios'

import CartStore from './modules/cart'
import SlideStore from './modules/slides'
import MealsStore from './modules/meals'
import TestimonialsStore from './modules/testimonials'
import MenusStore from './modules/menu'
import ProfilStore from './modules/profile'
import TrackStore from './modules/track'

$axios.defaults.baseURL = 'http://134.122.108.145/'

$axios.withCredentials = false
    // $axios.headers =

$axios.defaults.headers.post['Content-Type'] = 'application/json';
$axios.defaults.headers.post['Accept'] = 'application/json';

// withCredentials: false,
// headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// }

export const state = () => ({
    splash_screen_opened: true,
    menu_mobile_opened: false
});
export const mutations = {
    setSplashScreenOpened(state, value) {
        state.splash_screen_opened = value
    },
    setMenuMobileOpened(state, value) {
        state.menu_mobile_opened = value
    }
};
export const actions = {
    // eslint-disable-next-line no-empty-pattern
    postEmailList({}, email) {
        return $axios.post('customers/list', { email }).then((response) => {
            return response.data.message
        })
    }
};
export const getters = {
    getSplashScreenOpened(state) {
        return state.splash_screen_opened;
    },
    getMenuMobileOpened(state) {
        return state.menu_mobile_opened;
    }
};
export const modules = {
    cart: CartStore,
    slide: SlideStore,
    meals: MealsStore,
    testimonials: TestimonialsStore,
    menu: MenusStore,
    profile: ProfilStore,
    track: TrackStore
}