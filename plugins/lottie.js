import Vue from 'vue'
import Lottie from 'vue-lottie/src/lottie.vue'

Vue.component('lottie', Lottie)


import VueTypedJs from 'vue-typed-js'
Vue.use(VueTypedJs)

import checkView from 'vue-check-view'
Vue.use(checkView)

import Transitions from 'vue2-transitions'
Vue.use(Transitions)

import { VLazyImagePlugin } from "v-lazy-image"
Vue.use(VLazyImagePlugin)


Vue.config.productionTip = false

import '~/assets/styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'


Vue.mixin({
    methods: {
        setFallbackImageUrl(event) {
            console.log('Image failed to load, setting fallback.')
            event.target.src = '/admin/files/adv_1.png'
        },
        parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        },
        close_dropdown(event) {
            var that = event.target
            console.log(that.nextElementSibling.style.display)
            if (that.nextElementSibling.style.display === "none" || that.nextElementSibling.style.display === "") {
                var x = document.querySelectorAll(".dd-menu")
                x.forEach(function(item, index) {
                    item.style.display = "none";
                });
                that.nextElementSibling.style.display = "block";
            } else {
                that.nextElementSibling.style.display = "none";
            }

        }
    }
})