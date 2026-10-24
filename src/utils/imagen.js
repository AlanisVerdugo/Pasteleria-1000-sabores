// En texto base64
export function achicarImagen(archivo, tamano = 200) {
  return new Promise((resolve, reject) => {
    if (!archivo || !archivo.type.startsWith('image/')) {
      reject(new Error('El archivo debe ser una imagen'))
      return
    }

    const lector = new FileReader()
    lector.onerror = () => reject(new Error('No se pudo leer el archivo'))
    lector.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('No se pudo leer la imagen'))
      img.onload = () => {
        // Recorte cuadrado centrado
        const lado = Math.min(img.width, img.height)
        const x = (img.width - lado) / 2
        const y = (img.height - lado) / 2

        const canvas = document.createElement('canvas')
        canvas.width = tamano
        canvas.height = tamano
        canvas.getContext('2d').drawImage(img, x, y, lado, lado, 0, 0, tamano, tamano)

        resolve(canvas.toDataURL('image/jpeg', 0.8))
      }
      img.src = lector.result
    }
    lector.readAsDataURL(archivo)
  })
}

