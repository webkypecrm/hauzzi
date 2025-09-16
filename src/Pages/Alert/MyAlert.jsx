import React, { Fragment, useEffect, useState } from "react";
import { Tooltip } from "bootstrap";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MyAlert = () => {
  const [folderPopup, setFolderPopup] = useState(false);
  const [alertData, setAlertData] = useState([]);
  const [alertId, setAlertId] = useState(null);
  const [editData, setEditData] = useState([]);

  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId");
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  // create Alert
  const initialForm = {
    name: "",
    location: "",
    budget: "",
    bedrooms: "",
    bathrooms: "",
  };
  const [formData, setFormData] = useState(initialForm);

  // const handelInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };
  const handelInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "number"
          ? value === "" // agar empty hai to string rakho
            ? ""
            : Number(value)
          : value,
    });
  };

  const createAlert = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/property/createAlert`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res?.data?.message);
      setFormData(initialForm); // reset form after submit
      setFolderPopup(false);
      getAlert();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // get alert
  const getAlert = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/property/listAlerts?customerId=${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlertData(res?.data?.data);
      console.log("res", res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getAlert();
  }, []);

  // delete alert
  const deleteAlert = async (id) => {
    const confirmDiscart = window.confirm(
      "Are you sure you want to eliminar this Alert?"
    );

    if (!confirmDiscart) return;
    try {
      const res = await axios.delete(`${apiUrl}/property/deleteAlert/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res?.data?.message);
      getAlert();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // edit alert
  // const editAlert = async (id) => {
  //   try {
  //     const res = await axios.get(`${apiUrl}/property/listAlerts?id=${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = res?.data?.data;
  //     setFormData({
  //       name: data?.name || "",
  //       location: data?.location || "",
  //       budget: Number(data.budget) || 0,
  //       bedrooms: Number(data.bedrooms) || 0,
  //       bathrooms: Number(data.bathrooms) || 0,
  //     });
  //     setAlertId(id);
  //     setFolderPopup(true);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //   }
  // };

  // update alert
  const updateAlert = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${apiUrl}/property/updateAlert/${alertId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      setFolderPopup(false);
      setFormData(initialForm);
      setAlertId(null);
      getAlert();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // alert for mail
  const alertForMail = async (ID) => {
    try {
      const res = await axios.post(
        `${apiUrl}/property/processAlert-with-id/${ID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

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
              {alertData?.length > 0 && (
                <div className="row gy-4 mb-5">
                  {alertData?.map((item, index) => (
                    <div className="col-lg-4" key={index}>
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
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() => {
                                          setFormData({
                                            name: item?.name || "",
                                            location: item?.location || "",
                                            budget: item?.budget || "",
                                            bedrooms: item?.bedrooms || "",
                                            bathrooms: item?.bathrooms || "",
                                          });
                                          setAlertId(item?.id);
                                          setFolderPopup(true);
                                        }}
                                      >
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
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() => deleteAlert(item?.id)}
                                      >
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
                          <h5 className="card-title mb-2">{item?.name}</h5>
                          <p className="card-subtitle mb-2 text-muted">
                            Caracteristicas de la alerta{" "}
                          </p>
                          <p className="card-subtitle mb-2 text-muted">
                            Ubicación : {item?.location}
                          </p>
                          <p className="card-subtitle mb-2 text-muted">
                            Presupuesto : {item?.budget}
                          </p>
                          <p className="card-subtitle mb-2 text-muted">
                            Dormitorios : {item?.bedrooms}
                          </p>
                          <p className="card-subtitle mb-2 text-muted">
                            Baños : {item?.bathrooms}
                          </p>
                        </div>
                        <div className="card-footer bg-transparent">
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
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      alertForMail(item?.id);
                                    }
                                  }}
                                />
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
                  ))}
                </div>
              )}
              <div className="text-center">
                <h6 className="fw-bold mb-3">
                  ¿Deseas crear una nueva alerta?
                </h6>
                <button
                  className="btn btn-primary w-auto btn-sm"
                  onClick={() => {
                    setFolderPopup(true),
                      setFormData(initialForm),
                      setAlertId(null);
                  }}
                >
                  {" "}
                  Crear alerta <i className="bi bi-arrow-right ms-1" />
                </button>
              </div>
            </div>
          </section>

          {/* MODAL */}
          {folderPopup && (
            <div className="popup-overlay">
              <div
                className="popup-content"
                // onClick={(e) => e.stopPropagation()}
              >
                <div className="d-flex justify-content-between mb-2">
                  <h5>Crear alerta</h5>
                  <img
                    src="img/my-img/X-circle.png"
                    alt=""
                    style={{
                      height: "20px",
                      width: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => setFolderPopup(false)}
                  />
                </div>
                {/* <form onSubmit={createAlert}>
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handelInputChange}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Location"
                      name="location"
                      value={formData.location}
                      onChange={handelInputChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handelInputChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handelInputChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handelInputChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      className="cancelar-btn"
                      onClick={() => setFolderPopup(false)}
                    >
                      Cancelar
                    </button>
                    <button className="crear-btn" type="submit">
                      Crear
                    </button>
                  </div>
                </form> */}
                <form onSubmit={alertId ? updateAlert : createAlert}>
                  <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handelInputChange}
                    />
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Location"
                      name="location"
                      value={formData.location}
                      onChange={handelInputChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handelInputChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Bathrooms"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handelInputChange}
                    />
                    <input
                      type="number"
                      className="form-control mb-2"
                      placeholder="Budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handelInputChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      className="cancelar-btn"
                      type="button"
                      onClick={() => {
                        setFolderPopup(false);
                        setAlertId(null);
                        setFormData(initialForm);
                      }}
                    >
                      Cancelar
                    </button>
                    <button className="crear-btn" type="submit">
                      {alertId ? "Actualizar" : "Crear"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* edit */}

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default MyAlert;
