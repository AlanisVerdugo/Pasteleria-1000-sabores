import '../css/login.css';

function Login() {

    return (
        <>
            <div className="login-page">

                {/* flecha para regresar */}
                <a href="/registro" className="btn-back">
                    <i className="fa-solid fa-arrow-left"></i> Regresar
                </a>

                <div className="login-wrapper">

                    <div className="top-badge badge-tradicion">
                        <i className="fa-solid fa-cake-candles"></i> TRADICIÓN & SABOR CHILENO
                    </div>

                    {/* TARJETA BLANCA PRINCIPAL: Contiene título y formulario */}
                    <main className="login-card">

                        {/* Cabecera de la tarjeta */}
                        <header className="card-header">
                            <h1>Iniciar Sesión</h1>
                            <p>Bienvenido nuevamente a <strong>Pastelería 1000 Sabores</strong>. Disfruta de la dulzura tradicional y tus beneficios exclusivos.</p>
                        </header>

                        {/* Formulario de ingreso (la validación JS se agrega después) */}
                        <form id="formLogin" noValidate>

                            {/* Correo Electrónico */}
                            <div className="input-group">
                                <div className="label-row">
                                    <label htmlFor="email">Correo Electrónico</label>
                                </div>
                                <div className="input-wrapper">
                                    <i className="fa-regular fa-envelope icon-left"></i>
                                    <input type="email" id="email" placeholder="freddy@ejemplo.com" required/>
                                </div>
                                <span className="error-mensaje" id="errEmail"></span>
                            </div>

                            {/* Contraseña */}
                            <div className="input-group">
                                <label htmlFor="password">Contraseña</label>
                                <div className="input-wrapper">
                                    <i className="fa-solid fa-lock icon-left"></i>
                                    <input type="password" id="password" placeholder="••••••••" required/>
                                    <i className="fa-regular fa-eye icon-right" id="togglePassword" style={{ cursor: 'pointer' }}></i>
                                </div>
                                <span className="error-mensaje" id="errPassword"></span>
                            </div>

                            <div className="input-group">
                                <div className="label-row">
                                    <label htmlFor="edad">Edad</label>
                                </div>
                                <div className="input-wrapper">
                                    <input type="number" id="edad" placeholder="33" required/>
                                </div>
                                <span className="error-mensaje" id="errEdad"></span>
                            </div>

                            {/* Recordarme y Link de Olvidé contraseña */}
                            <div className="options-row">
                                <div className="checkbox-container">
                                    <input type="checkbox" id="remember"/>
                                    <label htmlFor="remember">Recordarme</label>
                                </div>
                                <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
                            </div>

                            <span className="error-mensaje text-center d-block" id="errLogin"></span>
                            {/* boton principal */}
                            <button type="submit" className="btn-primary">
                                Iniciar Sesión <i className="fa-solid fa-arrow-right"></i>
                            </button>

                            {/* link al registro */}
                            <div className="register-link">
                                ¿Aún no tienes cuenta? <a href="/registro">Regístrate aquí</a>
                            </div>
                        </form>
                    </main>

                    {/* tarjeta amarilla inferior: muestra los beneficios */}
                    <div className="benefits-card">
                        <div className="benefit-icon regalo-box">
                            <i className="fa-solid fa-gift"></i>
                        </div>
                        <div className="benefit-content">
                            <div className="benefit-header">
                                <h3>Beneficios Activos</h3>
                                <span className="badge-50 badge-anios">50 AÑOS</span>
                            </div>
                            <p>Recuerda: <strong>50% de descuento</strong> para adultos mayores de 50 años y convenios especiales para la comunidad <strong>Duoc UC</strong> con tu correo institucional.</p>
                        </div>
                    </div>

                    <div className="footer-text">
                        <i className="fa-solid fa-bread-slice"></i> RECETAS ARTESANALES DESDE 1974
                    </div>

                </div>
            </div>
        </>
    )

}

export default Login;
