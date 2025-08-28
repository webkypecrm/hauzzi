import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";

const Messages = () => {
  const [messageData, setMessageData] = useState([]);
  const [messageType, setMessageType] = useState("");
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageDataId, setMessageDataId] = useState([]);
  const [id, setId] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  

  console.log("userType", activeChatId);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";

  // get messageData
  const getMessages = async () => {
    // setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/request-enquiry/getAll?userType=${userType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("first", res.data.data);
      setMessageData(res.data?.data || []);
      setMessageType(res.data?.enquiryType || "");
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    if (userType || userType === 0 || userType === "") {
      getMessages();
    }
  }, [userType, userType === 0, userType === ""]);

  // grt messageData by Id
  const getMessagesId = async () => {
    setLoading2(true);
    try {
      const res = await axios.get(
        `${apiUrl}/request-enquiry/getAll?&id=${activeChatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("firstId", res.data.data);
      setMessageDataId(res.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    if (activeChatId) {
      getMessagesId();
    }
  }, [activeChatId]);

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
                      <button
                        className={`btn btn-sm me-2 border ${
                          userType === "" ? "btn-primary" : "btn-white"
                        }`}
                        onClick={() => setUserType("")}
                      >
                        Todos los chats
                      </button>
                      <button
                        className={`btn btn-sm me-1 border ${
                          userType === 0 ? "btn-primary" : "btn-white"
                        }`}
                        onClick={() => setUserType(0)}
                      >
                        Particulares
                      </button>
                      <button
                        className={`btn btn-sm me-1 border ${
                          userType === 1 ? "btn-primary" : "btn-white"
                        }`}
                        onClick={() => setUserType(1)}
                      >
                        Agentes
                      </button>
                      <button
                        className={`btn btn-sm me-1 border ${
                          userType === 2 ? "btn-primary" : "btn-white"
                        }`}
                        onClick={() => setUserType(2)}
                      >
                        Agencias
                      </button>
                    </div>
                    {/* Chat List */}
                    {messageData.length > 0 && (
                      <div className="chat-list"  style={{
      maxHeight: "320px", // approx 4 items height
      overflowY: "auto",
    }}>
                        {messageData.map((item, index) => (
                          <div
                            className={`d-flex align-items-center justify-content-between p-2 rounded  position-relative chat-list-item ${
                              activeChatId === item.id ? "active" : ""
                            } mb-2`}
                            key={item.id}
                            onClick={() => setActiveChatId(item.id)}
                          >
                            <div className="d-flex align-items-center">
                              {/* <img
                            src="img/my-img/my-msg-profile.png"
                            className="chat-avatar me-2"
                            alt="avatar"
                          /> */}
                              {[
                                ...(item?.customer?.agencyDetails || []),
                                ...(item?.customer?.agentDetails || []),
                                ...(item?.customer?.userDetails || []),
                              ].map((i, index) => (
                                <img
                                  key={index}
                                  src={i.photoUrl}
                                  alt="profile"
                                  className="chat-avatar me-2"
                                  style={{ width: "45px", height: "45px" }}
                                />
                              ))}
                              <span className="status-dot dot-away" />
                              <div>
                                <div className="fw-bold">
                                  {item?.customer?.name}
                                </div>
                                <div
                                  className="text-muted"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {item?.message}
                                </div>
                              </div>
                            </div>
                            <div className="text-end">
                              <div className="text-muted small">18:31</div>
                              <div className="d-flex align-items-center justify-content-end">
                                {/* <i className="bi bi-pin-angle-fill text-secondary me-1" /> */}
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
                        ))}

                        {/* <div className="d-flex align-items-center justify-content-between p-2 rounded chat-list-item mb-2" onClick={() => setSelectedChat(item)}>
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
                      <div className="d-flex align-items-center justify-content-between p-2 rounded chat-list-item mb-2" onClick={() => setSelectedChat(item)}>
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
                      </div> */}
                      </div>
                    )}
                  </div>
                </div>
                {/* Chat Panel */}
                {/* <div className="col-md-8 d-flex flex-column justify-content-between">
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
                  <div className="flex-grow-1" />
                  <div className="d-flex align-items-center mt-3 p-3">
                    <input
                      type="text"
                      className="message-input me-2"
                      placeholder="Escriba su mensaje..."
                    />
                    <button className="send-button">Enviar</button>
                  </div>
                </div> */}
{loading2 ? (
  <Loading style={{ bottom: "200px",left:"200px",position: "relative" }} />
) : messageDataId.length > 0 ? (
  <Fragment>
    {messageDataId.map((item) => (
      <div
        className="col-md-8 d-flex flex-column justify-content-between"
        key={item.id}
      >
        <div className="row chat-panel border-bottom p-3">
          <div className="col-lg-6">
            <div className="d-flex align-items-center">
              {[
                ...(item?.customer?.agencyDetails || []),
                ...(item?.customer?.agentDetails || []),
                ...(item?.customer?.userDetails || []),
              ].map((i, index) => (
                <img
                  key={index}
                  src={i.photoUrl}
                  alt="profile"
                  className="chat-avatar me-2"
                  style={{ width: "70px", height: "70px" }}
                />
              ))}
              <h6 className="mb-0">{item?.customer?.name}</h6>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="ad-title">
              <h6 className="mb-0 me-3">{item?.property?.name}</h6>
              <img
                src={item?.property?.images[0]}
                className="chat-photo"
                alt="property"
                style={{ width: "124.5px", height: "70px" }}
              />
            </div>
          </div>
        </div>
        <div className="flex-grow-1" />
        <div className="d-flex align-items-center mt-3 p-3">
          <input
            type="text"
            className="message-input me-2"
            placeholder="Escriba su mensaje..."
          />
          <button className="send-button">Enviar</button>
        </div>
      </div>
    ))}
  </Fragment>
) : (
  <p className="text-center my-4">No messages found</p>
)}

              </div>
            </div>
          </section>

          <Footer />
        </main>
           </Fragment>
                )}
      </div>
    </Fragment>
  );
};

export default Messages;
