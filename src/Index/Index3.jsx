import React, { Fragment, useState } from 'react'
import Header from '../Pages/MainPage/Header'
import Footer from '../Pages/MainPage/Footer'
import { Link } from 'react-router-dom';

const Index3 = () => {
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
      <div className='index-page'>
        <Header/>
        <div className='main'>

<section id="hero" className="hero section slider-sec">
  <div className="container" data-aos="fade-up" data-aos-delay={100}>
    <div className="row align-items-center">
      <div className="col-lg-6">
        <div className="hero-content" data-aos="fade-up" data-aos-delay={200}>
          <h1 className="mb-4">
            {" "}
            Publica tu propiedad y conecta con miles de interesados{" "}
          </h1>
          <p className="mb-4  text-white">
            {" "}
            Gana visibilidad con Hauzzi y conecta con quienes buscan inmuebles
            similares al tuyo{" "}
          </p>
          <Link
            to="#about"
            className="btn btn- primary me-sm-2 mx-1"
            style={{ backgroundColor: "#fff", fontWeight: 500 }}
          >
            Publica tu inmueble gratis
          </Link>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="hero-image" data-aos="zoom-out" data-aos-delay={300}>
          <img
            src="img/my-img/index3.png"
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
          Cargar tu anuncio toma solo unos minutos. Sube fotos, agrega una
          descripción y define el precio para comenzar a recibir contactos de
          interesados.
        </p>
        <Link className="btn-getstarted m-0" to="#" style={{ padding: 16 }}>
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
              src="img/my-img/index3ban.png"
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
              src="img/my-img/index3ban1.png"
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
        <h2 className="about-title">Amplía tu audiencia con facilidad</h2>
        <p className="about-description mb-4">
          Publicar en Hauzzi garantiza que tu propiedad sea vista por miles de
          compradores y arrendatarios activos en el mercado. Nuestra red
          confiable te conecta con usuarios reales y calificados, permitiéndote
          cerrar acuerdos más rápido.
        </p>
        <Link className="btn-getstarted m-0" to="#" style={{ padding: 16 }}>
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
        <h2 className="about-title">Sin comisiones por ventas o alquileres</h2>
        <p className="about-description mb-4">
          En Hauzzi, tus ganancias son 100% tuyas. Publicar es gratis, y tú
          decides si utilizas nuestras herramientas premium para potenciar tu
          anuncio.
        </p>
        <Link className="btn-getstarted m-0" to="#" style={{ padding: 16 }}>
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
              src="img/my-img/index3ban2.png"
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


<section className="services section light-background sixthblock">
  {/* Section Title */}
  <div
    className="container section-title aos-init aos-animate"
    data-aos="fade-up"
  >
    <h2 className="mb-0">
      Algunos servicios para facilitarte la venta o alquiler de tu inmueble
    </h2>
    {/* <h4 class="mb-4">Explora miles de propiedades y encuentra tu lugar ideal.</h4> */}
  </div>
  {/* End Section Title */}
  <div className="container">
    <div className="row gy-4">
      <div className="col-xl-6 col-md-6">
        <div className="instructor__item-two tg-svg d-flex justify-content-between imutable">
          <div className="instructor__content-two">
            <h3 className="title">
              <Link to="#">Encuentra la inmobiliaria ideal para ti</Link>
            </h3>
            <p className="mt-3 mb-5" style={{ color: "#1A1A1A" }}>
              &nbsp;Podemos ayudarte en todo, pero un profesional inmobiliario
              estudiará y se adaptará a tu caso individual
            </p>
            <Link
              className="btn-getstarted mt-3"
              to="#"
              style={{ padding: 16, margin: 0 }}
            >
              Ver lista de agencias expertas{" "}
              <i
                className="fa fa-long-arrow-right"
                style={{ marginLeft: 10 }}
              />
            </Link>
          </div>
          <div className="instructor__thumb-two">
            <div className="shape-two">
              <img src="img/my-img/house1.png" />
            </div>
          </div>
        </div>
      </div>
      {/* End Feature Borx*/}
      <div
        className="col-xl-6 col-md-6 aos-init aos-animate"
        data-aos="zoom-in"
        data-aos-delay={200}
      >
        <div className="instructor__item-two tg-svg d-flex justify-content-between imutable1">
          <div className="instructor__content-two">
            <h3 className="title">
              <Link to="#">¿Eres profesional inmobiliario?</Link>
            </h3>
            <p className="mt-3 mb-5" style={{ color: "#1A1A1A" }}>
              Olvídate del caos administrativo. Con nuestro software de gestión
              inmobiliaria podrás reducir el tiempo que pasas en tareas{" "}
            </p>
            <Link
              className="btn-getstarted mt-3"
              to="#"
              style={{ padding: 16, margin: 0 }}
            >
              Descubrir más{" "}
              <i
                className="fa fa-long-arrow-right"
                style={{ marginLeft: 10 }}
              />
            </Link>
          </div>
          <div className="instructor__thumb-two">
            <div className="shape-two">
              <img src="img/my-img/house2.png" />
            </div>
          </div>
        </div>
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
                Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id
                volutpat lacus laoreet non curabitur gravida. Venenatis lectus
                magna fringilla urna porttitor rhoncus dolor purus non.
              </p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>
          {/* End Faq item*/}
          <div className="faq-item">
            <h3>¿Cuántos anuncios me permite publicar la plataforma?</h3>
            <div className="faq-content">
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant
                morbi. Id interdum velit laoreet id donec ultrices. Fringilla
                phasellus faucibus scelerisque eleifend donec pretium. Est
                pellentesque elit ullamcorper dignissim. Mauris ultrices eros in
                cursus turpis massa tincidunt dui.
              </p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>
          {/* End Faq item*/}
          <div className="faq-item">
            <h3>¿Cuánto me va a costar poner mi anuncio en Hauzzi?</h3>
            <div className="faq-content">
              <p>
                Eleifend mi in nulla posuere sollicitudin aliquam ultrices
                sagittis orci. Faucibus pulvinar elementum integer enim. Sem
                nulla pharetra diam sit amet nisl suscipit. Rutrum tellus
                pellentesque eu tincidunt. Lectus urna duis convallis convallis
                tellus. Urna molestie at elementum eu facilisis sed odio morbi
                quis
              </p>
            </div>
            <i className="faq-toggle bi bi-chevron-right" />
          </div>
          {/* End Faq item*/}
          <div className="faq-item">
            <h3>¿Cuánto tardará en publicarse mi anuncio?</h3>
            <div className="faq-content">
              <p>
                Dolor sit amet consectetur adipiscing elit pellentesque habitant
                morbi. Id interdum velit laoreet id donec ultrices. Fringilla
                phasellus faucibus scelerisque eleifend donec pretium. Est
                pellentesque elit ullamcorper dignissim. Mauris ultrices eros in
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

<section id="call-to-action" className="call-to-action section sixthblock">
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
          Únete a la plataforma que conecta agentes con compradores reales
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


<Footer/>

</div>

      </div>
    </Fragment>
  )
}

export default Index3