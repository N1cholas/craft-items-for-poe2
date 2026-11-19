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
    <AffixList />
  </div>
</template>

<script setup lang="ts">
import { useItemStore } from '@/stores/item.ts'
import { computed } from 'vue'
import AffixList from '@/components/AffixList.vue'

const itemStore = useItemStore()
const affixesOptions = computed(() => {
  return itemStore.itemAffixesPool
})
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
