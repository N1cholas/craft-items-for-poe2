import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Affix } from '@/data'
import bowData from '@/data/done/bow.json'
import daggersData from '@/data/done/daggers.json'
import quarterstavesData from '@/data/done/quarterstaves.json'
import wandData from '@/data/done/wand.json'
import type { ItemType } from '@/stores/item.ts'

export const useDataStore = defineStore('data', () => {
  // normal affixes
  const bow = ref<Affix[]>(bowData.normal)
  const daggers = ref<Affix[]>(daggersData.normal)
  const quarterstaves = ref<Affix[]>(quarterstavesData.normal)
  const wand = ref<Affix[]>(wandData.normal)

  const dataPool: Record<ItemType, Ref<Affix[]>> = {
    bow,
    daggers,
    quarterstaves,
    wand,
  }

  return { dataPool }
})
