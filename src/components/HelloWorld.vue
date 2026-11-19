<template>
  <div class="greetings">
    <h1 class="green">Item Info</h1>
    <select id="itemRarity" v-model="itemStore.item.rarity">
      <option
        v-for="option in itemStore.itemRarityOptions"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <select id="itemType" v-model="itemStore.item.type">
      <option v-for="option in itemStore.itemTypeOptions" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <h2>affixes pool</h2>
    <SelectAffixesList />
  </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores/item.ts'
import SelectAffixesList from '@/components/SelectAffixesList.vue'

const itemStore = useItemStore()
</script>

<style scoped></style>
