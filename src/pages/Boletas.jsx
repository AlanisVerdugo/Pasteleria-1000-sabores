import '../css/Boletas.css';

function Boletas() {

    return (
        <>
            <main>
                <div className="container bol-seccion">
                    <div className="bol-wrapper">
                        
                        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-check-circle-fill bol-check"></i>
                                <h1 className="bol-titulo mb-0">Comprobante Electrónico</h1>
                                <span className="bol-folio">• N° 0048291</span>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="bol-btn-outline" type="button" onclick="window.print()">
                                    <i className="bi bi-printer"></i> Imprimir
                                </button>
                                <button className="bol-btn-outline" type="button" onclick="window.print()">
                                    <i className="bi bi-download"></i> PDF
                                </button>
                                <a href="catalogo.html" className="bol-btn-primario">
                                    <i className="bi bi-shop"></i> Catálogo
                                </a>
                            </div>
                        </div>

                        {/* documento de boleta */}
                        <div className="bol-doc" id="boleta-fiscal">
                            <div className="bol-doc-header">
                                <div>
                                    <span className="bol-marca">Pastelería 1000 Sabores</span>
                                    <p className="bol-eslogan mb-1">Tradición Pastelera Chilena desde 1974</p>
                                    <p className="bol-direccion mb-0">Av. Providencia 1234, Providencia, Santiago &bull;
                                        contacto@1000sabores.cl</p>
                                </div>
                                <div className="bol-rut-box">
                                    <p className="bol-rut mb-0">R.U.T. 76.543.210-K</p>
                                    <p className="bol-tipo-doc mb-0">BOLETA ELECTRÓNICA</p>
                                    <p className="bol-folio-grande mb-0">N° 0048291</p>
                                    <p className="bol-sii mb-0">S.I.I. - SANTIAGO ORIENTE</p>
                                </div>
                            </div>

                            <div className="row g-4 bol-datos">
                                <div className="col-md-6">
                                    <p className="bol-label-seccion">Receptor</p>
                                    <p className="bol-dato-fuerte mb-1">Juan Pérez González</p>
                                    <p className="bol-dato mb-1">RUT: 18.234.567-8</p>
                                    <p className="bol-dato-chico mb-2">juan.perez@duocuc.cl</p>
                                    <span className="bol-tag">Convenio Duoc UC</span>
                                </div>
                                <div className="col-md-6 text-md-end">
                                    <p className="bol-label-seccion">Detalles de Compra</p>
                                    <p className="bol-dato mb-1">Fecha: <span className="bol-dato-fuerte">24 Octubre 2024, 15:42</span>
                                    </p>
                                    <p className="bol-dato mb-1">Pago: <span className="bol-dato-fuerte">Webpay Plus (Débito ****
                                        4592)</span></p>
                                    <p className="bol-dato mb-1">Cód. Aut.: <span className="bol-mono">729184</span></p>
                                    <p className="bol-dato mb-0">Entrega: <span className="bol-dato-fuerte">Despacho Refrigerado</span>
                                    </p>
                                </div>
                            </div>

                            <div className="table-responsive bol-tabla-wrap">
                                <table className="table bol-tabla">
                                    <thead>
                                        <tr>
                                            <th>Detalle del Producto</th>
                                            <th className="text-center">Cant.</th>
                                            <th className="text-end">Precio</th>
                                            <th className="text-end">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="bol-dato-fuerte">Torta Cuadrada de Chocolate</div>
                                                <div className="bol-dato-chico">Formato familiar (20 Personas) &bull; Bizcocho
                                                    húmedo con relleno trufa</div>
                                            </td>
                                            <td className="text-center">1</td>
                                            <td className="text-end">$45.000</td>
                                            <td className="text-end bol-dato-fuerte">$45.000</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="bol-dato-fuerte">Tiramisú Clásico Individual</div>
                                                <div className="bol-dato-chico">Porción personal en copa artesanal &bull; Café de
                                                    grano y cacao puro</div>
                                            </td>
                                            <td className="text-center">2</td>
                                            <td className="text-end">$5.500</td>
                                            <td className="text-end bol-dato-fuerte">$11.000</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="bol-dato-fuerte">Envío Refrigerado Protegido</div>
                                                <div className="bol-dato-chico">Cadena de frío garantizada a 4°C</div>
                                            </td>
                                            <td className="text-center">1</td>
                                            <td className="text-end">$3.500</td>
                                            <td className="text-end bol-dato-fuerte">$3.500</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-end">
                                <div className="bol-totales">
                                    <div className="d-flex justify-content-between">
                                        <span className="bol-dato">Subtotal:</span>
                                        <span className="bol-dato-fuerte">$50.000 CLP</span>
                                    </div>
                                    <div className="d-flex justify-content-between bol-descuento">
                                        <span>Descuento Duoc UC (10%):</span>
                                        <span className="fw-bold">-$5.600 CLP</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="bol-dato">I.V.A. (19%):</span>
                                        <span className="bol-dato-fuerte">$9.500 CLP</span>
                                    </div>
                                    <div className="d-flex justify-content-between bol-total-final">
                                        <span>TOTAL:</span>
                                        <span>$53.900 CLP</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bol-timbre">
                                <div>
                                    <p className="bol-dato-fuerte mb-0">Timbre Electrónico S.I.I.</p>
                                    <p className="bol-dato-chico mb-0">Res. Exenta N° 80 del 2014 &bull; Verifique en www.sii.cl</p>
                                    <p className="bol-mono-chico mb-0">TED: a9f81bc4703d52c1e840192d4f828a1c6e10b429</p>
                                </div>
                                <span className="bol-codigo-barra">0048291-76543210K-20241024</span>
                            </div>

                            <p className="bol-despedida">
                                ¡Gracias por su compra! &bull; Pastelería 1000 Sabores &bull; Horneando con amor desde 1974
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )

}

export default Boletas;