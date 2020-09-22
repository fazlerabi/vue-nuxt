<template>
  <div>
    <AppHeader />

    <div :class="{'fixed': isMobileMenuOpened}">
      <Observer @intersect="intersected" class="nav-observer" />

      <Contact />

      <AppFooter />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import navShadowHelper from "@/helpers/navShadow";

export default {
  mixins: [navShadowHelper],
  computed: {
    ...mapGetters({
      isMobileMenuOpened: "getMenuMobileOpened"
    })
  },
  methods: {
    intersected() {
      this.navElement = document.querySelector(".nav");
      if (this.isNavHasShadow()) {
        this.removeNavShadow();
        return;
      }
      this.addNavShadow();
    }
  },
  components: {
    Observer: () => import("@/components/helpers/observer"),
    AppHeader: () => import("@/layouts/header/header"),
    Contact: () => import("@/layouts/navmenu/contact"),
    AppFooter: () => import("@/layouts/footer/footer")
  }
};
</script>

<style lang="scss">
.nav-observer {
  position: absolute;
  top: 10%;
}
</style>
