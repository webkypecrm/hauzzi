import React, { Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const AgentProfile = () => {
  // Slider 1
  const slides = new Array(5).fill({
    title: "Eaton Garth Penthouse",
    price: "$180,000",
    address: "7722 18th Ave, Brooklyn",
    beds: "4 Hab.",
    baths: "2 Baños",
    area: "450 m2",
    image: "img/my-img/discovery.png",
  });
  // Slider 2
  const properties = [
    {
      image: "img/my-img/discovery.png",
      title: "Eaton Garth Penthouse",
      price: "$180,000",
      address: "7722 18th Ave, Brooklyn",
      hab: 4,
      banos: 2,
      size: "450 m2",
      agentImage: "img/my-img/ellipse.png",
      agentName: "Por Vectoria smith",
    },
    {
      image: "img/my-img/agent-rent-img.jpeg",
      title: "Diamond Manor Apartment",
      price: "$259,000",
      address: "7802 20th Ave, Brooklyn",
      hab: 4,
      banos: 2,
      size: "500 m2",
      agentImage: "img/my-img/ellipse_1.png",
      agentName: "Por Jhon-smith",
    },
    {
      image: "img/my-img/discovery.png",
      title: "Eaton Garth Penthouse",
      price: "$180,000",
      address: "7722 18th Ave, Brooklyn",
      hab: 4,
      banos: 2,
      size: "450 m2",
      agentImage: "img/my-img/ellipse.png",
      agentName: "Por Vectoria smith",
    },
    {
      image: "img/my-img/agent-rent-img.jpeg",
      title: "Diamond Manor Apartment",
      price: "$259,000",
      address: "7802 20th Ave, Brooklyn",
      hab: 4,
      banos: 2,
      size: "500 m2",
      agentImage: "img/my-img/ellipse_1.png",
      agentName: "Por Jhon-smith",
    },
  ];
  // slider 3
  const properties2 = [
    {
      title: "Eaton Garth Penthouse",
      price: "$180,000",
      img: "img/my-img/discovery.png",
      location: "7722 18th Ave, Brooklyn",
      hab: "4 Hab.",
      banos: "2 Baños",
      size: "450 m2",
      agentImg: "img/my-img/ellipse.png",
      agentName: "Vectoria smith",
    },
    {
      title: "Diamond Manor Apartment",
      price: "$259,000",
      img: "img/my-img/agent-rent-img.jpeg",
      location: "7802 20th Ave, Brooklyn",
      hab: "4 Hab.",
      banos: "2 Baños",
      size: "500 m2",
      agentImg: "img/my-img/ellipse_1.png",
      agentName: "Jhon-smith",
    },
    {
      title: "Eaton Garth Penthouse",
      price: "$180,000",
      img: "img/my-img/discovery.png",
      location: "7722 18th Ave, Brooklyn",
      hab: "4 Hab.",
      banos: "2 Baños",
      size: "450 m2",
      agentImg: "img/my-img/ellipse.png",
      agentName: "Vectoria smith",
    },
    {
      title: "Diamond Manor Apartment",
      price: "$259,000",
      img: "img/my-img/agent-rent-img.jpeg",
      location: "7802 20th Ave, Brooklyn",
      hab: "4 Hab.",
      banos: "2 Baños",
      size: "500 m2",
      agentImg: "img/my-img/ellipse_1.png",
      agentName: "Jhon-smith",
    },
  ];
  // Slider 4
  const toShareSlides = [
    {
      image: "img/my-img/discovery.png",
      title: "Eaton Garth Penthouse",
      price: "$180,000",
      address: "7722 18th Ave, Brooklyn",
      bedrooms: "4 Hab.",
      bathrooms: "2 Baños",
      size: "450 m2",
      author: "Vectoria smith",
      avatar: "img/my-img/ellipse.png",
    },
    {
      image: "img/my-img/agent-rent-img.jpeg",
      title: "Diamond Manor Apartment",
      price: "$259,000",
      address: "7802 20th Ave, Brooklyn",
      bedrooms: "4 Hab.",
      bathrooms: "2 Baños",
      size: "500 m2",
      author: "Jhon-smith",
      avatar: "img/my-img/ellipse_1.png",
    },
    {
      image: "img/my-img/discovery.png",
      title: "Eaton Garth Penthouse",
      price: "$180,000",
      address: "7722 18th Ave, Brooklyn",
      bedrooms: "4 Hab.",
      bathrooms: "2 Baños",
      size: "450 m2",
      author: "Vectoria smith",
      avatar: "img/my-img/ellipse.png",
    },
    {
      image: "img/my-img/agent-rent-img.jpeg",
      title: "Diamond Manor Apartment",
      price: "$259,000",
      address: "7802 20th Ave, Brooklyn",
      bedrooms: "4 Hab.",
      bathrooms: "2 Baños",
      size: "500 m2",
      author: "Jhon-smith",
      avatar: "img/my-img/ellipse_1.png",
    },
  ];
  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <div className="main">
          <section className="top-btn12">
            <div className="container">
              <div className="row mb-5">
                <div className="col-xl-2 col-lg-2 col-md-2 align-content-center">
                  <div className="agent-img">
                    <img src="img/my-img/agent-img.jpeg" alt="" />
                    <small className="toprated">
                      <img src="img/my-img/crown.png" />
                      Top Rated
                    </small>
                  </div>
                  <div className="agent-profile">
                    <ul className="list-inline">
                      <li>
                        <b>John Doe</b>
                      </li>
                      <li>
                        <img src="img/my-img/start-small.png" />{" "}
                        <span>( 112 ) Reseñas</span>
                      </li>
                      <li>
                        <img src="img/my-img/heart.png" />{" "}
                        <span>Añadir a favoritos</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-10 col-lg-10 col-md-10">
                  {/* Section Title */}
                  <div className="section-title text-start">
                    <h2 className="mb-0">Ventas Recientes</h2>
                  </div>

                  {/* Slider main container */}
                  <div className="swiper" id="swiper1">
                    {/* Navigation Buttons - Keep them in place */}
                    <div className="swiper-button-prev">
                      <i className="bi bi-arrow-left me-1"></i> Anterior
                    </div>
                    <div className="swiper-button-next">
                      Siguiente <i className="bi bi-arrow-right ms-1"></i>
                    </div>

                    {/* Swiper wrapper */}
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      slidesPerView={1}
                      breakpoints={{
                        768: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 3, spaceBetween: 10 },
                        1280: { slidesPerView: 3, spaceBetween: 10 },
                      }}
                      autoplay={{ delay: 3000 }}
                      loop={true}
                    >
                      {slides.map((item, idx) => (
                        <SwiperSlide key={idx}>
                          <Link to="javascript:void(0)">
                            <div className="feat_property">
                              <div className="thumb">
                                <img
                                  className="img-whp"
                                  src={item.image}
                                  alt="fp1"
                                />
                                <div className="thmb_cntnt">
                                  <ul className="tag mb-0 p-0">
                                    <li className="list-inline-item">
                                      <span>VENTA</span>
                                    </li>
                                    <li className="list-inline-item">
                                      <span>Negociable</span>
                                    </li>
                                  </ul>
                                  <ul className="icon mb-0">
                                    <li className="list-inline-item">
                                      <i
                                        className="fa fa-exchange"
                                        style={{ color: "#999191" }}
                                      ></i>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      style={{ background: "unset" }}
                                    >
                                      <i
                                        className="fa fa-heart"
                                        aria-hidden="true"
                                        style={{ color: "#FFBD59" }}
                                      ></i>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="details">
                                <div className="tc_content">
                                  <div className="title-price">
                                    <h4>{item.title}</h4>
                                    <span className="fp_price">
                                      {item.price}
                                    </span>
                                  </div>
                                  <p>
                                    <img src="img/my-img/vector.png" alt="" />
                                    <span style={{ marginLeft: "5px" }}>
                                      {item.address}
                                    </span>
                                  </p>
                                  <ul className="prop_details mb0 p-0">
                                    <li className="list-inline-item">
                                      <span>
                                        <img src="img/my-img/icon.png" alt="" />{" "}
                                        {item.beds}
                                      </span>
                                    </li>{" "}
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src="img/my-img/Vector_1.png"
                                          alt=""
                                        />{" "}
                                        {item.baths}
                                      </span>
                                    </li>
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src="img/my-img/icon_1.png"
                                          alt=""
                                        />{" "}
                                        {item.area}
                                      </span>
                                    </li>
                                  </ul>
                                  <p>
                                    <i className="bi bi-circle-fill"></i>{" "}
                                    <b>Vendido</b>
                                    &nbsp; hace 6 días
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {/* Bottom Counter Boxes */}
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="counter-box">
                          <p>
                            <b>37</b> Ventas en los últimos 12 meses
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="counter-box">
                          <p>
                            <b>367</b> Total ventas
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="counter-box">
                          <p>
                            <b>155k-750k</b> Rango de precio
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <div className="counter-box">
                          <p>
                            <b>257k</b> Precio promedio
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-7">
                  <h4 className="fw-bold">Sobre Jhon-Doe</h4>
                  <p className="m-0">
                    🏡 John Doe | Your Trusted Real Estate Expert
                  </p>
                  <p>
                    With years of experience in the real estate market, I
                    specialize in helping buyers, sellers, and investors find
                    the perfect property. Whether you're looking for your dream
                    home, selling at the best price, or making smart investment
                    moves, I provide expert guidance every step of the way.
                    Let’s turn your real estate goals into reality!
                  </p>
                  <h5 className="fw-bold">Especialidades</h5>
                  <ul className="list-inline speciality_sec ">
                    <li>Comercial</li>
                    <li>Galpones</li>
                    <li>Administración de fincas</li>
                  </ul>
                  <h5 className="fw-bold">Idiomas</h5>
                  <ul className="list-inline language_sec">
                    <li>Español</li>
                    <li>Ingles</li>
                    <li>Italiano</li>
                  </ul>
                  <Link to="javascript:void(0)" className="primary-text">
                    <img src="img/my-img/global.png" style={{ width: 20 }} />{" "}
                    Visitar la página web del agente
                  </Link>
                  <ul className="list-inline socailicon_sec">
                    <li>
                      <Link to="javascript:void(0)" target="_blank">
                        <img src="img/my-img/facebook.png" />
                      </Link>
                    </li>
                    <li>
                      <Link to="javascript:void(0)" target="_blank">
                        <img src="img/my-img/Instagram.png" />
                      </Link>
                    </li>
                    <li>
                      <Link to="javascript:void(0)" target="_blank">
                        <img src="img/my-img/Youtube.png" />
                      </Link>
                    </li>
                  </ul>
                  <h5 className="fw-bold">
                    {" "}
                    Anuncios y Ventas de Jhon Doe ( 319 )
                  </h5>
                  <ul className="list-inline ads_sec">
                    <li>
                      <i className="bi bi-circle-fill" /> Para venta
                    </li>
                    <li>
                      <i className="bi bi-circle-fill" /> Para alquilar
                    </li>
                    <li>
                      <i className="bi bi-circle-fill" /> Compartir
                    </li>
                  </ul>
                  <div className="map_sec">
                    <img
                      src="img/my-img/agent-profile-map.png"
                      style={{ width: "100%", borderRadius: 8 }}
                    />
                    <p className="mt-1">
                      Este mapa puede mostrar los listados recientes{" "}
                    </p>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="profile_box mb-4">
                    <div className="agent-detail position-relative">
                      <div className="side-c text-center">
                        <img src="img/my-img/ellipse_1.png" className="img-r" />
                        <div className="white_sec text-center">
                          <div className="agent_details">
                            <h6>Jhon_Smith</h6>
                            <p className="mb-0">
                              <span className="primary-text">03</span> listados
                              de inmuebles
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 ps-5 pe-5">
                      <div className="row mb-3 align-items-center justify-content-center">
                        <div className="col-auto text-warning">
                          <img
                            src="img/my-img/call12.png"
                            style={{ width: 18 }}
                          />
                        </div>
                        <div className="col-lg-3 col-md-3">Teléfono</div>
                        <div className="col-lg-6 col-md-6 text-start">
                          +00000000000000
                        </div>
                      </div>
                      <div className="row mb-3 align-items-center justify-content-center">
                        <div className="col-auto text-warning">
                          <img
                            src="img/my-img/whatsapp.png"
                            style={{ width: 18 }}
                          />
                        </div>
                        <div className="col-lg-3 col-md-3">Whatsapp</div>
                        <div className="col-lg-6 col-md-6 text-start">
                          +00000000000000
                        </div>
                      </div>
                      <div className="row mb-3 align-items-center justify-content-center">
                        <div className="col-auto text-warning">
                          <img src="img/my-img/sms.svg" style={{ width: 18 }} />
                        </div>
                        <div className="col-lg-3 col-md-3">Correo</div>
                        <div className="col-lg-6 col-md-6 text-start">
                          loremipsum@gmail.com
                        </div>
                      </div>
                      <div className="row align-items-center justify-content-center">
                        <div className="col-auto text-warning">
                          <img
                            src="img/my-img/global.png"
                            style={{ width: 18 }}
                          />
                        </div>
                        <div className="col-lg-3 col-md-3">Página web</div>
                        <div className="col-lg-6 col-md-6 text-start">
                          www.loremipsum.com
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-box p-3">
                    <h5 className="text-center mb-3">
                      Contacta con el Jhon Doe
                    </h5>
                    <form>
                      <div className="mb-3 inputWithIcon">
                        <label>Tus Nombre</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Ingresa tu nombre y apellido"
                          id=""
                          aria-describedby=""
                        />
                        <i className="bi bi-person fa-lg fa-fw" />
                      </div>
                      <div className="mb-3 inputWithIcon">
                        <label>Tu Correo</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Ingresa tu correo electrónico"
                          id=""
                          aria-describedby=""
                        />
                        <i className="bi bi-pencil-square fa-lg fa-fw" />
                      </div>
                      <div className="mb-3 inputWithIcon">
                        <label>Tu Teléfono</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Ingresa tu teléfono"
                          id=""
                          aria-describedby=""
                        />
                        <i className="bi bi-telephone fa-lg fa-fw" />
                      </div>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          col={10}
                          placeholder="Mensaje"
                          defaultValue={""}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary ps-4 pe-4 w-100 text-capitalize"
                        >
                          Contactar ahora
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-7 col-md-7">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Para Venta ( 20 )</h5>
                    <Link to="javascript:void(0)" className="primary-text">
                      Ver Todos
                    </Link>
                  </div>
                  <div className="swiper-container" id="salecarousel">
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop={true}
                      centeredSlides={false}
                      breakpoints={{
                        768: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        1280: {
                          slidesPerView: 2.1,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {properties.map((property, index) => (
                        <SwiperSlide key={index}>
                          <div className="feat_property">
                            <div className="thumb">
                              <img
                                className="img-whp"
                                src={property.image}
                                alt="fp1.jpg"
                              />
                              <div className="thmb_cntnt">
                                <ul className="tag mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>VENTA</span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>Negociable</span>
                                  </li>
                                </ul>
                                <ul className="icon mb-0">
                                  <li className="list-inline-item">
                                    <i
                                      className="fa fa-exchange"
                                      style={{ color: "#999191" }}
                                    />
                                  </li>
                                  <li
                                    className="list-inline-item"
                                    style={{ background: "unset" }}
                                  >
                                    <i
                                      className="fa fa-heart"
                                      aria-hidden="true"
                                      style={{ color: "#FFBD59" }}
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="details">
                              <div className="tc_content">
                                <div className="title-price">
                                  <h4>{property.title}</h4>
                                  <span className="fp_price">
                                    {property.price}
                                  </span>
                                </div>
                                <p>
                                  <img
                                    src="img/my-img/vector.png"
                                    alt="location"
                                  />
                                  <span style={{ marginLeft: 5 }}>
                                    {property.address}
                                  </span>
                                </p>
                                <ul className="prop_details mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/icon.png" alt="" />{" "}
                                      {property.hab} Hab.{" "}
                                    </span>
                                  </li>{" "}
                                  <li className="list-inline-item">
                                    <span>
                                      <img
                                        src="img/my-img/Vector_1.png"
                                        alt=""
                                      />{" "}
                                      {property.banos} Baños{" "}
                                    </span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/icon_1.png" alt="" />{" "}
                                      {property.size}{" "}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="fp_footer d-flex">
                                <Link to="#">
                                  <ul className="fp_meta float-left mb-0 p-0">
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src={property.agentImage}
                                          alt="agent"
                                          className="img-fluid img-width"
                                        />
                                        {property.agentName}
                                      </span>
                                    </li>
                                  </ul>
                                </Link>
                                <div className="fp_pdate float-right d-flex">
                                  <Link className="btn-getstarted gt" to="#">
                                    <img
                                      src="img/my-img/vector_2.png"
                                      width="25%"
                                      alt="email"
                                    />
                                    Email
                                  </Link>
                                  <Link className="btn-getstarted gt" to="#">
                                    <img
                                      src="img/my-img/call.png"
                                      width="25%"
                                      alt="call"
                                    />
                                    Llamar
                                  </Link>
                                  <Link to="#">
                                    <i
                                      className="fa fa-ellipsis-v"
                                      aria-hidden="true"
                                      style={{
                                        marginLeft: "10px",
                                        marginTop: "8px",
                                        color: "#8a8a8a",
                                      }}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
                <div className="col-lg-5 col-md-5">
                  <div className="workagent-box p-3">
                    <h5 className="text-center mb-3">
                      Trabaja con este agente en Hauzzi
                    </h5>
                    <p>
                      Conéctate directamente, agenda visitas al instante y
                      recibe ayuda personalizada según tus búsquedas.
                    </p>
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary ps-4 pe-4 w-100 text-capitalize"
                        data-bs-toggle="modal"
                        data-bs-target="#addagent_modal"
                      >
                        Añadir como mi agente
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-7 col-md-7">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Para Alquilar ( 20 )</h5>
                    <Link to="javascript:void(0)" className="primary-text">
                      Ver Todos
                    </Link>
                  </div>
                  <div className="swiper" id="rentcarousel">
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      // navigation={{
                      //   nextEl: ".swiper-button-next",
                      //   prevEl: ".swiper-button-prev",
                      // }}
                      autoplay
                      loop
                      centeredSlides={false}
                      breakpoints={{
                        768: { slidesPerView: 1, spaceBetween: 10 },
                        1024: { slidesPerView: 2, spaceBetween: 10 },
                        1280: { slidesPerView: 2.1, spaceBetween: 10 },
                      }}
                    >
                      {properties2.map((prop, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="feat_property">
                            <div className="thumb">
                              <img
                                className="img-whp"
                                src={prop.img}
                                alt="fp1.jpg"
                              />
                              <div className="thmb_cntnt">
                                <ul className="tag mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>VENTA</span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>Negociable</span>
                                  </li>
                                </ul>
                                <ul className="icon mb-0">
                                  <li className="list-inline-item">
                                    <i
                                      className="fa fa-exchange"
                                      style={{ color: "#999191" }}
                                    />
                                  </li>
                                  <li
                                    className="list-inline-item"
                                    style={{ background: "unset" }}
                                  >
                                    <i
                                      className="fa fa-heart"
                                      aria-hidden="true"
                                      style={{ color: "#FFBD59" }}
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="details">
                              <div className="tc_content">
                                <div className="title-price">
                                  <h4>{prop.title}</h4>
                                  <span className="fp_price">{prop.price}</span>
                                </div>
                                <p>
                                  <img
                                    src="img/my-img/vector.png"
                                    alt="vector"
                                  />
                                  <span style={{ marginLeft: 5 }}>
                                    {prop.location}
                                  </span>
                                </p>
                                <ul className="prop_details mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>
                                      <img
                                        src="img/my-img/icon.png"
                                        alt="hab"
                                      />{" "}
                                      {prop.hab}
                                    </span>
                                  </li>{" "}
                                  <li className="list-inline-item">
                                    <span>
                                      <img
                                        src="img/my-img/Vector_1.png"
                                        alt="baños"
                                      />{" "}
                                      {prop.banos}
                                    </span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>
                                      <img
                                        src="img/my-img/icon_1.png"
                                        alt="size"
                                      />{" "}
                                      {prop.size}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="fp_footer d-flex">
                                <Link to="#">
                                  <ul className="fp_meta float-left mb-0 p-0">
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src={prop.agentImg}
                                          alt="poster"
                                          className="img-fluid img-width"
                                        />
                                        Por {prop.agentName}
                                      </span>
                                    </li>
                                  </ul>
                                </Link>
                                <div className="fp_pdate float-right d-flex">
                                  <Link className="btn-getstarted gt" to="#">
                                    <img
                                      src="img/my-img/vector_2.png"
                                      width="25%"
                                      alt="email"
                                    />
                                    Email
                                  </Link>
                                  <Link className="btn-getstarted gt" to="#">
                                    <img
                                      src="img/my-img/call.png"
                                      width="25%"
                                      alt="call"
                                    />
                                    Llamar
                                  </Link>
                                  <Link to="#">
                                    <i
                                      className="fa fa-ellipsis-v"
                                      aria-hidden="true"
                                      style={{
                                        marginLeft: 10,
                                        marginTop: 8,
                                        color: "#8a8a8a",
                                      }}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-lg-7 col-md-7">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Para Compartir ( 20 )</h5>
                    <Link to="javascript:void(0)" className="primary-text">
                      Ver Todos
                    </Link>
                  </div>
                  <div className="swiper" id="tosharecarousel">
                    <Swiper
                      modules={[Navigation, Autoplay]}
                      autoplay
                      loop
                      breakpoints={{
                        768: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        1024: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        1280: {
                          slidesPerView: 2.1,
                          spaceBetween: 10,
                        },
                      }}
                    >
                      {toShareSlides.map((item, index) => (
                        <SwiperSlide key={index}>
                          <div className="feat_property">
                            <div className="thumb">
                              <img
                                className="img-whp"
                                src={item.image}
                                alt="property"
                              />
                              <div className="thmb_cntnt">
                                <ul className="tag mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>VENTA</span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>Negociable</span>
                                  </li>
                                </ul>
                                <ul className="icon mb-0">
                                  <li className="list-inline-item">
                                    <i
                                      className="fa fa-exchange"
                                      style={{ color: "#999191" }}
                                    />
                                  </li>
                                  <li
                                    className="list-inline-item"
                                    style={{ background: "unset" }}
                                  >
                                    <i
                                      className="fa fa-heart"
                                      style={{ color: "#FFBD59" }}
                                    />
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="details">
                              <div className="tc_content">
                                <div className="title-price">
                                  <h4>{item.title}</h4>
                                  <span className="fp_price">{item.price}</span>
                                </div>
                                <p>
                                  <img
                                    src="img/my-img/vector.png"
                                    alt="location"
                                  />
                                  <span style={{ marginLeft: 5 }}>
                                    {item.address}
                                  </span>
                                </p>
                                <ul className="prop_details mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/icon.png" alt="" />{" "}
                                      {item.bedrooms}
                                    </span>
                                  </li>{" "}
                                  <li className="list-inline-item">
                                    <span>
                                      <img
                                        src="img/my-img/Vector_1.png"
                                        alt=""
                                      />{" "}
                                      {item.bathrooms}
                                    </span>
                                  </li>
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/icon_1.png" alt="" />{" "}
                                      {item.size}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="fp_footer d-flex">
                                <Link to="#">
                                  <ul className="fp_meta float-left mb-0 p-0">
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src={item.avatar}
                                          alt="poster"
                                          className="img-fluid img-width"
                                        />
                                        Por {item.author}
                                      </span>
                                    </li>
                                  </ul>
                                </Link>
                                <div className="fp_pdate float-right d-flex">
                                  <Link className="btn-getstarted gt" to="#">
                                    <img
                                      src="img/my-img/vector_2.png"
                                      width="25%"
                                      alt="email"
                                    />
                                    Email
                                  </Link>
                                  <Link className="btn-getstarted gt" to="#">
                                    <img
                                      src="img/my-img/call.png"
                                      width="25%"
                                      alt="call"
                                    />
                                    Llamar
                                  </Link>
                                  <Link to="#">
                                    <i
                                      className="fa fa-ellipsis-v"
                                      style={{
                                        marginLeft: "10px",
                                        marginTop: "8px",
                                        color: "#8a8a8a",
                                      }}
                                    />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-7 col-md-7">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold">Reseñas (77)</h5>
                    <Link to="javascript:void(0)" className="reviewbtn btn">
                      Escribir reseña
                    </Link>
                  </div>
                  {/* Form Feild */}
                  <form className="mb-4 mt-4">
                    <div className="row g-3">
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <label className="mb-1">Filtrar por</label>
                        <select
                          className="form-select form-select-lg"
                          aria-label=".form-select-lg example"
                        >
                          <option selected="">Todas las reseñas</option>
                          <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>
                        </select>
                      </div>
                      <div className="col-xl-6 col-lg-6 col-md-6">
                        <label className="mb-1">Odernar por</label>
                        <select
                          className="form-select form-select-lg"
                          aria-label=".form-select-lg example"
                        >
                          <option selected="">Nuevas reseñas</option>
                          <option value={1}>One</option>
                          <option value={2}>Two</option>
                          <option value={3}>Three</option>
                        </select>
                      </div>
                    </div>
                  </form>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold">
                      Titulo del comentario{" "}
                      <span style={{ color: "#eceaea", fontWeight: 300 }}>
                        |
                      </span>{" "}
                      5.0 <i className="fa fa-star primary-text" />
                    </h5>
                    <Link to="javascript:void(0)" className="text-grey">
                      Reportar Problema
                    </Link>
                  </div>
                  <p className="text-capitalize ps-3">
                    <span className="me-3">4/18/2024</span> Nombre de la persona
                    que comenta
                  </p>
                  <p>
                    Jhon Doe es un agente inmobiliario profesional y
                    comprometido, con un profundo conocimiento del mercado y una
                    excelente capacidad de negociación. Su enfoque transparente
                    y personalizado garantiza una experiencia fluida en la
                    compra, venta o alquiler de propiedades. Además, su dominio
                    del marketing digital maximiza la visibilidad de los
                    inmuebles, logrando resultados rápidos y eficientes. Si
                    buscas un agente confiable y efectivo, Jhon Do{" "}
                    <Link to="javascript:void(0)" className="primary-text">
                      Ver más
                    </Link>
                  </p>
                  <hr className="mt-5 mb-5" />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold">
                      Titulo del comentario{" "}
                      <span style={{ color: "#eceaea", fontWeight: 300 }}>
                        |
                      </span>{" "}
                      5.0 <i className="fa fa-star primary-text" />
                    </h5>
                    <Link to="javascript:void(0)" className="text-grey">
                      Reportar Problema
                    </Link>
                  </div>
                  <p className="text-capitalize ps-3">
                    <span className="me-3">4/18/2024</span> Nombre de la persona
                    que comenta
                  </p>
                  <p>
                    Jhon Doe es un agente inmobiliario profesional y
                    comprometido, con un profundo conocimiento del mercado y una
                    excelente capacidad de negociación. Su enfoque transparente
                    y personalizado garantiza una experiencia fluida en la
                    compra, venta o alquiler de propiedades. Además, su dominio
                    del marketing digital maximiza la visibilidad de los
                    inmuebles, logrando resultados rápidos y eficientes. Si
                    buscas un agente confiable y efectivo, Jhon Do{" "}
                    <Link to="javascript:void(0)" className="primary-text">
                      Ver más
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div
            className="modal fade"
            id="addagent_modal"
            tabIndex={-1}
            aria-labelledby="addagent_modalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <h5 className="fw-bold text-center">
                    Conéctate con tu agente en Hauzzi
                  </h5>
                  <p>
                    Al trabajar con un agente en Hauzzi, puedes contactarlo
                    fácilmente y solicitar visitas a propiedades directamente
                    desde los listados.{" "}
                  </p>
                  <p>
                    Además, tu agente podrá ofrecerte recomendaciones más
                    precisas al conocer tus búsquedas guardadas y las
                    propiedades que te interesan.
                  </p>
                  <p>
                    Al añadir un agente, Hauzzi compartirá información sobre tu
                    actividad reciente y futura en la plataforma para que tu
                    agente comprenda mejor tus necesidades y te ayude a
                    encontrar la casa ideal.
                  </p>
                </div>
                <div className="modal-footer flex-nowrap justify-content-center">
                  <button type="button" className="btn btn-primary w-50">
                    Añadir Agente
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-light w-50"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default AgentProfile;
