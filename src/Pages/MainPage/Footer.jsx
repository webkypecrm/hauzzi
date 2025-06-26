import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/my-img/white-logo.png";
import apple from "../../assets/img/yapple.png";
import google from "../../assets/img/ygoogle.png";

const Footer = () => {
  return (
    <Fragment>
      <footer id="footer" className="footer">
        <div className="container footer-top">
          <div className="row gy-4">
            <div
              className="col-md-12 d-flex justify-content-between"
              style={{ borderBottom: "1px solid #525050", paddingBottom: 20 }}
            >
              <div className="footer-logo">
                <img
                  src={logo}
                  alt="footer-logo"
                  className="img-fluid"
                  width="50%"
                />
              </div>
              <div className="soci">
                <div className="text-soci"> Suscríbete gratis</div>
                <Link to="">
                  <i className="bi bi-facebook" />
                </Link>
                <Link to="">
                  <i className="bi bi-instagram" />
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 footer-about">
              <h4>Suscríbete gratis</h4>
              <div className="subs-btn">
                <div className="text-foot1">
                  <p style={{marginBottom: 0}}>Ingresa tu correo electrónico</p>
                  <Link
                    className="btn-getstarted mt-0 btn-footer-btn"
                    to="#"
                    style={{ padding: 9, margin: 0, borderRadius: 50,color: "black",fontWeight:500 }}
                  >
                    Suscríbete gratis{" "}
                    <i
                      className="fa fa-long-arrow-right"
                      style={{ marginLeft: 10 }}
                    />
                  </Link>
                </div>
                <p className="mt-2">
                  Recibe consejos inmobiliarios, actualizaciones del mercado y
                  ofertas exclusivas directamente en tu correo{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 footer-links link-left">
              <h4>Sobre Hauzzi</h4>
              <ul style={{fontSize: 13}}>
                <li>
                  <Link to="/about">Sobre nosotros&nbsp;</Link>
                </li>
                <li>
                  <Link to="/contact">Contacta con Hauzz&nbsp;</Link>
                </li>
                <li>
                  <Link to="#">Preguntas frecuentes&nbsp;</Link>
                </li>
                <li>
                  <Link to="/blog">Blog&nbsp;</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Particulares</h4>
              <ul style={{fontSize: 13}}>
                <li>
                  <Link to="#">Anuncia tu propiedad</Link>
                </li>
                <li>
                  <Link to="#">Vende con un profesional</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-3 footer-links">
              <h4>Profesionales</h4>
              <ul style={{fontSize: 13}}>
                <li>
                  <Link to="/sign-up">Regístrate</Link>
                </li>
                <li>
                  <Link to="#">Anuncia tu propiedad</Link>
                </li>
                <li>
                  <Link to="#">Planes y precios</Link>
                </li>
                <li>
                  <Link to="#">CRM Inmobiliario</Link>
                </li>
              </ul>
            </div>
            {/* <div className="col-lg-2 col-md-3 footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="#">FAQ’s</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </div> */}
            <div className="col-lg-2 col-md-3 footer-links link-left1">
              <h4>
                Lleva la experiencia de Hauzzi contigo, donde sea que estés
              </h4>
              <ul>
                <li>
                  <Link to="#">
                    <img src={apple} style={{width: 180}}/>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <img src={google} style={{width: 180}}/>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container copyright text-center mt-4">
          <p>
            <span>Copyright </span>
            <span>© 2025. Hauzzi</span>
          </p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
