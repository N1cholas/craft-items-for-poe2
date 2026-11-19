<template>
  <t-space class="steps-wrapper" direction="vertical">
    <t-steps :default-current="1">
      <t-step-item title="步骤1" content="初始化" />
      <t-step-item title="步骤2" content="做装" />
      <t-step-item title="步骤3" content="总结" />
    </t-steps>
    <InitItem />
  </t-space>
</template>
<script setup lang="ts">
import InitItem from '@/components/InitItem.vue'
</script>
<style scoped>
.steps-wrapper {
  display: flex;
  padding: 40px;
  background: #fff;
}
</style>
