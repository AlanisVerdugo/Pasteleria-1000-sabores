import '../css/quienes_somos.css';

import ValorCard from '../components/ValorCard';

function QuienesSomos() {

    return (
        <>
            <main>
                {/* VALORES FUNDAMENTALES */}
                <section className="container qs-seccion">
                    <div className="text-center qs-encabezado">
                        <span className="qs-eyebrow">Lo que nos guía</span>
                        <h2 className="qs-titulo-seccion">Valores Fundamentales</h2>
                        <p className="qs-subtitulo mx-auto">
                            Pilares que sostienen cada batido, cada horneada y cada entrega a lo largo de Chile.
                        </p>
                    </div>
                    <div className="row g-4">
                        <ValorCard
                            icono="bi bi-palette"
                            colorIcono="qs-icono-crema"
                            titulo="Amor por el Oficio"
                            texto="Paciencia artesanal sin atajos. Masas con reposo y dedicación tradicional."
                            etiqueta="Dedicación"
                        />
                        <ValorCard
                            icono="bi bi-basket"
                            colorIcono="qs-icono-rosa"
                            titulo="Ingredientes Nobles"
                            texto="Huevos de campo, nueces de Choapa, mantequilla sureña y frutas locales."
                            etiqueta="Origen Local"
                        />
                        <ValorCard
                            icono="bi bi-flower1"
                            colorIcono="qs-icono-durazno"
                            titulo="Innovación Consciente"
                            texto="Técnicas saludables y líneas sin azúcar sin comprometer el sabor auténtico."
                            etiqueta="Salud & Sabor"
                        />
                        <ValorCard
                            icono="bi bi-people-fill"
                            colorIcono="qs-icono-tierra"
                            titulo="Cercanía Familiar"
                            texto="Cómplices en cada celebración, cumpleaños y encuentro de domingo."
                            etiqueta="Comunidad"
                        />
                    </div>
                </section>

                {/* MISIÓN / VISIÓN */}
                <section className="container qs-seccion">
                    <div className="text-center qs-encabezado">
                        <span className="qs-eyebrow">Nuestra Esencia</span>
                        <h2 className="qs-titulo-seccion">Propósito que Nutre el Alma</h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="qs-proposito-card h-100">
                                <div className="qs-proposito-icono qs-icono-durazno"><i className="bi bi-cup-hot"></i></div>
                                <span className="qs-valor-tag">Misión</span>
                                <h3 className="titulo-tarjeta">Dulzura, Memoria y Raíces</h3>
                                <p className="texto-tarjeta">
                                    Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas
                                    y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos
                                    nuestras raíces históricas y fomentamos la creatividad en la repostería.
                                </p>
                                <div className="qs-proposito-footer">
                                    <i className="bi bi-stars"></i> Compromiso con cada mesa chilena
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="qs-proposito-card h-100">
                                <div className="qs-proposito-icono qs-icono-rosa"><i className="bi bi-compass"></i></div>
                                <span className="qs-valor-tag">Visión</span>
                                <h3 className="titulo-tarjeta">Liderazgo e Impacto Formativo</h3>
                                <p className="texto-tarjeta">
                                    Convertirnos en la tienda online líder de productos de repostería en Chile, conocida
                                    por nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente
                                    en la formación de nuevos talentos en gastronomía.
                                </p>
                                <div className="qs-proposito-footer">
                                    <i className="bi bi-mortarboard"></i> Impulsando la próxima generación
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ALIANZA DUOC UC */}
                <section className="qs-alianza">
                    <div className="container d-flex flex-wrap align-items-center justify-content-between gap-4">
                        <div className="d-flex align-items-center gap-3">
                            <div className="qs-alianza-icono"><i className="bi bi-mortarboard-fill"></i></div>
                            <div>
                                <span className="qs-eyebrow d-block">Convenio Académico • Talento Joven</span>
                                <h3 className="qs-alianza-titulo">Alianza con Duoc UC: Taller Abierto</h3>
                                <p className="qs-alianza-texto mb-0">
                                    Formamos a nuevas generaciones gastronómicas mediante pasantías remuneradas e I+D
                                    en repostería tradicional chilena.
                                </p>
                            </div>
                        </div>
                        <div className="qs-alianza-badge">
                            <i className="bi bi-people"></i> +140 Pasantes Egresados
                        </div>
                    </div>
                </section>
            </main>
        </>
    )

}

export default QuienesSomos;
