import { useEffect, useState } from 'react'
import { categoriasService } from '../services/categoriasService'

// IDs de las categorías que se muestran en el panel de filtros
const CATEGORIAS_FILTRO = [3, 4, 7, 6, 8] // Postres Individuales, Sin Azúcar, Vegana, Sin Gluten, Especiales

function FiltrosCatalogo({ categoriaId, forma, personas, onCambiar, onLimpiar }) {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        categoriasService.listar().then(setCategorias)
    }, [])

    const categoriasAMostrar = categorias.filter((c) => CATEGORIAS_FILTRO.includes(c.id))

    return (
        <div className="bg-white rounded-4 p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0" style={{ color: '#7B4B2A' }}>Filtros</h5>
                <a href="#" className="small text-muted text-decoration-none" onClick={(e) => { e.preventDefault(); onLimpiar() }}>
                    <i className="bi bi-x-lg"></i> Limpiar
                </a>
            </div>

            <p className="text-uppercase small text-muted mb-2">Categorías</p>
            {categoriasAMostrar.map((c) => (
                <div className="form-check mb-2" key={c.id}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`cat${c.id}`}
                        checked={categoriaId === c.id}
                        onChange={() => onCambiar('categoriaId', categoriaId === c.id ? undefined : c.id)}
                    />
                    <label className="form-check-label" htmlFor={`cat${c.id}`}>{c.nombre}</label>
                </div>
            ))}

            <p className="text-uppercase small text-muted mb-2">Forma</p>
            <div className="d-flex gap-2 mb-3">
                <button
                    type="button"
                    className={`btn btn-sm rounded-pill ${forma === 'cuadrada' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => onCambiar('forma', forma === 'cuadrada' ? undefined : 'cuadrada')}
                >Cuadrada</button>
                <button
                    type="button"
                    className={`btn btn-sm rounded-pill ${forma === 'circular' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                    onClick={() => onCambiar('forma', forma === 'circular' ? undefined : 'circular')}
                >Circular</button>
            </div>

            <p className="text-uppercase small text-muted mb-2">Tamaño (Personas)</p>
            {[8, 15, 25].map((n) => (
                <div className="form-check mb-2" key={n}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`tam${n}`}
                        checked={personas === n}
                        onChange={() => onCambiar('personas', personas === n ? undefined : n)}
                    />
                    <label className="form-check-label" htmlFor={`tam${n}`}>{n} Personas</label>
                </div>
            ))}
        </div>
    )
}

export default FiltrosCatalogo