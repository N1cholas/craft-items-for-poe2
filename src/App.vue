<template>
  <t-layout>
    <t-header>
      <t-head-menu theme="light" :value="activeMenu" height="120px" @change="handleActiveMenu">
        <template #logo>
          <img
            height="28"
            class="logo"
            src="https://tdesign.gtimg.com/site/baseLogo-light.png"
            alt="logo"
          />
        </template>
        <t-menu-item @click="goToHome" value="home">Home</t-menu-item>
        <t-menu-item @click="goToWorkbench" value="workbench">Workbench </t-menu-item>
        <template #operations>
          <a href="javascript:"
            ><t-icon class="t-menu__operations-icon" name="notification-filled"
          /></a>
          <a href="javascript:"><t-icon class="t-menu__operations-icon" name="home" /></a>
        </template>
      </t-head-menu>
    </t-header>
    <t-content>
      <RouterView />
    </t-content>
    <t-footer>
      Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved
    </t-footer>
  </t-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const activeMenu = ref('home')
const handleActiveMenu = (val: string) => {
  console.log(val)
  activeMenu.value = val
}
const goToHome = () => {
  router.push('home')
}
const goToWorkbench = () => {
  router.push('workbench')
}
</script>
<style scoped></style>
