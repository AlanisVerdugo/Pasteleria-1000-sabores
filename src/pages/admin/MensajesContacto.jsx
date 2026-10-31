import { useState } from 'react'
import { Alert, Form, Table } from 'react-bootstrap'
import { contactoService } from '../../services'
import { useListado } from '../../hooks/useListado'
import { formatearFecha } from '../../utils/formato'
import { TIPOS_CONSULTA } from '../../utils/constantes'
import EncabezadoAdmin from '../../components/admin/EncabezadoAdmin'

// Mensajes desde /contacto
function MensajesContacto() {
  const { datos: mensajes, cargando, error } = useListado(contactoService.listar)
  const [tipo, setTipo] = useState('')

  if (cargando) return <p>Cargando mensajes...</p>
  if (error) return <Alert variant="danger">{error}</Alert>

  // sort - arriba el más nuevo 
  const visibles = mensajes
    .filter((m) => tipo === '' || m.tipo === tipo)
    .sort((a, b) => b.fecha.localeCompare(a.fecha))

  return (
    <>
      <EncabezadoAdmin titulo="Mensajes de contacto" subtitulo={`${mensajes.length} mensajes recibidos`} />

      <Form.Group className="mb-3 adm-filtro-mensajes" controlId="filtro-tipo">
        <Form.Label>Tipo de consulta</Form.Label>
        <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Todos</option>
          {TIPOS_CONSULTA.map((t) => <option key={t} value={t}>{t}</option>)}
        </Form.Select>
      </Form.Group>

      {visibles.length === 0 ? (
        <p className="text-muted">No hay mensajes{tipo && ' de este tipo'}.</p>
      ) : (
        <div className="adm-caja">
          <Table responsive hover className="adm-tabla align-middle mb-0">
            <thead>
              <tr><th>Fecha</th><th>Tipo</th><th>Nombre</th><th>Correo</th><th>Mensaje</th></tr>
            </thead>
            <tbody>
              {visibles.map((m) => (
                <tr key={m.id}>
                  <td>{formatearFecha(m.fecha)}</td>
                  <td><span className="adm-tipo-mensaje">{m.tipo}</span></td>
                  <td>{m.nombre}{m.usuarioId && <i className="bi bi-person-check ms-1" title="Usuario registrado"></i>}</td>
                  <td><a href={`mailto:${m.email}`}>{m.email}</a></td>
                  <td>{m.mensaje}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export default MensajesContacto

