import React, { Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";

const Messages = () => {
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
                <button className="nav-button">Mis alertas</button>
                <button className="nav-button active">Mis mensajes</button>
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
                <Link to={"/myalert"} className="nav-button">
                  Mis alertas
                </Link>
                <Link to={"/mymessages"} className="nav-button active">
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
              <div className="row border border-grey rounded bg-white">
                {/* Sidebar */}
                <div className="col-md-4 p-0">
                  <div className="chat-box p-3 overflow-auto">
                    <h5 className="fw-bold mb-3">Mis Mensajes</h5>
                    <div className="msg-menu mb-3">
                      <button className="btn btn-primary btn-sm me-2">
                        Todos los chats
                      </button>
                      <button className="btn btn-white btn-sm me-1 border">
                        Particulares
                      </button>
                      <button className="btn btn-white btn-sm me-1 border">
                        Agentes
                      </button>
                      <button className="btn btn-white btn-sm me-1 border">
                        Agencias
                      </button>
                    </div>
                    {/* Chat List */}
                    <div className="chat-list">
                      <div className="d-flex align-items-center justify-content-between p-2 rounded chat-list-item active mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="img/my-img/my-msg-profile.png"
                            className="chat-avatar me-2"
                            alt="avatar"
                          />
                          <span className="status-dot dot-away" />
                          <div>
                            <div className="fw-bold">Darlene Steward</div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Lorem ipsum property is for...
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-muted small">18:31</div>
                          <div className="d-flex align-items-center justify-content-end">
                            <i className="bi bi-pin-angle-fill text-secondary me-1" />
                            <span className="chat-badge">5</span>
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
                                      src="img/my-img/share-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Compartir
                                  </Link>
                                </li>
                                <li>
                                  <Link className="dropdown-item" to="#">
                                    <img
                                      src="img/my-img/print-icon.png"
                                      className="me-2"
                                    />{" "}
                                    Imprimir cartel
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Other chat items */}
                      <div className="d-flex align-items-center justify-content-between p-2 rounded chat-list-item mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="img/my-img/my-msg-profile.png"
                            className="chat-avatar me-2"
                            alt="avatar"
                          />
                          <span className="status-dot dot-online" />
                          <div>
                            <div className="fw-bold">Darlene Steward</div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Lorem ipsum property is for...
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-muted small">18:31</div>
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
                                    src="img/my-img/share-icon.png"
                                    className="me-2"
                                  />{" "}
                                  Compartir
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="#">
                                  <img
                                    src="img/my-img/print-icon.png"
                                    className="me-2"
                                  />{" "}
                                  Imprimir cartel
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between p-2 rounded chat-list-item mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="img/my-img/my-msg-profile.png"
                            className="chat-avatar me-2"
                            alt="avatar"
                          />
                          <span className="status-dot dot-busy" />
                          <div>
                            <div className="fw-bold">Darlene Steward</div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Lorem ipsum property is for...
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-muted small">18:31</div>
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
                                    src="img/my-img/share-icon.png"
                                    className="me-2"
                                  />{" "}
                                  Compartir
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="#">
                                  <img
                                    src="img/my-img/print-icon.png"
                                    className="me-2"
                                  />{" "}
                                  Imprimir cartel
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between p-2 rounded chat-list-item mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src="img/my-img/my-msg-profile.png"
                            className="chat-avatar me-2"
                            alt="avatar"
                          />
                          <span className="status-dot dot-busy" />
                          <div>
                            <div className="fw-bold">Darlene Steward</div>
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.8rem" }}
                            >
                              Lorem ipsum property is for...
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="text-muted small">18:31</div>
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
                                    src="img/my-img/share-icon.png"
                                    className="me-2"
                                  />{" "}
                                  Compartir
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item" to="#">
                                  <img
                                    src="img/my-img/print-icon.png"
                                    className="me-2"
                                  />{" "}
                                  Imprimir cartel
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chat Panel */}
                <div className="col-md-8 d-flex flex-column justify-content-between p-0">
                  {/* Header */}
                  <div className="row chat-panel border-bottom p-3">
                    <div className="col-lg-6">
                      <div className="d-flex align-items-center">
                        <img
                          src="img/my-img/advertiser-profile.png"
                          className="chat-avatar me-3"
                          alt="avatar"
                        />
                        <h6 className="mb-0">Nombre del anunciante</h6>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ad-title">
                        <h6 className="mb-0 me-3">Titulo del anuncio</h6>
                        <img
                          src="img/my-img/myads-img.jpg"
                          className="chat-photo"
                          alt="property"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Chat area (empty for now) */}
                  <div className="flex-grow-1" />
                  {/* Message input */}
                  <div className="d-flex align-items-center mt-3 p-3">
                    <input
                      type="text"
                      className="message-input me-2"
                      placeholder="Escriba su mensaje..."
                    />
                    <button className="send-button">Enviar</button>
                  </div>
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

export default Messages;
