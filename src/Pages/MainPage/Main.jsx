import React, { Fragment, useEffect, useState } from "react";
import background from "../../assets/img/my-img/mob.png";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Loading from "../../Loading";
import serchIcon from "../../assets/img/searchIcon.png";
import apple from "../../assets/img/apple.png";
import google from "../../assets/img/google.png";
import hauzzi from "../../assets/img/hauzziIcon.png";
import blackImg from "../../assets/img/my-img/back-img.png";
import call from "../../assets/img/blackCall.png";
import mail from "../../assets/img/blackMail.png";
import link from "../../assets/img/link.png";
import twitter from "../../assets/img/twitter.png";

import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css';
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { toast } from "react-toastify";

const Main = () => {
  const [mainData, setMainData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lookingFor, setLookingFor] = useState("");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectType, setselectType] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [selectCategory, setselectCategory] = useState("");
  const [search, setSearch] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [blogsData, setBlogsData] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [compareLoaded, setCompareLoaded] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const token2 = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";

  const getMainData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/property/property?isDraft=false&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMainData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("first", mainData?.data);

  const handleLookingForChange = (e) => {
    const selectedText = e.target.options[e.target.selectedIndex].text.trim();

    const purposeMap = {
      Rent: "wantToRent",
      Sale: "wantToSell",
      Both: "bothSellRent",
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

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const selected = category.find((cat) => cat.id.toString() === catId);
    setSelectedCategoryId(catId);
    setselectType(selected?.name || "");
    setSubCategory([]);
    setSelectedSubCategoryId("");
    setselectCategory("");
    // getSubCategory(catId);
  };

  // Search get api
  const handelSearchInput = (e) => {
    setSearch(e.target.value);
  };

  // get blogs api
  const handelBlogData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/blog/getAll?limit=3`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const allBlogs = res.data?.data || [];
      setBlogsData(allBlogs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMainData();
    getCategory();
    handelBlogData();
  }, []);

  // Wishlist Api

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/property/getWishlist/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token2}` },
          }
        );

        const ids = Array.isArray(res?.data?.data)
          ? res?.data?.data.map((item) =>
              typeof item === "object" && item !== null
                ? Number(item.id)
                : Number(item)
            )
          : [];
        console.log("wishlistID", ids);

        setWishlistIds(ids);
      } catch (err) {
        setWishlistIds([]);
      } finally {
        setWishlistLoaded(true);
      }
    };

    if (customerId) fetchWishlist();
  }, [customerId]);

  const handelWishlist = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/addToWishlist/${customerId}-${id}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );

      toast.success(response.data.message);

      setWishlistIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // compair api
  useEffect(() => {
    const fetchCompareList = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/property/getCompare/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const ids = Array.isArray(res?.data?.data)
          ? res?.data?.data.map((item) =>
              typeof item === "object" && item !== null
                ? Number(item.id)
                : Number(item)
            )
          : [];

        console.log("compareIDs", ids);

        setCompareIds(ids);
      } catch (err) {
        setCompareIds([]);
      } finally {
        setCompareLoaded(true);
      }
    };

    if (customerId) fetchCompareList();
  }, [customerId]);

  const handleCompare = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/addToCompare/${customerId}-${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("first", response.data);

      toast.success(response.data.message);

      // Toggle logic
      setCompareIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
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
            <main className="main">
              <section id="hero" className="hero section slider-sec">
                <div
                  className="container"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div
                        className="hero-content"
                        data-aos="fade-up"
                        data-aos-delay={200}
                      >
                        <h1 className="mb-4">
                          {" "}
                          Tu portal inmobiliario para buscar, comparar y elegir
                          entre miles de propiedades{" "}
                        </h1>
                        <p
                          className="mb-4 mb-md-5 "
                          style={{ color: "#000000" }}
                        >
                          {" "}
                          Vive la emoción de encontrar el lugar ideal para
                          comenzar tu próxima gran historia.{" "}
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
                                  <option value={2}>Rent</option>
                                  <option value={3}>Sale</option>
                                  {/* <option value={4}>Both</option> */}
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
                              {/* <div className="query__input">
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
                              </div> */}
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
                                <Link
                                  className=""
                                  to={`/propertysell?purpose=${lookingFor}&type=${selectType}&category=${selectCategory}&search=${search}`}
                                  style={{
                                    backgroundColor: "#ffbd59",
                                    borderRadius: "15px",
                                    padding: "3px",
                                  }}
                                >
                                  <span
                                    className="search-icon-content"
                                    style={{
                                      color: "black",
                                      fontWeight: "500",
                                    }}
                                  >
                                    BUSCAR
                                  </span>{" "}
                                  {/* <img
                                  src={serchIcon}
                                    className="fa fa-search search-c slider-search"
                                    // style={{ color: "black" }}
                                  /> */}
                                  <i
                                    className="fa fa-search search-c slider-search"
                                    style={{ color: "black" }}
                                  />
                                </Link>
                              </div>
                              {/* submit button end */}
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
                            to="/propertysell"
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
                        data-aos-delay={300}
                      >
                        <img
                          src="mainBanner.jpg"
                          alt="Hero Image"
                          className="img-fluid"
                          // style={{height:0}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="services"
                className="services section light-background"
              >
                <div
                  className="container section-title aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2 style={{ fontFamily: "montserrat" }}>
                    Descubre las propiedades más buscadas
                  </h2>
                </div>

                {mainData?.data?.length > 0 ? (
                  <div className="container">
                    <div className="row gy-4">
                      {mainData?.data?.map((e) => (
                        <div className="col-xl-4 col-md-6" key={e.id}>
                          <div
                            className="feat_property"
                            style={{ height: "410px" }}
                          >
                            <Link
                              // to={`/propert-details/${e.id}`}
                              to={""}
                              state={{
                                lat: e.latitude,
                                lng: e.longitude,
                                name: e.name,
                                image: e.images[0],
                                allProducts: mainData.data,
                              }}
                            >
                              <div className="thumb">
                                {/* <img
                                  className="img-whp"
                                  src={e.images[0]}
                                  alt="property"
                                /> */}

                                <Swiper
                                  modules={[Autoplay, Pagination]}
                                  autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                  }}
                                  pagination={{ clickable: true }}
                                  loop={true}
                                  className="mySwiper"
                                >
                                  {e.images.map((img, index) => (
                                    <SwiperSlide key={index}>
                                      <img
                                        className="img-whp"
                                        src={img}
                                        alt={`property-${index}`}
                                      />
                                    </SwiperSlide>
                                  ))}
                                </Swiper>

                                <div
                                  className="thmb_cntnt"
                                  style={{ zIndex: 1 }}
                                >
                                  <ul className="tag mb0 p-0">
                                    <li className="list-inline-item">
                                      <span>{e.purpose}</span>
                                    </li>

                                    <li className="list-inline-item">
                                      <span>{e.tags}</span>
                                    </li>
                                  </ul>
                                  <ul className="icon mb0">
                                    <li className="list-inline-item">
                                      <i
                                        key={compareIds.join(",")}
                                        className="fa fa-exchange"
                                        onClick={() => handleCompare(e?.id)}
                                        style={{
                                          color: compareIds.includes(
                                            Number(e?.id)
                                          )
                                            ? "red"
                                            : "gray",
                                        }}
                                      />
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      style={{ background: "unset" }}
                                    >
                                      <i
                                        className="fa fa-heart hrt-icon"
                                        aria-hidden="true"
                                        onClick={() => handelWishlist(e?.id)}
                                        style={{
                                          color: wishlistIds.includes(e?.id)
                                            ? "red"
                                            : "",
                                        }}
                                      />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </Link>

                            <div className="details">
                              <Link
                                to={`/propert-details/${e.id}`}
                                state={{
                                  lat: e.latitude,
                                  lng: e.longitude,
                                  name: e.name,
                                  image: e.images[0],
                                  allProducts: mainData.data,
                                }}
                              >
                                <div
                                  className="tc_contentt"
                                  style={{ height: "150px" }}
                                >
                                  <div className="title-price">
                                    <h4 className="line-clamp-2">{e.name}</h4>
                                    <span className="fp_price">
                                      $
                                      {e.maxPrice
                                        ? Number(e.maxPrice).toLocaleString()
                                        : Number(
                                            e.rentalPrice
                                          ).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="line-clamp-1">
                                    <img
                                      src="img/my-img/vector.png"
                                      alt="location"
                                    />
                                    <span style={{ marginLeft: 5 }}>
                                      {e.address1}
                                    </span>
                                  </p>
                                  <ul className="prop_details mb0 p-0">
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src="img/my-img/icon.png"
                                          alt="hab"
                                        />{" "}
                                        {e?.listingDetails?.Habitaciones} Hab.
                                      </span>
                                    </li>
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src="img/my-img/Vector_1.png"
                                          alt="banos"
                                        />{" "}
                                        {e?.listingDetails?.Baños} Baños
                                      </span>
                                    </li>
                                    <li className="list-inline-item">
                                      <span>
                                        <img
                                          src="img/my-img/icon_1.png"
                                          alt="area"
                                        />{" "}
                                        {e?.propertySize || e?.maxSize} m2
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </Link>

                              <div className="fp_footer d-flex">
                                <Link
                                  to={`/propert-details/${e.id}`}
                                  state={{
                                    lat: e.latitude,
                                    lng: e.longitude,
                                    name: e.name,
                                    image: e.images[0],
                                    allProducts: mainData.data,
                                  }}
                                >
                                  <ul className="fp_meta float-left mb-0 p-0">
                                    <li
                                      className="list-inline-item d-flex justify-content-around"
                                      style={{ marginRight: "0px" }}
                                    >
                                      <span>
                                        {/* <img
                                          src={e.Customer?.userDetails.map(
                                            (item) => item.photoUrl
                                          )}
                                          // alt="poster"
                                          className="profile-pic"
                                        /> */}
                                        <img
                                          // src={
                                          //   e.Customer?.userDetails?.length > 0
                                          //     ? e.Customer.userDetails[0]
                                          //         .photoUrl
                                          //     : e.Customer?.agentDetails
                                          //         ?.length > 0
                                          //     ? e.Customer.agentDetails[0]
                                          //         .photoUrl
                                          //     : e.Customer?.agencyDetails
                                          //         ?.length > 0
                                          //     ? e.Customer.agencyDetails[0]
                                          //         .photoUrl
                                          //     : hauzzi
                                          // }
                                          src={
                                            e.Customer?.userDetails?.[0]
                                              ?.photoUrl ||
                                            e.Customer?.agentDetails?.[0]
                                              ?.photoUrl ||
                                            e.Customer?.agencyDetails?.[0]
                                              ?.photoUrl ||
                                            hauzzi
                                          }
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = hauzzi;
                                          }}
                                          alt="poster"
                                          className="profile-pic"
                                          style={{ width: "40px" }}
                                        />
                                      </span>
                                      <span
                                        className="d-flex align-items-center"
                                        style={{ marginLeft: "5px" }}
                                      >
                                        {e.Customer.name}
                                      </span>
                                    </li>
                                  </ul>
                                </Link>

                                <div className="fp_pdate float-right d-flex">
                                  <Link
                                    className="btn-getstarted gt"
                                    to="#"
                                    style={{ color: "black" }}
                                  >
                                    <img src={mail} width="25%" alt="email" />
                                    Email
                                  </Link>
                                  <Link className="btn-getstarted gt" to="#">
                                    <img src={call} width="25%" alt="call" />
                                    Llamar
                                  </Link>
                                  <Link to="#">
                                    <div className="dropdown position-relative">
                                      <button
                                        className="btn btn-link p-0 border-0 text-muted"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        <i
                                          className="bi bi-three-dots-vertical"
                                          style={{ fontSize: 24 }}
                                        />
                                      </button>

                                      <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton"
                                      >
                                        <li className="position-relative">
                                          <button
                                            className="dropdown-item"
                                            type="button"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              const dropdown =
                                                e.currentTarget
                                                  .nextElementSibling;
                                              dropdown.classList.toggle(
                                                "d-none"
                                              );
                                            }}
                                          >
                                            <img
                                              src="img/my-img/share-icon.png"
                                              className="me-2"
                                              alt="Share"
                                            />
                                            Compartir
                                          </button>

                                          <div
                                            className="share-tooltip d-none position-absolute bg-white shadow rounded p-2"
                                            style={{
                                              top: "100%",
                                              left: "0",
                                              zIndex: 1000,
                                              minWidth: "150px",
                                            }}
                                          >
                                            <div>
                                              <button
                                                className="btn btn-light btn-sm text-start mb-1"
                                                onClick={() =>
                                                  window.open(
                                                    `https://wa.me/?text=${encodeURIComponent(
                                                      window.location.href
                                                    )}`,
                                                    "_blank"
                                                  )
                                                }
                                              >
                                                <img
                                                  src="img/my-img/whatsapp.png"
                                                  width="16"
                                                />
                                                {/* WhatsApp */}
                                              </button>

                                              <button
                                                className="btn btn-light btn-sm text-start mb-1"
                                                onClick={() =>
                                                  window.open(
                                                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                      window.location.href
                                                    )}`,
                                                    "_blank"
                                                  )
                                                }
                                              >
                                                <img
                                                  src="img/my-img/facebook.png"
                                                  width="16"
                                                />
                                                {/* Facebook */}
                                              </button>

                                              <button
                                                className="btn btn-light btn-sm text-start mb-1"
                                                onClick={() =>
                                                  window.open(
                                                    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                      window.location.href
                                                    )}`,
                                                    "_blank"
                                                  )
                                                }
                                              >
                                                <img
                                                  src={twitter}
                                                  width="16"
                                                />
                                                {/* Twitter */}
                                              </button>

                                              <button
                                                className="btn btn-light btn-sm text-start"
                                                onClick={() =>
                                                  window.open(
                                                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                                      window.location.href
                                                    )}`,
                                                    "_blank"
                                                  )
                                                }
                                              >
                                                <img
                                                  src={link}
                                                  width="16"
                                                />
                                                {/* LinkedIn */}
                                              </button>
                                            </div>
                                          </div>
                                        </li>

                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <i className="bi bi-trash me-2" />{" "}
                                            Descartar
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* "Mostrar todos los inmuebles" Button */}
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <Link
                          className="btn-getstarted"
                          to="/propertysell"
                          style={{ padding: 16 }}
                        >
                          Mostrar todos los inmuebles
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="container text-center">
                    <p>No Data found</p>
                  </div>
                )}
              </section>

              <section
                id="services"
                className="services section light-background"
              >
                {/* Section Title */}
                <div
                  className="container section-title aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2 className="mb-0" style={{ fontFamily: "montserrat" }}>
                    Te acompañamos para que vendas o alquiles tu propiedad
                  </h2>
                  <h4 className="mb-4">
                    Anuncia en Hauzzi y multiplica tu visibilidad
                  </h4>
                </div>
                {/* End Section Title */}
                <div className="container">
                  <div className="row gy-4">
                    <div className="col-xl-6 col-md-6">
                      <Link to="#"></Link>
                      <div className="feat_property">
                        <Link to="#">
                          <div className="thumb">
                            <img
                              className="img-whpp"
                              src="mainPimg.png"
                              alt="fp1.jpg"
                            />
                          </div>
                        </Link>
                        <div className="details">
                          <Link to="#"></Link>
                          <div className="tc_content">
                            <Link to="#">
                              <div className="title-price">
                                <h4>Si eres profesional</h4>
                              </div>
                              <p
                                style={{
                                  fontSize: 18,
                                  marginBottom: 35,
                                  color: "#7C7C7C",
                                }}
                              >
                                Conecta con más clientes, agiliza tus
                                operaciones y destaca en el mercado inmobiliario
                              </p>
                            </Link>
                            <Link
                              className="btn-getstarted mt-0"
                              to={"/login"}
                              style={{ padding: 16, margin: 0 }}
                            >
                              Regístrate ahora{" "}
                              <i
                                className="fa fa-long-arrow-right"
                                style={{ marginLeft: 10 }}
                              />
                            </Link>
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
                      <Link to="#"></Link>
                      <div className="feat_property">
                        <Link to="#">
                          <div className="thumb">
                            <img
                              className="img-whpp"
                              src="mainPimg2.png"
                              alt="fp1.jpg"
                            />
                          </div>
                        </Link>
                        <div className="details">
                          <Link to="#"></Link>
                          <div className="tc_content">
                            <Link to="#">
                              <div className="title-price">
                                <h4>Si eres particular</h4>
                              </div>
                              <p
                                style={{
                                  fontSize: 18,
                                  marginBottom: 35,
                                  color: "#7C7C7C",
                                }}
                              >
                                Publica en Hauzzi y conecta con quienes buscan
                                tu propiedad ideal{" "}
                              </p>
                            </Link>
                            <Link
                              className="btn-getstarted mt-0"
                              to={"/login"}
                              style={{ padding: 16, margin: 0 }}
                            >
                              Publica tu inmueble gratis{" "}
                              <i
                                className="fa fa-long-arrow-right"
                                style={{ marginLeft: 10 }}
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Feature Borx*/}
                  </div>
                </div>
              </section>

              <section
                id="services"
                className="services section light-background"
              >
                {/* Section Title */}
                <div
                  className="container section-title aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2 className="mb-0" style={{ fontFamily: "montserrat" }}>
                    El espacio para aprender sobre el mercado inmobiliario
                  </h2>
                  <h4 className="mb-4" style={{ fontFamily: "montserrat" }}>
                    Consejos prácticos y guías actualizadas para tomar
                    decisiones inteligentes
                  </h4>
                </div>
                {/* End Section Title */}
                {blogsData.length > 0 ? (
                  <div className="container">
                    <div className="row gy-4">
                      {blogsData.map((blog) => (
                        <div className="col-xl-4 col-md-4" key={blog.id}>
                          <Link to={`/blog-details/${blog.slug}`}>
                            <div className="feat_property">
                              <div className="thumb">
                                <img
                                  className="img-whp"
                                  src={blog.photoUrl}
                                  alt="fp1.jpg"
                                />
                              </div>
                              <div className="details">
                                <div className="tc_content">
                                  <p className="text-thm sub-t">
                                    <span>Bienes raíces</span>
                                  </p>
                                  <div className="title-price">
                                    <h4 className="line-clamp-2">
                                      {blog.title}
                                    </h4>
                                  </div>
                                  <h5
                                    className="mt-2"
                                    style={{ color: "#FFBD59", fontSize: 18 }}
                                  >
                                    Seguir leyendo{" "}
                                    <i
                                      className="fa fa-long-arrow-right"
                                      style={{ marginLeft: 10 }}
                                    />
                                  </h5>
                                  <div
                                    className="fp_footer"
                                    style={{ border: "unset" }}
                                  >
                                    <ul className="fp_meta float-left mb0 mb-0 p-0">
                                      <li className="list-inline-item">
                                        <span to="#">
                                          <img
                                            src={hauzzi}
                                            alt="pposter1.png"
                                            className="profile-pic"
                                            style={{ width: "40px" }}
                                          />
                                          <span
                                            style={{
                                              marginLeft: 6,
                                              color: "#97989F",
                                            }}
                                          >
                                            By Hauzzi
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

                      {/* End Feature Borx*/}
                      <div
                        className="col-md-12"
                        style={{ textAlign: "center" }}
                      >
                        <Link
                          className="btn-getstarted"
                          to="/blog"
                          style={{ padding: 16 }}
                        >
                          Descubrir más
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>No Data</p>
                )}
              </section>
              <section
                id="about"
                className="about section test-t"
                style={{
                  background: `url(${background}), #F3F3F3`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "right",
                  padding: "37px 0 0 0",
                }}
              >
                <div
                  className="container aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  <div className="row gy-4 justify-content-between">
                    <div
                      className="col-xl-9 col-lg-9 aos-init aos-animate"
                      data-aos="fade-up"
                      data-aos-delay={200}
                    >
                      <h2 className="about-title">
                        Descubre propiedades a un clic con nuestra app
                        inmobiliaria
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
                              <img src="img/my-img/list1.png" width="6%" />{" "}
                              Guárdate tus inmuebles favoritos
                            </li>
                          </ul>
                        </div>
                        <div className="d-flex gap-5">
                          <div>
                            <img src={google} alt="" />
                          </div>
                          <div>
                            <img src={apple} alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-3 col-lg-3 aos-init aos-animate"
                      data-aos="fade-up"
                      data-aos-delay={300}
                    >
                      <div className="image-wrapper">
                        <div
                          className="images aos-init aos-animate image-view responsive-class"
                          data-aos="zoom-out"
                          data-aos-delay={400}
                        >
                          <img
                            src={blackImg}
                            alt="Business Meeting"
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section
                id="services"
                className="services section light-background"
              >
                {/* Section Title */}
                <div
                  className="container section-title aos-init aos-animate"
                  data-aos="fade-up"
                >
                  <h2 className="mb-0">
                    ¿Todavía tienes dudas? Encuentra lo que estás buscando
                  </h2>
                  <h4 className="mb-4">
                    Explora miles de propiedades y encuentra tu lugar ideal.
                  </h4>
                </div>
                {/* End Section Title */}
                <div className="container">
                  <div className="row gy-4">
                    <div className="col-xl-6 col-md-6">
                      <div className="instructor__item-two tg-svg d-flex justify-content-between imutable">
                        <div className="instructor__content-two">
                          <h3 className="title">
                            <Link to="#">Inmuebles en venta</Link>
                          </h3>
                          <p className="mt-3 mb-5" style={{ color: "#1A1A1A" }}>
                            Encuentra casas en venta, apartamentos, locales y
                            mucho más en Hauzzi. Utiliza nuestros filtros y
                            alertas para estar al día de todas las novedades.
                          </p>
                          <Link
                            className="btn-getstarted mt-3"
                            to={`/propertysell?purpose=wantToSell&type=&category=&search=`}
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver inmuebles a la venta{" "}
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
                      <div className="instructor__item-two tg-svg d-flex justify-content-between imutable">
                        <div className="instructor__content-two">
                          <h3 className="title">
                            <Link to="#">Inmuebles en alquiler</Link>
                          </h3>
                          <p className="mt-3 mb-5" style={{ color: "#1A1A1A" }}>
                            Descubre los mejores apartamentos en alquiler en
                            cada ciudad. Filtra por precio, número de
                            habitaciones o baños y contacta fácilmente con el
                            propietario.
                          </p>
                          <Link
                            className="btn-getstarted mt-3"
                            to={`/propertysell?purpose=wantToRent&type=&category=&search=`}
                            style={{ padding: 16, margin: 0 }}
                          >
                            Ver inmubles en alquiler{" "}
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
            </main>
            <Footer />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Main;
