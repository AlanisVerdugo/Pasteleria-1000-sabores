import '../../css/admin.css'

// Título + subtítulo de cada página del admin. Lo que va en children
// (por ejemplo, el botón "Nuevo producto") se muestra a la derecha.
function EncabezadoAdmin({ titulo, subtitulo, children }) {
  return (
    <div className="adm-encabezado">
      <div>
        <h1 className="adm-titulo">{titulo}</h1>
        {subtitulo && <p className="adm-subtitulo">{subtitulo}</p>}
      </div>
      {children && <div className="d-flex gap-2 flex-wrap adm-no-imprimir">{children}</div>}
    </div>
  )
}

export default EncabezadoAdmin
