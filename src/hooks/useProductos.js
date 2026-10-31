import { useEffect, useState } from 'react'
import { productosService } from '../services/productosService'

export function useProductos({ texto, categoriaId, forma, personas }) {
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        setCargando(true)
        productosService.buscar({ texto, categoriaId, forma, personas }).then((resultado) => {
            setProductos(resultado)
            setCargando(false)
        })
    }, [texto, categoriaId, forma, personas])

    return { productos, cargando }
}