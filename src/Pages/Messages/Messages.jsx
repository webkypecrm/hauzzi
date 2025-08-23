import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Messages = () => {
  const [messageData, setMessageData] = useState([]);
  const [messageType, setMessageType] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";

  // get messageData
  const getMessages = async () => {
    try {
      const res = await axios.get(`${apiUrl}/request-enquiry/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(
        "first",
        res.data.data
      );
      setMessageData(res.data?.data || []);
      setMessageType(res.data?.enquiryType || "");
    } catch (error) {}
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <Fragment>
      <div className="index-page">
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
                <div className="col-md-8 d-flex flex-column justify-content-between">
                  {/* Header */}
                  {messageData.length > 0 && (
                    <Fragment>
                      {/* {messageData.map((item) => (
                      <div className="row chat-panel border-bottom">
                    <div className="col-lg-6 p-3">
                      <div className="d-flex align-items-center">
                        <img
                          src="img/my-img/advertiser-profile.png"
                          className="chat-avatar me-3"
                          alt="avatar"
                        />
                        <h6 className="mb-0">Nombre del anunciante</h6>
                      </div>
                    </div>
                    <div className="col-lg-6 p-3">
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
                    ))} */}
                      {messageData
                        ?.filter((item) => item.enquiryType === "received")
                        .map((item, index) => (
                          <div
                            key={index}
                            className="row  border-bottom"
                          >
                            <div className="col-lg-6 p-3">
                              <div className="d-flex align-items-center">
                                {/* <img
                                  src={item?.customer?.userDetails?.map((i) => i.photoUrl)}
                                  className="chat-avatar me-3"
                                  alt="avatar"
                                /> */}
                                {[
  ...(item?.customer?.agencyDetails || []),
  ...(item?.customer?.agentDetails || []),
  ...(item?.customer?.userDetails || [])
].map((i, index) => (
  <img
    key={index}
    src={i.photoUrl}
    alt="profile"
    className="chat-avatar me-3"
    style={{ width: "70px", height: "70px" }}
  />
))}
                                <h6 className="mb-0">{item?.customer?.name}</h6>
                              </div>
                            </div>
                            <div className="col-lg-6 p-3">
                              <div className="ad-title">
                                <h6 className="mb-0 me-3">
                                  {item?.property?.name}
                                </h6>
                                <img
                                  src={item?.property?.images[0]}
                                  className="chat-photo"
                                  alt="property"
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                      {messageData
                        ?.filter((item) => item.enquiryType === "sent")
                        .map((item, index) => (
                          <div
                            key={index}
                            // className="row chat-panel border-bottom"
                            className="row border-bottom"
                          >
                            <div className="col-lg-6 p-3">
                              <div className=" d-flex align-items-center">
                                
                                <img
                                  src={item?.property?.images[0]}
                                  className="chat-photo  me-3"
                                  alt="property"
                                />
                                <h6 className="mb-0 ">
                                  {item?.property?.name}
                                </h6>
                              </div>
                            </div>
                            <div className="col-lg-6 p-3">
                              <div className="ad-title">
                                <h6 className="mb-0 me-3">{item?.property?.Customer?.name}</h6>
                                <img
                                  src={item?.property?.Customer?.userDetails?.map((i) => i.photoUrl)}
                                  className="chat-avatar"
                                  alt="avatar"
                                  style={{ width: "70px", height: "70px" }}
                                />
                                
                              </div>
                            </div>
                          </div>
                        ))}
                    </Fragment>
                  )}

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
