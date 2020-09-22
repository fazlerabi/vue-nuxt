<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        <router-link to="/profile">
          <img src="/img/icons/arrow.svg" />
        </router-link>
      </h2>
    </div>
    <section class="app-container">
      <div class="w-full overflow-hidden">
        <div class="pb-10 pt-10">
          <h2 class="text-2xl font-bold">Add Address</h2>
          <form>
            <div class="pt-6 flex flex-col">
              <div class="md:flex">
                <div class="mb-4 w-full lg:w-1/2 pr-12">
                  <label class="block text-grey-darker text-sm mb-2" for="username">Address Title</label>
                  <input
                    class="appearance-none border w-full py-2 px-3 text-sm text-grey-darker"
                    id="username"
                    type="text"
                    v-model="title"
                  />
                </div>
                <div class="mb-6 w-full lg:w-1/2 relative">
                  <label class="block text-grey-darker text-sm mb-2" for="text">Select Town</label>
                  <div class="relative">
                    <select
                      v-model="coverage_id"
                      class="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option v-for="p in coverage" :key="p._id" :value="p._id">{{p.title}}</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                    >
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="md:flex">
                <div class="mb-4 w-full lg:w-1/2 pr-12">
                  <label class="block text-grey-darker text-sm mb-2" for="text">Recipient Name</label>
                  <input
                    class="appearance-none border w-full py-2 px-3 text-sm text-grey-darker"
                    id="username"
                    v-model="name"
                    type="text"
                  />
                </div>
                <div class="mb-6 w-full lg:w-1/2">
                  <label class="block text-grey-darker text-sm mb-2" for="text">Full Address</label>
                  <input
                    class="appearance-none border border-red w-full text-sm py-2 px-3 text-grey-darker mb-3"
                    id="password"
                    type="text"
                    v-model="location"
                  />
                </div>
              </div>
              <div class="md:flex">
                <div class="mb-4 w-full lg:w-1/2 pr-12">
                  <label class="block text-grey-darker text-sm mb-2" for="username">Phone Number</label>
                  <input
                    class="appearance-none border w-full py-2 px-3 text-sm text-grey-darker"
                    id="username"
                    type="text"
                    v-model="phone"
                  />
                </div>
              </div>

              <div class="flex justify-center pt-16">
                <button
                @click="add_address"
                  class="bg-green-600 button font-bold h-12 hover:bg-blue-600 mb-6 px-4 py-2 text-white w-100"
                  type="button"
                >Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    inViewPort: false,
    name: "",
    title: "",
    location: "",
    coverage_id: "",
    phone: ""
  }),
  mounted() {
    this.$store.dispatch("profile/get_coverage");
  },
  computed: {
    ...mapGetters({
      coverage: "profile/get_coverage"
    })
  },
  methods: {
    handleInViewPort() {
      this.inViewPort = true;
    },
    add_address() {
      console.log("fetch");

      var payload = {
        customer_id: this.$cookies.get("customer_id"),
        name: this.name,
        title: this.title,
        location: this.location,
        coverage_id: this.coverage_id,
        phone: this.phone
      };

      console.log(payload)

      this.$store.dispatch("profile/add_address", payload).then(res => {
        console.log("sdsdsd");
        this.$router.push('/profile')
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