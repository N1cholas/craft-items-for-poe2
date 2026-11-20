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
        <t-menu-item @click="() => goToPage(ROUTE_PATH.HOME)" value="home">Home</t-menu-item>
        <t-menu-item @click="() => goToPage(ROUTE_PATH.WORKBENCH)" value="workbench"
          >Workbench
        </t-menu-item>
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
    <t-footer> Copyright </t-footer>
  </t-layout>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router, { ROUTE_PATH } from '@/router'

const route = useRoute()
watch(
  () => route.path,
  (newPath) => {
    activeMenu.value = newPath.replace('/', '')
  },
)
const activeMenu = ref('home')
const handleActiveMenu = (val: string) => {
  activeMenu.value = val
}
const goToPage = (path: ROUTE_PATH) => router.push(path)
</script>
<style scoped></style>
