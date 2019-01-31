import { resolvePromises } from '@/test/test-utils'

const dataTestId = (id) => `[data-test="${id}"]`

export const getFirstInputValue = wrapper => wrapper.find('input').element.value

export const clickButton = (wrapper, id) => wrapper.find(dataTestId(id)).trigger('click')

export const clickSecond = (wrapper, id) => findAll(wrapper, id).at(1).trigger('click')

export const findAll = (wrapper, id) => wrapper.findAll(dataTestId(id))

export const find = (wrapper, id) => wrapper.find(dataTestId(id))

export const getInputValue = (wrapper, id) => wrapper.find(dataTestId(id)).element.value
export const getQInputValue = (wrapper, id) => wrapper.find(dataTestId(id)).find('input').element.value

export const getInputTagValue = (wrapper, id) => wrapper.find(dataTestId(id))

export const writeInputValue = (wrapper, id, value) => {
  wrapper.find(dataTestId(id)).setValue(value)
}

export const findMaskValueById = async (wrapper, elementId) => {
  await resolvePromises()
  return wrapper.find(elementId).vm.value
}

export const isDisabled = (wrapper, id) => wrapper.find(dataTestId(id)).html()
  .includes(`disabled="disabled"`)
