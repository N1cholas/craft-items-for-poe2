import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ItemType = 'bow' | 'daggers' | 'quarterstaves'
export type ItemRarity = 'normal' | 'magic' | 'rare'

export type Item = {
  name: string
  type: ItemType
  level: number
  rarity: ItemRarity
  affixes: {
    id: string
    level: number
    tier: number
  }[]
}

const initItem: Item = {
  name: '',
  type: 'bow',
  level: 82,
  rarity: 'rare',
  affixes: [],
}

const itemTypeOptionLabelMap: Record<ItemType, string> = {
  bow: '弓',
  daggers: '匕首',
  quarterstaves: '细仗',
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

  return { item, itemTypeOptions, itemRarityOptions }
})
