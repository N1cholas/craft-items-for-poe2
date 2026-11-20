<template>
  <t-list :class="{ cursor }" size="small">
    <t-list-item
      v-for="affix in affixes"
      :key="affix.id + affix.level"
      @click="() => handleClick(affix)"
    >
      <t-tag shape="round" theme="primary" variant="outline">
        {{ affix.isPrefix ? '前缀' : '后缀' }}
      </t-tag>
      {{ affix.name }}
      <t-tag shape="round" theme="primary" variant="outline">
        {{ `T${getTier(affix)}` }}
      </t-tag>
    </t-list-item>
  </t-list>
</template>
<script setup lang="ts">
import type { Affix } from '@/data'
import { useItemStore } from '@/stores/item.ts'

interface Props {
  affixes: Affix[]
  handleClick?: (affix: Affix) => void
  cursor?: boolean
}

const { affixes, handleClick = () => void 0, cursor } = defineProps<Props>()
const itemStore = useItemStore()
const getTier = (affix: Affix): number =>
  itemStore.itemAffixesPool
    .filter((affixInPool) => affixInPool.id === affix.id)
    .sort((a, b) => b.level - a.level)
    .findIndex((affixInFamily) => affixInFamily.level === affix.level) + 1
</script>
<style scoped>
.cursor {
  cursor: pointer;
}
</style>
