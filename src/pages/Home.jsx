import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/home.css'
import '../css/catalogo.css'
import TarjetaProducto from '../components/TarjetaProducto'
import { productosService } from '../services/productosService'


function SeccionProductos({ id, titulo, subtitulo, productos, verMas, vitrina }) {
  if (productos.length === 0) return null
  return (
    <section className={`container home-productos home-${id}`} aria-labelledby={`titulo-${id}`}>
      <div className="home-productos-cabecera">
        <h2 id={`titulo-${id}`} className="home-productos-titulo">{titulo}</h2>
        <p className="home-productos-sub">{subtitulo}</p>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-center">
        {productos.map((p) => <TarjetaProducto key={p.codigo} producto={p} vitrina={vitrina} />)}
      </div>
      {verMas && (
        <div className="text-center mt-4">
          <Link to={verMas.ruta} className="home-ver-mas">{verMas.texto} <i className="bi bi-arrow-right"></i></Link>
        </div>
      )}
    </section>
  )
}

function Home() {
    const [destacados, setDestacados] = useState([])
    const [ofertas, setOfertas] = useState([])

    useEffect(() => {
        productosService.listarDestacados().then(setDestacados)
        productosService.listarOfertas().then(setOfertas)
    }, [])

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
                        <Link to="/categorias" className="btn-cafe">Explorar Categorías</Link>
                    </div>
                </section>

                <SeccionProductos
                    id="destacados"
                    vitrina
                    titulo="Nuestros favoritos"
                    subtitulo="Las tortas que más nos piden"
                    productos={destacados}
                    verMas={{ ruta: '/productos', texto: 'Ver todo el catálogo' }}
                />
                
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
                                <i className="bi bi-journal-bookmark icono-decorativo"></i>
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

                <SeccionProductos
                    id="ofertas"
                    titulo="Ofertas de aniversario"
                    subtitulo="Precios especiales por tiempo limitado"
                    productos={ofertas}
                    verMas={{ ruta: '/ofertas', texto: 'Ver todas las ofertas' }}
                />
                
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
                                            <strong>¡Torta gratis en tu cumpleaños!</strong>
                                            <span>Para estudiantes Duoc UC registrados con su correo @duocuc.cl. <Link to="/registro">Regístrate aquí</Link></span>
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