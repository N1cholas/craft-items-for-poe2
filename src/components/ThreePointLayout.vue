<template>
  <section class="three-point-layout">
    <div class="left"><slot name="left" /></div>
    <div class="middle"><slot name="middle" /></div>
    <div class="right"><slot name="right" /></div>
  </section>
</template>
<script setup lang="ts"></script>
<style scoped>
.three-point-layout {
  display: flex;
  gap: 20px;
}
.right,
.middle,
.left {
  flex: 1;
}
</style>
