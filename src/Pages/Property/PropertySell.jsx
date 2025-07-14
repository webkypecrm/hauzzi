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
import call from "../../assets/img/blackCall.png";
import mail from "../../assets/img/blackMail.png";
import { toast } from "react-toastify";

const PropertySell = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
    const [compareLoaded, setCompareLoaded] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const token2 = localStorage.getItem("token");
  const customerId2 = localStorage.getItem("tokenId") || "";

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

  // Wishlist Api
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/property/getWishlist/${customerId2}`,
          {
            headers: { Authorization: `Bearer ${token2}` },
          }
        );

        const ids = Array.isArray(res?.data?.data)
          ? res?.data?.data.map((item) =>
              typeof item === "object" && item !== null
                ? Number(item.id)
                : Number(item)
            )
          : [];
        console.log("wishlistID", ids);

        setWishlistIds(ids);
      } catch (err) {
        setWishlistIds([]);
      } finally {
        setWishlistLoaded(true);
      }
    };

    if (customerId2) fetchWishlist();
  }, [customerId2]);

  const handelWishlist = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/addToWishlist/${customerId2}-${id}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );

      toast.success(response.data.message);

      setWishlistIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

   // compair api
    useEffect(() => {
      const fetchCompareList = async () => {
        try {
          const res = await axios.get(
            `${apiUrl}/property/getCompare/${customerId2}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
  
          const ids = Array.isArray(res?.data?.data)
            ? res?.data?.data.map((item) =>
                typeof item === "object" && item !== null
                  ? Number(item.id)
                  : Number(item)
              )
            : [];
  
          console.log("compareIDs", ids);
  
          setCompareIds(ids);
        } catch (err) {
          setCompareIds([]);
        } finally {
          setCompareLoaded(true);
        }
      };
  
      if (customerId2) fetchCompareList();
    }, [customerId2]);
  
    const handleCompare = async (id) => {
      try {
        const response = await axios.get(
          `${apiUrl}/property/addToCompare/${customerId2}-${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("first", response.data);
  
        toast.success(response.data.message);
  
        // Toggle logic
        setCompareIds((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
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
                    <div className="fil7"  onClick={() => setShowFilter(true)} style={{transition:"0.5 linear"}}>
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
                            <option>Más barato</option>
                            <option>Más caro</option>
                            <option>Más barato (USD/m²)</option>
                            <option>Más grande (más m²)</option>
                            <option>Más pequeño (menos m²)</option>
                            <option>Más antigüo</option>
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
                                  // to={`/propert-details/${e.id}`}
                                  to={""}
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
                                        key={compareIds.join(",")}
                                        className="fa fa-exchange"
                                        onClick={() => handleCompare(e?.id)}
                                        style={{
                                          color: compareIds.includes(
                                            Number(e?.id)
                                          )
                                            ? "red"
                                            : "gray",
                                        }}
                                      />
                                        </li>{" "}
                                        <li
                                          className="list-inline-item"
                                          style={{ background: "unset" }}
                                        >
                                          <i
                                            className="fa fa-heart hrt-icon"
                                            aria-hidden="true"
                                            onClick={() =>
                                              handelWishlist(e?.id)
                                            }
                                            style={{
                                              color: wishlistIds.includes(e?.id)
                                                ? "red"
                                                : "",
                                            }}
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
                                          $
                                          {e.maxPrice
                                            ? Number(
                                                e.maxPrice
                                              ).toLocaleString()
                                            : Number(
                                                e.rentalPrice
                                              ).toLocaleString()}
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
                                        <img src={mail} width="25%" />
                                        Email{" "}
                                      </Link>
                                      <Link
                                        className="btn-getstarted gt"
                                        to="#"
                                      >
                                        <img src={call} width="25%" />
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
                        {/* filters sidebar */}
                        <div className={`sidebar-filter ${showFilter ? 'active' : ''} p-0`}style={{zIndex: 1102}}>
<div className="container">
  <div className="row justify-content-center">
    <div className="main-contaionet shadow-sm position-relative">
      <div className="cross-section-decoayon ">
  <span onClick={() => setShowFilter(false)}>
    <svg
      width={30}
      height={30}
      viewBox="0 0 37 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.45 12.15L13.55 20.85M13.55 12.15L23.45 20.85M35 16.5C35 24.5081 27.6127 31 18.5 31C9.3873 31 2 24.5081 2 16.5C2 8.49187 9.3873 2 18.5 2C27.6127 2 35 8.49187 35 16.5Z"
        stroke="#FFBD59"
        style={{
          stroke: "color(display-p3 1.0000 0.7412 0.3490)",
          strokeOpacity: 1
        }}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</div>

      <div className="mb-3">
        <h5>Transacción</h5>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="comprar"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="comprar">
              Comprar
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="alquilar"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="alquilar">
              Alquilar
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h5>Condición</h5>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="nueva"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="nueva">
              Obra nueva
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Reformado"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Reformado">
              Reformado
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="estado"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="estado">
              Buen estado
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="reformar"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="reformar">
              A reformar
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h5>Tipo de inmueble</h5>
        <div className="d-flex align-items-center gap-2 flex-wrap flex-wrap">
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="todos"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="todos">
              Todos
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="apartamentos"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="apartamentos">
              Apartamentos
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="casas"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="casas">
              Casas
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="locales"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="locales">
              Locales
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="haciendas"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="haciendas">
              Haciendas y fincas
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="habitaciones"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="habitaciones">
              Habitaciones
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="anexos"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="anexos">
              Anexos
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="edificios"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="edificios">
              Edificios
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="townhouses"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="townhouses">
              Townhouses
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="terrenos"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="terrenos">
              Terrenos
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="galpones"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="galpones">
              Galpones
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="oficinas"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="oficinas">
              Oficinas
            </label>
          </div>
        </div>
      </div>
      {/* Precio y Superficie */}
      <div className="row gy3 mb-3">
        <div className="col-md-6">
          <div className="section-title">Precio</div>
          <div className="row g-2">
            <div className="col">
              <label htmlFor="">Mínimo</label>
              <select className="form-select mt-2">
                <option selected="">Indiferente</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="">Máximo</label>
              <select className="form-select mt-2">
                <option selected="">Indiferente</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="section-title">Superficie</div>
          <div className="row g-2">
            <div className="col">
              <label htmlFor="">Mínimo</label>
              <select className="form-select mt-2">
                <option selected="">Indiferente</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="">Máximo</label>
              <select className="form-select mt-2">
                <option selected="">Indiferente</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3 gy-3 justify-content-between">
        <div className="col-12">
          <h5>Habitaciones</h5>
          <div className="btn-group property-categories w-100" role="group">
            {/* Todo styled as static orange button */}
            <label className="btn btn-orange d-flex align-items-center">
              Todo
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="property1"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="property1">
              <span>+1</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="property2"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="property2">
              <span>+2</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="property3"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="property3">
              <span>+3</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="property4"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="property4">
              <span>+4</span>
            </label>
          </div>
          <div className="form-check form-switch d-flex justify-content-between mt-3 p-0">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Indica el número exacto de habitaciones.
            </label>
            <input
              className="form-check-input  new-border-clr"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
        <div className="col-12">
          <h5>Baños</h5>
          <div className="btn-group property-categories w-100" role="group">
            {/* Todo styled as static orange button */}
            <label className="btn btn-orange d-flex align-items-center">
              Todo
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos1"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos1">
              <span>+1</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos2"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos2">
              <span>+2</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos3"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos3">
              <span>+3</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos4"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos4">
              <span>+4</span>
            </label>
          </div>
          <div className="form-check form-switch d-flex justify-content-between mt-3 p-0">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Indica el número exacto de habitaciones.
            </label>
            <input
              className="form-check-input new-border-clr"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
        <div className="col-12">
          <h5>Estacionamientos</h5>
          <div className="btn-group property-categories w-100" role="group">
            {/* Todo styled as static orange button */}
            <label className="btn btn-orange d-flex align-items-center">
              Todo
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos1"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos1">
              <span>+1</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos2"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos2">
              <span>+2</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos3"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos3">
              <span>+3</span>
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="propertyCategory"
              id="banos4"
              autoComplete="off"
            />
            <label className="btn Habitaciones" htmlFor="banos4">
              <span>+4</span>
            </label>
          </div>
          <div className="form-check form-switch d-flex justify-content-between mt-3 p-0">
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Indica el número exacto de habitaciones.
            </label>
            <input
              className="form-check-input new-border-clr"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h5>Mobiliario</h5>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Amueblado"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Amueblado">
              Amueblado
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Semiamueblado"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Semiamueblado">
              Semiamueblado
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="amueblado"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="amueblado">
              No amueblado
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h5>Publicado por</h5>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="nmobiliaria"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="nmobiliaria">
              Agencia inmobiliaria
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Agente-in"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Agente-in">
              Agente inmobiliario
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Particular"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Particular">
              Particular
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Constructor"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Constructor">
              Constructor o promotor
            </label>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-lg-6">
          <label htmlFor="">Antigüedad</label>
          <select className="form-select mt-2">
            <option selected="">Indiferente</option>
          </select>
        </div>
        <div className="col-lg-6">
          <label htmlFor="">Tipo de suelo</label>
          <select className="form-select mt-2">
            <option selected="">Indiferente</option>
          </select>
        </div>
        <div className="col-lg-6">
          <label htmlFor="">Vistas</label>
          <select className="form-select mt-2">
            <option selected="">Indiferente</option>
          </select>
        </div>
        <div className="col-lg-6">
          <label htmlFor="">Orientación</label>
          <select className="form-select mt-2">
            <option selected="">Indiferente</option>
          </select>
        </div>
      </div>
      <div className="row mb-3 mt-3">
        <h5 className="">Seguridad</h5>
        <div className="col-lg-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="alarma" />
            <label className="form-check-label" htmlFor="alarma">
              Alarma
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="vigilancia" />
            <label className="form-check-label" htmlFor="vigilancia">
              Vigilancia
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="sistema-de-videointercomunicador" />
            <label className="form-check-label" htmlFor="sistema-de-videointercomunicador">
              Sistema de videointercomunicador
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="cctv"
            />
            <label className="form-check-label" htmlFor="cctv">
              Cámaras de vigilancia (CCTV)
            </label>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="cerco-eléctrico" />
            <label className="form-check-label" htmlFor="cerco-eléctrico">
              Cerco eléctrico
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="cerco-perimetral" />
            <label className="form-check-label" htmlFor="cerco-perimetral">
              Cerco perimetral
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="portón-eléctrico" />
            <label className="form-check-label" htmlFor="portón-eléctrico">
              Portón eléctrico
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="iluminación-de-seguridad" />
            <label className="form-check-label" htmlFor="iluminación-de-seguridad">
              Iluminación de seguridad
            </label>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="sistema-contra-incendios" />
            <label className="form-check-label" htmlFor="sistema-contra-incendios">
              Sistema contra incendios
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="caja-fuerte" />
            <label className="form-check-label" htmlFor="caja-fuerte">
              Caja fuerte
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="puerta-blindada"
            />
            <label className="form-check-label" htmlFor="puerta-blindada">
              Puerta blindada
            </label>
          </div>
        </div>
      </div>
      <div className="row mb-3 mt-3">
        <h5 className="">Ambientes</h5>
        <div className="col-lg-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="piscina" />
            <label className="form-check-label" htmlFor="piscina">
              Piscina
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="barbacoa" />
            <label className="form-check-label" htmlFor="barbacoa">
              Área de barbacoa/parrillera
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="estudio" />
            <label className="form-check-label" htmlFor="estudio">
              Estudio u oficina
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="cuarto-servicio"
            />
            <label className="form-check-label" htmlFor="cuarto-servicio">
              Cuarto de servicio
            </label>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="patio" />
            <label className="form-check-label" htmlFor="patio">
              Patio
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="mascotas" />
            <label className="form-check-label" htmlFor="mascotas">
              Área para mascotas
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="canchas" />
            <label className="form-check-label" htmlFor="canchas">
              Canchas de usos múltiples
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="eventos" />
            <label className="form-check-label" htmlFor="eventos">
              Salón de eventos
            </label>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="jacuzzi" />
            <label className="form-check-label" htmlFor="jacuzzi">
              Jacuzzi
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="jardines" />
            <label className="form-check-label" htmlFor="jardines">
              Jardines o áreas verdes
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="sala-reuniones"
            />
            <label className="form-check-label" htmlFor="sala-reuniones">
              Sala de reuniones
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="cine" />
            <label className="form-check-label" htmlFor="cine">
              Área de cine
            </label>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h5>Extras</h5>
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="Negociable"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="Negociable">
              Negociable
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="financiamiento"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="financiamiento">
              Acepta financiamiento
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="compra"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="compra">
              Opción a compra
            </label>
          </div>
          <div className="new-container-box">
            <input
              type="checkbox"
              className="btn-check"
              id="intercambio"
              autoComplete="off"
            />
            <label className="Transacción" htmlFor="intercambio">
              Opción de intercambio
            </label>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center gap-3 ">
        <button className="Resetear-filtros border-0">Aplicar filtros</button>
        <button className="Resetear-filtros2 border-0">Resetear filtros</button>
      </div>
    </div>
  </div>
</div>

</div>

                  {/* filters sidebar */}
    </Fragment>
  );
};

export default PropertySell;
