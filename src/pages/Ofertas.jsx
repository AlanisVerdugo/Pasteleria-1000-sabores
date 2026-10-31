import { useEffect, useState } from 'react'
import '../css/catalogo.css'
import TarjetaProducto from '../components/TarjetaProducto'
import { productosService } from '../services/productosService'

function Ofertas() {
    const [productos, setProductos] = useState([])

    useEffect(() => {
        productosService.listarOfertas().then(setProductos)
    }, [])

    return (
        <main>
            <section className="container py-5">

                <div className="mb-4">
                    <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Ofertas de Aniversario</h1>
                    <p className="text-muted">Precios especiales por tiempo limitado, aprovecha antes de que se acaben.</p>
                </div>

                {productos.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                        {productos.map((p) => (
                            <TarjetaProducto key={p.codigo} producto={p} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted mt-4">
                        No hay ofertas disponibles en este momento.
                    </p>
                )}

            </section>
        </main>
    )
}

export default Ofertas