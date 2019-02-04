import { resolvePromises } from '@/test/test-utils'
import { harcodedMarioBlob } from './test-utils'

const dataTestId = (id) => `[data-test="${id}"]`

export const getFirstInputValue = wrapper => wrapper.find('input').element.value

export const clickButton = (wrapper, id) => wrapper.find(dataTestId(id)).trigger('click')

export const clickSecond = (wrapper, id) => findAll(wrapper, id).at(1).trigger('click')

export const findAll = (wrapper, id) => wrapper.findAll(dataTestId(id))

export const find = (wrapper, id) => wrapper.find(dataTestId(id))

export const typeQTextValue = (wrapper, id, value) => {
  find(wrapper, id).findAll('textarea').setValue(value)
}
export const typeQInputValue = (wrapper, id, value) => find(wrapper, id).find('input').setValue(value)
export const getQInputValue = (wrapper, id) => find(wrapper, id).find('input').element.value

export const writeInputValue = (wrapper, id, value) => {
  wrapper.find(dataTestId(id)).setValue(value)
}

export const findMaskValueById = async (wrapper, elementId) => {
  await resolvePromises()
  return wrapper.find(elementId).vm.value
}

// We can choose our preferred one
export const isDisabled = (wrapper, id) => {
  return wrapper.find(dataTestId(id)).find('button').html()
    .includes(`disabled="disabled"`)
}

export const isEnabled = (wrapper, id) => {
  return !isDisabled(wrapper, id)
}

export const isButtonDisabled = (wrapper, id) => {
  return find(wrapper, id).props('disable')
}

export const uploadFile = (wrapper, dataTestId) => {

  const testFile = new File([harcodedMarioBlob()],
    'mario.png',
    {type: "image/png", lastModifiedDate: new Date()}
  )

  // This will not work if you use jest as jsdom does not support DataTransfer
  // const dataTransfer = new DataTransfer()
  // dataTransfer.items.add(testFile)
  // find(wrapper, dataTestId).element.files = dataTransfer.files

  find(wrapper, dataTestId).element.files = new FileList()

}
