<template>
  <section class="layouts-container">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="main">
      <nuxt />
    </div>
    <div class="footer-wrapper">
      <Footer />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Header from "./header.vue";
import Footer from "./footer.vue";

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class Default extends Vue {}
</script>

<style lang="scss" scoped>

</style>
