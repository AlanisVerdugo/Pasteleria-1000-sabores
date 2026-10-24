import { achicarImagen } from './imagen'

describe('achicarImagen', () => {
  test('rechaza un archivo que no es imagen', async () => {
    const archivo = new File(['hola'], 'notas.txt', { type: 'text/plain' })
    await expect(achicarImagen(archivo)).rejects.toThrow('El archivo debe ser una imagen')
  })
})