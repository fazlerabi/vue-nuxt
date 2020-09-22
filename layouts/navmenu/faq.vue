<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        Frequently Asked
        <span class="text-white">Questions</span>
      </h2>
    </div>
    <section class="app-container pb-16">
      <div class="meals-slider w-full overflow-hidden">
        <div class="md:flex w-full flex-wrap">
          <div class="pt-6 w-full lg:w-1/2 md:pr-12"  v-for="p in faq" :key="p._id">
            <div class="collapisble">
              <div class="accordion flex flex-col items-center justify-center">
                <div class="w-full mb-4">
                  <input type="checkbox" name="panel" v-bind:id="'panel-1-' + p._id" class="hidden" />
                  <label
                    v-bind:for="'panel-1-' + p._id"
                    class="block border border-grey p-4 relative accordion-label"
                  >{{p.title}}</label>
                  <div class="accordion__content overflow-hidden bg-grey-lighter">
                    <div class="border">
                      <p class="accordion__body p-4" v-bind:id="'panel-1-' + p._id">
                        {{p.answer}}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-center font-bold text--yellow text-4xl py-12">
        <span class="text--black">Did not find what</span> you are looking for?
      </h2>
      <button class="button flex button--red mx-auto">Send Us a Message</button>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    inViewPort: false
  }),
  computed: {
    ...mapGetters({
      faq: "menu/getFAQ"
    })
  },
  mounted() {
    this.$store.dispatch("menu/fetchFAQ");
  },
  methods: {
    handleInViewPort() {
      this.inViewPort = true;
    }
  },
  components: {
    // MenuItem: () => import("@/components/common/menu/menuItem")
  }
};
</script>

<style lang="scss">
label.accordion-label:after {
  content: "+";
  position: absolute;
  right: 1em;
  color: red;
  top: 0;
  line-height: 56px;
  font-size: 30px;
}

input:checked + label.accordion-label:after {
  content: "-";
  line-height: 56px;
}

.accordion__content {
  max-height: 0em;
  transition: all 0.1s cubic-bezier(0.865, 0.14, 0.095, 0.87);
}
input[name="panel"]:checked ~ .accordion__content {
  /* Get this as close to what height you expect */
  max-height: 50em;
}
</style>