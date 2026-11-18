import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Affix } from '@/data'
import bowData from '@/data/done/bow.json'
import daggersData from '@/data/done/daggers.json'
import quarterstavesData from '@/data/done/quarterstaves.json'
import type { ItemType } from '@/stores/item.ts'

export const useDataStore = defineStore('data', () => {
  const bow = ref<Affix[]>(bowData.normal)
  const daggers = ref<Affix[]>(daggersData.normal)
  const quarterstaves = ref<Affix[]>(quarterstavesData.normal)

  const dataPool: Record<ItemType, Ref<Affix[]>> = {
    bow,
    daggers,
    quarterstaves,
  }

  return { dataPool }
})
