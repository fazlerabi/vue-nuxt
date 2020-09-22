<template>
  <header class="absolute w-full flex items-center h-32">
    <div class="flex flex-row items-center justify-between app-container">
      <HeaderLogo/>

      <HeaderMenu/>
    </div>
  </header>
</template>

<script>
    export default {
        components: {
            HeaderLogo: () => import('./headerLogo'),
            HeaderMenu: () => import('./headerNav'),
        }
    }
</script>