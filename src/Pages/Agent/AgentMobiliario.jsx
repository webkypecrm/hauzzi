import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import gola from "../../assets/img/agentGola.png";
import axios from "axios";
import Loading from "../../Loading";
import hauzziImg from "../../assets/img/hauzziIcon.png";

const AgentMobiliario = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [agentName, setAgentName] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const userId = localStorage.getItem("userType") || "";

  const getAgentsData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/profile/getAll?userType=1&search=${agentName}&postalCode=${postalCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents(res.data?.data || []);
      setCount(res.data?.totalcount || "");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAgentsData();
  }, []);

  // pagination
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = agents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(agents.length / itemsPerPage);
  const firstHalf = currentAgents.slice(0, 4);
  const secondHalf = currentAgents.slice(4, 8);
  console.log("first", firstHalf);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getAgentsData();
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
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="#">Inicio</Link>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Agentes inmobiliarios
                      </li>
                    </ol>
                  </nav>
                  {/* Section Title */}
                  <div className="section-title text-start">
                    <h2 className="mb-0">Agentes inmobiliario </h2>
                  </div>
                  {/* Form Feild */}
                  <form className="mb-3" onSubmit={handleSearchSubmit}>
                    <div className="row g-3">
                      <div className="col-xl-5 col-lg-4 col-md-4">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Código postal"
                          id=""
                          aria-describedby=""
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-5 col-lg-4 col-md-4">
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Nombre del agente"
                          id=""
                          value={agentName}
                          aria-describedby=""
                          onChange={(e) => setAgentName(e.target.value)}
                        />
                      </div>
                      <div className="col-xl-2 col-lg-3 col-md-3">
                        <button
                          type="submit"
                          className="btn btn-primary ps-4 pe-4"
                        >
                          Buscar Agente
                        </button>
                      </div>
                    </div>
                  </form>
                  {/* Tabbing Section */}
                  <div className="tabbing_sec mb-4">
                    <nav>
                      <div
                        className="nav nav-tabs mb-3"
                        id="nav-tab"
                        role="tablist"
                      >
                        <button
                          className="nav-link active"
                          id="nav-home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-home"
                          type="button"
                          role="tab"
                          aria-controls="nav-home"
                          aria-selected="true"
                        >
                          Comprar
                        </button>
                        <button
                          className="nav-link"
                          id="nav-profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-profile"
                          type="button"
                          role="tab"
                          aria-controls="nav-profile"
                          aria-selected="false"
                        >
                          Vender
                        </button>
                        <button
                          className="nav-link"
                          id="nav-contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-contact"
                          type="button"
                          role="tab"
                          aria-controls="nav-contact"
                          aria-selected="false"
                        >
                          {" "}
                          <img src="img/my-img/crown.png" />
                          Mejor valorados
                        </button>
                        <button
                          className="nav-link"
                          id="nav-price-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#nav-price"
                          type="button"
                          role="tab"
                          aria-controls="nav-price"
                          aria-selected="false"
                        >
                          Precio de mayor a menor
                        </button>
                      </div>
                    </nav>
                    <div className="tab-content pt-2" id="nav-tabContent">
                      <div
                        className="tab-pane fade active show"
                        id="nav-home"
                        role="tabpanel"
                        aria-labelledby="nav-home-tab"
                      >
                        <p className="mb-1">
                          <b>Agentes inmobiliarios en Caracas</b>
                        </p>
                        <p>{count} resultados encontrados</p>
                        <div className="row gy-4">
                          {firstHalf.map((agent) => (
                            <div className="col-lg-6 col-md-6" key={agent.id}>
                              <div
                                className="agent-card border-0"
                                style={{ borderRadius: "10px" }}
                              >
                                <div className="card-body p-0">
                                  <div className="d-flex align-items-center w-100">
                                    <div className="agent-img">
                                      <img
                                        // src={agent?.agentDetails?.map(
                                        //   (item) => item.photoUrl
                                        // )}
                                        src={
                                          agent?.agentDetails?.length > 0 &&
                                          agent.agentDetails[0]?.photoUrl
                                            ? agent.agentDetails[0].photoUrl
                                            : hauzziImg
                                        }
                                        alt=""
                                        style={{
                                          height: "170.22px",
                                          width: "170.22px",
                                        }}
                                      />
                                      <small className="toprated">
                                        <img src="img/my-img/crown.png" />
                                        Top Rated
                                      </small>
                                    </div>
                                    <div className="ps-3 w-100">
                                      <div className="icon-bar">
                                        <ul className="list-inline">
                                          <li>
                                            <img src="img/my-img/start-small.png" />{" "}
                                            <span>
                                              <b>( 112 )</b>
                                            </span>
                                          </li>
                                          <li>
                                            <img src="img/my-img/swap.png" />
                                          </li>
                                          <li>
                                            <img src="img/my-img/heart.png" />
                                          </li>
                                        </ul>
                                      </div>
                                      <p className="mb-0">
                                        <b>{agent.name}</b>
                                      </p>
                                      <small>@properties</small>
                                      <p className="mt-3 mb-0">
                                        <b>{agent.propertyCount}</b> Inmuebles
                                        publicados
                                      </p>
                                      {agent?.agentDetails[0]?.address && (
                                        <p>
                                          <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                          {agent?.agentDetails[0]?.address}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sepration Section */}
                  <div className="sepration_sec mb-5">
                    <div className="row g-4 justify-content-center">
                      <div className="col-lg-11">
                        <div
                          className="bg-img"
                          style={{
                            backgroundColor: "#FFBD59",
                            borderRadius: "40px",
                          }}
                        >
                          <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-4">
                              <img
                                src="img/my-img/agent-sep-img.png"
                                className="mainimg"
                              />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="shape1">
                                <img src={gola} />
                              </div>
                              <div className="desc">
                                <h3>
                                  ¿Buscas un agente para vender o alquilar tu
                                  inmueble?
                                </h3>
                                <p>
                                  Descubre los mejores agentes inmobiliarios
                                  para vender o alquilar tu inmueble
                                </p>
                                <button type="submit" className="btn btn-light">
                                  Descubrir más
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Sepration Section */}
                  <div className="row gy-4 mt-2">
                    {secondHalf.map((item) => (
                      <div className="col-lg-6 col-md-6" key={item.id}>
                        <div
                          className="agent-card border-0"
                          style={{ borderRadius: "10px" }}
                        >
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img
                                  // src={item?.agentDetails?.map(
                                  //   (e) => e.photoUrl
                                  // )}
                                  src={
                                    item?.agentDetails?.length > 0 &&
                                    item.agentDetails[0]?.photoUrl
                                      ? item.agentDetails[0].photoUrl
                                      : hauzziImg
                                  }
                                  alt=""
                                  style={{
                                    height: "170.22px",
                                    width: "170.22px",
                                  }}
                                />
                                <small className="toprated">
                                  <img src="img/my-img/crown.png" />
                                  Top Rated
                                </small>
                              </div>
                              <div className="ps-3 w-100">
                                <div className="icon-bar">
                                  <ul className="list-inline">
                                    <li>
                                      <img src="img/my-img/start-small.png" />{" "}
                                      <span>
                                        <b>( {item.propertyCount} )</b>
                                      </span>
                                    </li>
                                    <li>
                                      <img src="img/my-img/swap.png" />
                                    </li>
                                    <li>
                                      <img src="img/my-img/heart.png" />
                                    </li>
                                  </ul>
                                </div>
                                <p className="mb-0">
                                  <b>{item.name}</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>{item.propertyCount}</b> Inmuebles
                                  publicados
                                </p>
                                {item?.agentDetails[0]?.address && (
                                  <p>
                                    <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                    {item?.agentDetails[0]?.address}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pagination justify-content-center">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          {/* Previous Button */}
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              aria-label="Previous"
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              <span aria-hidden="true">
                                <i className="bi bi-arrow-left" />
                              </span>
                            </Link>
                          </li>

                          {/* Page Numbers */}
                          {Array.from({ length: totalPages }).map(
                            (_, index) => {
                              const page = index + 1;
                              return (
                                <li
                                  key={page}
                                  className={`page-item ${
                                    currentPage === page ? "active" : ""
                                  }`}
                                >
                                  <Link
                                    className="page-link"
                                    to="#"
                                    onClick={() => handlePageChange(page)}
                                  >
                                    {page}
                                  </Link>
                                </li>
                              );
                            }
                          )}

                          {/* Next Button */}
                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              aria-label="Next"
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              <span aria-hidden="true">
                                <i className="bi bi-arrow-right" />
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </section>

              <Footer />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AgentMobiliario;
