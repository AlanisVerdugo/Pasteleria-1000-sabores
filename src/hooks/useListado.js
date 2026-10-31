import { useCallback, useEffect, useState } from 'react'

// Hook personalizado del admin: llama a una función async (un service) al montar
// y devuelve { datos, cargando, error, recargar }.
// IMPORTANTE: funcionListar tiene que ser siempre la misma función (un service
// o una función definida FUERA del componente), si no, se volvería a llamar en cada render.
export function useListado(funcionListar, valorInicial = []) {
  const [estado, setEstado] = useState({ datos: valorInicial, cargando: true, error: '' })
  const [version, setVersion] = useState(0) // cambiarla vuelve a correr el efecto

  useEffect(() => {
    let activo = true // evita actualizar si el componente ya se desmontó
    funcionListar()
      .then((datos) => { if (activo) setEstado({ datos, cargando: false, error: '' }) })
      .catch((e) => { if (activo) setEstado((s) => ({ ...s, cargando: false, error: e.message })) })
    return () => { activo = false }
  }, [funcionListar, version])

  // Para refrescar la lista después de crear, editar o eliminar
  const recargar = useCallback(() => setVersion((v) => v + 1), [])

  return { ...estado, recargar }
}
