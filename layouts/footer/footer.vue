<template>
  <footer class="footer-conatiner text-white">
    <div class="flex justify-between flex-col sm:flex-row flex-wrap md:flex-no-wrap app-container pt-8 pb-12 text-sm">
      <div>
        <h4 class="font-semibold text-lg mb-4">About Us</h4>
        <p>Chopmore offers all sorts of delicacies, </p>
        <p>western and African cuisines, well prepared</p> 
        <p>to your taste and satisfaction. We prepare </p>
        <p>your meals in a very hygiene environment,</p>
          <p>using the best ingredients with modern </p>
        <p class="mb-6">cooking utensils.</p>
        <a href="#" class="social-icon">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-google"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
      <div>
        <div class="divider-h block sm:hidden"></div>
        <h4 class="font-semibold text-lg mb-4">Important Links</h4>
        <ul class="links">
          <li><a href="#">Menu</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Term & Condition</a></li>
        </ul>
      </div>
      <div>
        <div class="divider-h block sm:hidden"></div>
        <h4 class="font-semibold text-lg mb-4">Contact Info</h4>
        <label for="email">
          Subscribe to our newsletter<br>
          to get our daily updates.
        </label>
        <small class="block text--yellow">{{ this.message }}</small>
        <input v-model="email" type="email" id="email" placeholder="Email"
               class="text--black w-64 p-3 my-3 block rounded appearance-none focus:outline-none bg-white text-xs">
        <button :disabled="loading" :class="{ 'opacity-50 cursor-not-allowed': loading }"
                class="button button--red rounded w-64 block mb-4" @click.prevent="onSubmitSubscribe">
          Subscribe
        </button>
        <div class="leading-loose">
          <p>
            <i class="fas fa-envelope mr-6"></i>
            <a href="#">Chef@chopmore.com.ng</a>
          </p>
          <p>
            <i class="fas fa-phone-alt mr-6"></i>
            <a href="#">08038320672</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        data: () => ({
            email: null,
            message: null,
            loading: false
        }),
        methods: {
            ...mapActions({
                postEmailList: 'postEmailList'
            }),
            onSubmitSubscribe() {
                if (this.email && !this.loading) {
                    this.loading = true

                    this.postEmailList(this.email).then(message => {

                        this.message = message

                        setTimeout(() => {
                            this.message = null
                        }, 3000)

                        this.loading = false
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .footer-conatiner {
    background: var(--footer-bg);

    .social-icon {
      @apply rounded-full;
      padding: 6px 10px;
      transition: background .2s ease-in-out;

      svg {
        min-width: 13px;
      }

      &:hover {
        background: var(--red);
      }
    }

    .links li {
      @apply mb-1;
    }
  }
</style>