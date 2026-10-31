import { Link, useLocation } from 'react-router-dom'

function PagoError() {
    const location = useLocation()
    const mensaje = location.state?.mensaje

    return (
        <main>
            <section className="container py-5 text-center">
                <i className="bi bi-x-circle-fill" style={{ fontSize: '3rem', color: '#c0392b' }}></i>
                <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Hubo un problema con tu pago</h1>
                <p className="text-muted">
                    {mensaje || 'No pudimos procesar tu pedido.'}
                </p>
                <p className="text-muted small">No te preocupamos, no se te cobró nada y tu carrito sigue intacto.</p>

                <div className="d-flex gap-3 justify-content-center mt-3">
                    <Link to="/checkout" className="btn-confirmar-pedido">Reintentar pago</Link>
                    <Link to="/carrito" className="link-seguir-comprando align-self-center">Volver al carrito</Link>
                </div>
            </section>
        </main>
    )
}

export default PagoError