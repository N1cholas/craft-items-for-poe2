/**
 * 根据指定 key 去重，并保留 compareKey 数值最大的一项
 */
export function deduplicateByMax<
  T extends Record<string, unknown>,
  K extends keyof T,
  C extends keyof T,
>(list: T[], idKey: K, compareKey: C): T[] {
  const map = new Map<T[K], T>()

  for (const item of list) {
    const id = item[idKey]
    const existing = map.get(id)

    // 如果 Map 中还没有该 id，或者当前项的对比属性更大，则覆盖写入
    if (!existing || item[compareKey] > existing[compareKey]) {
      map.set(id, item)
    }
  }

  return Array.from(map.values())
}
