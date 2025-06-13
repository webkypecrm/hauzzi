import React, { Fragment, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";

const AppDownloading = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      author: "Carlos Pérez, Agente Inmobiliario",
      img: "img/my-img/test1.png",
      quote:
        "vendí una propiedad en menos de un mes. La plataforma es fácil de usar y los leads son de calidad.",
      svg: "img/my-img/SVG.png",
    },
    {
      author: "Carlos Pérez, Agente Inmobiliario",
      img: "img/my-img/test1.png",
      quote:
        "Gracias a Hauzzi. La plataforma es fácil de usar y los leads son de calidad.",
      svg: "img/my-img/SVG.png",
    },
    {
      author: "Carlos Pérez, Agente Inmobiliario",
      img: "img/my-img/test1.png",
      quote:
        "Gracias a Hauzzi, vendí una propiedad en menos de un mes. La plataforma es fácil de usar y los leads son de calidad.",
      svg: "img/my-img/SVG.png",
    },
  ];

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
                      Encuentra tu inmueble ideal al alcance de tu mano{" "}
                    </h1>
                    <p className="mb-4 ">
                      {" "}
                      Miles de opciones inmobiliarias en tu bolsillo. Descarga
                      Hauzzi y empieza tu búsqueda hoy mismo{" "}
                    </p>
                    <img src="img/my-img/gg.png" className="" img-fluid="" />{" "}
                    <img
                      src="img/my-img/appstore.png"
                      className=""
                      img-fluid=""
                    />
                    <div className="scanner mt-4">
                      <img
                        src="img/my-img/scanner.png"
                        className="img-fluid"
                        width="90%"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div
                    className="hero-image"
                    data-aos="zoom-out"
                    data-aos-delay={300}
                  >
                    <img
                      src="img/my-img/appdownloading.png"
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

          <section className="fifthblock thirdblock">
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
                    Lo que dicen otros agentes y agencias sobre Hauzzi
                  </h2>
                </div>
                <div
                  className="col-xl-6 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="slideshow-container">
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className="mySlides"
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
                            <img src={slide.svg} width="50%" alt="SVG" />
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
            {/* Section Title */}
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
            {/* End Section Title */}
            <div
              className="container aos-init aos-animate mt-4"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row g-4">
                <div
                  className="col-lg-4 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={100}
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
                {/* End Service Card */}
                <div
                  className="col-lg-4 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={200}
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
                {/* End Service Card */}
                <div
                  className="col-lg-4 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
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
                {/* End Service Card */}
              </div>
            </div>
          </section>

          <section
            id="about"
            className="about section test-t"
            style={{
              background: "url(img/my-img/mob.png), #F3F3F3",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "right",
            }}
          >
            <div
              className="container aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="row gy-4 justify-content-between">
                <div
                  className="col-xl-9 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={200}
                >
                  <h2 className="about-title">
                    Descubre propiedades a un clic con nuestra app inmobiliaria
                  </h2>
                  <p className="about-description">
                    &nbsp;La app que te acompaña en cada paso para vender o
                    encontrar tu propiedad
                  </p>
                  <div className="row feature-list-wrapper">
                    <div className="col-md-6">
                      <ul className="feature-list">
                        <li>
                          <img
                            src="img/my-img/list3.png"
                            width="6%"
                            style={{
                              border: "1px solid #ffbd59",
                              borderRadius: "50%",
                              backgroundColor: "#ffbd59",
                              padding: 4,
                            }}
                          />{" "}
                          Crea alertas y te notificamos las novedades en tu
                          teléfono
                        </li>
                        <li>
                          <img
                            src="img/my-img/routing.png"
                            width="6%"
                            style={{
                              border: "1px solid #ffbd59",
                              borderRadius: "50%",
                              backgroundColor: "#ffbd59",
                              padding: 4,
                            }}
                          />{" "}
                          Dibuja en el mapa dónde quieres vivir
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="feature-list">
                        <li>
                          <img
                            src="img/my-img/smart-home.png"
                            width="6%"
                            style={{
                              border: "1px solid #ffbd59",
                              borderRadius: "50%",
                              backgroundColor: "#ffbd59",
                              padding: 4,
                            }}
                          />
                          Selecciona y compara propiedades
                        </li>
                        <li>
                          <img src="img/my-img/list1.png" width="6%" /> Guárdate
                          tus inmuebles favoritos
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-8">
                      <div className="appc">
                        <img
                          src="img/my-img/gg.png"
                          className=""
                          img-fluid=""
                        />{" "}
                        <img
                          src="img/my-img/appstore.png"
                          className=""
                          img-fluid=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-3 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={300}
                >
                  <div className="image-wrapper">
                    <div
                      className="images aos-init aos-animate image-view"
                      data-aos="zoom-out"
                      data-aos-delay={400}
                    >
                      <img
                        src="img/my-img/back-img.png"
                        alt="Business Meeting"
                        className="img-fluid"
                      />
                    </div>
                  </div>
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

export default AppDownloading;
