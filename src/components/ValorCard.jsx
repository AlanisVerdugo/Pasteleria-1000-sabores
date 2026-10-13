// componente reutilizable: tarjeta de un valor fundamental
// se usa en la página Quiénes Somos (4 veces)
function ValorCard({ icono, colorIcono, titulo, texto, etiqueta }) {

    return (
        <>
            <div className="col-md-6 col-lg-3">
                <div className="qs-valor-card h-100">
                    <div className={`qs-valor-icono ${colorIcono}`}><i className={icono}></i></div>
                    <h4 className="qs-valor-titulo">{titulo}</h4>
                    <p className="qs-valor-texto">{texto}</p>
                    <span className="qs-valor-tag">• {etiqueta}</span>
                </div>
            </div>
        </>
    )
}

export default ValorCard;
