import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import map1 from "../../assets/img/my-img/map1.png";
import filter_1 from "../../assets/img/my-img/filter_1.png";
import filter_2 from "../../assets/img/my-img/filter_2.png";
import filter_3 from "../../assets/img/my-img/filter_3.png";
import PropertyMap from "../Property/PropertyMap";
import hauzzi from "../../assets/img/hauzziIcon.png";

const PropertySell = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";

  // const { search } = useParams();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const purpose = searchParams.get("purpose");
  const customerId = searchParams.get("customerId");

  const getAllData = async () => {
    setLoading(true);
    try {
      let url = `${apiUrl}/property/property?isDraft=false`;
      if (search) url += `&search=${search}`;
      if (type) url += `&type=${type}`;
      if (category) url += `&category=${category}`;
      if (purpose) url += `&purpose=${purpose}`;
      if (customerId) url += `&customerId=${customerId}`;

      // category=Hotels
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllData(response.data);
      setCount(response?.data?.totalcount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("allData", allData);

  useEffect(() => {
    getAllData();
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
            <main className="main top-btn12">
              <section className="filter">
                <div className="container">
                  <div className="main-filter">
                    <div className="fil1">
                      <div className="form-group">
                        <select className="form-control" id="sel1">
                          <option>Comprar</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                    </div>
                    <div className="fil2">
                      <div className="form-group">
                        <select className="form-control" id="sel1">
                          <option>Tipo de propiedad</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                    </div>
                    <div className="fil3">
                      <div className="form-group">
                        <select className="form-control" id="sel1">
                          <option>Estados</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                    </div>
                    <div className="fil4">
                      <div className="form-group">
                        <select className="form-control" id="sel1">
                          <option>Ciudades</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                    </div>
                    <div className="fil5">
                      <Link className="btn-getstarted" to="#">
                        <i className="fa fa-bell" style={{ marginRight: 8 }} />
                        Guardar búsqueda{" "}
                      </Link>
                    </div>
                    <div className="fil6">
                      <p className="mb-0">
                        {" "}
                        ¿Necesita más opciones de búsqueda?
                      </p>
                    </div>
                    <div className="fil7">
                      <img src={filter_1} alt="filter" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="container">
                  <div className="row">
                    <div className="col-md-5">
                      <div style={{ position: "sticky", top: "100px" }}>
                        <PropertyMap />
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="top-f">
                        <div className="left1">
                          <p className="mb-0">Total de inmuebles: {count}</p>
                        </div>
                        <div className="right">
                          <p className="mb-0">Ordenar:</p>
                          <select className="form-control" id="sel1">
                            <option>Más recientes</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                          <img src={filter_2} style={{ marginLeft: 10 }} />
                          <img src={filter_3} style={{ marginLeft: 10 }} />
                        </div>
                      </div>
                      {allData?.data?.length > 0 ? (
                        <div className="row gy-4 mt-4">
                          {allData?.data?.map((e) => (
                            <div className="col-xl-6 col-md-6" key={e.id}>
                              <Link to="#"></Link>
                              <div
                                className="feat_property"
                                style={{ height: "427px" }}
                              >
                                <Link
                                  to={`/propert-details/${e.id}`}
                                  state={{
                                    lat: e.latitude,
                                    lng: e.longitude,
                                    name: e.name,
                                    image: e.images[0],
                                    allProducts: allData.data,
                                  }}
                                >
                                  <div className="thumb">
                                    <img
                                      className="img-whp"
                                      src={e.images[0]}
                                      alt="fp1.jpg"
                                      style={{ width: "100%" }}
                                    />
                                    <div className="thmb_cntnt">
                                      <ul className="tag mb0 p-0">
                                        <li className="list-inline-item">
                                          <span>{e.purpose}</span>
                                        </li>{" "}
                                        <li className="list-inline-item">
                                          <span>{e.tags}</span>
                                        </li>
                                      </ul>
                                      <ul className="icon mb0">
                                        <li className="list-inline-item">
                                          <i
                                            className="fa fa-exchange"
                                            style={{ color: "#999191" }}
                                          />
                                        </li>{" "}
                                        <li
                                          className="list-inline-item"
                                          style={{ background: "unset" }}
                                        >
                                          <i
                                            className="fa fa-heart"
                                            aria-hidden="true"
                                            style={{ color: "#FFBD59" }}
                                          />
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Link>
                                <div className="details">
                                  <Link
                                    to={`/propert-details/${e.id}`}
                                    state={{
                                      lat: e.latitude,
                                      lng: e.longitude,
                                      name: e.name,
                                      image: e.images[0],
                                      allProducts: allData.data,
                                    }}
                                  >
                                    <div
                                      className="tc_content"
                                      style={{ height: "150px" }}
                                    >
                                      <div className="title-price">
                                        <h4 className="line-clamp-2">
                                          {e.name}
                                        </h4>
                                        <span className="fp_price">
                                          {/* ${e.maxPrice} */}$
                                          {e.maxPrice
                                            ? e.maxPrice
                                            : e.rentalPrice}
                                        </span>
                                      </div>
                                      <p className="line-clamp-1">
                                        <img src="img/my-img/vector.png" />
                                        <span style={{ marginLeft: 5 }}>
                                          {e.address1}
                                        </span>
                                      </p>
                                      <ul className="prop_details mb0 p-0">
                                        <li className="list-inline-item">
                                          <span>
                                            <img src="img/my-img/icon.png" />{" "}
                                            {e?.listingDetails?.Habitaciones}{" "}
                                            Hab.{" "}
                                          </span>
                                        </li>
                                        <li className="list-inline-item">
                                          <span>
                                            <img src="img/my-img/Vector_1.png" />{" "}
                                            {e?.listingDetails?.Baños} Baños{" "}
                                          </span>
                                        </li>
                                        <li className="list-inline-item">
                                          <span>
                                            <img src="img/my-img/icon_1.png" />{" "}
                                            {e?.propertySize || e?.maxSize} m2{" "}
                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </Link>
                                  <div className="fp_footer d-flex">
                                    <Link
                                      to={`/propert-details/${e.id}`}
                                      state={{
                                        lat: e.latitude,
                                        lng: e.longitude,
                                        name: e.name,
                                        image: e.images[0],
                                        allProducts: allData.data,
                                      }}
                                    >
                                      <ul className="fp_meta float-left mb-0 p-0">
                                        <li className="list-inline-item">
                                          <span to="#">
                                            {/* <img
                                        src={e.Customer?.userDetails.map((item) => item.photoUrl)}
                                        src={e.Customer?.agentDetails.map((item) => item.photoUrl)}
                                          alt="poster"
                                          className="profile-pic"
                                          // style={{ borderRadius: "15px",padding:"4px" }}
                                    /> */}
                                            <img
                                              src={
                                                e.Customer?.userDetails?.[0]
                                                  ?.photoUrl ||
                                                e.Customer?.agentDetails?.[0]
                                                  ?.photoUrl ||
                                                e.Customer?.agencyDetails?.[0]
                                                  ?.photoUrl ||
                                                hauzzi
                                              }
                                              onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = hauzzi;
                                              }}
                                              alt="poster"
                                              className="profile-pic"
                                            />
                                            <span style={{ marginLeft: 5 }}>
                                              {e.Customer.name}
                                            </span>{" "}
                                          </span>
                                        </li>
                                      </ul>
                                    </Link>
                                    <div className="fp_pdate float-right d-flex">
                                      <Link to="#"></Link>
                                      <Link
                                        className="btn-getstarted gt"
                                        to="#"
                                      >
                                        <img
                                          src="img/my-img/vector_2.png"
                                          width="25%"
                                        />
                                        Email{" "}
                                      </Link>
                                      <Link
                                        className="btn-getstarted gt"
                                        to="#"
                                      >
                                        <img
                                          src="img/my-img/call.png"
                                          width="25%"
                                        />
                                        Llamar{" "}
                                      </Link>
                                      <Link to="">
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
                                                  alt="Share"
                                                />{" "}
                                                Compartir
                                              </Link>
                                            </li>
                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                to="#"
                                              >
                                                <i className="bi bi-trash me-2" />{" "}
                                                Descartar
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="container text-center">
                          <p>No Data found</p>
                        </div>
                      )}
                    </div>
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

export default PropertySell;
