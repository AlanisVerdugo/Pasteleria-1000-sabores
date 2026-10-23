import { useState } from 'react'

// Hook personalizado: maneja los valores y errores de cualquier formulario
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales)
  const [errores, setErrores] = useState({})

  // Sirve para todos los inputs: usa el "name" del input como clave
  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target
    setValores((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    setErrores((er) => ({ ...er, [name]: undefined })) // borra el error al corregir
  }

  // Valida antes de enviar; solo llama a alEnviar si no hay errores
  const manejarEnvio = (alEnviar) => (e) => {
    e.preventDefault() // evita que el navegador recargue la página
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) alEnviar(valores)
  }

  const reiniciar = () => {
    setValores(valoresIniciales)
    setErrores({})
  }

  return { valores, errores, manejarCambio, manejarEnvio, reiniciar }
}

