<template>
  <t-collapse expand-mutex @change="handlePanelChange">
    <t-collapse-panel
      v-for="affixOption in itemAffixesOptions"
      :value="affixOption.id"
      :key="affixOption.id"
      :header="affixOption.name"
    >
      <AffixList
        :affixes="affixesWithTierOptions"
        cursor
        :handleClick="handleSelectAffixWithTier"
      />
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

const itemAffixesOptions = computed(() => {
  return deduplicateByMax(generateAffixesPool.value, 'id', 'level')
})

const curAffixIDs = ref<string[]>([])
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  curAffixIDs.value = val.map(String)
}
const affixesWithTierOptions = computed(() => {
  return generateAffixesPool.value.filter((affix) => curAffixIDs.value[0] === affix.id)
})

const handleSelectAffixWithTier = (affix: Affix) => {
  itemStore.addAffix(affix)
}
</script>
<style scoped>
.cursor {
  cursor: pointer;
}
</style>
