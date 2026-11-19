import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import InitItem from '../InitItem.vue'

describe('InitItem', () => {
  it('renders properly', () => {
    const wrapper = mount(InitItem, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
