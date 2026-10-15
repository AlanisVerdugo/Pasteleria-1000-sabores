import '../css/blog.css';

// componentes
import TarjetaBlog from '../components/TarjetaBlog';

function Blog() {

    return (
        <>
            <main className="blog-main-container">

                {/* SECCIÓN INTRO */}
                <section className="blog-intro container text-center">
                    <h1>Nuestro blog &amp; saberes</h1>
                    <p>Historias, técnicas tradicionales y secretos de repostería chilena compartidos con pasión<br />desde nuestro horno.</p>
                </section>

                {/* SECCIÓN FILTROS */}
                <section className="blog-filters container">
                    <button className="filter-btn active">Todos</button>
                    <button className="filter-btn">Recetas tradicionales</button>
                    <button className="filter-btn">Consejos de maestros</button>
                    <button className="filter-btn">Aportes Duoc UC</button>
                </section>

                {/* SECCIÓN GRILLA: cada tarjeta es el componente TarjetaBlog */}
                <section className="blog-grid container">

                    <TarjetaBlog
                        imagen="/img/manjar casero.jpg"
                        alt="Manjar casero"
                        meta="13 Septiembre, 2026 • Técnica Culinaria"
                        titulo="Secretos del Manjar Casero: De la Leche al Punto Caramelo"
                        resumen="La alquimia de reducir leche entera con azúcar a fuego lento exige paciencia. Revelamos los grados exactos y secretos pa..."
                        autor="Por Freddy Camposo, Jefe de Horno"
                    />

                    <TarjetaBlog
                        imagen="/img/torta celiacos.jpg"
                        alt="Torta clásica"
                        meta="29 Agosto, 2026 • Alianza Educativa"
                        titulo="Adaptando Tortas Clásicas para Diabéticos y Celíacos"
                        resumen="¿Es posible conservar el alma de una torta tradicional sin gluten ni azúcar? Investigación sobre el comportamiento térmico de la alulo..."
                        autor="Por Alan Bugueño, Duoc UC"
                    />

                    <TarjetaBlog
                        imagen="/img/pastel gigante.jpg"
                        alt="Récord Guinness"
                        meta="20 Agosto, 2026 • Crónica Familiar"
                        titulo="La Historia de Nuestro Récord Guinness de 1995"
                        resumen="48 horas sin dormir y más de dos mil hojas de hojarasca. Revive la jornada donde pusimos nuestra tradición familiar en el libro de..."
                        autor="Por Familia 1000 Sabores"
                    />

                </section>
            </main>
        </>
    )

}

export default Blog;
