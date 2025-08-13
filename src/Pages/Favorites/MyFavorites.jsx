import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import Slider from "react-slick";
import addIcon from "../../assets/img/add.png";
import hauzziPic from "../../assets/img/hauzziIcon.png";
import { toast } from "react-toastify";
import getApi from "../../Hook.js";

const MyFavorites = () => {
  const [favPropertys, setFavProperties] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [agencyData, setAgencyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [folderName, setFolderName] = useState(""); //for post api
  const [folderId, setFolderId] = useState("");

  const token = localStorage.getItem("token");
  const token2 = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const customerId = localStorage.getItem("tokenId") || "";
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handelNavigate1 = (id) => {
    navigate(`/agentprofile/${id}`);
  };
  const handelNavigate2 = (id) => {
    navigate(`/agencyprofile/${id}`);
  };
  // get all favorite properties
  const handelFavProperty = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/property/getWishlist/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavProperties(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // get agent data
  const getAgentData = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/profile/savedAgent/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAgentData(res.data?.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  console.log("agentData", agentData);

  // get Agency Data
  const getAgencyData = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/profile/savedAgency/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAgencyData(res.data?.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handelFavProperty();
    getAgentData();
    getAgencyData();
  }, []);
  console.log("allData", agencyData);

  // slider
  const getSliderSettings = (count) => ({
    dots: true,
    infinite: count > 3,
    slidesToShow: Math.min(count, 3),
    slidesToScroll: 1,
    autoplay: count > 3,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    centerMode: count < 3, // Center the slides if less than 3
    centerPadding: count === 1 ? "33.33%" : count === 2 ? "16.66%" : "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(count, 3),
          centerMode: count < 3,
          centerPadding:
            count === 1 ? "33.33%" : count === 2 ? "16.66%" : "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(count, 2),
          centerMode: count < 2,
          centerPadding: count === 1 ? "25%" : "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  });

  const getSliderSettings2 = (count) => ({
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: count >= 4 ? 4 : count,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  });

  // popup
  const handlePopup = () => {
    setPopup(true);
  };

  // create folder post api
  const createFolder = async () => {
    try {
      const res = await axios.post(
        `${apiUrl}/property/createFolder/${customerId}`,
        { name: folderName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      getFolderData();
      setFolderName("");
      setPopup(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // get folder data for create folder
  const getFolderData = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/property/get-Folders-byCustomerId?customerId=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFolderData(res?.data?.data);
      console.log("folderData", res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // get folder property
  const [folderPropertyData, setFolderPropertyData] = useState([]);
  console.log("folderId", folderId);
  const getFolderpropertyData = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/property/getPropertyFolderData?customerId=${customerId}&folderId=${folderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFolderPropertyData(res?.data?.data);
      console.log("setFolderPropertyData", res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getFolderData();
    if (folderId){getFolderpropertyData();}
    
  }, [folderId]);
  // console.log("folderData", folderData);
    // fatch foldet true/false
    const url = `${apiUrl}/profile/getById/${customerId}`;
    const { data, error } = getApi(url);
    const folder = data?.isFolder;
    console.log("folder", folder);

  // delete folder
  const deleteFolder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Folder?"
    );

    if (!confirmDelete) return;
    try {
      const res = await axios.delete(`${apiUrl}/property/deleteFolder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res?.data?.message);
      getFolderData();
      getFolderpropertyData();
      handelFavProperty();
    } catch (error) {
      toast.error(error?.res?.data?.message);
    }
  };

  return (
    <Fragment>
      <div className="index-page">
        {/* {loading ? (
          <div style={{ marginTop: "20%" }}>
            <Loading />
          </div>
        ) : ( */}
        <Fragment>
          <Header />
          <main className="main">
            <section className="top-btn12">
              <div className="container-lg py-3">
                {/* Navigation */}
                <div className="d-flex flex-wrap justify-content-center mb-4 ">
                  <Link to={"/publish-propert"} className="nav-button ">
                    Publicar inmueble
                  </Link>
                  <Link to={"/myads"} className="nav-button">
                    Mis anuncios
                  </Link>
                  <Link to={"/myfavoriets"} className="nav-button active">
                    Mis favoritos
                  </Link>
                  <Link to={"/myalert"} className="nav-button">
                    Mis alertas
                  </Link>
                  <Link to={"/mymessages"} className="nav-button">
                    Mis mensajes
                  </Link>
                  <Link to={"/mycomparisons"} className="nav-button">
                    Mis comparaciones
                  </Link>
                  <Link to={"/myvisit"} className="nav-button">
                    Mis visitas
                  </Link>
                  <Link to={"/myprofile"} className="nav-button">
                    Mi perfil
                  </Link>
                </div>
                <hr style={{ borderColor: "#d7d6d6" }} />
                {/* Top Buttons */}
                <div className="d-flex gap-3 mb-4 flex-lg-wrap overflow-x-auto">
                  <div
                    className="thumbnail d-flex align-items-center justify-content-center flex-column"
                    style={{ width: "110px" }}
                  >
                    <div className="add-icon-favo" onClick={handlePopup}>
                      <img
                        src={addIcon}
                        style={{ height: "18px", width: "17px" }}
                      />
                    </div>
                    <div>
                      <p className="mb-0" style={{ fontSize: "10px" }}>
                        Crear nueva lista
                      </p>
                    </div>
                  </div>
                  {folderData?.map((item) => (
                    <div
                      className="thumbnail justify-content-around"
                      style={{ width: "210px" ,cursor:"pointer"}}
                      key={item?.id}
                      onClick={() => setFolderId(item?.id)}
                    >
                      <img src={hauzziPic} />
                      <div>
                        <p className="mb-0">{item.name}</p>
                        <small className="text-muted d-block">1 inmueble</small>
                      </div>
                      <div
                        className="d-flex flex-column"
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-person-plus-fill" />
                        <i
                          className="bi bi-trash"
                          onClick={() => deleteFolder(item?.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Mis listas */}
                {folder ? (folderPropertyData?.length > 0 && (
                  <Fragment>
                    <h4 className="mb-3">Mis listas</h4>
                    <div className="row g-4">
                      <Slider {...getSliderSettings(folderPropertyData.length)}>
                        {folderPropertyData.map((item, index) => (
                          <div className="p-2" key={index}>
                            <div className="list-card">
                              <img
                                src={
                                  item?.property?.images?.[0] ||
                                  "img/default.jpg"
                                }
                                className="w-100"
                                alt="House"
                                style={{ height: "200px" }}
                              />
                              <div className="d-flex justify-content-between pt-2 align-items-start">
                                <div>
                                  <h6>{item?.property?.name}</h6>
                                  {/* <small className="text-muted d-block mb-2">
                                    1 inmueble
                                  </small> */}
                                </div>
                                {/* <button className="btn btn-primary w-auto btn-sm">
                                  <i className="bi bi-person-plus-fill" />{" "}
                                  Invitar
                                </button> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </Fragment>
                )) : ( favPropertys?.length > 0 && (
                  <Fragment>
                    <h4 className="mb-3">Mis listas</h4>
                    <div className="row g-4">
                      <Slider {...getSliderSettings(favPropertys.length)}>
                        {favPropertys.map((item, index) => (
                          <div className="p-2" key={index}>
                            <div className="list-card">
                              <img
                                src={item?.images?.[0] || "img/default.jpg"}
                                className="w-100"
                                alt="House"
                                style={{ height: "200px" }}
                              />
                              <div className="d-flex justify-content-between pt-2 align-items-start">
                                <div>
                                  <h6>{item?.name}</h6>
                                  {/* <small className="text-muted d-block mb-2">
                                    1 inmueble
                                  </small> */}
                                </div>
                                {/* <button className="btn btn-primary w-auto btn-sm">
                                  <i className="bi bi-person-plus-fill" />{" "}
                                  Invitar
                                </button> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </Fragment>
                ))}
               
                

                {/* Listas sugeridas */}
                <h5 className="mt-5 mb-0">Listas sugeridas</h5>
                <p className="text-muted">
                  Crea listas para organizar mejor tus inmuebles favoritos, aquí
                  tienes algunas ideas
                </p>
                <div className="d-flex flex-lg-wrap overflow-x-auto gap-2">
                  <button className="btn btn-outline-secondary text-nowrap btn-sm">
                    Cerca del trabajo
                  </button>
                  <button className="btn btn-outline-secondary text-nowrap btn-sm">
                    Mis top
                  </button>
                  <button className="btn btn-outline-secondary text-nowrap btn-sm">
                    Para compartir con...
                  </button>
                  <button className="btn btn-outline-secondary text-nowrap btn-sm">
                    Para comprar
                  </button>
                  <button className="btn btn-outline-secondary text-nowrap btn-sm">
                    por si bajan de precio
                  </button>
                  <button className="btn btn-outline-secondary text-nowrap btn-sm">
                    Quiero visitar
                  </button>
                </div>
                {agentData?.length > 0 && (
                  <Fragment>
                    <h5 className="mt-5 mb-3">
                      Mis inmobiliarias y agentes favoritos
                    </h5>

                    <div className="row gy-4 mb-5">
                      {/* <Slider {...getSliderSettings2(agentData.length)}> */}
                      {agentData.map((item, index) => (
                        <div className="col-lg-3" key={index}>
                          <div className="card bg-light border-0 myfav rounded-md">
                            <div className="card-body">
                              <div className="d-flex justify-content-end align-items-center">
                                <ul className="list-inline d-flex align-items-center mb-0">
                                  <li>
                                    <img src="img/my-img/swap.png" />
                                  </li>
                                  <li>
                                    <div className="dropdown">
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
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <img
                                              src="img/my-img/share-icon.png"
                                              className="me-2"
                                            />{" "}
                                            Compartir
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <img
                                              src="img/my-img/print-icon.png"
                                              className="me-2"
                                            />{" "}
                                            Imprimir cartel
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="profile-container"
                                style={{ marginTop: 0 }}
                              >
                                <div className="profile-pic-wrapper">
                                  <img
                                    src={item.agentDetails?.map(
                                      (item) => item.photoUrl
                                    )}
                                    alt=""
                                  />
                                </div>
                                <small className="toprated">
                                  <img src="img/my-img/crown.png" />
                                  Top Rated
                                </small>
                              </div>
                              <div className="agent-profile text-center">
                                <ul className="list-inline">
                                  <li>
                                    <b>{item.name}</b>
                                  </li>
                                  <li>
                                    <img src="img/my-img/start-small.png" />{" "}
                                    <span>@properties</span>
                                  </li>
                                  <li className="fw-bold">
                                    ( {item?.profileReviewCount} )
                                  </li>
                                </ul>
                                <p>
                                  <span className="fw-bold">
                                    {item?.propertyCount}
                                  </span>{" "}
                                  Inmuebles publicados
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-primary me-3 w-50 btn-sm"
                                  onClick={() => handelNavigate1(item.id)}
                                >
                                  {" "}
                                  Ver Perfil
                                </button>
                                <button
                                  className="btn btn-outline-primary w-50 btn-sm"
                                  onClick={() => handelNavigate1(item.id)}
                                >
                                  {" "}
                                  Contactar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* </Slider> */}
                    </div>
                  </Fragment>
                )}
                {agencyData?.length > 0 && (
                  <Fragment>
                    <h5 className="mt-5 mb-3">
                      Mis inmobiliarias y agencyes favoritos
                    </h5>

                    <div className="row gy-4 mb-5">
                      {/* <Slider {...getSliderSettings2(agentData.length)}> */}
                      {agencyData.map((item, index) => (
                        <div className="col-lg-3" key={index}>
                          <div className="card bg-light border-0 myfav rounded-md">
                            <div className="card-body">
                              <div className="d-flex justify-content-end align-items-center">
                                <ul className="list-inline d-flex align-items-center mb-0">
                                  <li>
                                    <img src="img/my-img/swap.png" />
                                  </li>
                                  <li>
                                    <div className="dropdown">
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
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <img
                                              src="img/my-img/share-icon.png"
                                              className="me-2"
                                            />{" "}
                                            Compartir
                                          </Link>
                                        </li>
                                        <li>
                                          <Link
                                            className="dropdown-item"
                                            to="#"
                                          >
                                            <img
                                              src="img/my-img/print-icon.png"
                                              className="me-2"
                                            />{" "}
                                            Imprimir cartel
                                          </Link>
                                        </li>
                                      </ul>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div
                                className="profile-container"
                                style={{ marginTop: 0 }}
                              >
                                <div className="profile-pic-wrapper">
                                  <img
                                    src={item.agencyDetails?.map(
                                      (item) => item.photoUrl
                                    )}
                                    alt=""
                                  />
                                </div>
                                <small className="toprated">
                                  <img src="img/my-img/crown.png" />
                                  Top Rated
                                </small>
                              </div>
                              <div className="agent-profile text-center">
                                <ul className="list-inline">
                                  <li>
                                    <b>{item.name}</b>
                                  </li>
                                  <li>
                                    <img src="img/my-img/start-small.png" />{" "}
                                    <span>@properties</span>
                                  </li>
                                  <li className="fw-bold">
                                    ( {item?.profileReviewCount} )
                                  </li>
                                </ul>
                                <p>
                                  <span className="fw-bold">
                                    {item?.propertyCount}
                                  </span>{" "}
                                  Inmuebles publicados
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-primary me-3 w-50 btn-sm"
                                  onClick={() => handelNavigate2(item.id)}
                                >
                                  {" "}
                                  Ver Perfil
                                </button>
                                <button
                                  className="btn btn-outline-primary w-50 btn-sm"
                                  onClick={() => handelNavigate2(item.id)}
                                >
                                  {" "}
                                  Contactar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {/* </Slider> */}
                    </div>
                  </Fragment>
                )}
                <div className="text-center">
                  <h6 className="fw-bold mb-3">
                    Busca tu agencia o agente favorito
                  </h6>
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-primary me-3 w-auto btn-sm">
                      {" "}
                      Buscar Agencias <i className="bi bi-arrow-right ms-1" />
                    </button>
                    <button className="btn btn-primary w-auto btn-sm">
                      {" "}
                      Buscar Agente <i className="bi bi-arrow-right ms-1" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {/* MODAL */}
            {popup && (
              <div className="popup-overlay">
                <div
                  className="popup-content"
                  // onClick={(e) => e.stopPropagation()}
                >
                  <div className="d-flex justify-content-between mb-2">
                    <h5>Crear nueva lista </h5>
                    <img
                      src="img/my-img/X-circle.png"
                      alt=""
                      style={{
                        height: "20px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => setPopup(false)}
                    />
                  </div>
                  <div className="mb-3">
                    <h6>Escribe el nombre de tu nueva lista </h6>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="mb-4 w-100 add-folder-modal"
                      placeholder="Ejemplo: Casas para visitar"
                      name="name"
                      value={folderName}
                      onChange={(e) => setFolderName(e.target.value)}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      className="cancelar-btn"
                      onClick={() => setPopup(false)}
                    >
                      Cancelar
                    </button>
                    <button className="crear-btn" onClick={createFolder}>
                      Crear lista
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Footer />
          </main>
        </Fragment>
        {/* )} */}
      </div>
    </Fragment>
  );
};

export default MyFavorites;
