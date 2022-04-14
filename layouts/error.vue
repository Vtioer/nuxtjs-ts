<template>
  <footer class="error-container">
    <span>错误页面</span>
  </footer>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class ErrorPage extends Vue {}
</script>
<style lang="scss" scoped>
.error-container {
  width: 100%;
  height: 100px;
  display: flex;
  background: #f5f5f5;
}
</style>
