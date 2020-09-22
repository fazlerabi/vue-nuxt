<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        Contact
        <span class="text-white">Us</span>
      </h2>
    </div>
    <section class="app-container">
      <div class="w-full overflow-hidden">
        <div class="pb-10 pt-10">
          <h2 class="text-2xl font-bold">Drop us a message</h2>
          <form>
            <div class="pt-6 flex flex-col">
              <div class="md:flex">
                <div class="mb-4 w-full lg:w-1/2 md:pr-12">
                  <label class="block text-grey-darker text-sm mb-2" for="username">Name</label>
                  <input
                    class="appearance-none border w-full py-2 px-3 text-sm text-grey-darker"
                    id="username"
                    type="text"
                    v-model="name"
                    placeholder="Username"
                  />
                </div>
                <div class="mb-6 w-full lg:w-1/2">
                  <label class="block text-grey-darker text-sm mb-2" for="password">Contact</label>
                  <input
                    class="appearance-none border border-red w-full text-sm py-2 px-3 text-grey-darker mb-3"
                    id="password"
                    type="text"
                    v-model="phone"
                    placeholder="******************"
                  />
                </div>
              </div>
              <div class="mb-6 w-full">
                <label class="block text-grey-darker text-sm mb-2" for="password">Message</label>
                <textarea class="border w-full h-48 p-4" v-model="message"></textarea>
              </div>

              <div class="flex justify-end">
                <button
                  @click="contactus"
                  class="bg-blue-500 button font-bold h-12 hover:bg-blue-600 mb-6 px-4 py-2 text-white w-100"
                  style="background-color: #F61907"
                  type="button"
                >Send</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    inViewPort: false,
    name: "",
    phone: "",
    message: ""
  }),
  methods: {
    handleInViewPort() {
      this.inViewPort = true;
    },
    contactus() {
      var payload = {
        phone: this.phone,
        name: this.name,
        message: this.message
      };

      this.$store.dispatch("menu/contactus", payload).then(res => {
        this.name = "";
        this.phone = "";
        this.message = "";
      });
    }
  },
  components: {
    // MenuItem: () => import("@/components/common/menu/menuItem")
  }
};
</script>

<style lang="scss">
.custom-label input:checked + svg {
  display: block !important;
}
</style>