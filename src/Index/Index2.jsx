import React, { Fragment, useState } from "react";
import Header from "../Pages/MainPage/Header";
import Footer from "../Pages/MainPage/Footer";
import { Link } from "react-router-dom";

const Index2 = () => {
  const slides = [
    {
      id: 1,
      author: "Carlos Pérez, Agente Inmobiliario",
      img: "img/my-img/test1.png",
      svg: "img/my-img/SVG.png",
      quote:
        "vendí una propiedad en menos de un mes. La plataforma es fácil de usar y los leads son de calidad.",
    },
    {
      id: 2,
      author: "Carlos Pérez, Agente Inmobiliario",
      img: "img/my-img/test1.png",
      svg: "img/my-img/SVG.png",
      quote:
        "Gracias a Hauzzi. La plataforma es fácil de usar y los leads son de calidad.",
    },
    {
      id: 3,
      author: "Carlos Pérez, Agente Inmobiliario",
      img: "img/my-img/test1.png",
      svg: "img/my-img/SVG.png",
      quote:
        "Gracias a Hauzzi, vendí una propiedad en menos de un mes. los leads son de calidad.",
    },
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  
  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <div className="main">
          <section id="hero" className="hero section slider-sec">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div
                    className="hero-content"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <h1 className="mb-4"> Vende y alquila antes que nadie </h1>
                    <p className="mb-4  text-white">
                      {" "}
                      Conéctate con miles de clientes potenciales y transforma
                      tus propiedades en oportunidades.{" "}
                    </p>

                    <Link
                      to="#about"
                      className="btn btn- primary me-sm-2 mx-1"
                      style={{ backgroundColor: "#fff", fontWeight: 500 }}
                    >
                      Empieza ahora
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="hero-image"
                    data-aos="zoom-out"
                    data-aos-delay="300"
                  >
                    <img
                      src="img/my-img/index2-ban.png"
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
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h2 className="about-title">
                    Conecta con más clientes y aumenta tu visibilidad
                  </h2>
                  <p className="about-description mb-4">
                    Alcanza más clientes en menos tiempo y asegúrate de que tus
                    propiedades siempre estén en el radar correcto.
                  </p>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: "16px" }}
                  >
                    Crea tu cuenta ahora
                  </Link>
                </div>

                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="image-wrapper">
                    <div
                      className="images position-relative aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay="400"
                    >
                      <img
                        src="img/my-img/index2-sec.png"
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
              data-aos-delay="100"
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="image-wrapper">
                    <div
                      className="images position-relative aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay="400"
                    >
                      <img
                        src="img/my-img/index2-third.png"
                        alt="Business Meeting"
                        className="img-fluid main-image rounded-4"
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h2 className="about-title">
                    Optimiza tu tiempo con nuestro CRM Inmobiliario
                  </h2>
                  <p className="about-description mb-4">
                    Gestiona fácilmente tus propiedades y clientes desde un
                    único lugar. Ahorra tiempo y cierra más tratos.
                  </p>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: "16px" }}
                  >
                    Crea tu cuenta ahora
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="fourthblock thirdblock">
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h2 className="about-title">
                    Soporte personalizado en cada paso
                  </h2>
                  <p className="about-description mb-4">
                    Nuestro equipo está aquí para resolver tus dudas y ayudarte
                    a maximizar tus resultados, desde el primer día.
                  </p>
                  <Link
                    className="btn-getstarted m-0"
                    to="#"
                    style={{ padding: "16px" }}
                  >
                    Crea tu cuenta ahora
                  </Link>
                </div>

                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="image-wrapper">
                    <div
                      className="images position-relative aos-init aos-animate"
                      data-aos="zoom-out"
                      data-aos-delay="400"
                    >
                      <img
                        src="img/my-img/index2-four.png"
                        alt="Business Meeting"
                        className="img-fluid main-image rounded-4"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="fifthblock thirdblock">
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <h2 className="about-title">
                    Lo que dicen otros agentes y agencias sobre Hauzzi
                  </h2>
                </div>

                <div
                  className="col-xl-6"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="slideshow-container">
                    {slides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className={"mySlides"}
                        style={{
                          display: index === slideIndex ? "block" : "none",
                        }}
                      >
                        <div className="author mb-4">
                          <div>
                            <img src={slide.img} width="10%" alt="Author" />
                            <span style={{ marginLeft: "6px" }}>
                              – {slide.author}
                            </span>
                          </div>
                          <div>
                            <img
                              src={slide.svg}
                              width="50%"
                              alt="Company Logo"
                            />
                          </div>
                        </div>
                        <q>{slide.quote}</q>
                      </div>
                    ))}

                    <Link className="prev" onClick={prevSlide}>
                      <span>❮</span>
                    </Link>
                    <Link className="next" onClick={nextSlide}>
                      <span>❯</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sixthblock services section light-background">
            {/* <!-- Section Title --> */}
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2 className="mb-0">
                ¿Todavía tienes dudas? Podemos hacer más por tu negocio
              </h2>
              <h4 className="mb-4">
                Anuncia en Hauzzi y multiplica tu visibilidad
              </h4>
            </div>

            <div
              className="container aos-init aos-animate mt-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="row g-4">
                <div
                  className="col-lg-4 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="service-card d-flex">
                    <div>
                      <h3>Publica sin límites y alcanza más clientes</h3>
                      <p className="mb-0">
                        Con Hauzzi, no hay restricciones en la cantidad de
                        inmuebles que puedes publicar. Gestiona tu cartera
                        completa de forma ilimitada y sin comisiones adicionales
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-4 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="service-card d-flex">
                    <div>
                      <h3>Administra múltiples agentes</h3>
                      <p className="mb-0">
                        Gestiona tu equipo y todos tus inmuebles desde una sola
                        plataforma. Asigna roles, supervisa anuncios y optimiza
                        la operación de tu agencia con herramientas eficientes.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-4 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="service-card d-flex">
                    <div>
                      <h3>Destaca con un perfil profesional</h3>
                      <p className="mb-0">
                        Destaca tu experiencia con un perfil profesional
                        completo que inspire confianza a los clientes.
                        Personaliza tu información y muestra tus mejores
                        propiedades para atraer más lead
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="call-to-action" className="call-to-action section">
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
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
                  <p className="mb-0" style={{ fontSize: "20px" }}>
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
        </div>
      </div>
    </Fragment>
  );
};

export default Index2;
