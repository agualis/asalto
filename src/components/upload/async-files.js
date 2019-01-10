export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    console.log('WOWWO', typeof file)
    let reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = reject;
    reader.readAsDataURL(file);
  })
}
