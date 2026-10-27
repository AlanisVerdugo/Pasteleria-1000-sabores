// Un paso del recorrido de un pedido 
function PasoDespacho({ numero, icono, titulo, texto }) {
  return (
    <li className="paso-despacho">
      <div className="paso-icono">
        <i className={`bi ${icono}`}></i>
        <span className="paso-numero">{numero}</span>
      </div>
      <h3 className="paso-titulo">{titulo}</h3>
      <p className="paso-texto">{texto}</p>
    </li>
  )
}

export default PasoDespacho