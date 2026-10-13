import '../css/Home.css';

function Home() {

    return (

        <>
            <main>
                
                <section className="hero-section text-center" id="hero">
                    <div className="hero-overlay"></div>
                    <div className="container hero-content">
                        
                        <span className="badge-especial">
                            <i className="bi bi-stars"></i>1974 - 2024: Medio Siglo de Dulzura
                        </span>
                        <h1 className="hero-titulo">50 Años Horneando Memorias Inolvidables</h1>
                        <p className="hero-texto mx-auto">
                            Desde nuestro pequeño horno de barro en 1974 hasta el Récord Guinness de 1995
                            por el pastel más grande del mundo. Una tradición familiar que sigue endulzando tu vida.
                        </p>
                        <a href="catalogo.html" className="btn-cafe">Ver Catálogo</a>
                    </div>
                </section>

                
                <section className="container seccion-superior">
                    <div className="row g-4">
                        
                        <div className="col-lg-8">
                            <div className="tarjeta-mision d-flex flex-column flex-md-row align-items-center gap-4 h-100">
                                <div className="mision-img-wrap">
                                    <img src="/img/amasando.jpg" alt="Pastelero amasando" className="mision-img"/>
                                </div>
                                <div>
                                    <h2 className="titulo-tarjeta">Nuestra Misión</h2>
                                    <p className="texto-tarjeta">
                                        Ofrecer una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y
                                        productos de repostería de alta calidad para todas las ocasiones, mientras celebramos
                                        nuestras raíces históricas y fomentamos la creatividad en la repostería.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="tarjeta-vision h-100 position-relative overflow-hidden">
                                <i className="bi bi journal-bookmark icono-decorativo"></i>
                                <h3 className="titulo-tarjeta-sm">Visión</h3>
                                <p className="texto-tarjeta fst-italic">
                                    Convertirnos en la tienda online líder de productos de repostería en Chile, conocida por
                                    nuestra innovación, calidad y el impacto positivo en la comunidad, especialmente en la
                                    formación de nuevos talentos en gastronomía.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                
                <section className="container seccion-inferior">
                    <div className="row g-4">
                        
                        <div className="col-lg-6">
                            <div className="tarjeta-vision h-100 position-relative overflow-hidden">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="icono-circulo"><i className="bi bi-mortarboard"></i></div>
                                    <h2 className="titulo-tarjeta-sm mb-0">Apoyo a Estudiantes Duoc UC</h2>
                                </div>
                                <p className="texto-tarjeta">
                                    Creemos en el futuro de la gastronomía chilena. Por eso, abrimos nuestras puertas a los
                                    estudiantes de Duoc UC, brindándoles un espacio para practicar, aprender y perfeccionar
                                    el arte de la pastelería tradicional con nuestros maestros panaderos.
                                </p>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <div className="tarjeta-normal h-100">
                                <h2 className="titulo-tarjeta-sm d-flex align-items-center gap-2">
                                    <i className="bi bi-gift icono-rosa"></i> Especiales de Aniversario
                                </h2>
                                <ul className="listas-especiales list-unstyled">
                                    <li className="item-especial">
                                        <i className="bi bi-heart-fill"></i>
                                        <div>
                                            <strong>50% Dcto. Mayores de 50</strong>
                                            <span>Para quienes han crecido con nosotros.</span>
                                        </div>
                                    </li>
                                    <li className="item-especial">
                                        <i className="bi bi-tag-fill"></i>
                                        <div>
                                            <strong>10% Dcto. General</strong>
                                            <span>Usa el código <code className="codigo-descuento">FELICES50</code></span>
                                        </div>
                                    </li>
                                    <li className="item-especial item-especial-destacado">
                                        <i className="bi bi-cake2-fill"></i>
                                        <div>
                                            <strong>¡Pastel Gratis!</strong>
                                            <span>Para estudiantes de Duoc UC al presentar credencial.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>

    )

}

export default Home;