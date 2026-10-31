import { useEffect, useState } from 'react'
import { productosService } from '../services/productosService'

export function useProductos({ texto, categoriaId, forma, personas }) {
    const [resultado, setResultado] = useState({ productos: [], clave: null })
    const clave = JSON.stringify({ texto, categoriaId, forma, personas })

    useEffect(() => {
        productosService.buscar({ texto, categoriaId, forma, personas }).then((productos) => {
            setResultado({ productos, clave })
        })
    }, [clave, texto, categoriaId, forma, personas])

    const cargando = resultado.clave !== clave
    return { productos: resultado.productos, cargando }
}

