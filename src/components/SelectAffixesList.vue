<template>
  <t-space direction="vertical">
    <t-list size="small">
      <t-list-item v-for="selectAffix in selectedAffixes" :key="selectAffix.id + selectAffix.level">
        <t-list-item-meta :description="`${selectAffix.name} T${selectAffix.level}`" />
      </t-list-item>
    </t-list>
    <t-collapse expand-mutex @change="handlePanelChange">
      <t-collapse-panel
        v-for="affixOption in itemAffixesOptions"
        :value="affixOption.id"
        :key="affixOption.id"
        :header="affixOption.name"
      >
        <t-list size="small">
          <t-list-item
            v-for="affixWithTierOption in affixesWithTierOptions.filter(
              (option) => option.id === affixOption.id,
            )"
            :key="affixWithTierOption.id + affixWithTierOption.level"
            @click="() => itemStore.addAffix(affixWithTierOption.id, affixWithTierOption.level)"
          >
            <t-list-item-meta
              :description="`${affixWithTierOption.name} T${affixWithTierOption.level}`"
            />
          </t-list-item>
        </t-list>
      </t-collapse-panel>
    </t-collapse>
  </t-space>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useItemStore } from '@/stores/item.ts'
import { deduplicateByMax } from '@/utils/deduplicateByMax.ts'
import type { CollapseProps } from 'tdesign-vue-next'

const itemStore = useItemStore()
const itemAffixesOptions = computed(() => {
  return deduplicateByMax(itemStore.itemAffixesPool, 'id', 'level')
})

const curAffixIDs = ref<string[]>([])
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  curAffixIDs.value = val.map(String)
}
const affixesWithTierOptions = computed(() => {
  return itemStore.itemAffixesPool.filter((affix) => curAffixIDs.value.includes(affix.id))
})

const selectedAffixes = computed(() => {
  return itemStore.itemAffixesPool.filter((affixInPool) => {
    if (!itemStore.item.affixesMap.has(affixInPool.id)) return false
    return affixInPool.level === itemStore.item.affixesMap.get(affixInPool.id)
  })
})
</script>
<style scoped></style>
