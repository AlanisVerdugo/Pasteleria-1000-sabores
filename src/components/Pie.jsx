import '../css/pie.css';
import { Link } from 'react-router-dom';

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
                    <ul className="list-unstyled footer-nav">
                        <li><Link to="/nosotros" className="footer-link">Sobre Nosotros</Link></li>
                        <li><Link to="/contacto" className="footer-link">Contacto</Link></li>
                        <li><a href="#" className="footer-link">Términos</a></li>
                        <li><a href="#" className="footer-link">Preguntas Frecuentes</a></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}

export default Pie;