/**
 * 为数组中相同 id 的数据计算内部阶级（1 为最高）
 * @param list 原始数组
 * @param idKey 分组依据的键（如 'id'）
 * @param scoreKey 衡量阶级高低的数值键（如 'power'）
 * @param rankKey 写入结果的新字段名（默认为 'rank'）
 */
export function assignRankById<
  T extends Record<string, unknown>,
  K extends keyof T,
  S extends keyof T,
  R extends string = 'tier',
>(list: T[], idKey: K, scoreKey: S, rankKey: R = 'tier' as R): (T & Record<R, number>)[] {
  // 1. 按 id 将同一组的数据收集起来
  const groupMap = new Map<T[K], T[]>()
  for (const item of list) {
    const id = item[idKey]
    const group = groupMap.get(id) ?? []
    group.push(item)
    groupMap.set(id, group)
  }

  // 2. 记录每条具体对象实例对应的阶级（使用 WeakMap 避免修改原对象）
  const rankMap = new WeakMap<T, number>()

  for (const group of groupMap.values()) {
    // 按数值从高到低排序（浅拷贝避免影响原数组顺序）
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const sorted = [...group].sort((a, b) => b[scoreKey] - a[scoreKey])

    sorted.forEach((item, index) => {
      // 未处理相同数值的情况
      rankMap.set(item, index + 1)
    })
  }

  // 3. 按原数组顺序返回带有阶级字段的新数组
  return list.map((item) => ({
    ...item,
    [rankKey]: rankMap.get(item)!,
  }))
}
