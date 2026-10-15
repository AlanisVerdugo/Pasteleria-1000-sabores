// componente reutilizable: un beneficio con su ícono, título y texto
// se usa en la página de Registro (3 veces)
function Beneficio({ icono, titulo, children }) {

    return (
        <>
            <div className="benefit-item">
                <div className="benefit-icon"><i className={icono}></i></div>
                <div className="benefit-text">
                    <h3>{titulo}</h3>
                    <p>{children}</p>
                </div>
            </div>
        </>
    )
}

export default Beneficio;
