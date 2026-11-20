<template>
  <div class="collapse-wrapper">
    <t-collapse expand-mutex @change="handlePanelChange">
      <t-collapse-panel
        v-for="affixFamily in affixFamilies"
        :value="affixFamily.id"
        :key="affixFamily.id"
        :header="affixFamily.name"
      >
        <template #headerRightContent v-if="itemStore.item.affixesMap.has(affixFamily.id)">
          <t-space size="small">
            <t-button
              :theme="itemStore.item.lockedID === affixFamily.id ? 'primary' : 'default'"
              variant="outline"
              @click="() => handleLock(affixFamily)"
              size="small"
            >
              <t-icon v-if="itemStore.item.lockedID === affixFamily.id" name="lock-on" />
              <t-icon v-else name="lock-off" />
            </t-button>
            <t-button
              theme="default"
              variant="outline"
              @click="() => handleDesecrate(affixFamily)"
              size="small"
            >
              亵渎
            </t-button>
            <t-button
              theme="danger"
              variant="outline"
              @click="() => handleRemove(affixFamily)"
              size="small"
            >
              删除
            </t-button>
          </t-space>
        </template>
        <AffixList :affixes="selectedAffixFamily" cursor :handleClick="handleSelectAffixWithTier" />
      </t-collapse-panel>
    </t-collapse>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useItemStore } from '@/stores/item.ts'
import { deduplicateByMax } from '@/utils/deduplicateByMax.ts'
import type { CollapseProps } from 'tdesign-vue-next'
import type { Affix } from '@/data'
import AffixList from '@/components/AffixList.vue'

const itemStore = useItemStore()

const generateAffixesPool = computed(() => {
  return itemStore.itemAffixesPool.filter((affix) => affix.level <= itemStore.item.level)
})

const affixFamilies = computed(() => {
  return deduplicateByMax(generateAffixesPool.value, 'id', 'level').sort((a) =>
    itemStore.item.affixesMap.has(a.id) ? -1 : 1,
  )
})

const curAffixIDs = ref<string[]>([])
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  curAffixIDs.value = val.map(String)
}
const selectedAffixFamily = computed(() => {
  return generateAffixesPool.value.filter((affix) => curAffixIDs.value[0] === affix.id)
})

const handleSelectAffixWithTier = (affix: Affix) => {
  itemStore.addAffix(affix)
}

const handleRemove = (affix: Affix) => {
  itemStore.removeAffix(affix)
}

const handleLock = (affix: Affix) => {
  itemStore.toggleLockAffix(affix)
}

const handleDesecrate = (affix: Affix) => {
  itemStore.desecrateAffix(affix)
}
</script>
<style scoped>
.collapse-wrapper {
  max-height: calc(100vh - 300px);
  overflow: scroll;
}
</style>
