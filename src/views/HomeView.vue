<template>
  <main>
    <section class="title">
      <t-typography-title level="h1"> <span>最接近</span><br />POE2做装的模拟器</t-typography-title>
      <t-typography-title level="h3">易学易用，方便分享，赛季做装模拟器。</t-typography-title>
      <t-typography-title level="h3">
        <t-button class="start-btn" @click="goToWorkbench"> 立即模拟做装 </t-button>
      </t-typography-title>
    </section>
    <t-space class="highlight-wrapper" size="large">
      <div>
        <t-typography-title level="h3">易用易分享</t-typography-title>
        <t-typography-text>做装通货一目了然，体验公式做装套路，分享做装思路。</t-typography-text>
      </div>
      <div>
        <t-typography-title level="h3">积累经验</t-typography-title>
        <t-typography-text>零成本研究做装思路，积累做装经验。</t-typography-text>
      </div>
      <div>
        <t-typography-title level="h3">预估成本</t-typography-title>
        <t-typography-text>记录做装过程以及成本，判断装备的市场价值。</t-typography-text>
      </div>
    </t-space>
  </main>
</template>
<script setup lang="ts">
import router from '@/router'

const goToWorkbench = () => router.push('/workbench')
</script>
<style scoped>
main {
  background-color: #fff;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.highlight-wrapper {
  padding: 100px 30px 100px 30px;
  display: flex;
  justify-content: center;
}
.highlight-wrapper div {
  width: 80%;
}
</style>
