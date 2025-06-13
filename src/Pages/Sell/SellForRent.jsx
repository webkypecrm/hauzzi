import React from "react";
import { Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";

const SellForRent = () => {
  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section id="hero" className="hero section slider-sec">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="hero-content"
                    data-aos="fade-up"
                    data-aos-delay={200}
                  >
                    <h1 className="mb-4" style={{ color: "#000" }}>
                      {" "}
                      Vende tu propiedad rápidamente con un agente o agencia
                      inmobiliaria experta{" "}
                    </h1>
                    <p className="mb-4 ">
                      {" "}
                      Descubre cómo vender tu propiedad de forma fácil y rápida
                      con la ayuda de agentes y agencias inmobiliarias
                      profesionales en Hauzzi.
                    </p>
                    <Link
                      to="#about"
                      className="btn btn- primary me-sm-2 mx-1"
                      style={{ backgroundColor: "#fff", fontWeight: 500 }}
                    >
                      Ver agentes
                    </Link>
                    <Link
                      to="#about"
                      className="btn btn- primary me-sm-2 mx-1"
                      style={{ backgroundColor: "#fff", fontWeight: 500 }}
                    >
                      Ver inmobiliarias
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="hero-image"
                    data-aos="zoom-out"
                    data-aos-delay={300}
                  >
                    <img
                      src="img/my-img/sellforrent.png"
                      alt="Hero Image"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="secondblock">
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2>¿Por qué elegir un agente o una agencia inmobiliaria?</h2>
            </div>
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <h2 className="about-title">Publicar es fácil y rápido</h2>
                  <p className="about-description mb-4">
                    Cargar tu anuncio toma solo unos minutos. Sube fotos, agrega
                    una descripción y define el precio para comenzar a recibir
                    contactos de interesados.
                  </p>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Publica tu inmueble gratis
                  </Link>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Publica tu inmueble gratis
                  </Link>
                </div>
                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="image-wrapper">
                    <div
                      className="images position-relative aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay={400}
                    >
                      <img
                        src="img/my-img/app-d1.png"
                        alt="Business Meeting"
                        className="img-fluid main-image rounded-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="thirdblock">
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="image-wrapper">
                    <div
                      className="images position-relative aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay={400}
                    >
                      <img
                        src="img/my-img/app-d2.png"
                        alt="Business Meeting"
                        className="img-fluid main-image rounded-4"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <h2 className="about-title">
                    Amplía tu audiencia con facilidad
                  </h2>
                  <p className="about-description mb-4">
                    Publicar en Hauzzi garantiza que tu propiedad sea vista por
                    miles de compradores y arrendatarios activos en el mercado.
                    Nuestra red confiable te conecta con usuarios reales y
                    calificados, permitiéndote cerrar acuerdos más rápido.
                  </p>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Publica tu inmueble gratis
                  </Link>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Publica tu inmueble gratis
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="fourthblock thirdblock">
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <h2 className="about-title">
                    Sin comisiones por ventas o alquileres
                  </h2>
                  <p className="about-description mb-4">
                    En Hauzzi, tus ganancias son 100% tuyas. Publicar es gratis,
                    y tú decides si utilizas nuestras herramientas premium para
                    potenciar tu anuncio.
                  </p>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Publica tu inmueble gratis
                  </Link>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Publica tu inmueble gratis
                  </Link>
                </div>
                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="image-wrapper">
                    <div
                      className="images position-relative aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay={400}
                    >
                      <img
                        src="img/my-img/app-d3.png"
                        alt="Business Meeting"
                        className="img-fluid main-image rounded-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="services section light-background">
            {/* Section Title */}
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2 className="mb-0">Agencias inmobiliarias</h2>
              <h4 className="mb-4">
                Vende tu inmueble mas rápido con tu agencia favorita
              </h4>
            </div>
            {/* End Section Title */}
            <div className="container">
              <div className="row gy-4">
                <div
                  className="col-xl-4 col-md-4 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <Link to="#"></Link>
                  <div className="feat_property">
                    <Link to="#" />
                    <Link to="#">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src="img/my-img/sellrent12.png"
                          alt="fp1.jpg"
                        />
                      </div>
                    </Link>
                    <div className="details">
                      <Link to="#" />
                      <Link to="#"></Link>
                      <div className="tc_content">
                        <Link to="#" />
                        <Link to="#">
                          <div className="title-price">
                            <h4>Si eres profesional</h4>
                          </div>
                        </Link>
                        <div className="cc">
                          <Link to="#">
                            <div className="vv">
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <i
                                  className="fa fa-map-marker"
                                  style={{ fontSize: 15, marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <img
                                  src="img/my-img/mm.png"
                                  width="8%"
                                  style={{ marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="btn-getstarted mt-0"
                            to="#"
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver perfil&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Feature Borx*/}
                <div
                  className="col-xl-4 col-md-4 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <Link to="#"></Link>
                  <div className="feat_property">
                    <Link to="#" />
                    <Link to="#">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src="img/my-img/sellrent12.png"
                          alt="fp1.jpg"
                        />
                      </div>
                    </Link>
                    <div className="details">
                      <Link to="#" />
                      <Link to="#"></Link>
                      <div className="tc_content">
                        <Link to="#" />
                        <Link to="#">
                          <div className="title-price">
                            <h4>Si eres profesional</h4>
                          </div>
                        </Link>
                        <div className="cc">
                          <Link to="#">
                            <div className="vv">
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <i
                                  className="fa fa-map-marker"
                                  style={{ fontSize: 15, marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <img
                                  src="img/my-img/mm.png"
                                  width="8%"
                                  style={{ marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="btn-getstarted mt-0"
                            to="#"
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver perfil&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-4 col-md-4 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <Link to="#"></Link>
                  <div className="feat_property">
                    <Link to="#" />
                    <Link to="#">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src="img/my-img/sellrent12.png"
                          alt="fp1.jpg"
                        />
                      </div>
                    </Link>
                    <div className="details">
                      <Link to="#" />
                      <Link to="#"></Link>
                      <div className="tc_content">
                        <Link to="#" />
                        <Link to="#">
                          <div className="title-price">
                            <h4>Si eres profesional</h4>
                          </div>
                        </Link>
                        <div className="cc">
                          <Link to="#">
                            <div className="vv">
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <i
                                  className="fa fa-map-marker"
                                  style={{ fontSize: 15, marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <img
                                  src="img/my-img/mm.png"
                                  width="8%"
                                  style={{ marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="btn-getstarted mt-0"
                            to="#"
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver perfil&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12" style={{ textAlign: "center" }}>
                  <Link
                    className="btn-getstarted"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Ver inmobiliarias
                  </Link>
                </div>
                {/* End Feature Borx*/}
              </div>
            </div>
          </section>

          <section id="services" className="services section light-background">
            {/* Section Title */}
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2 className="mb-0">Agentes inmobiliarios</h2>
              <h4 className="mb-4">
                Conéctate con agentes que conocen las mejores oportunidades en
                el mercado.a
              </h4>
            </div>
            {/* End Section Title */}
            <div className="container">
              <div className="row gy-4">
                <div
                  className="col-xl-4 col-md-4 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <Link to="#"></Link>
                  <div className="feat_property">
                    <Link to="#" />
                    <Link to="#">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src="img/my-img/ff.png"
                          alt="fp1.jpg"
                        />
                      </div>
                    </Link>
                    <div className="details">
                      <Link to="#" />
                      <Link to="#"></Link>
                      <div className="tc_content">
                        <Link to="#" />
                        <Link to="#">
                          <div className="title-price">
                            <h4>Si eres profesional</h4>
                          </div>
                        </Link>
                        <div className="cc">
                          <Link to="#">
                            <div className="vv">
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <i
                                  className="fa fa-map-marker"
                                  style={{ fontSize: 15, marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <img
                                  src="img/my-img/mm.png"
                                  width="8%"
                                  style={{ marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="btn-getstarted mt-0"
                            to="#"
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver perfil&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Feature Borx*/}
                <div
                  className="col-xl-4 col-md-4 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <Link to="#"></Link>
                  <div className="feat_property">
                    <Link to="#" />
                    <Link to="#">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src="img/my-img/ff.png"
                          alt="fp1.jpg"
                        />
                      </div>
                    </Link>
                    <div className="details">
                      <Link to="#" />
                      <Link to="#"></Link>
                      <div className="tc_content">
                        <Link to="#" />
                        <Link to="#">
                          <div className="title-price">
                            <h4>Si eres profesional</h4>
                          </div>
                        </Link>
                        <div className="cc">
                          <Link to="#">
                            <div className="vv">
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <i
                                  className="fa fa-map-marker"
                                  style={{ fontSize: 15, marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <img
                                  src="img/my-img/mm.png"
                                  width="8%"
                                  style={{ marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="btn-getstarted mt-0"
                            to="#"
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver perfil&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-4 col-md-4 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <Link to="#"></Link>
                  <div className="feat_property">
                    <Link to="#" />
                    <Link to="#">
                      <div className="thumb">
                        <img
                          className="img-whp"
                          src="img/my-img/ff.png"
                          alt="fp1.jpg"
                        />
                      </div>
                    </Link>
                    <div className="details">
                      <Link to="#" />
                      <Link to="#"></Link>
                      <div className="tc_content">
                        <Link to="#" />
                        <Link to="#">
                          <div className="title-price">
                            <h4>Si eres profesional</h4>
                          </div>
                        </Link>
                        <div className="cc">
                          <Link to="#">
                            <div className="vv">
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <i
                                  className="fa fa-map-marker"
                                  style={{ fontSize: 15, marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                              <p
                                style={{ fontSize: 14, color: "#7C7C7C" }}
                                className="mb-2"
                              >
                                <img
                                  src="img/my-img/mm.png"
                                  width="8%"
                                  style={{ marginRight: 6 }}
                                />
                                Lorem ipsum addres{" "}
                              </p>
                            </div>
                          </Link>
                          <Link
                            className="btn-getstarted mt-0"
                            to="#"
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver perfil&nbsp;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12" style={{ textAlign: "center" }}>
                  <Link
                    className="btn-getstarted"
                    to="#"
                    style={{ padding: 16 }}
                  >
                    Ver agentes
                  </Link>
                </div>
                {/* End Feature Borx*/}
              </div>
            </div>
          </section>

          <section
            className="faq-9 faq section light-background"
            id="faq"
            style={{ backgroundColor: "#e6e6e6" }}
          >
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12  aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="faq-container">
                    <div className="faq-item">
                      <h3>¿Por qué Hauzzi?</h3>
                      <div className="faq-content">
                        <p>
                          Feugiat pretium nibh ipsum consequat. Tempus iaculis
                          urna id volutpat lacus laoreet non curabitur gravida.
                          Venenatis lectus magna fringilla urna porttitor
                          rhoncus dolor purus non.
                        </p>
                      </div>
                      <i className="faq-toggle bi bi-chevron-right" />
                    </div>
                    {/* End Faq item*/}
                    <div className="faq-item">
                      <h3>
                        ¿Cuántos anuncios me permite publicar la plataforma?
                      </h3>
                      <div className="faq-content">
                        <p>
                          Dolor sit amet consectetur adipiscing elit
                          pellentesque habitant morbi. Id interdum velit laoreet
                          id donec ultrices. Fringilla phasellus faucibus
                          scelerisque eleifend donec pretium. Est pellentesque
                          elit ullamcorper dignissim. Mauris ultrices eros in
                          cursus turpis massa tincidunt dui.
                        </p>
                      </div>
                      <i className="faq-toggle bi bi-chevron-right" />
                    </div>
                    {/* End Faq item*/}
                    <div className="faq-item">
                      <h3>
                        ¿Cuánto me va a costar poner mi anuncio en Hauzzi?
                      </h3>
                      <div className="faq-content">
                        <p>
                          Eleifend mi in nulla posuere sollicitudin aliquam
                          ultrices sagittis orci. Faucibus pulvinar elementum
                          integer enim. Sem nulla pharetra diam sit amet nisl
                          suscipit. Rutrum tellus pellentesque eu tincidunt.
                          Lectus urna duis convallis convallis tellus. Urna
                          molestie at elementum eu facilisis sed odio morbi quis
                        </p>
                      </div>
                      <i className="faq-toggle bi bi-chevron-right" />
                    </div>
                    {/* End Faq item*/}
                    <div className="faq-item">
                      <h3>¿Cuánto tardará en publicarse mi anuncio?</h3>
                      <div className="faq-content">
                        <p>
                          Dolor sit amet consectetur adipiscing elit
                          pellentesque habitant morbi. Id interdum velit laoreet
                          id donec ultrices. Fringilla phasellus faucibus
                          scelerisque eleifend donec pretium. Est pellentesque
                          elit ullamcorper dignissim. Mauris ultrices eros in
                          cursus turpis massa tincidunt dui.
                        </p>
                      </div>
                      <i className="faq-toggle bi bi-chevron-right" />
                    </div>
                    {/* End Faq item*/}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="call-to-action"
            className="call-to-action section aboutcall"
          >
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row content align-items-center position-relative">
                <div className="col-md-3">
                  <img
                    src="img/my-img/callto.png"
                    alt="callto"
                    className="img-fluid img-up"
                  />
                </div>
                <div className="col-lg-6 ">
                  <h3 className="mb-2 text-white">
                    Conecta tus propiedades con los clientes ideales, hoy mismo.
                  </h3>
                  <p className="mb-0" style={{ fontSize: 20 }}>
                    Únete a la plataforma que conecta agentes con compradores
                    reales
                  </p>
                </div>
                <div className="col-md-3">
                  <Link to="#" className="btn btn-cta">
                    Unirme ahora
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default SellForRent;
