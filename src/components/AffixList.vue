<template>
  <t-space direction="vertical">
    <t-collapse expand-mutex @change="handlePanelChange">
      <t-collapse-panel
        v-for="affixOption in itemAffixesOptions"
        :value="affixOption.id"
        :key="affixOption.id"
        :header="affixOption.name"
      >
        <ul>
          <li
            v-for="affixWithTierOption in affixesWithTierOptions.filter(
              (option) => option.id === affixOption.id,
            )"
            :key="affixWithTierOption.id + affixWithTierOption.tier"
          >
            {{ affixWithTierOption.name }}
            <span>{{ `T${affixWithTierOption.tier}` }}</span>
          </li>
        </ul>
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

const affixIDs = ref<string[]>([])
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  affixIDs.value = val.map(String)
}
const affixesWithTierOptions = computed(() => {
  return itemStore.itemAffixesPool.filter((affix) => affixIDs.value.includes(affix.id))
})
</script>
<style scoped></style>
