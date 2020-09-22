/*
 * Helper for applying background and shadow on Navbar when scrolling
 */
/* eslint-disable */
const SHADOW_CLASS = 'nav--shadowed'

export default {
    data: () => ({
        navElement: null
    }),
    methods: {
        isNavHasShadow() {
            if (this.navElement) {
                return this.navElement.classList.contains(SHADOW_CLASS)
            }
            return false
        },

        addNavShadow() {
            if (this.navElement) {
                this.navElement.classList.add(SHADOW_CLASS)
            }
        },

        removeNavShadow() {
            if (this.navElement) {
                this.navElement.classList.remove(SHADOW_CLASS)
            }
        }
    }
}