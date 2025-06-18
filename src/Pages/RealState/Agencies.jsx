import React, { Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import gola from "../../assets/img/agentGola.png";


const Agencies = () => {
  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section className="top-btn12">
            <div className="container">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="#">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Agencias Inmobiliarias
                  </li>
                </ol>
              </nav>
              {/* Section Title */}
              <div className="section-title text-start">
                <h2 className="mb-0">Agencias Inmobiliarias </h2>
              </div>
              {/* Form Feild */}
              <form className="mb-3">
                <div className="row g-3">
                  <div className="col-xl-5 col-lg-4 col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ciudad o Código postal"
                      id=""
                      aria-describedby=""
                    />
                  </div>
                  <div className="col-xl-5 col-lg-4 col-md-4">
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Nombre de la agencia inmobiliaria"
                      id=""
                      aria-describedby=""
                    />
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-3">
                    <button type="submit" className="btn btn-primary ps-4 pe-4">
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
                      <b>Agencias inmobiliarias en Caracas</b>
                    </p>
                    <p>12322 resultados encontrados</p>
                    <div className="row gy-4">
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="row gy-4">
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div className="row gy-4">
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-price"
                    role="tabpanel"
                    aria-labelledby="nav-price-tab"
                  >
                    <div className="row gy-4">
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="agent-card border-0">
                          <div className="card-body p-0">
                            <div className="d-flex align-items-center w-100">
                              <div className="agent-img">
                                <img src="img/my-img/agency-img.png" alt="" />
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
                                  <b>Agency Name</b>
                                </p>
                                <small>@properties</small>
                                <p className="mt-3 mb-0">
                                  <b>1230</b> Inmuebles publicados
                                </p>
                                <p>
                                  <i className="bi bi-geo-alt-fill primary-text" />{" "}
                                  Caracas Distrito Capital
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Sepration Section */}
              <div className="sepration_sec mb-5">
                <div className="row g-4 justify-content-center">
                  <div className="col-lg-11">
                    <div className="bg-img" style={{backgroundColor: "#FFBD59",borderRadius: "40px"}}>
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
                            <h4>
                              ¿Buscas una inmobiliaria para vender o alquilar tu
                              inmueble?
                            </h4>
                            <p>
                              Descubre las mejores inmobiliarias para vender o
                              alquilar tu inmueble
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
              <div className="row gy-4 mt-2">
                <div className="col-lg-6 col-md-6">
                  <div className="agent-card border-0">
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center w-100">
                        <div className="agent-img">
                          <img src="img/my-img/agency-img.png" alt="" />
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
                            <b>Agency Name</b>
                          </p>
                          <small>@properties</small>
                          <p className="mt-3 mb-0">
                            <b>1230</b> Inmuebles publicados
                          </p>
                          <p>
                            <i className="bi bi-geo-alt-fill primary-text" />{" "}
                            Caracas Distrito Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="agent-card border-0">
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center w-100">
                        <div className="agent-img">
                          <img src="img/my-img/agency-img.png" alt="" />
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
                            <b>Agency Name</b>
                          </p>
                          <small>@properties</small>
                          <p className="mt-3 mb-0">
                            <b>1230</b> Inmuebles publicados
                          </p>
                          <p>
                            <i className="bi bi-geo-alt-fill primary-text" />{" "}
                            Caracas Distrito Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="agent-card border-0">
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center w-100">
                        <div className="agent-img">
                          <img src="img/my-img/agency-img.png" alt="" />
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
                            <b>Agency Name</b>
                          </p>
                          <small>@properties</small>
                          <p className="mt-3 mb-0">
                            <b>1230</b> Inmuebles publicados
                          </p>
                          <p>
                            <i className="bi bi-geo-alt-fill primary-text" />{" "}
                            Caracas Distrito Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="agent-card border-0">
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center w-100">
                        <div className="agent-img">
                          <img src="img/my-img/agency-img.png" alt="" />
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
                            <b>Agency Name</b>
                          </p>
                          <small>@properties</small>
                          <p className="mt-3 mb-0">
                            <b>1230</b> Inmuebles publicados
                          </p>
                          <p>
                            <i className="bi bi-geo-alt-fill primary-text" />{" "}
                            Caracas Distrito Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="agent-card border-0">
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center w-100">
                        <div className="agent-img">
                          <img src="img/my-img/agency-img.png" alt="" />
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
                            <b>Agency Name</b>
                          </p>
                          <small>@properties</small>
                          <p className="mt-3 mb-0">
                            <b>1230</b> Inmuebles publicados
                          </p>
                          <p>
                            <i className="bi bi-geo-alt-fill primary-text" />{" "}
                            Caracas Distrito Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="agent-card border-0">
                    <div className="card-body p-0">
                      <div className="d-flex align-items-center w-100">
                        <div className="agent-img">
                          <img src="img/my-img/agency-img.png" alt="" />
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
                            <b>Agency Name</b>
                          </p>
                          <small>@properties</small>
                          <p className="mt-3 mb-0">
                            <b>1230</b> Inmuebles publicados
                          </p>
                          <p>
                            <i className="bi bi-geo-alt-fill primary-text" />{" "}
                            Caracas Distrito Capital
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pagination justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous">
                          <span aria-hidden="true">
                            <i className="bi bi-arrow-left" />
                          </span>
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link active" to="#">
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          4
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          5
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          6
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          7
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next">
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
        </main>
      </div>
    </Fragment>
  );
};

export default Agencies;
