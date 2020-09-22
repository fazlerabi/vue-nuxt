/*
* Custom directive to handle scroll event on Vue
*/

import Vue from 'vue';

const scrollDirective = Vue.directive('scroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

export default scrollDirective;
