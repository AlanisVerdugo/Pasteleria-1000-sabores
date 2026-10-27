import '../css/pie.css';
import { Link } from 'react-router-dom';

const REDES = [
    { nombre: 'Instagram', icono: 'bi-instagram', url: 'https://www.instagram.com/' },
    { nombre: 'Facebook', icono: 'bi-facebook', url: 'https://www.facebook.com/' },
    { nombre: 'TikTok', icono: 'bi-tiktok', url: 'https://www.tiktok.com/' },
    { nombre: 'WhatsApp', icono: 'bi-whatsapp', url: 'https://wa.me/' },
];

function Pie() {

    return (
        <>
            <footer>
                <div className="container footer-inner d-flex flex-wrap justify-content-between align-items-start">
                    <div className="footer-marca">
                        <h3 className="footer-brand">Pastelería 1000 Sabores</h3>
                        <p className="footer-texto">© 2024 Pastelería 1000 Sabores - 50 Años de Tradición (1974-2024).<br/>
                            Orgullosamente Chilenos. Beneficios exclusivos Duoc UC.</p>
                    </div>
                    <div className="footer-columna footer-redes">
                        <span className="footer-titulo">Síguenos</span>
                        <div className="footer-redes-iconos">
                            {REDES.map((red) => (
                                <a
                                    key={red.nombre}
                                    href={red.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-red"
                                    aria-label={`${red.nombre} de Pastelería 1000 Sabores`}
                                >
                                    <i className={`bi ${red.icono}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="footer-columna">
                        <span className="footer-titulo">Información</span>
                        <ul className="list-unstyled footer-nav">
                            <li><Link to="/despacho" className="footer-link">Despacho y envíos</Link></li>
                            <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
                            <li><Link to="/terminos" className="footer-link">Términos</Link></li>
                            <li><Link to="/preguntas-frecuentes" className="footer-link">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Pie;