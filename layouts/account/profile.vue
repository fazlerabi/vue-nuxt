<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">
        My
        <span class="text-white">Profile</span>
      </h2>
    </div>
    <section class="app-container pb-16">
      <div class="meals-slider w-full overflow-hidden">
        <!-- Three columns -->
        <div class="flex mb-4 w-full flex-wrap px-3 py-12">
          <div class="w-full md:w-1/2">
            <label class="block text-grey-darker text-sm mb-2" for="username">Phone Number</label>
            <input
              class="appearance-none border w-full py-2 px-3 text-sm text-grey-darker"
              id="username"
              type="text"
              disabled
              v-model="phone"
              value="087383737637"
              placeholder="Phone Number"
            />
          </div>
          <div class="w-full md:w-1/2 h-full md:pl-5 sm:pt-5 md:pt-0">
            <label class="block text-grey-darker text-sm mb-2" for="password">Full Name</label>
            <input
              class="appearance-none border border-red w-full text-sm py-2 px-3 text-grey-darker mb-3"
              id="password"
              v-model="full_name"
              type="text"
            />
          </div>
        </div>
      </div>

      <h2 class="font-bold text--black text-3xl">Save Addresses</h2>
      <!-- Three columns -->
      <div class="flex mb-4 flex-wrap">
        <div
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pl-1 pr-3 py-4"
          v-for="p in getAddresses"
          :key="p.id"
        >
          <div class="max-w-sm rounded overflow-hidden shadow">
            <div class="px-3 py-4 border-b">
              <div class="text-sm font-bold">{{p.title}}</div>
            </div>
            <div class="px-3 pt-2">
              <div class="text-md font-bold">{{p.name}}</div>
              <p>{{p.location}}</p>
              <p>{{p.phone}}</p>
            </div>
            <div class="px-3 py-2">
              <table class="table-auto w-full">
                <tbody>
                  <tr>
                    <td class="text-sm">
                      <p>{{p.status}}</p>
                    </td>
                    <td class="text-right text-sm text-yellow-600">{{p.time_remaining}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="flex w-full">
              <div class="w-1/2 text-center py-3 bg-yellow-500 text-white cursor-pointer">Edit</div>
              <div class="w-1/2 text-center py-3 bg-gray-900 text-white cursor-pointer">Remove</div>
            </div>
          </div>
        </div>
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 pl-1 pr-3 py-4">
          <div class="max-w-sm rounded overflow-hidden shadow h-full">
            <router-link to="/addnewaddress">
              <div class="flex w-full h-full bg-gray-400 cursor-pointer">
                <div class="m-auto">
                  <h3 class="text-6xl text-green-600 text-center">+</h3>
                  <p>Add new Address</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data(){
    return{
      phone: this.parseJwt(this.$cookies.get('access_token')).currentUser.phone,
      full_name: this.parseJwt(this.$cookies.get('access_token')).currentUser.name,
      address: [],
    }
  },

  computed: {
    ...mapGetters({
      getAddresses: "profile/getAddresses"
    })
  },
  mounted() {
    this.fetchAllCustomerAddress();
    this.phone
  },
  methods: {
    fetchAllCustomerAddress() {
      console.log("fetch")
      this.$store.dispatch("profile/fetchAllCustomerAddress");
    }
  },
  components: {}
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

.bg-progress {
  background-color: #f4b41a;
}
</style>