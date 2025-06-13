import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const About = () => {
  const [slideIndex, setSlideIndex] = useState(0);
        const [loading, setLoading] = useState(false);
     const [lookingFor, setLookingFor] = useState("");
     const [category, setCategory] = useState([]);
     const [subCategory, setSubCategory] = useState([]);
     const [selectedCategoryId, setSelectedCategoryId] = useState("");
     const [selectType, setselectType] = useState("");
     const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
     const [selectCategory, setselectCategory] = useState("");
     const [search, setSearch] = useState("")
     const apiUrl = import.meta.env.VITE_API_URL;
     const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";


      const slidesData = [
        {
          id: 1,
          author: "Carlos Pérez, Agente Inmobiliario",
          img: "img/my-img/test1.png",
          svg: "img/my-img/SVG.png",
          quote: "vendí una propiedad en menos de un mes. La plataforma es fácil de usar y los leads son de calidad.",
        },
        {
          id: 2,
          author: "Carlos Pérez, Agente Inmobiliario",
          img: "img/my-img/test1.png",
          svg: "img/my-img/SVG.png",
          quote: "Gracias a Hauzzi. La plataforma es fácil de usar y los leads son de calidad.",
        },
        {
          id: 3,
          author: "Carlos Pérez, Agente Inmobiliario",
          img: "img/my-img/test1.png",
          svg: "img/my-img/SVG.png",
          quote: "Gracias a Hauzzi, vendí una propiedad en menos de un mes. los leads son de calidad.",
        },
      ];
      
    
      const plusSlides = (n) => {
        setSlideIndex((prevIndex) => (prevIndex + n + slidesData.length) % slidesData.length);
      };
    
      const currentSlide = (index) => {
        setSlideIndex(index);
      };



// Apis 
     const handleLookingForChange = (e) => {
  const selectedText = e.target.options[e.target.selectedIndex].text.trim();

  const purposeMap = {
    "For Rent": "wantToRent",
    "For Sale": "wantToSell",
    "For Both": "bothSellRent",
  };

  const mappedValue = purposeMap[selectedText] || "";
  setLookingFor(mappedValue);
};

  // console.log("looking", lookingFor);

  // category GET

  const getCategory = async () => {
    try {
      const res = await axios.get(`${apiUrl}/category/getAllCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategory(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };

  // property subCategory GET
  

  const getSubCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `${apiUrl}/category/getAllCategoryData/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubCategory(res.data?.data || []);
      console.log("subcat", subCategory);
    } catch (error) {}
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const selected = category.find((cat) => cat.id.toString() === catId);
    setSelectedCategoryId(catId);
    setselectType(selected?.name || "");
    setSubCategory([]);
    setSelectedSubCategoryId("");
    setselectCategory("");
    getSubCategory(catId);
  };

  const handleSubCategoryChange = (e) => {
    const subId = e.target.value;
    const selected = subCategory.find((sub) => sub.id.toString() === subId);
    setSelectedSubCategoryId(subId);
    setselectCategory(selected?.name || "");
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Search get api 
 
  const handelSearchInput = (e) => {
    setSearch(e.target.value)
  }
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
                    <h1 className="mb-4">
                      {" "}
                      Tu aliado inmobiliario para buscar, comparar y elegir el
                      inmueble perfecto{" "}
                    </h1>
                    <p className="mb-4 mb-md-5">
                      {" "}
                      Somos más que una plataforma, somos el puente que conecta
                      personas, propiedades y oportunidades.{" "}
                    </p>
                    <div className="row">
                      <form
                        action="#"
                        method="post"
                        className="advance__search"
                      >
                        <div
                          className="advance__search__wrapper wow fadeInUp animated"
                          style={{
                            visibility: "visible",
                            animationName: "fadeInUp",
                          }}
                        >
                                                   {/* <!-- single input --> */}
                          <div className="query__input">
                                <select
                                  name="adult"
                                  id="adult"
                                  className="form-select border-s"
                                  onChange={handleLookingForChange}
                                >
                                  <option value={1}>Looking For</option>
                                  <option value={2}>For Rent</option>
                                  <option value={3}>For Sale</option>
                                  <option value={4}>For Both</option>
                                </select>
                                <div
                                  className="query__input__icon"
                                  style={{ pointerEvents: "none" }}
                                >
                                  <i className="flaticon-user" />
                                </div>
                              </div>
                          {/* <!-- single input end --> */}
                          {/* <!-- single input --> */}
                          <div className="query__input">
                                <select
                                  name="category"
                                  id="category"
                                  className="form-select border-s"
                                  value={selectedCategoryId}
                                  onChange={handleCategoryChange}
                                >
                                  <option value="">All Categories</option>
                                  {category.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                      {cat.name}
                                    </option>
                                  ))}
                                </select>
                                <div
                                  className="query__input__icon"
                                  style={{ pointerEvents: "none" }}
                                >
                                  <i className="flaticon-user" />
                                </div>
                              </div>
                          {/* <!-- single input end --> */}
                            {/* single input */}
                              <div className="query__input">
                                <select
                                  name="subCategory"
                                  id="subCategory"
                                  className="form-select border-s"
                                  value={selectedSubCategoryId}
                                  onChange={handleSubCategoryChange}
                                >
                                  <option value="">All Sub Categories</option>
                                  {subCategory.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                      {sub.name}
                                    </option>
                                  ))}
                                </select>
                                <div
                                  className="query__input__icon"
                                  style={{ pointerEvents: "none" }}
                                >
                                  <i className="flaticon-user" />
                                </div>
                              </div>
                              {/* single input end */}
                          {/* submit button */}
                          <div className="search">
                            <input
                              className="search-txt"
                              type="text"
                              name=""
                              placeholder="Busca por dirección, ciudad o código postal"
                              onChange={handelSearchInput}
                              value={search}
                            />
                            <Link className="" to={`/propertysell?purpose=${lookingFor}&type=${selectType}&category=${selectCategory}&search=${(search)}`}>
                              <span className="search-icon-content">
                                Buscar
                              </span>{" "}
                              <i
                                className="fa fa-search search-c slider-search"
                                style={{ color: "#FFBD59" }}
                              />
                            </Link>
                          </div>
                          {/* submit button end */}
                        </div>
                      </form>
                    </div>
                    <div className="contentslider" style={{fontWeight: 700}}>
                      {" "}
                      ¿Necesita más opciones de búsqueda?{" "}
                      <Link to="#" className="btn btn-primary me-0 me-sm-2 mx-1">
                        Búsqueda avanzada
                      </Link>
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
                      src="img/my-img/abmainban.png"
                      alt="Hero Image"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="aboutblock">
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
                        src="img/my-img/aboutimg.png"
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
                  <h2 className="about-title">Todo sobre Hauzzi</h2>
                  <p className="about-description mb-4">
                    En Hauzzi, simplificamos tu búsqueda inmobiliaria bajo el
                    lema: <strong>“Busca, Compara y Elige”.</strong> Somos más
                    que una plataforma, somos tu aliado para encontrar el
                    inmueble perfecto.
                  </p>
                  <p className="about-description mb-4">
                    Te ofrecemos una amplia variedad de propiedades, desde
                    apartamentos urbanos hasta casas de campo, todo en un solo
                    lugar, con herramientas que facilitan la comparación y la
                    toma de decisiones informadas.
                  </p>
                  <p className="about-description mb-4">
                    Nuestra misión es conectar a las personas con el lugar donde
                    comienzan nuevas aventuras y se crean recuerdos
                    inolvidables. Ya seas un comprador, agente o inversor, en
                    Hauzzi encontrarás una experiencia personalizada que te
                    guiará hacia el hogar de tus sueños.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="call-to-action12"
            className="call-to-action section"
            style={{ padding: "10px 0px" }}
          >
            <div className="d-flex justify-content-center align-items-center">
              <span className="round-img12">
                {" "}
                <img
                  src="img/my-img/round.png"
                  className="img-fluid"
                  width="60%"
                />
              </span>
            </div>
            <div
              className="container aos-init aos-animate block12"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div
                className="row content justify-content-center align-items-center position-relative"
                style={{ padding: "143px 0px" }}
              >
                <div className="col-lg-8 mx-auto text-center">
                  <h2
                    className="display-4 mb-4"
                    style={{ fontWeight: 600, fontSize: 33 }}
                  >
                    Nuestra Historia
                  </h2>
                  <p className="mb-4">
                    Get ready to start your exciting journey.
                    <br />
                    Our agency will lead you through the amazing digital world
                  </p>
                </div>
                {/* Abstract Background Elements */}
                <div className="shape shape-1">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M47.1,-57.1C59.9,-45.6,68.5,-28.9,71.4,-10.9C74.2,7.1,71.3,26.3,61.5,41.1C51.7,55.9,35,66.2,16.9,69.2C-1.3,72.2,-21,67.8,-36.9,57.9C-52.8,48,-64.9,32.6,-69.1,15.1C-73.3,-2.4,-69.5,-22,-59.4,-37.1C-49.3,-52.2,-32.8,-62.9,-15.7,-64.9C1.5,-67,34.3,-68.5,47.1,-57.1Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                <div className="shape shape-2">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M41.3,-49.1C54.4,-39.3,66.6,-27.2,71.1,-12.1C75.6,3,72.4,20.9,63.3,34.4C54.2,47.9,39.2,56.9,23.2,62.3C7.1,67.7,-10,69.4,-24.8,64.1C-39.7,58.8,-52.3,46.5,-60.1,31.5C-67.9,16.4,-70.9,-1.4,-66.3,-16.6C-61.8,-31.8,-49.7,-44.3,-36.3,-54C-22.9,-63.7,-8.2,-70.6,3.6,-75.1C15.4,-79.6,28.2,-58.9,41.3,-49.1Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                </div>
                {/* Dot Pattern Groups */}
                <div className="dots dots-1">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern
                      id="dot-pattern"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx={2} cy={2} r={2} fill="currentColor" />
                    </pattern>
                    <rect width={100} height={100} fill="url(#dot-pattern)" />
                  </svg>
                </div>
                <div className="dots dots-2">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <pattern
                      id="dot-pattern-2"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx={2} cy={2} r={2} fill="currentColor" />
                    </pattern>
                    <rect width={100} height={100} fill="url(#dot-pattern-2)" />
                  </svg>
                </div>
                <div className="shape shape-3">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M43.3,-57.1C57.4,-46.5,71.1,-32.6,75.3,-16.2C79.5,0.2,74.2,19.1,65.1,35.3C56,51.5,43.1,65,27.4,71.7C11.7,78.4,-6.8,78.3,-23.9,72.4C-41,66.5,-56.7,54.8,-65.4,39.2C-74.1,23.6,-75.8,4,-71.7,-13.2C-67.6,-30.4,-57.7,-45.2,-44.3,-56.1C-30.9,-67,-15.5,-74,0.7,-74.9C16.8,-75.8,33.7,-70.7,43.3,-57.1Z"
                      transform="translate(100 100)"
                    />
                  </svg>
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
              <h2 className="mb-0">¿Qué hacemos en Hauzzi por ti?</h2>
              <h4 className="mb-4">
                Somos la plataforma que trabaja para mejorar tu experiencia
                inmobiliaria.
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
                      <h3>
                        Trabajamos para que encuentres el espacio perfecto para
                        ti
                      </h3>
                      <p className="mb-0">
                        En Hauzzi, creemos que todas las personas merecen un
                        lugar donde construir sus sueños y ser felices.
                        Trabajamos para que el proceso de encontrar, comprar,
                        alquilar o vender una propiedad sea fácil, seguro y
                        transparente. Nuestro objetivo es empoderarte con las
                        herramientas necesarias para tomar decisiones informadas
                        y acertadas.
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
                      <h3>
                        Asesoramiento personalizado y herramientas avanzadas
                      </h3>
                      <p className="mb-0">
                        Te proporcionamos filtros inteligentes y comparadores
                        que simplifican la búsqueda de propiedades según tus
                        necesidades. Además, contamos con recursos educativos y
                        guías para orientarte en cada etapa del proceso
                        inmobiliario.
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

          <section className="secondblock">
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2 className="mb-0">Empieza a utilizar Hauzzi</h2>
              <h4 className="mb-4">
                En Hauzzi te ofrecemos herramientas e información completas para
                acompañarte en la búsqueda, venta o alquiler de propiedades en
                Venezuela.
              </h4>
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
                    style={{ padding: 16 }}
                  >
                    Crea tu cuenta ahora
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
                  data-aos-delay={200}
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
                    style={{ padding: 16 }}
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
              data-aos-delay={100}
            >
              <div className="row gy-4 align-items-center justify-content-between">
                <div
                  className="col-xl-5 aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={200}
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
                    style={{ padding: 16 }}
                  >
                    Crea tu cuenta ahora
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


<div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
      <div className="slideshow-container">
        {slidesData.map((slide, index) => (
          // <div key={slide.id} className={`mySlides ${index === slideIndex ? "active" : ""}`}>
            <div
                        key={slide.id}
                        className="mySlides"
                        style={{
                          display: index === slideIndex ? "block" : "none",
                        }}
                      >
            <div className="author mb-4">
              <div>
                <img src={slide.img} width="10%" alt="Author" />
                <span style={{ marginLeft: "6px" }}>– {slide.author}</span>
              </div>
              <div>
                <img src={slide.svg} width="50%" alt="Company Logo" />
              </div>
            </div>
            <q>{slide.quote}</q>
          </div>
        ))}

        <Link className="prev" onClick={() => plusSlides(-1)}><span>❮</span></Link>
        <Link className="next" onClick={() => plusSlides(1)}><span>❯</span></Link>

        <div className="dots">
          {slidesData.map((_, index) => (
            <span key={index} className={`dot ${index === slideIndex ? "active" : ""}`} onClick={() => currentSlide(index)}></span>
          ))}
        </div>
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
        </div>
      </div>
    </Fragment>
  );
};

export default About;
