<template>
  <EqualLayout>
    <template #left>
      <ThreePointLayout>
        <template #left>
          <t-typography-title level="h5">物品类型</t-typography-title>
          <t-select v-model="itemStore.item.type">
            <t-option
              v-for="option in itemStore.itemTypeOptions"
              :key="option.value"
              :value="option.value"
              :label="option.label"
            />
          </t-select>
        </template>
        <template #middle>
          <t-typography-title level="h5">前后缀数量</t-typography-title>
          <t-input-number
            v-model="itemStore.item.maxPrefix"
            :style="{ marginRight: '5px' }"
            :min="0"
            :max="10"
            align="center"
            theme="column"
          />
          <t-input-number
            v-model="itemStore.item.maxSuffix"
            :min="0"
            :max="10"
            align="center"
            theme="column"
          />
        </template>
        <template #right>
          <t-typography-title level="h5">物品品级</t-typography-title>
          <t-radio-group variant="primary-filled" v-model="itemStore.item.rarity">
            <t-radio-button
              v-for="option in itemStore.itemRarityOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </t-radio-button>
          </t-radio-group>
        </template>
      </ThreePointLayout>
      <t-typography-title level="h5">物品等级</t-typography-title>
      <t-slider
        v-model="itemStore.item.level"
        :show-tooltip="true"
        :marks="[0, 20, 40, 60, 80, 100]"
      />
      <t-typography-title :style="{ marginTop: '40px' }" level="h5">物品词缀</t-typography-title>
      <t-list size="small">
        <t-list-item
          v-for="selectAffix in selectedAffixes"
          :key="selectAffix.id + selectAffix.level"
        >
          <t-list-item-meta
            :description="`${selectAffix.isPrefix} ${selectAffix.name} T${selectAffix.level}`"
          />
        </t-list-item>
      </t-list>
    </template>
    <template #right>
      <h2>affixes pool</h2>
      <SelectAffixesList />
    </template>
  </EqualLayout>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores/item.ts'
import SelectAffixesList from '@/components/SelectAffixesList.vue'
import { computed } from 'vue'
import EqualLayout from '@/components/EqualLayout.vue'
import ThreePointLayout from '@/components/ThreePointLayout.vue'

const itemStore = useItemStore()

const selectedAffixes = computed(() => {
  return itemStore.itemAffixesPool.filter((affixInPool) => {
    if (!itemStore.item.affixesMap.has(affixInPool.id)) return false
    return affixInPool.level === itemStore.item.affixesMap.get(affixInPool.id)?.level
  })
})
</script>

<style scoped></style>
