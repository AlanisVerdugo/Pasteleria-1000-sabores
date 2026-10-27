function PreguntaFrecuente({ id, pregunta, respuesta, abierta, onAlternar }) {
  return (
    <li className={`pf-item ${abierta ? 'pf-item-abierta' : ''}`}>
      <button
        type="button"
        className="pf-pregunta"
        aria-expanded={abierta}
        aria-controls={`respuesta-${id}`}
        onClick={onAlternar}
      >
        <span>{pregunta}</span>
        <i className="bi bi-chevron-down pf-flecha" aria-hidden="true"></i>
      </button>
      {abierta && (
        <p id={`respuesta-${id}`} className="pf-respuesta">
          {respuesta}
        </p>
      )}
    </li>
  )
}

export default PreguntaFrecuente

