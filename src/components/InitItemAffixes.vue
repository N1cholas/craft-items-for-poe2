<template>
  <t-collapse expand-mutex @change="handlePanelChange">
    <t-collapse-panel
      v-for="affixFamily in affixFamilies"
      :value="affixFamily.id"
      :key="affixFamily.id"
      :header="affixFamily.name"
    >
      <template #headerRightContent>
        <t-space size="small">
          <t-button
            v-if="itemStore.item.affixesMap.has(affixFamily.id)"
            @click="() => handleRemove(affixFamily)"
            size="small"
            >删除</t-button
          >
        </t-space>
      </template>
      <AffixList :affixes="selectedAffixFamily" cursor :handleClick="handleSelectAffixWithTier" />
    </t-collapse-panel>
  </t-collapse>
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
  return deduplicateByMax(generateAffixesPool.value, 'id', 'level')
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
</script>
<style scoped></style>
