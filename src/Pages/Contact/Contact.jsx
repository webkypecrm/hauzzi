import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Contact = () => {
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
                    <p className="mb-4 mb-md-5" style={{ color: "#000" }}>
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
                          {/* single input */}
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
                          {/* single input end */}
                          {/* single input */}
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
                          {/* single input end */}
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
                              className="search-txt small-placeholder"
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
                    <div className="contentslider" style={{ fontWeight: 700 }}>
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
                      src="contact2.jpg"
                      alt="Hero Image"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features-cards" className="features-cards section">
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2 className="mb-0">Contactos</h2>
              <h4 className="mb-4">
                ¿Quiere colaborar con contenidos para el blog, contratar
                publicidad o ponerse en contacto con nuestros portavoces?
              </h4>
            </div>
            <div className="container">
              <div className="row gy-4">
                <div
                  className="col-xl-3 col-md-6 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={100}
                >
                  <div className="feature-box orange text-center cont-border">
                    <span className="con-b">
                      <img src="img/my-img/c1.png" width="30%" />
                    </span>
                    <h4 style={{ fontSize: 17 }} className="mt-4">
                      CONTENIDOS DEL BLOG PROFESIONAL
                    </h4>
                    <p className="mb-4 cont12">
                      Si quieres colaborar como experto en el blog profesional
                      de Hauzzi o quieres enviarnos tus notas de prensa para que
                      las publiquemos, contacta en
                    </p>
                    <p className="email-v">comunicacion@hauzzi.com</p>
                  </div>
                </div>
                {/* End Feature Borx*/}
                <div
                  className="col-xl-3 col-md-6 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={200}
                >
                  <div className="feature-box blue text-center cont-border">
                    <span className="con-b">
                      <img src="img/my-img/c2.png" width="30%" />
                    </span>
                    <h4 style={{ fontSize: 17 }} className="mt-4">
                      CONTRATACIÓN DE CAMPAÑAS PUBLICITARIAS
                    </h4>
                    <p className="mb-4 cont12">
                      Si desea contratar campañas de publicidad en Hauzzi
                      contacte con nuestros asesores comerciales en
                    </p>
                    <p className="email-v">publicidad@hauzzi.com</p>
                  </div>
                </div>
                {/* End Feature Borx*/}
                <div
                  className="col-xl-3 col-md-6 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={300}
                >
                  <div className="feature-box green text-center cont-border">
                    <span className="con-b">
                      <img src="img/my-img/c3.png" width="30%" />
                    </span>
                    <span>
                      <img
                        src="img/my-img/utube.png"
                        style={{
                          position: "relative",
                          left: "-22%",
                          top: "-6%",
                        }}
                      />
                    </span>
                    <h4 style={{ fontSize: 17 }} className="mt-4">
                      MEDIOS DE COMUNICACIÓN
                    </h4>
                    <p className="mb-4 cont12">
                      Si es periodista y desea hablar con nuestro departamento
                      de comunicación, póngase en contacto con nosotros en
                    </p>
                    <p className="email-v">comunicacion@hauzzi.com</p>
                  </div>
                </div>
                {/* End Feature Borx*/}
                <div
                  className="col-xl-3 col-md-6 aos-init aos-animate"
                  data-aos="zoom-in"
                  data-aos-delay={400}
                >
                  <div className="feature-box red text-center cont-border ">
                    <span className="con-b">
                      <img src="img/my-img/c4.png" width="30%" />
                    </span>
                    <h4 style={{ fontSize: 17 }} className="mt-4">
                      OTROS ASUNTOS
                    </h4>
                    <p className="mb-4 cont12">
                      Si nada de lo anterior satisface su petición, no dude en
                      ponerse en contacto con nosotros a través de
                    </p>
                    <p className="email-v v12">info@hauzzi.com</p>
                  </div>
                </div>
                {/* End Feature Borx*/}
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
