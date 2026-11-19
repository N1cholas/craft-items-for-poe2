import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores/data.ts'

export type ItemType = 'bow' | 'daggers' | 'quarterstaves' | 'wand'
export type ItemRarity = 'normal' | 'magic' | 'rare'

export type Item = {
  name: string
  type: ItemType
  level: number
  rarity: ItemRarity
  affixesMap: Map<string, number>
}

const initItem: Item = {
  name: '',
  type: 'bow',
  level: 82,
  rarity: 'rare',
  affixesMap: new Map<string, number>(),
}

const itemTypeOptionLabelMap: Record<ItemType, string> = {
  bow: '弓',
  daggers: '匕首',
  quarterstaves: '细仗',
  wand: '法杖',
}

const itemRarityOptionLabelMap: Record<ItemRarity, string> = {
  normal: '普通',
  magic: '魔法',
  rare: '稀有',
}

export const useItemStore = defineStore('item', () => {
  const item = ref(initItem)

  const itemTypeOptions = ref(
    Object.entries(itemTypeOptionLabelMap).map(([value, label]) => ({ value, label })),
  )
  const itemRarityOptions = ref(
    Object.entries(itemRarityOptionLabelMap).map(([value, label]) => ({ value, label })),
  )

  const dataStore = useDataStore()
  const itemAffixesPool = computed(() => dataStore.dataPool[item.value.type])

  const addAffix = (id: string, tier: number) => {
    item.value.affixesMap.set(id, tier)
  }

  const removeAffix = (id: string) => {
    item.value.affixesMap.delete(id)
  }

  return { item, itemTypeOptions, itemRarityOptions, itemAffixesPool, addAffix, removeAffix }
})
