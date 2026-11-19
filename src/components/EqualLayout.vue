<template>
  <section class="equal-layout">
    <div class="left"><slot name="left" /></div>
    <div class="right"><slot name="right" /></div>
  </section>
</template>
<script setup lang="ts"></script>
<style scoped>
.equal-layout {
  display: flex;
  gap: 20px;
}
.right,
.left {
  flex: 1;
}
</style>
