<template>
  <div>
    <div class="header-padding-top primary-color"></div>
    <div class="heading primary-color">
      <h2 class="app-container font-bold text--yellow text-4xl pb-5 pt-5">Login</h2>
    </div>
    <section class>
      <div class="w-full overflow-hidden">
        <div class="flex flex-wrap">
          <div class="w-1/2 hidden lg:block">
            <img class="w-full object-cover h-full" src="/img/static/login.svg" />
          </div>
          <div class="w-full lg:w-1/2">
            <div class="pl-10 pb-10 pt-10 pr-10 lg:pr-56">
              <h2 class="text-2xl font-bold">Please Login</h2>
              <form>
                <div class="pt-6">
                  <div class="mb-4">
                    <label class="block text-grey-darker text-sm mb-2" for="username">Phone Number</label>
                    <input
                      class="appearance-none border w-full py-2 px-3 text-sm text-grey-darker"
                      id="username"
                      type="text"
                      v-model="phone"
                      placeholder="Username"
                    />
                  </div>
                  <div class="mb-6">
                    <label class="block text-grey-darker text-sm mb-2" for="password">Password</label>
                    <input
                      class="appearance-none border border-red w-full text-sm py-2 px-3 text-grey-darker mb-3"
                      id="password"
                      type="password"
                      v-model="password"
                      placeholder="******************"
                    />
                    <!-- <p class="text-red text-xs italic">Please choose a password.</p> -->
                  </div>
                  <label class="custom-label flex items-center mb-6">
                    <div class="bg-white border w-6 h-6 flex justify-center items-center mr-2">
                      <input type="checkbox" class="hidden" checked />
                      <svg
                        class="hidden w-10 text-green-600 pointer-events-none"
                        style="color: #ffffff;background: red;"
                        viewBox="0 0 172 172"
                      >
                        <g
                          fill="none"
                          stroke-width="none"
                          stroke-miterlimit="10"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style="mix-blend-mode:normal"
                        >
                          <path d="M0 172V0h172v172z" />
                          <path
                            d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z"
                            fill="currentColor"
                            stroke-width="1"
                          />
                        </g>
                      </svg>
                    </div>
                    <span class="select-none text-sm">Remember Password</span>
                  </label>
                  <div class="flex flex-col justify-between">
                    <button
                      class="bg-blue-500 w-full mb-6 hover:bg-blue-600 text-white font-bold py-2 h-12 px-4 w-100"
                      style="background-color: #F61907"
                      type="button"
                      v-on:click="login"
                    >Log In</button>
                    <a
                      class="inline-block align-baseline text-sm text-blue hover:text-blue-darker"
                      href="#"
                    >Forgot Password?</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    inViewPort: false,
    phone: "",
    password: ""
  }),
  methods: {
    handleInViewPort() {
      this.inViewPort = true;
    },
    login() {
      var payload = {
        phone: this.phone,
        password: this.password
      };

      this.$store
        .dispatch("profile/login", payload)
        .then(res => {
          this.phone = "";
          this.v = "";

          console.log(res);

          this.$cookies.set("access_token", res.data.token, {
            path: "/",
            // httpOnly : true,
            // secure: true,
            maxAge: 60 * 60 * 24 * 7
          });

          console.log(this.parseJwt(res.data.token).currentUser._id)

          this.$cookies.set("customer_id", this.parseJwt(res.data.token).currentUser._id, {
            path: "/",
            // httpOnly : true,
            // secure: true,
            maxAge: 60 * 60 * 24 * 7
          });

          this.$router.push('/myorders')
        })
        .catch(err => {
          alert("Error");
          console.log(err.response.data.errors);
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