// Componente: una tarjeta de articulo del blog.
// Se repetia 3 veces en blog.html, asi que la hacemos UNA vez y le pasamos los datos por props.
function TarjetaBlog({ imagen, alt, meta, titulo, resumen, autor }) {

    return (
        <>
            <article className="blog-card">
                <div className="card-image">
                    <img src={imagen} alt={alt} />
                </div>
                <div className="card-content">
                    <p className="card-meta">{meta}</p>
                    <h2 className="card-title">{titulo}</h2>
                    <p className="card-excerpt">{resumen}</p>

                    <div className="card-footer">
                        <span className="card-author">{autor}</span>
                        <a href="#" className="card-link">Leer &rarr;</a>
                    </div>
                </div>
            </article>
        </>
    );
}

export default TarjetaBlog;
