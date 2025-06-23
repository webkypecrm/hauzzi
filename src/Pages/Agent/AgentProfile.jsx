import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import AgentMap from "./AgentMap";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import crown from "../../assets/img/my-img/crown.png";
import start from "../../assets/img/my-img/start-small.png";
import heart from "../../assets/img/my-img/heart.png";
import global from "../../assets/img/my-img/global.png";
import facebook from "../../assets/img/my-img/facebook.png";
import insta from "../../assets/img/my-img/Instagram.png";
import youtube from "../../assets/img/my-img/Youtube.png";
import call from "../../assets/img/my-img/call12.png";
import whats from "../../assets/img/my-img/whatsapp.png";
import sms from "../../assets/img/my-img/sms.svg";
import location from "../../assets/img/my-img/vector.png";
import hab from "../../assets/img/my-img/icon.png";
import bath from "../../assets/img/my-img/Vector_1.png";
import area from "../../assets/img/my-img/icon_1.png";
import mail from "../../assets/img/my-img/vector_2.png";
import call2 from "../../assets/img/my-img/call.png";
import img1 from "../../assets/img/my-img/discovery.png";
import img2 from "../../assets/img/my-img/agent-rent-img.jpeg";
import icon1 from "../../assets/img/my-img/ellipse.png";
import { toast } from "react-toastify";

const AgentProfile = () => {
  // const toShareSlides = [
  //   {
  //     image: img1,
  //     title: "Eaton Garth Penthouse",
  //     price: "$180,000",
  //     address: "7722 18th Ave, Brooklyn",
  //     bedrooms: "4 Hab.",
  //     bathrooms: "2 Baños",
  //     size: "450 m2",
  //     author: "Vectoria smith",
  //     avatar: icon1,
  //   },
  //   {
  //     image: img2,
  //     title: "Diamond Manor Apartment",
  //     price: "$259,000",
  //     address: "7802 20th Ave, Brooklyn",
  //     bedrooms: "4 Hab.",
  //     bathrooms: "2 Baños",
  //     size: "500 m2",
  //     author: "Jhon-smith",
  //     avatar: icon1,
  //   },
  //   {
  //     image: img1,
  //     title: "Eaton Garth Penthouse",
  //     price: "$180,000",
  //     address: "7722 18th Ave, Brooklyn",
  //     bedrooms: "4 Hab.",
  //     bathrooms: "2 Baños",
  //     size: "450 m2",
  //     author: "Vectoria smith",
  //     avatar: icon1,
  //   },
  //   {
  //     image: img2,
  //     title: "Diamond Manor Apartment",
  //     price: "$259,000",
  //     address: "7802 20th Ave, Brooklyn",
  //     bedrooms: "4 Hab.",
  //     bathrooms: "2 Baños",
  //     size: "500 m2",
  //     author: "Jhon-smith",
  //     avatar: icon1,
  //   },
  // ];
  // agent profile data GET
  const [agentData, setAgentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editorData, setEditorData] = useState("");
  const [rentProperty, setRentProperty] = useState([]);
  const [sellProperty, setSellProperty] = useState([]);
  const [value, setValue] = useState();
  const [count1, setCount1] = useState();
  const [count2, setCount2] = useState();
  const [followedAgentIds, setFollowedAgentIds] = useState([]);
  const [agentListLoaded, setAgentListLoaded] = useState(false);

  const customerId = localStorage.getItem("tokenId") || "";
  const token = localStorage.getItem("token");
  const token2 = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // Get All Property
  const getAgentData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/profile/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgentData(res.data?.data || {});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get Sell Property

  const getSellProperty = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/property/property?isDraft=false&purpose=Vender&customerId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      setSellProperty(res.data?.data || []);
      setCount1(res?.data?.totalcount);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Rent Property

  const getRentProperty = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/property/property?isDraft=false&purpose=Alquilar&customerId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      setRentProperty(res.data?.data || []);
      setCount2(res?.data?.totalcount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAgentData();
    getSellProperty();
    getRentProperty();
  }, []);

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);

  // --------Review Apis----------
  // post review
  const initialState = {
    customerId: id,
    reviewerId: customerId,
    content: "",
    rating: "",
    title: "",
  };

  const [reviewData, setReviewData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setReviewData({ ...reviewData, rating: newValue });
  };

  // const handelReviewSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`${apiUrl}/profile-review/addReview`, reviewData, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setReviewData(initialState);
  //     console.log("response", res);
  //     toast.success(res.data.message);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  const handelReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/profile-review/addReview`,
        {
          ...reviewData,
          rating: reviewData.rating.toString(),
          content: editorData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviewData(initialState);
      setEditorData("");
      setShowPopup(false);
      toast.success(res?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.res?.data?.message);
    }
  };

  // GET review
  const [getReviewData, setGetReviewData] = useState([]);
  const [countReview, setCountReview] = useState();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState(null);

  const getReview = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/profile-review/getReviewBycustomerId/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      setGetReviewData(res.data?.data || []);
      setCountReview(res?.data?.totalCount);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleContent = (index) => {
    setExpandedReviewIndex(index === expandedReviewIndex ? null : index);
  };

  const visibleReviews = showAllReviews
    ? getReviewData
    : getReviewData.slice(0, 2);

  useEffect(() => {
    getReview();
  }, []);

  // add My agent
  useEffect(() => {
    const fetchFollowedAgents = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/profile/savedAgent/${customerId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res?.data?.data;
        const ids = Array.isArray(data)
          ? data.map((item) =>
              typeof item === "object" && item !== null
                ? Number(item.id)
                : Number(item)
            )
          : [];

        console.log("Followed Agent IDs", ids);
        setFollowedAgentIds(ids);
      } catch (err) {
        setFollowedAgentIds([]);
      } finally {
        setAgentListLoaded(true);
      }
    };

    if (customerId) fetchFollowedAgents();
  }, [customerId]);

  const handleAddAgent = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/profile/addAgent/${customerId}-${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setFollowedAgentIds((prev) =>
        prev.includes(id)
          ? prev.filter((agentId) => agentId !== Number(id))
          : [...prev, id]
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
            <div className="main">
              <section className="top-btn12">
                <div className="container">
                  {agentData?.property?.length > 0 && (
                    <div className="row mb-5">
                      <div className="col-xl-2 col-lg-2 col-md-2 align-content-center">
                        <div
                          className="agent-img"
                          style={{ width: "150px", height: "150px" }}
                        >
                          <img
                            src={agentData?.userDetails?.map(
                              (item) => item.photoUrl
                            )}
                            alt=""
                          />
                          <small className="toprated">
                            <img src={crown} />
                            Top Rated
                          </small>
                        </div>
                        <div className="agent-profile">
                          <ul className="list-inline">
                            <li>
                              <b>{agentData?.name}</b>
                            </li>
                            <li>
                              <img src={start} /> <span>( 112 ) Reseñas</span>
                            </li>
                            <li>
                              <img src={heart} />{" "}
                              <span>Añadir a favoritos</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xl-10 col-lg-10 col-md-10">
                        {/* Section Title */}
                        <div className="section-title text-start">
                          <h2 className="mb-0">Recientes</h2>
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
                            {agentData?.property?.map((e) => (
                              <SwiperSlide key={e.id}>
                                <Link to="javascript:void(0)">
                                  <div className="feat_property">
                                    <div className="thumb">
                                      <img
                                        className="img-whp"
                                        src={e.images[0]}
                                        alt="fp1"
                                      />
                                      <div className="thmb_cntnt">
                                        <ul className="tag mb-0 p-0">
                                          <li className="list-inline-item">
                                            <span>{e.purpose}</span>
                                          </li>
                                          <li className="list-inline-item">
                                            <span>{e.type}</span>
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
                                          <h4>{e.name}</h4>
                                          <span className="fp_price">
                                            {/* ${e.maxPrice} */}$
                                            {e.maxPrice
                                              ? e.maxPrice
                                              : e.rentalPrice}
                                          </span>
                                        </div>
                                        <p>
                                          <img src={location} alt="" />
                                          <span style={{ marginLeft: "5px" }}>
                                            {e.address1}
                                          </span>
                                        </p>
                                        <ul className="prop_details mb0 p-0">
                                          <li className="list-inline-item">
                                            <span>
                                              <img src={hab} alt="" />{" "}
                                              {e?.listingDetails?.Habitaciones}{" "}
                                              Hab.
                                            </span>
                                          </li>{" "}
                                          <li className="list-inline-item">
                                            <span>
                                              <img src={bath} alt="" />{" "}
                                              {e?.listingDetails?.Baños} Baños
                                            </span>
                                          </li>
                                          <li className="list-inline-item">
                                            <span>
                                              <img src={area} alt="" />{" "}
                                              {e?.propertySize || e?.maxSize} m2
                                            </span>
                                          </li>
                                        </ul>
                                        {/* <p>
                                        <i className="bi bi-circle-fill"></i>{" "}
                                        <b>Vendido</b>
                                        &nbsp; hace 6 días
                                      </p> */}
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
                  )}

                  <div className="row mb-3">
                    <div className="col-md-7">
                      <h4 className="fw-bold">Sobre {agentData?.name}</h4>
                      <p className="m-0">
                        {agentData?.userDetails?.map((item) => item.notes)}
                      </p>
                      <h5 className="fw-bold mt-3">Especialidades</h5>
                      <ul className="list-inline speciality_sec ">
                        {agentData?.userDetails?.[0]?.specialities?.map(
                          (item, id) => (
                            <li key={id}> {item}</li>
                          )
                        )}
                        {/* <li>Galpones</li>
                        <li>Administración de fincas</li> */}
                      </ul>
                      <h5 className="fw-bold">Idiomas</h5>
                      <ul className="list-inline language_sec">
                        <li>Español</li>
                        <li>Ingles</li>
                        <li>Italiano</li>
                      </ul>
                      <Link to="javascript:void(0)" className="primary-text">
                        <img src={global} style={{ width: 20 }} /> Visitar la
                        página web del agente
                      </Link>
                      <ul className="list-inline socailicon_sec">
                        <li>
                          <Link
                            to={agentData?.userDetails?.[0]?.facebook}
                            target="_blank"
                          >
                            <img src={facebook} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={agentData?.userDetails?.[0]?.instagram}
                            target="_blank"
                          >
                            <img src={insta} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={agentData?.userDetails?.[0]?.youtube}
                            target="_blank"
                          >
                            <img src={youtube} />
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
                        {/* <li>
                          <i className="bi bi-circle-fill" /> Compartir
                        </li> */}
                      </ul>
                      <div className="map_sec">
                        <AgentMap />
                        <p className="mt-1">
                          Este mapa puede mostrar los listados recientes{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className=" mb-4">
                        {agentData?.userDetails?.map((item, index) => (
                          <div key={index}>
                            <div className="sidebar-det position-relative">
                              <div className="side-c text-center">
                                <img src={item.photoUrl} className="img-r" />
                                <div
                                  className="side-design text-center"
                                  style={{ marginTop: "15px" }}
                                >
                                  {/* <div className="agent_details"> */}
                                  <h6>{agentData?.name}</h6>
                                  <p style={{ fontSize: 13 }}>
                                    <span className="primary-text">03</span>{" "}
                                    listados de inmuebles
                                  </p>
                                  {/* </div> */}
                                </div>
                              </div>
                            </div>
                            {/* <div className="card-de">
                              <p className="de-i"></p>
                              <div
                                className="pr-det"
                                style={{ marginTop: "10%", }}
                              >
                                <p style={{ marginLeft: "-22px" }}>
                                  <img
                                    src={call}
                                    style={{ width: 18, marginRight: 9 }}
                                  />
                                  Teléfono
                                </p>
                                <p>
                                  <b>{item.phone}</b>
                                </p>
                              </div>
                              <div className="pr-det">
                                <p className="de-i"></p>
                                <p className="">
                                  <img src={whats} style={{ width: 18 }} />
                                  Whatsapp
                                </p>
                           
                                <p className="col-lg-6 col-md-6 text-start">
                                  <b>{item.whatsApp}</b>
                                </p>
                              </div>
                              <div className="row mb-3 align-items-center justify-content-center">
                                <div className="col-auto text-warning">
                                  <img src={sms} style={{ width: 18 }} />
                                </div>
                                <div className="col-lg-3 col-md-3">Correo</div>
                                <div className="col-lg-6 col-md-6 text-start">
                                  {agentData.email}
                                </div>
                              </div>
                              <div className="row align-items-center justify-content-center">
                                <div className="col-auto text-warning">
                                  <img src={global} style={{ width: 18 }} />
                                </div>
                                <div className="col-lg-3 col-md-3">
                                  Página web
                                </div>
                                <div className="col-lg-6 col-md-6 text-start">
                                  {item.website}
                                </div>
                              </div>
                            </div> */}
                            <div className="card-de" key={item.id}>
                              <div
                                className="pr-det"
                                style={{ marginTop: "10%" }}
                              >
                                <p className="de-i"></p>
                                <p style={{ marginLeft: "-22px" }}>
                                  <img
                                    src={call}
                                    style={{ width: 18, marginRight: 9 }}
                                  />
                                  Teléfono
                                </p>
                                <p>
                                  <b>{item.phone}</b>
                                </p>
                                <p />
                              </div>
                              <div className="pr-det">
                                <p className="de-i"></p>
                                <p>
                                  <img
                                    src={sms}
                                    style={{ width: 18, marginRight: 9 }}
                                  />
                                  Correo
                                </p>
                                <p>
                                  <b>{agentData.email}</b>
                                </p>
                                <p />
                              </div>
                              <div className="pr-det">
                                <p className="de-i"></p>
                                <p style={{ marginLeft: 10 }}>
                                  <img
                                    src={global}
                                    style={{ width: 18, marginRight: 9 }}
                                  />
                                  Página web
                                </p>
                                <p>
                                  <b>{item.website}</b>
                                </p>
                                <p />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="form-box p-3">
                        <h5 className="text-center mb-3">
                          Contacta con el {agentData?.name}
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

                  {sellProperty?.length > 0 && (
                    <div className="row mb-3">
                      <div className="col-lg-7 col-md-7">
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold">Para Venta ( {count1} )</h5>
                          <Link
                            to={`/propertysell?purpose=Vender&customerId=${id}`}
                            className="primary-text"
                          >
                            Ver Todos
                          </Link>
                        </div>
                        <div className="swiper-container" id="salecarousel">
                          <Swiper
                            modules={[Navigation, Autoplay]}
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                            }}
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
                            {sellProperty.map((property, index) => (
                              <SwiperSlide key={index}>
                                <div className="feat_property">
                                  <div className="thumb">
                                    <img
                                      className="img-whp"
                                      src={property.images[0]}
                                      alt="fp1.jpg"
                                    />
                                    <div className="thmb_cntnt">
                                      <ul className="tag mb-0 p-0">
                                        <li className="list-inline-item">
                                          <span>{property.purpose}</span>
                                        </li>
                                        <li className="list-inline-item">
                                          <span>{property.type}</span>
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
                                        <h4>{property.name}</h4>
                                        <span className="fp_price">
                                          $
                                          {property.maxPrice
                                            ? property.maxPrice
                                            : property.rentalPrice}
                                        </span>
                                      </div>
                                      <p>
                                        <img src={location} alt="location" />
                                        <span style={{ marginLeft: 5 }}>
                                          {property.address1}
                                        </span>
                                      </p>
                                      <ul className="prop_details mb-0 p-0">
                                        <li className="list-inline-item">
                                          <span>
                                            <img src={hab} alt="" />{" "}
                                            {
                                              property?.listingDetails
                                                ?.Habitaciones
                                            }{" "}
                                            Hab.{" "}
                                          </span>
                                        </li>{" "}
                                        <li className="list-inline-item">
                                          <span>
                                            <img src={bath} alt="" />{" "}
                                            {property?.listingDetails?.Baños}{" "}
                                            Baños{" "}
                                          </span>
                                        </li>
                                        <li className="list-inline-item">
                                          <span>
                                            <img src={area} alt="" />{" "}
                                            {property?.propertySize ||
                                              property?.maxSize}{" "}
                                            m2{" "}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="fp_footer d-flex">
                                      <Link to="#">
                                        <ul className="fp_meta float-left mb-0 p-0">
                                          <li className="list-inline-item d-flex justify-content-around">
                                            <span>
                                              <img
                                                src={property?.Customer?.agentDetails?.map(
                                                  (e) => e.photoUrl
                                                )}
                                                alt="agent"
                                                className="profile-pic"
                                              />
                                              {property?.Customer?.name}
                                            </span>
                                          </li>
                                        </ul>
                                      </Link>
                                      <div className="fp_pdate float-right d-flex">
                                        <Link
                                          className="btn-getstarted gt"
                                          to="#"
                                          state={{}}
                                        >
                                          <img
                                            src={mail}
                                            width="25%"
                                            alt="email"
                                          />
                                          Email
                                        </Link>
                                        <Link
                                          className="btn-getstarted gt"
                                          to="#"
                                        >
                                          <img
                                            src={call2}
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
                              // type="submit"
                              className="btn btn-primary ps-4 pe-4 w-100 text-capitalize"
                              data-bs-toggle="modal"
                              data-bs-target="#addagent_modal"
                            >
                              {/* {followedAgentIds.includes(agent.id) ? "Unfollow" : "Follow"} */}
                              Añadir como mi agente
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {rentProperty?.length > 0 && (
                    <div className="row mb-3">
                      <div className="col-lg-7 col-md-7">
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-bold">
                            Para Alquilar ( {count2} )
                          </h5>
                          <Link
                            to={`/propertysell?purpose=Alquilar&customerId=${id}`}
                            className="primary-text"
                          >
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
                            {rentProperty.map((prop, idx) => (
                              <SwiperSlide key={idx}>
                                <div className="feat_property">
                                  <div className="thumb">
                                    <img
                                      className="img-whp"
                                      src={prop.images[0]}
                                      alt="fp1.jpg"
                                    />
                                    <div className="thmb_cntnt">
                                      <ul className="tag mb-0 p-0">
                                        <li className="list-inline-item">
                                          <span>{prop.purpose}</span>
                                        </li>
                                        <li className="list-inline-item">
                                          <span>{prop.type}</span>
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
                                        <h4>{prop.name}</h4>
                                        <span className="fp_price">
                                          $
                                          {prop.maxPrice
                                            ? prop.maxPrice
                                            : prop.rentalPrice}
                                        </span>
                                      </div>
                                      <p>
                                        <img src={location} alt="vector" />
                                        <span style={{ marginLeft: 5 }}>
                                          {prop.address1}
                                        </span>
                                      </p>
                                      <ul className="prop_details mb-0 p-0">
                                        <li className="list-inline-item">
                                          <span>
                                            <img src={hab} alt="hab" />{" "}
                                            {prop?.listingDetails?.Habitaciones}{" "}
                                            Hab.
                                          </span>
                                        </li>{" "}
                                        <li className="list-inline-item">
                                          <span>
                                            <img src={bath} alt="baños" />{" "}
                                            {prop?.listingDetails?.Baños} Baños
                                          </span>
                                        </li>
                                        <li className="list-inline-item">
                                          <span>
                                            <img src={area} alt="size" />{" "}
                                            {prop?.propertySize ||
                                              prop?.maxSize}{" "}
                                            m2
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
                                                src={prop?.Customer?.agentDetails?.map(
                                                  (e) => e.photoUrl
                                                )}
                                                alt="poster"
                                                className="profile-pic"
                                              />
                                              {prop?.Customer?.name}
                                            </span>
                                          </li>
                                        </ul>
                                      </Link>
                                      <div className="fp_pdate float-right d-flex">
                                        <Link
                                          className="btn-getstarted gt"
                                          to="#"
                                        >
                                          <img
                                            src={mail}
                                            width="25%"
                                            alt="email"
                                          />
                                          Email
                                        </Link>
                                        <Link
                                          className="btn-getstarted gt"
                                          to="#"
                                        >
                                          <img
                                            src={call2}
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
                  )}

                  {/* <div className="row mb-3">
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
                                      <span className="fp_price">
                                        {item.price}
                                      </span>
                                    </div>
                                    <p>
                                      <img
                                        src={location}
                                        alt="location"
                                      />
                                      <span style={{ marginLeft: 5 }}>
                                        {item.address}
                                      </span>
                                    </p>
                                    <ul className="prop_details mb-0 p-0">
                                      <li className="list-inline-item">
                                        <span>
                                          <img
                                            src={hab}
                                            alt=""
                                          />{" "}
                                          {item.bedrooms}
                                        </span>
                                      </li>{" "}
                                      <li className="list-inline-item">
                                        <span>
                                          <img
                                            src={bath}
                                            alt=""
                                          />{" "}
                                          {item.bathrooms}
                                        </span>
                                      </li>
                                      <li className="list-inline-item">
                                        <span>
                                          <img
                                            src={area}
                                            alt=""
                                          />{" "}
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
                                      <Link
                                        className="btn-getstarted gt"
                                        to="#"
                                      >
                                        <img
                                          src={mail}
                                          width="25%"
                                          alt="email"
                                        />
                                        Email
                                      </Link>
                                      <Link
                                        className="btn-getstarted gt"
                                        to="#"
                                      >
                                        <img
                                          src={call2}
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
                  </div> */}

                  <div className="row">
                    <div className="col-lg-7 col-md-7">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold">Reseñas ({countReview})</h5>
                        <Link
                          to="javascript:void(0)"
                          className="reviewbtn btn"
                          onClick={() => setShowPopup(true)}
                        >
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
                              <option>Todas las reseñas</option>
                              <option value={1}>One</option>
                              <option value={2}>Two</option>
                              <option value={3}>Three</option>
                              <option value={4}>Four</option>
                            </select>
                          </div>
                          {/* <div className="col-xl-6 col-lg-6 col-md-6">
                            <label className="mb-1">Odernar por</label>
                            <select
                              className="form-select form-select-lg"
                              aria-label=".form-select-lg example"
                            >
                              <option>Nuevas reseñas</option>
                              <option value={1}>One</option>
                              <option value={2}>Two</option>
                              <option value={3}>Three</option>
                            </select>
                          </div> */}
                        </div>
                      </form>
                      {/* {getReviewData.map((item, index) => (
                        <Fragment key={index}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fw-bold">
                          {item.title}{" "}
                          <span style={{ color: "#eceaea", fontWeight: 300 }}>
                            |
                          </span>{" "}
                          {item.rating} <i className="fa fa-star primary-text" />
                        </h5>
                        <Link to="javascript:void(0)" className="text-grey">
                          Reportar Problema
                        </Link>
                      </div>
                      <p className="text-capitalize ps-3">
                        <span className="me-3">{new Date(item.createdAt).toLocaleDateString("en-US")}</span> {item?.reviewer?.customer?.name}
                      </p>
                      <p
                        className={`agent-description ${
                          expanded ? "expanded" : ""
                        }`}
                      >
                        {item.content}{" "}
                      </p>
                      
                      <Link
                        to="#"
                        className="primary-text"
                        onClick={handleToggle}
                      >
                        {expanded ? "Ver menos" : "Ver más"}
                      </Link>

                      <hr className="mt-5 mb-5" />
                       </Fragment>
                       ))} */}
                      {visibleReviews.map((item, index) => (
                        <Fragment key={index}>
                          <div className="d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold">
                              {item.title}{" "}
                              <span
                                style={{ color: "#eceaea", fontWeight: 300 }}
                              >
                                |
                              </span>{" "}
                              {item.rating}{" "}
                              <i className="fa fa-star primary-text" />
                            </h5>
                            <Link to="#" className="text-grey">
                              Reportar Problema
                            </Link>
                          </div>
                          <p className="text-capitalize ps-3">
                            <span className="me-3">
                              {new Date(item.createdAt).toLocaleDateString(
                                "en-US"
                              )}
                            </span>{" "}
                            {item?.reviewer?.customer?.name}
                          </p>
                          <p
                            className={`agent-description ${
                              expandedReviewIndex === index ? "expanded" : ""
                            }`}
                          >
                            {item.content}
                          </p>
                          <Link
                            to="#"
                            className="primary-text"
                            onClick={() => handleToggleContent(index)}
                          >
                            {expandedReviewIndex === index
                              ? "Ver menos"
                              : "Ver más"}
                          </Link>
                          <hr className="mt-5 mb-5" />
                        </Fragment>
                      ))}

                      {getReviewData.length > 2 && (
                        <div className="text-center mt-3">
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => setShowAllReviews(!showAllReviews)}
                          >
                            {showAllReviews ? "Leer menos" : "Ver más"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* Add Agent Modal */}
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
                        fácilmente y solicitar visitas a propiedades
                        directamente desde los listados.{" "}
                      </p>
                      <p>
                        Además, tu agente podrá ofrecerte recomendaciones más
                        precisas al conocer tus búsquedas guardadas y las
                        propiedades que te interesan.
                      </p>
                      <p>
                        Al añadir un agente, Hauzzi compartirá información sobre
                        tu actividad reciente y futura en la plataforma para que
                        tu agente comprenda mejor tus necesidades y te ayude a
                        encontrar la casa ideal.
                      </p>
                    </div>
                    <div className="modal-footer flex-nowrap justify-content-center">
                      {/* <button
                        type="button"
                        className="btn btn-primary w-50"
                        aria-label="Close"
                        data-bs-dismiss="modal"
                        onClick={() => handleAddAgent(id)}
                      >
                        {followedAgentIds.includes(id)
                          ? "Agregada"
                          : "Añadir Agente"}
                      </button> */}
                      {agentListLoaded && (
                        <button
                          type="button"
                          className="btn btn-primary w-50"
                          aria-label="Close"
                          data-bs-dismiss="modal"
                          onClick={handleAddAgent}
                        >
                          {followedAgentIds.includes(Number(id))
                            ? "Agregada"
                            : "Añadir Agente"}
                        </button>
                      )}
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

              {/*Add Review MODAL */}
              {showPopup && (
                <div
                  className="popup-overlay"
                  onClick={() => setShowPopup(false)}
                >
                  <div
                    className="popup-contentt"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4>Escribir reseña</h4>
                    <form onSubmit={handelReviewSubmit}>
                      <div>
                        <Box>
                          <Typography component="legend">Rating</Typography>
                          <Rating
                            name="simple-controlled"
                            value={reviewData.rating}
                            onChange={handleRatingChange}
                          />
                        </Box>
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Title</label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            name="title"
                            value={reviewData.title}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Review Content</label>
                        <SimpleMDE
                          value={editorData}
                          onChange={setEditorData}
                          options={{ status: false }}
                        />
                      </div>

                      <div className="d-flex justify-content-end">
                        <button
                          className="close-btn me-2"
                          type="button"
                          onClick={() => setShowPopup(false)}
                        >
                          Cerrar
                        </button>
                        <button className="close-btn ms-2" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              <Footer />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AgentProfile;
