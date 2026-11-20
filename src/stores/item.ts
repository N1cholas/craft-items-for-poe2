import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useDataStore } from '@/stores/data.ts'
import type { Affix } from '@/data'

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

const createInitItem = (type: ItemType = 'bow'): Item => ({
  name: '',
  type,
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

  const item = ref<Item>(createInitItem())

  watch(
    () => item.value.type,
    () => {
      item.value = createInitItem(item.value.type)
    },
  )

  const affixCounts = computed(() => {
    let prefix = 0
    let suffix = 0
    for (const status of item.value.affixesMap.values()) {
      status.isPrefix ? prefix++ : suffix++
    }
    return { prefix, suffix }
  })

  const itemAffixesPool = computed(() => {
    return dataStore.dataPool[item.value.type] ?? []
  })

  const addAffix = (
    affix: Affix,
    affixStatus: AffixStatus = { isPrefix: affix.isPrefix, level: affix.level },
  ): boolean => {
    const map = item.value.affixesMap
    const id = affix.id

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

  const removeAffix = (affix: Affix): boolean => {
    const id = affix.id
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
