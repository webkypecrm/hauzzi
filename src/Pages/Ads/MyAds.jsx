import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "bootstrap";
import axios from "axios";
import Loading from "../../Loading";

const MyAds = () => {
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const token2 = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";
  const navigate = useNavigate();

  const handelNavigate = (id) => {
    navigate(`/edit-propert/${id}`);
  };

  // console.log("getData", adsData);
  const draftAds = adsData?.data?.filter((item) => item.isDraft);
  const getAdsData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/property/property?customerId=${customerId}&isDraft=${draftAds}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("res", response);
      setAdsData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // delete ads
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Property?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${apiUrl}/property/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      });
      getAdsData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const dropdownElement = document.getElementById("dropdownMenuButton");
    if (dropdownElement) {
      new Dropdown(dropdownElement);
    }
    getAdsData();
  }, []);

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
                <div className="container py-3">
                  {/* Navigation */}
                  <div className="d-flex flex-wrap justify-content-center mb-4 ">
                    <Link to={"/publish-propert"} className="nav-button ">
                      Publicar inmueble
                    </Link>
                    <Link to={"/myads"} className="nav-button active">
                      Mis anuncios
                    </Link>
                    <Link to={"/myfavoriets"} className="nav-button">
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

                  {adsData?.data?.length > 0 ? (
                    <div className="row">
                      {adsData?.data?.map((e) => (
                        <div className="col-lg-4 col-md-4" key={e.id}>
                          <div className="feat_property">
                            <Link to={`/propert-details/${e.id}`} state={{
                                  lat: e.latitude,
                                  lng: e.longitude,
                                  name: e.name,
                                  image: e.images[0],
                                  allProducts: adsData.data,
                                }}>
                            <div className="thumb">
                              <img
                                className="img-whp"
                                src={e.images[0]}
                                alt="fp1.jpg"
                              />
                              <div className="thmb_cntnt">
                                <ul className="tag mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>{e.purpose}</span>
                                  </li>{" "}
                                  <li className="list-inline-item">
                                    <span>{e.tags}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            </Link>
                            <div className="details">
                              <Link to={`/propert-details/${e.id}`} state={{
                                  lat: e.latitude,
                                  lng: e.longitude,
                                  name: e.name,
                                  image: e.images[0],
                                  allProducts: adsData.data,
                                }}>
                              <div className="tc_content">
                                <div className="title-price">
                                  <h4 className="line-clamp-1">{e.name}</h4>
                                  <span className="fp_price">
                                    {/* ${e.maxPrice} */}
                                    ${e.maxPrice ? e.maxPrice : e.rentalPrice}
                                  </span>
                                </div>
                                <p className="line-clamp-1">
                                  <img src="img/my-img/vector.png" />{" "}
                                  <span style={{ marginLeft: 5 }}>
                                    {e.address1}
                                  </span>
                                </p>
                                <ul className="prop_details mb-0 p-0">
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/icon.png" />{" "}
                                      {e?.listingDetails?.Habitaciones} Hab.{" "}
                                    </span>
                                  </li>{" "}
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/Vector_1.png" />{" "}
                                      {e?.listingDetails?.Baños} Baños{" "}
                                    </span>
                                  </li>{" "}
                                  <li className="list-inline-item">
                                    <span>
                                      <img src="img/my-img/icon_1.png" />{" "}
                                      {e?.propertySize || e?.maxSize} m2{" "}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              </Link>
                              <div className="d-flex align-items-center p-2 border-top">
                                <button className="btn highlight-btn d-flex align-items-center me-2">
                                  <i className="bi bi-star-fill me-2" />{" "}
                                  Destacar anuncio
                                </button>
                                <div className="view-counter">
                                  <i className="bi bi-eye" /> Visto: {e.views}
                                </div>
                                <button className="icon-btn ms-2" onClick={() => handelNavigate(e.id)}>
                                  <i className="bi bi-pencil-square" />
                                </button>
                                <button
                                  className="icon-btn ms-2"
                                  onClick={() => handleDelete(e.id)}
                                >
                                  <i className="bi bi-trash" />
                                </button>

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
                                          alt="Share"
                                        />{" "}
                                        Compartir
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <img
                                          src="img/my-img/sold-icon.png"
                                          className="me-2"
                                          alt="Sold"
                                        />{" "}
                                        Vendido
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <img
                                          src="img/my-img/rented-icon.png"
                                          className="me-2"
                                          alt="Rented"
                                        />{" "}
                                        Alquilado
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <img
                                          src="img/my-img/deactivate-icon.png"
                                          className="me-2"
                                          alt="Deactivate"
                                        />{" "}
                                        Desactivar
                                      </Link>
                                    </li>
                                    <li>
                                      <Link className="dropdown-item" to="#">
                                        <img
                                          src="img/my-img/print-icon.png"
                                          className="me-2"
                                          alt="Print"
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
                      ))}
                    </div>
                  ) : (
                    <div>No ads found</div>
                  )}
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

export default MyAds;
