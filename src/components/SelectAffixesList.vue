<template>
  <t-space direction="vertical">
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
            @click="
              () =>
                itemStore.addAffix(affixWithTierOption.id, {
                  level: affixWithTierOption.level,
                  isPrefix: affixWithTierOption.isPrefix,
                })
            "
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

const affixesPool = computed(() => {
  return itemStore.itemAffixesPool.filter((affix) => affix.level <= itemStore.item.level)
})

const itemAffixesOptions = computed(() => {
  return deduplicateByMax(affixesPool.value, 'id', 'level')
})

const curAffixIDs = ref<string[]>([])
const handlePanelChange: CollapseProps['onChange'] = (val) => {
  curAffixIDs.value = val.map(String)
}
const affixesWithTierOptions = computed(() => {
  return affixesPool.value.filter((affix) => curAffixIDs.value.includes(affix.id))
})
</script>
<style scoped></style>
