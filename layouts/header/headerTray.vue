<!-- Separated component of the header, to handle tray icon with animations -->

<template>
  <div>
    <lottie :key="iconAnimated" :options="animationOptions" :height="50" :width="50" @animCreated="animationHandler"/>
    <span class="absolute top-0 right-0 mt-1 mr-2 text-xs">{{ cartTotalItems }}</span>
  </div>
</template>

<script>
    import * as emptyAnimationData from "@/assets/animations/a4.json"
    import * as notEmptyAnimationData from "@/assets/animations/a4-1.json"
    import * as eventAnimationData from "@/assets/animations/a4-2.json"
    import {mapGetters, mapMutations} from "vuex"

    export default {
        data: () => ({
            emptyOptions: {animationData: emptyAnimationData.default},
            notEmptyOptions: {animationData: notEmptyAnimationData.default},
            eventOptions: {animationData: eventAnimationData.default},
        }),
        methods: {
            ...mapMutations({
                setIconAnimated: 'cart/SET_ICON_ANIMATED'
            }),
            animationHandler(anim) {
                if (anim.animationData.nm === 'a4-2') {
                    anim.loop = false
                    anim.addEventListener('complete', () => {
                        this.setIconAnimated(false)
                    })
                }
            }
        },
        computed: {
            ...mapGetters({
                'iconAnimated': 'cart/getIconAnimated',
                'cartTotalItems': 'cart/getCartTotalItems'
            }),
            animationOptions() {
                if (this.iconAnimated) {
                    return this.eventOptions
                }
                return this.cartTotalItems ? this.emptyOptions : this.notEmptyOptions
            }
        }
    }
</script>