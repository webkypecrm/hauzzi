import React, { Fragment, useEffect } from "react";
import { Tooltip } from "bootstrap";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";

const MyAlert = () => {
  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);
  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section className="top-btn12">
            <div className="container-lg py-3">
              {/* Navigation */}
              {/* <div className="d-flex flex-wrap justify-content-center mb-2 myadsnav">
                <button className="nav-button">Publicar inmueble</button>
                <button className="nav-button">Mis anuncios</button>
                <button className="nav-button">Mis favoritos</button>
                <button className="nav-button active">Mis alertas</button>
                <button className="nav-button">Mis mensajes</button>
                <button className="nav-button">Mis comparaciones</button>
                <button className="nav-button">Mis visitas</button>
                <button className="nav-button">Mi perfil</button>
              </div> */}
              <div className="d-flex flex-wrap justify-content-center mb-4 ">
                <Link to={"/publish-propert"} className="nav-button ">
                  Publicar inmueble
                </Link>
                <Link to={"/myads"} className="nav-button">
                  Mis anuncios
                </Link>
                <Link to={"/myfavoriets"} className="nav-button">
                  Mis favoritos
                </Link>
                <Link to={"/myalert"} className="nav-button active">
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
              {/* Mis listas */}
              <h4 className="mb-3">Mis Alertas</h4>
              <div className="row gy-4 mb-5">
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-end align-items-center">
                        <ul className="list-inline mb-0">
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
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-home-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Ver anuncios
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-edit-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Modificar alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-clock-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Cambiar frecuencia
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-brush-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Nombrar alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-share-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Compartir alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-delete-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Eliminar alerta
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <h5 className="card-title mb-2">Nombre de la alerta</h5>
                      <p className="card-subtitle mb-4 text-muted">
                        Caracteristicas de la alerta{" "}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      {/* <p className="card-text">
                        <i
                          className="bi bi-info-circle me-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          title="Puedes cambiar la frecuencia en la que recibes tus novedades en el botón superior de tres puntos."
                        />{" "}
                        Recibir novedades inmediatas
                      </p> */}
                      <p className="card-text">
                        {/* Bootstrap Info Circle Icon with Tooltip */}
                        <i
                          className="bi bi-info-circle me-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          title="Puedes cambiar la frecuencia en la que recibes tus novedades en el botón superior de tres puntos."
                        ></i>
                        Recibir novedades inmediatas
                      </p>
                      <div className="d-flex justify-content-between">
                        <div className="switch-label">
                          <label className="switchSmall">
                            <input type="checkbox" />
                            <small />
                          </label>
                          <span className="ms-2">Email</span>
                        </div>
                        <button className="btn btn-primary me-3 w-auto btn-sm">
                          {" "}
                          Ver Anuncios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-end align-items-center">
                        <ul className="list-inline mb-0">
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
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-home-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Ver anuncios
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-edit-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Modificar alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-clock-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Cambiar frecuencia
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-brush-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Nombrar alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-share-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Compartir alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-delete-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Eliminar alerta
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <h5 className="card-title mb-2">Nombre de la alerta</h5>
                      <p className="card-subtitle mb-4 text-muted">
                        Caracteristicas de la alerta{" "}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      <p className="card-text">
                        <i
                          className="bi bi-info-circle me-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          title="Puedes cambiar la frecuencia en la que recibes tus novedades en el botón superior de tres puntos."
                        />{" "}
                        Recibir novedades inmediatas
                      </p>
                      <div className="d-flex justify-content-between">
                        <div className="switch-label">
                          <label className="switchSmall">
                            <input type="checkbox" />
                            <small />
                          </label>
                          <span className="ms-2">Email</span>
                        </div>
                        <button className="btn btn-primary me-3 w-auto btn-sm">
                          {" "}
                          Ver Anuncios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-end align-items-center">
                        <ul className="list-inline mb-0">
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
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-home-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Ver anuncios
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-edit-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Modificar alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-clock-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Cambiar frecuencia
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-brush-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Nombrar alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-share-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Compartir alerta
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/myalert-delete-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Eliminar alerta
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <h5 className="card-title mb-2">Nombre de la alerta</h5>
                      <p className="card-subtitle mb-4 text-muted">
                        Caracteristicas de la alerta{" "}
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      <p className="card-text">
                        <i
                          className="bi bi-info-circle me-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-custom-class="custom-tooltip"
                          title="Puedes cambiar la frecuencia en la que recibes tus novedades en el botón superior de tres puntos."
                        />{" "}
                        Recibir novedades inmediatas
                      </p>
                      <div className="d-flex justify-content-between">
                        <div className="switch-label">
                          <label className="switchSmall">
                            <input type="checkbox" />
                            <small />
                          </label>
                          <span className="ms-2">Email</span>
                        </div>
                        <button className="btn btn-primary me-3 w-auto btn-sm">
                          {" "}
                          Ver Anuncios
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h6 className="fw-bold mb-3">
                  ¿Deseas crear una nueva alerta?
                </h6>
                <button className="btn btn-primary w-auto btn-sm">
                  {" "}
                  Crear alerta <i className="bi bi-arrow-right ms-1" />
                </button>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default MyAlert;
