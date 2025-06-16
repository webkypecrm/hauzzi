import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";

const Blog = () => {
  const [blogsData4, setBlogsData4] = useState([]);
  const [blogsData5, setBlogsData5] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lookingFor, setLookingFor] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectType, setselectType] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [selectCategory, setselectCategory] = useState("");
  const [search, setSearch] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";

  // get all blog
  const handelBlogData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/blog/getAll?limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allBlogs = res.data?.data || [];
      setBlogsData4(allBlogs.slice(0, 4));
      setBlogsData5(allBlogs.slice(4, 9));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("blogdata", blogsData4);

  // filters api
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
    handelBlogData();
    getCategory();
  }, []);

  // Search get api

  const handelSearchInput = (e) => {
    setSearch(e.target.value);
  };
  return (
    <Fragment>
      <div className="index-page">
        {loading ? (
          <div style={{ marginTop: "20%" }}>
            <Loading />
          </div>
        ) : (
          <Fragment>
            <Header />
            <div className="main">
              <section id="hero" className="hero section slider-sec">
                <div
                  className="container"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div
                        className="hero-content"
                        data-aos="fade-up"
                        data-aos-delay="200"
                      >
                        <h1 className="mb-4">
                          {" "}
                          Tu aliado inmobiliario para buscar, comparar y elegir
                          el inmueble perfecto{" "}
                        </h1>
                        <p
                          className="mb-4 mb-md-5 "
                          style={{ color: "#000000" }}
                        >
                          {" "}
                          Somos más que una plataforma, somos el puente que
                          conecta personas, propiedades y oportunidades.{" "}
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
                              {/* <!-- submit button --> */}
                              <div className="search">
                                <input
                                  className="search-txt small-placeholder"
                                  type="text"
                                  name=""
                                  placeholder="Busca por dirección, ciudad o código postal"
                                  onChange={handelSearchInput}
                                  value={search}
                                />
                                <Link
                                  className=""
                                  to={`/propertysell?purpose=${lookingFor}&type=${selectType}&category=${selectCategory}&search=${search}`}
                                >
                                  <span className="search-icon-content">
                                    Buscar
                                  </span>{" "}
                                  <i
                                    className="fa fa-search search-c slider-search"
                                    style={{ color: " #FFBD59 " }}
                                  ></i>
                                </Link>
                              </div>
                              {/* <!-- submit button end --> */}
                            </div>
                          </form>
                        </div>
                        <div
                          className="contentslider"
                          style={{ fontWeight: 700 }}
                        >
                          {" "}
                          ¿Necesita más opciones de búsqueda?{" "}
                          <Link
                            to="#"
                            className="btn btn-primary me-0 me-sm-2 mx-1"
                          >
                            Búsqueda avanzada
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div
                        className="hero-image"
                        data-aos="zoom-out"
                        data-aos-delay="300"
                      >
                        <img
                          src="blog.jpg"
                          alt="Hero Image"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <div id="services" className="services section light-background">
                {/* <!-- Section Title --> */}
                <div
                  className="container section-title aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2>Blog </h2>
                </div>
                {/* <!-- End Section Title --> */}
                <div className="container">
                  <div className="row gy-4">
                    {blogsData4?.length > 0 && (
                      <div className="col-md-8">
                        <div className="row">
                          {blogsData4.map((blog) => (
                            <div className="col-xl-6 col-md-6" key={blog.id}>
                              <Link to="#">
                                <div className="feat_property">
                                  <div className="thumb">
                                    {blog.photoUrl && (
                                      <img
                                        src={blog.photoUrl}
                                        alt="Blog Image"
                                        className="img-whp"
                                      />
                                    )}
                                  </div>
                                  <div className="details">
                                    <div className="tc_content">
                                      <p className="text-thm sub-t">
                                        <span>Bienes raíces</span>
                                      </p>
                                      <div className="title-price">
                                        <h4>{blog.title}</h4>
                                      </div>
                                      <h5
                                        className="mt-2"
                                        style={{
                                          color: "#FFBD59",
                                          fontSize: "18px",
                                        }}
                                      >
                                        Seguir leyendo{" "}
                                        <i
                                          className="fa fa-long-arrow-right"
                                          style={{ marginLeft: "10px" }}
                                        ></i>
                                      </h5>
                                      <div
                                        className="fp_footer"
                                        style={{ border: "unset" }}
                                      >
                                        <ul className="fp_meta float-left mb0 mb-0 p-0">
                                          <li className="list-inline-item">
                                            <span to="#">
                                              <img
                                                src="img/my-img/Image.png"
                                                alt="pposter1.png"
                                                width="30%"
                                              />{" "}
                                              <span
                                                style={{
                                                  marginLeft: "6px",
                                                  color: "#97989F",
                                                }}
                                              >
                                                Tracey Wilson
                                              </span>
                                            </span>
                                          </li>
                                        </ul>
                                        <div className="fp_pdate float-right">
                                          {new Date(
                                            blog.createdAt
                                          ).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          ))}
                          {/* <!-- End Feature Borx--> */}
                          <div className="col-md-12">
                            <div className="text-center">
                              <button
                                type="button"
                                className="btn"
                                style={{ border: "1px solid #7c7c7c" }}
                              >
                                Leer más
                              </button>
                            </div>
                          </div>
                          {/* <!-- End Feature Borx--> */}
                        </div>
                      </div>
                    )}
                    {blogsData5?.length > 0 && (
                      <div className="col-md-4">
                        <h4 className="mb-3">Post populares</h4>
                        <div className="row">
                          {blogsData5.map((e) => (
                            <Fragment>
                              <div className="col-md-4">
                                <div className="img-v">
                                  <img
                                    // src="img/my-img/blog1.png"
                                    src={e.photoUrl}
                                    alt=""
                                    width="100%"
                                    height="65px"
                                    
                                    style={{borderRadius:"5px"}}
                                  />
                                </div>
                              </div>
                              <div className="col-md-8 p-0">
                                <div className="text-v1">
                                  <p>
                                    {e.title}
                                  </p>
                                  <div className="mt-3">
                                    <div
                                      className="fp_footer"
                                      style={{ border: "unset" }}
                                    >
                                      <ul className="fp_meta float-left mb0 mb-0 p-0">
                                        <li className="list-inline-item">
                                          <span to="#">
                                            <img
                                              src="img/my-img/Image.png"
                                              alt="pposter1.png"
                                              width="20%"
                                            />{" "}
                                            <span
                                              style={{
                                                marginLeft: "6px",
                                                color: "#97989F",
                                              }}
                                            >
                                              Tracey Wilson
                                            </span>
                                          </span>
                                        </li>
                                      </ul>
                                      <div
                                        className="fp_pdate float-right"
                                        style={{
                                          fontSize: "14px",
                                          color: "#97989F",
                                        }}
                                      >
                                        {new Date(
                                            e.createdAt
                                          ).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                          })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Blog;
