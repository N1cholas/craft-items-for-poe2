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
  affixesMap: Map<string, AffixStatus>
  maxPrefix: number
  maxSuffix: number
}

export type AffixStatus = {
  level: number
  locked?: boolean
  desecrated?: boolean
  decryption?: boolean
  isPrefix: boolean
}

const createInitItem = (): Item => ({
  name: '',
  type: 'bow',
  level: 82,
  rarity: 'rare',
  affixesMap: new Map<string, AffixStatus>(),
  maxPrefix: 3,
  maxSuffix: 3,
})

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

const itemTypeOptions = Object.entries(itemTypeOptionLabelMap).map(([value, label]) => ({
  value,
  label,
}))

const itemRarityOptions = Object.entries(itemRarityOptionLabelMap).map(([value, label]) => ({
  value,
  label,
}))

// 只放数据逻辑，不放视图逻辑
export const useItemStore = defineStore('item', () => {
  const dataStore = useDataStore()

  const item = ref<Item>({
    name: '',
    type: 'bow',
    level: 82,
    rarity: 'rare',
    affixesMap: new Map<string, AffixStatus>(),
    maxPrefix: 3,
    maxSuffix: 3,
  })

  const affixCounts = computed(() => {
    let prefix = 0
    let suffix = 0
    for (const status of item.value.affixesMap.values()) {
      if (status.isPrefix) prefix++
      else suffix++
    }
    return { prefix, suffix }
  })

  const itemAffixesPool = computed(() => {
    return dataStore.dataPool[item.value.type] ?? []
  })

  const addAffix = (id: string, affixStatus: AffixStatus): boolean => {
    const map = item.value.affixesMap

    if (map.has(id)) {
      map.set(id, affixStatus)
      return true
    }

    const { prefix, suffix } = affixCounts.value
    const canAdd = affixStatus.isPrefix
      ? prefix < item.value.maxPrefix
      : suffix < item.value.maxSuffix

    if (!canAdd) {
      return false
    }

    map.set(id, affixStatus)
    return true
  }

  const removeAffix = (id: string): boolean => {
    const target = item.value.affixesMap.get(id)
    if (!target || target.locked) {
      return false
    }
    return item.value.affixesMap.delete(id)
  }

  const resetItem = () => {
    item.value = createInitItem()
  }

  return {
    item,
    affixCounts,
    itemTypeOptions,
    itemRarityOptions,
    itemAffixesPool,
    addAffix,
    removeAffix,
    resetItem,
  }
})
