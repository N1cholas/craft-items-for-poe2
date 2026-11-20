<template>
  <t-space class="steps-wrapper" direction="vertical">
    <t-steps v-model="curStep">
      <t-step-item title="步骤1" content="初始化" />
      <t-step-item title="步骤2" content="做装" />
      <t-step-item title="步骤3" content="总结" />
    </t-steps>
    <InitItem />
    <t-space>
      <t-button v-if="curStep < 2" @click="handleNext">下一步</t-button>
      <t-button v-if="curStep === 1" @click="handleReset">重置</t-button>
      <t-button v-if="curStep === 2" @click="handleNext">导出过程</t-button>
    </t-space>
  </t-space>
</template>
<script setup lang="ts">
import InitItem from '@/components/InitItem.vue'
import { useItemStore } from '@/stores/item.ts'
import { computed } from 'vue'

const itemStore = useItemStore()

const curStep = computed(() => itemStore.item.step)

const handleNext = () => {
  itemStore.item.step++
}

const handleReset = () => {
  itemStore.resetItem()
}
</script>
<style scoped>
.steps-wrapper {
  display: flex;
  padding: 40px;
  background: #fff;
}
</style>
