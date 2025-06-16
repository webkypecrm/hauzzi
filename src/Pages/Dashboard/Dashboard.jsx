import React, { Fragment, use, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const Dashboard = () => {
  const [imageSrc, setImageSrc] = useState("img/my-img/dash-profile.png");
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";

  const getAllData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/profile/getById/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("first", allData);

  useEffect(() => {
    getAllData();
  }, []);

  const profileImg = allData?.userDetails?.map((item) => item.photoUrl);
  const photo = allData?.userDetails?.map((item) => item.photo);

// logout
const navigate = useNavigate();

 const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/employee/employeeLogOut`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("token");
        toast.success("Logout successful!");
        navigate("/login");
      } else {
        toast.error("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // toast.error("Something went wrong during logout.");
      toast.error(error.response.data.message);
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
                  <div className="row mb-4">
                    <div className="profile-container">
                      <div className="profile-pic-wrapper">
                        {photo == "" ? (
                          <img src={imageSrc} alt="Profile" id="profileImage" />
                        ) : (
                          <img
                            src={profileImg}
                            alt="Profile"
                            id="profileImage"
                          />
                        )}

                        {/* <label htmlFor="fileInput" className="edit-icon">
                      <img src="img/my-img/gallery-edit.svg" alt="Edit" />
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={handleImageUpload}
                    /> */}
                      </div>
                      {allData?.name == "" ? (
                        <div className="name-label">Jhon Doe </div>
                      ) : (
                        <div className="name-label">
                          {allData?.name} (
                          {allData?.userType == "0"
                            ? "Usuario"
                            : allData?.userType == "1"
                            ? "Agente"
                            : "Inmobiliaria"}
                          )
                          {/* <img src="img/my-img/brush.svg" className="pen-icon" /> */}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row g-4">
                    <div className="col-lg-4 col-md-4">
                      <Link to="/publish-propert">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/buildings-2.png"
                            className="mb-2"
                          />
                          <h6 className="card-text-title">Publicar inmueble</h6>
                          <p className="card-text-subtitle">
                            Publica gratis tu anuncio
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/myads">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/home-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">Mis anuncios</h6>
                          <p className="card-text-subtitle">
                            Edita tus anuncios
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/myfavoriets">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/heart-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">Mis favoritos</h6>
                          <p className="card-text-subtitle">
                            Consulta tu lista de favoritos
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/myalert">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/bell-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">Mis alertas</h6>
                          <p className="card-text-subtitle">
                            Gestiona tus alertas
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/mymessages">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/chat-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">Mis mensajes</h6>
                          <p className="card-text-subtitle">
                            Chatea fácilmente
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/mycomparisons">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/arrow-swap-horizontal.png"
                            className="mb-2"
                          />
                          <h6 className="card-text-title">Mis comparaciones</h6>
                          <p className="card-text-subtitle">
                            Compara tus inmuebles
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/myvisit">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/eye-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">Mis visitas</h6>
                          <p className="card-text-subtitle">
                            Gestiona tus visitas
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="/myprofile">
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/user-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">Mi perfil</h6>
                          <p className="card-text-subtitle">
                            Tus datos, contraseña, consentimientos y ajustes
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-4 col-md-4">
                      <Link to="" onClick={handleLogout}>
                        <div className="inmueble-card">
                          <img
                            src="img/my-img/user-icon.png"
                            className="icon-wrapper mb-2"
                          />
                          <h6 className="card-text-title">log out</h6>
                          {/* <p className="card-text-subtitle">
                            Tus datos, contraseña, consentimientos y ajustes
                          </p> */}
                        </div>
                      </Link>
                    </div>

                    <div className="col-lg-12 col-md-12 text-center">
                      <p className="fw-bold">
                        ¿Deseas realizar una nueva búsqueda?
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary w-auto text-capitalize d-flex m-auto align-items-end"
                      >
                        Iniciar nueva búsqueda{" "}
                        <i className="bi bi-arrow-right ms-3"></i>
                      </button>
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

export default Dashboard;
