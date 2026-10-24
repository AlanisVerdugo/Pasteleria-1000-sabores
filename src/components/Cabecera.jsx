import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Container, Badge } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import '../css/cabecera.css'

function Cabecera() {
  const { usuario, esAdmin, logout } = useAuth()
  const { cantidadItems } = useCarrito()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header-navbar">
      <Navbar expand="lg" collapseOnSelect>
        <Container fluid className="px-4 px-lg-5">
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            Pastelería 1000 Sabores
            <img src="/img/logo-pasteleria-1000-sabores.png" alt="Logo pastelería 1000 sabores" className="logo-header" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="menu-principal" />

          <Navbar.Collapse id="menu-principal">
            <Nav className="nav-underline mx-auto mb-2 mb-lg-0">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/categorias">Categorías</Nav.Link>
              <Nav.Link as={NavLink} to="/ofertas">Ofertas</Nav.Link>
              <Nav.Link as={NavLink} to="/blog">Blog</Nav.Link>
              <Nav.Link as={NavLink} to="/nosotros">Nosotros</Nav.Link>
              <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>
            </Nav>

            <Nav className="d-flex gap-3 align-items-center ms-lg-5">
              <NavDropdown
                align="end"
                id="menu-usuario"
                title={
                  <span className="icono-header">
                    {usuario?.foto
                      ? <img src={usuario.foto} alt="" className="cabecera-foto" />
                      : <i className="bi bi-person"></i>}
                    {usuario && <span className="ms-1 fs-6">{usuario.nombre}</span>}
                  </span>
                }
              >
                {usuario ? (
                  <>
                    <NavDropdown.Item as={Link} to="/perfil">
                      <i className="bi bi-person-gear me-2"></i>Mi perfil
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/mis-pedidos">
                      <i className="bi bi-bag me-2"></i>Mis pedidos
                    </NavDropdown.Item>
                    {esAdmin && (
                      <NavDropdown.Item as={Link} to="/admin">
                        <i className="bi bi-speedometer2 me-2"></i>Panel admin
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={cerrarSesion}>
                      <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/login">
                      <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/registro">
                      <i className="bi bi-person-plus me-2"></i>Registrarse
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              <Link to="/carrito" className="icono-header position-relative" aria-label="Carrito">
                <i className="bi bi-cart"></i>
                {cantidadItems > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {cantidadItems}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Cabecera