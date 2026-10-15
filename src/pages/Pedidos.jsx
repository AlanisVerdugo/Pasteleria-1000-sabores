import '../css/pedidos.css';

import ProductoPedido from '../components/ProductoPedido';

function Pedidos() {

    return (
        <>
            <main>
                <div className="container ped-seccion">
                    {/* ENCABEZADO */}
                    <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
                        <div>
                            <span className="ped-badge-vivo">
                                <i className="bi bi-cookie"></i> Taller Pastelero en Vivo
                            </span>
                            <h1 className="ped-titulo">Seguimiento de Mis Pedidos</h1>
                            <p className="ped-subtitulo mb-0">Revisa el avance de tus órdenes y el estado del horneado en tiempo
                                real.</p>
                        </div>
                    </div>

                    {/* BUSCADOR Y FILTROS (el filtrado con JS se agrega después) */}
                    <div className="row g-3 mb-4">
                        <div className="col-lg-7">
                            <div className="ped-buscador">
                                <i className="bi bi-search"></i>
                                <input type="text" id="buscadorPedidos" placeholder="Buscar por código (ej: #ORD-5012) o producto..."/>
                            </div>
                        </div>
                        <div className="col-lg-5 d-flex gap-2 flex-wrap" id="filtrosPedidos">
                            <button className="ped-filtro ped-filtro-activo" type="button" data-filtro="todos">Todos (3)</button>
                            <button className="ped-filtro" type="button" data-filtro="horno">En Horno</button>
                            <button className="ped-filtro" type="button" data-filtro="ruta">En Ruta</button>
                            <button className="ped-filtro" type="button" data-filtro="entregado">Entregados</button>
                        </div>
                    </div>

                    {/* PEDIDO 1: En Preparación */}
                    <article className="ped-card mb-4" data-codigo="#ORD-5012" data-estado="horno">
                        <div className="ped-card-header">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <span className="ped-codigo">#ORD-5012</span>
                                <span className="text-muted">•</span>
                                <span className="ped-fecha">24 de Octubre, 2024</span>
                                <span className="ped-canal">Web Oficial</span>
                            </div>
                            <span className="ped-estado ped-estado-horno">
                                <i className="bi bi-fire"></i> En Horno (En Preparación)
                            </span>
                        </div>
                        <div className="ped-card-body">
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-7">
                                    <ProductoPedido
                                        imagen="/img/Torta cuadrada de chocolate.jpg"
                                        titulo="Torta Cuadrada de Chocolate"
                                        detalle="1x Tamaño familiar (20 personas) • Trufa y manjar"
                                    />
                                    <ProductoPedido
                                        imagen="/img/Tiramisu clasico.jpg"
                                        titulo="Tiramisú Clásico de la Nonna"
                                        detalle="2x Porciones individuales con café de grano"
                                    />
                                </div>
                                <div className="col-lg-5">
                                    <div className="ped-resumen">
                                        <div className="d-flex justify-content-between">
                                            <span className="ped-label">Envío a Domicilio:</span>
                                            <span className="ped-valor">Las Condes</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="ped-label">Total:</span>
                                            <span className="ped-total">$56.000 CLP</span>
                                        </div>
                                        <div className="d-flex gap-2 pt-2">
                                            <button className="ped-btn-secundario flex-fill" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#detalle5012">
                                                <i className="bi bi-eye"></i> Ver Detalle
                                            </button>
                                            <a href="/boletas" className="ped-btn-terciario">
                                                <i className="bi bi-receipt"></i> Boleta
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="collapse mt-3" id="detalle5012">
                                <div className="ped-detalle-extra">
                                    <strong>Dirección:</strong> Av. Las Condes 11245, Dpto 402 &bull; <strong>Taller:</strong>
                                    Vitacura (Horno 3)
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* PEDIDO 2: En Ruta */}
                    <article className="ped-card mb-4" data-codigo="#ORD-4981" data-estado="ruta">
                        <div className="ped-card-header">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <span className="ped-codigo">#ORD-4981</span>
                                <span className="text-muted">•</span>
                                <span className="ped-fecha">22 de Octubre, 2024</span>
                                <span className="ped-canal">App Móvil</span>
                            </div>
                            <span className="ped-estado ped-estado-ruta">
                                <i className="bi bi-scooter"></i> Enviado / En Despacho
                            </span>
                        </div>
                        <div className="ped-card-body">
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-7">
                                    {/* este producto tiene una línea extra (tracking), por eso no usa el componente */}
                                    <div className="ped-item">
                                        <img src="/img/Torta circular manjar.jpg" alt="Torta Circular de Manjar Casero" className="ped-item-img"/>
                                        <div>
                                            <h3 className="ped-item-titulo">Torta Circular de Manjar Casero</h3>
                                            <p className="ped-item-detalle mb-1">1x Tamaño mediano (15 personas) • Bizcocho de nuez
                                                y hojarasca</p>
                                            <span className="ped-tracking"><i className="bi bi-geo-alt"></i> Repartidor Juan Carlos en
                                                trayecto (a 12 mins de tu puerta)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="ped-resumen">
                                        <div className="d-flex justify-content-between">
                                            <span className="ped-label">Método:</span>
                                            <span className="ped-valor"><i className="bi bi-lightning-charge"></i> Despacho Express
                                                Climatizado</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="ped-label">Total Pagado:</span>
                                            <span className="ped-total">$42.000 CLP</span>
                                        </div>
                                        <button className="ped-btn-primario w-100" type="button" data-bs-toggle="modal"
                                            data-bs-target="#modalRastreo">
                                            <i className="bi bi-geo-alt-fill"></i> Rastrear Despacho
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* PEDIDO 3: Entregado */}
                    <article className="ped-card" data-codigo="#ORD-4730" data-estado="entregado">
                        <div className="ped-card-header">
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <span className="ped-codigo">#ORD-4730</span>
                                <span className="text-muted">•</span>
                                <span className="ped-fecha">15 de Octubre, 2024</span>
                                <span className="ped-canal">Mostrador</span>
                            </div>
                            <span className="ped-estado ped-estado-entregado">
                                <i className="bi bi-patch-check-fill"></i> Entregado Satisfactoriamente
                            </span>
                        </div>
                        <div className="ped-card-body">
                            <div className="row g-4 align-items-center">
                                <div className="col-lg-7">
                                    <ProductoPedido
                                        imagen="/img/Torta sin azucar de naranja.jpg"
                                        titulo="Torta Sin Azúcar de Naranja Glaseada"
                                        detalle="1x Formato mediano (15 personas) • Endulzada con Tagatosa"
                                    />
                                    <ProductoPedido
                                        imagen="/img/Empanada de manzana.jpg"
                                        titulo="Empanada Dulce de Manzana y Canela"
                                        detalle="4x Unidades horneadas de masa fina hojaldrada"
                                    />
                                </div>
                                <div className="col-lg-5">
                                    <div className="ped-resumen">
                                        <div className="d-flex justify-content-between">
                                            <span className="ped-label">Modalidad:</span>
                                            <span className="ped-valor"><i className="bi bi-shop"></i> Retiro en Local Duoc UC</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="ped-label">Total:</span>
                                            <span className="ped-total">$60.000 CLP</span>
                                        </div>
                                        <a href="/catalogo" className="ped-btn-secundario w-100 text-center">
                                            <i className="bi bi-arrow-repeat"></i> Repetir Pedido
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <p className="ped-sin-resultados d-none" id="mensajeSinResultados">
                        No se encontraron pedidos que coincidan con tu búsqueda.
                    </p>
                </div>

                {/* MODAL de rastreo (usa el Bootstrap JS que está en index.html) */}
                <div className="modal fade" id="modalRastreo" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><i className="bi bi-compass"></i> Rastreo en Vivo #ORD-4981</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="ped-mapa-placeholder">
                                    <i className="bi bi-geo-alt-fill"></i>
                                    <span>Repartidor en movimiento por Av. Apoquindo</span>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <span className="ped-label">Conductor:</span>
                                    <span className="ped-valor">Juan Carlos P. (Moto refrigerada #4)</span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span className="ped-label">Tiempo estimado de arribo:</span>
                                    <span className="ped-total">12 - 15 minutos</span>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="ped-btn-primario w-100" data-bs-dismiss="modal">Entendido, estaré
                                    atento</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}

export default Pedidos;
