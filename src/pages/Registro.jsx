import '../css/registro.css';

import Beneficio from '../components/Beneficio';

function Registro() {

    return (
        <>
            <div className="pagina-registro">

                {/* flecha para regresar */}
                <a href="/" className="btn-back">
                    <i className="fa-solid fa-arrow-left"></i> Regresar
                </a>

                {/* Decoraciones de fondo (fontawesome.com) */}
                <i className="fa-solid fa-bread-slice bg-decor bg-top-left"></i> {/* icono de pan */}
                <i className="fa-solid fa-cake-candles bg-decor bg-bottom-right"></i> {/* icono de torta */}

                {/* título principal y descripción de la página */}
                <div className="header-container">
                    <h1>Únete a la familia</h1>
                    <p>Crea tu cuenta para acceder a beneficios exclusivos, celebrar nuestra historia y disfrutar de los mejores sabores artesanales.</p>
                </div>

                <main className="card">

                    {/* Panel de Beneficios */}
                    <section className="benefits-panel">
                        <h2>Beneficios Exclusivos</h2>

                        <Beneficio icono="fa-solid fa-heart" titulo="50 Años de Tradición">
                            Mayores de 50 años: 50% de descuento automático en compras seleccionadas.
                        </Beneficio>

                        <Beneficio icono="fa-solid fa-tag" titulo="Código Especial">
                            Usa el código <span className="highlight-text">FELICES50</span> para un 10% de descuento de por vida.
                        </Beneficio>

                        <Beneficio icono="fa-solid fa-graduation-cap" titulo="Comunidad Duoc UC">
                            Estudiantes Duoc: ¡Tortas gratis en tu cumpleaños! (Usa tu correo institucional).
                        </Beneficio>
                    </section>

                    {/* Panel del Formulario (la validación JS se agrega después) */}
                    <section className="form-panel">
                        <form noValidate>
                            {/* Grid para organizar los inputs en 2 columnas */}
                            <div className="form-grid">

                                <div className="input-group">
                                    <label htmlFor="txtNombre">Nombre Completo</label>
                                    <div className="input-wrapper">
                                        <i className="fa-regular fa-user"></i>
                                        <input type="text" id="txtNombre" placeholder="Freddy Campos" required/>
                                    </div>
                                    <span className="error-mensaje" id="errNombre"></span>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="txtCorreo">Correo Electrónico</label>
                                    <div className="input-wrapper">
                                        <i className="fa-regular fa-envelope"></i>
                                        <input type="email" id="txtCorreo" placeholder="freddy@ejemplo.com" required/>
                                    </div>
                                    <span className="error-mensaje" id="errCorreo"></span>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="txtFecha">Fecha de Nacimiento (Para descuento +50)</label>
                                    <div className="input-wrapper">
                                        <i className="fa-regular fa-calendar"></i>
                                        <input type="date" id="txtFecha" required/>
                                    </div>
                                    <span className="error-mensaje" id="errFecha"></span>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="txtCorreoDuoc">Correo Institucional (Opcional - Estudiantes Duoc)</label>
                                    <div className="input-wrapper">
                                        <i className="fa-solid fa-graduation-cap"></i>
                                        <input type="email" id="txtCorreoDuoc" placeholder="alumno@duocuc.cl"/>
                                    </div>
                                    <span className="error-mensaje" id="errCorreoDuoc"></span>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="txtPass">Contraseña</label>
                                    <div className="input-wrapper">
                                        <i className="fa-solid fa-lock"></i>
                                        <input type="password" id="txtPass" placeholder="••••••••" required/>
                                    </div>
                                    <span className="error-mensaje" id="errPass"></span>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="txtPassConfirm">Confirmar Contraseña</label>
                                    <div className="input-wrapper">
                                        <i className="fa-solid fa-lock"></i>
                                        <input type="password" id="txtPassConfirm" placeholder="••••••••" required/>
                                    </div>
                                    <span className="error-mensaje" id="errPassConfirm"></span>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="txtCodigo">Código de Descuento (Opcional)</label>
                                    <div className="input-wrapper">
                                        <i className="fa-solid fa-tag"></i>
                                        <input type="text" id="txtCodigo" placeholder="EJE: FELICES50"/>
                                    </div>
                                    <span className="error-mensaje" id="errCodigo"></span>
                                </div>

                            </div>

                            <div className="checkbox-group">
                                <input type="checkbox" id="chkTerminos" required/>
                                <label htmlFor="chkTerminos">Acepto los Términos y Condiciones y la Política de Privacidad.</label>
                            </div>
                            <span className="error-mensaje" id="errTerminos"></span>

                            {/* Botón de Envío */}
                            <button type="submit" className="btn-submit">
                                Registrarse <i className="fa-solid fa-arrow-right"></i>
                            </button>

                            <div className="login-link">
                                ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </>
    )

}

export default Registro;
