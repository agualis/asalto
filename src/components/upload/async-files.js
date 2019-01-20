export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function readFileAsBlob(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = (event) => {
        const blob = new Blob([event.target.result])
        resolve(blob)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}
