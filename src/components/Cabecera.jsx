import '../css/cabecera.css';

function Cabecera() {

    return (
        <>
            <header className="header-navbar">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a className="navbar-brand d-flex align-items-center gap-2" href="home.html"> Pastelería 1000 Sabores
                            <img src="img/logo-pasteleria-1000-sabores.png" alt="Logo pasteleria 1000 sabores" className="logo-header"/>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav nav-underline mx-auto mb-2 mb-lg-0">
                                <li className="nav-item"><a className="nav-link active" href="home.html">Home</a></li>
                                <li className="nav-item"><a className="nav-link" href="catalogo.html">Catálogo</a></li>
                                <li className="nav-item"><a className="nav-link" href="blog.html">Blog</a></li>
                                <li className="nav-item"><a className="nav-link" href="quienes_somos.html">Quiénes Somos</a></li>
                            </ul>


                            <div className="d-flex gap-3 align-items-center">

                                <div className="dropdown">
                                    <a href="#" className="icono-header" id="menuUsuario" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-person"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" id="dropdownUsuario">

                                    </ul>
                                </div>
                                <a href="carrito.html" className="icono-header"><i className="bi bi-cart"></i></a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Cabecera;
//para que se pueda exportar y usar en otros archivos.