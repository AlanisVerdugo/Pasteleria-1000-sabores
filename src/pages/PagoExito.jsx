import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BoletaDetalle from '../components/BoletaDetalle'
import { ordenesService } from '../services/ordenesService'

function PagoExito() {
    const { ordenId } = useParams()
    const [orden, setOrden] = useState(null)
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        ordenesService.obtenerPorId(ordenId).then((o) => {
            setOrden(o)
            setCargando(false)
        })
    }, [ordenId])

    if (cargando) {
        return (
            <main>
                <section className="container py-5 text-center">
                    <p className="text-muted">Cargando...</p>
                </section>
            </main>
        )
    }

    return (
        <main>
            <section className="container py-5">
                <div className="text-center mb-4">
                    <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem', color: '#3E7A4D' }}></i>
                    <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>¡Pago exitoso!</h1>
                    <p className="text-muted">Tu pedido ha sido confirmado. Aquí tienes tu boleta.</p>
                </div>

                <BoletaDetalle orden={orden} />

                <div className="text-center mt-4">
                    <Link to="/mis-pedidos" className="link-seguir-comprando">Ver mis pedidos</Link>
                </div>
            </section>
        </main>
    )
}

export default PagoExito