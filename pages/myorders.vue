<template>
  <div>
    <AppHeader />

    <div :class="{'fixed': isMobileMenuOpened}">
      <Observer @intersect="intersected" class="nav-observer" />

      <MyOrders />

      <QuickLinksFooter />
      
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
    MyOrders: () => import("@/layouts/account/myorders"),
    AppFooter: () => import("@/layouts/footer/footer"),
    QuickLinksFooter: () => import("@/layouts/footer/quicklinks")
  }
};
</script>

<style lang="scss">
.nav-observer {
  position: absolute;
  top: 10%;
}
</style>
