import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useItemStore } from '@/stores/item'
import type { Affix } from '@/data'
import { useDataStore } from '@/stores/data.ts'

describe('useItemStore', () => {
  const mockPrefixAffix: Affix = {
    name: '附加 (6—9) - (11—16) 物理伤害',
    id: 'mock-prefix-id-1',
    isPrefix: true,
    tags: ['伤害', '物理', '攻击'],
    dropChance: 1000,
    level: 16,
  }
  const mockPrefixAffix2 = { ...mockPrefixAffix, id: 'mock-prefix-id-2', level: 22 }
  const mockPrefixAffix3 = { ...mockPrefixAffix, id: 'mock-prefix-id-3', level: 33 }
  const mockPrefixAffix4 = { ...mockPrefixAffix, id: 'mock-prefix-id-4', level: 44 }

  const mockSuffixAffix = {
    name: '+(5—8) 敏捷',
    id: 'mock-suffix-id-1',
    isPrefix: false,
    tags: ['属性'],
    dropChance: 1000,
    level: 1,
  }
  const mockSuffixAffix2 = { ...mockSuffixAffix, id: 'mock-suffix-id-2', level: 222 }
  const mockSuffixAffix3 = { ...mockSuffixAffix, id: 'mock-suffix-id-3', level: 333 }
  const mockSuffixAffix4 = { ...mockSuffixAffix, id: 'mock-suffix-id-4', level: 444 }

  beforeEach(() => {
    // 每个测试用例执行前创建全新的 Pinia 实例，保证测试完全隔离
    setActivePinia(createPinia())

    const dataStore = useDataStore()

    dataStore.dataPool = {
      bow: [
        mockPrefixAffix,
        mockPrefixAffix2,
        mockPrefixAffix3,
        mockPrefixAffix4,
        mockSuffixAffix,
        mockSuffixAffix2,
        mockSuffixAffix3,
        mockSuffixAffix4,
      ],
      wand: [],
      daggers: [],
      quarterstaves: [],
    }
  })

  it('init item', () => {
    const store = useItemStore()

    expect(store.item.type).toBe('bow')
    expect(store.item.level).toBe(82)
    expect(store.item.rarity).toBe('rare')
    expect(store.item.maxPrefix).toBe(3)
    expect(store.item.maxSuffix).toBe(3)
    expect(store.item.lockedID).toBe('')
    expect(store.item.affixesMap.size).toBe(0)
    expect(store.affixCounts).toEqual({ prefix: 0, suffix: 0 })
  })

  it('add affixes and get its level', () => {
    const store = useItemStore()

    const res1 = store.addAffix(mockPrefixAffix)
    const res2 = store.addAffix(mockSuffixAffix)

    expect(res1).toBe(true)
    expect(res2).toBe(true)
    expect(store.item.affixesMap.size).toBe(2)
    expect(store.item.affixesMap.get('mock-prefix-id-1')).toBe(16)
    expect(store.item.affixesMap.get('mock-suffix-id-1')).toBe(1)
    expect(store.affixCounts).toEqual({ prefix: 1, suffix: 1 })
  })

  it('update affix', () => {
    const store = useItemStore()

    store.addAffix(mockPrefixAffix)
    store.addAffix({ ...mockPrefixAffix, level: 99 })

    expect(store.item.affixesMap.get('mock-prefix-id-1')).toBe(99)
    expect(store.affixCounts.prefix).toBe(1)

    store.addAffix(mockSuffixAffix)
    store.addAffix({ ...mockSuffixAffix, level: 88 })

    expect(store.item.affixesMap.get('mock-suffix-id-1')).toBe(88)
    expect(store.affixCounts.suffix).toBe(1)
  })

  it('prefix and suffix counts limit', () => {
    const store = useItemStore()

    expect(store.addAffix(mockPrefixAffix)).toBe(true)
    expect(store.addAffix(mockPrefixAffix2)).toBe(true)
    expect(store.addAffix(mockPrefixAffix3)).toBe(true)
    expect(store.addAffix(mockPrefixAffix4)).toBe(false)
    expect(store.affixCounts.prefix).toBe(3)

    expect(store.addAffix(mockSuffixAffix)).toBe(true)
    expect(store.addAffix(mockSuffixAffix2)).toBe(true)
    expect(store.addAffix(mockSuffixAffix3)).toBe(true)
    expect(store.addAffix(mockSuffixAffix4)).toBe(false)
    expect(store.affixCounts.suffix).toBe(3)
  })

  it('lock only 1 exist affix', () => {
    const store = useItemStore()

    expect(store.toggleLockAffix(mockPrefixAffix)).toBe(false)
    expect(store.toggleLockAffix(mockSuffixAffix)).toBe(false)

    store.addAffix(mockPrefixAffix)
    store.addAffix(mockSuffixAffix)

    expect(store.toggleLockAffix(mockPrefixAffix)).toBe(true)
    expect(store.item.lockedID).toBe('mock-prefix-id-1')

    expect(store.toggleLockAffix(mockSuffixAffix)).toBe(true)
    expect(store.item.lockedID).toBe('mock-suffix-id-1')

    expect(store.toggleLockAffix(mockSuffixAffix)).toBe(true)
    expect(store.item.lockedID).toBe('')
  })

  it('remove unlock affix', () => {
    const store = useItemStore()

    store.addAffix(mockPrefixAffix)
    store.addAffix(mockSuffixAffix)
    store.toggleLockAffix(mockPrefixAffix)

    expect(store.removeAffix(mockPrefixAffix)).toBe(false)
    expect(store.item.affixesMap.has('mock-prefix-id-1')).toBe(true)

    expect(store.removeAffix(mockSuffixAffix)).toBe(true)
    expect(store.item.affixesMap.has('mock-suffix-id-1')).toBe(false)
  })

  it('empty affixes when switch item type', async () => {
    const store = useItemStore()

    store.addAffix(mockPrefixAffix)
    store.toggleLockAffix(mockPrefixAffix)
    expect(store.item.affixesMap.size).toBe(1)

    store.item.type = 'wand'
    // 等待 Vue watch 异步微任务执行完毕
    await Promise.resolve()

    expect(store.item.type).toBe('wand')
    expect(store.item.affixesMap.size).toBe(0)
    expect(store.item.lockedID).toBe('')
    expect(store.itemAffixesPool).toHaveLength(0)
  })
})
