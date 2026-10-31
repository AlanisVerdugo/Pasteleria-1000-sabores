import { Link } from 'react-router-dom'

function PagoError() {
    return (
        <main>
            <section className="container py-5 text-center">
                <i className="bi bi-x-circle-fill" style={{ fontSize: '3rem', color: '#c0392b' }}></i>
                <h1 style={{ fontFamily: "'Caveat',cursive", color: '#7B4B2A' }}>Hubo un problema con tu pago</h1>
                <p className="text-muted">No pudimos procesar tu pedido. Es posible que no haya stock suficiente de algún producto.</p>
                <Link to="/carrito" className="link-seguir-comprando">Volver al carrito</Link>
            </section>
        </main>
    )
}

export default PagoError