import React, { Fragment, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import filter_1 from "../../assets/img/my-img/filter_1.png";
import PropertyMap from "../Property/PropertyMap";
import hauzzi from "../../assets/img/hauzziIcon.png";
import call from "../../assets/img/blackCall.png";
import mail from "../../assets/img/blackMail.png";
import { toast } from "react-toastify";
import link from "../../assets/img/link.png";
import twitter from "../../assets/img/twitter.png";
import getApi from "../../Hook.js";
import cancel from "../../assets/img/X-circle.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const PropertySell = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState("");
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [compareIds, setCompareIds] = useState([]);
  const [compareLoaded, setCompareLoaded] = useState(false);
  const [selectedSavedSearch, setSelectedSavedSearch] = useState("");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [savedSearchesData, setSavedSearchesData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocation2, setSelectedLocation2] = useState({
    country: "",
    state: "",
    city: "",
  });

  // filter
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const [purposeFilter2, setPurposeFilter2] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [typeFilter2, setTypeFilter2] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [advancedFilter, setAdvancedFilter] = useState({});

  const [wishlistFolderIds, setWishlistFolderIds] = useState([]);
  const [folderPopup, setFolderPopup] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [folderData, setFolderData] = useState([]);

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
      // let url = `${apiUrl}/property/getPropertiesSortedByActivePayment`;
      if (search) url += `&search=${search}`;
      // if (type) url += `&type=${type}`;
      if (typeFilter) {
        url += `&type=${typeFilter}`;
      } else if (typeFilter2) {
        url += `&type=${typeFilter2}`;
      } else if (type) {
        url += `&type=${type}`;
      }
      if (category) url += `&category=${category}`;
      // if (purpose) url += `&purpose=${purpose}`;
      if (purposeFilter) {
        url += `&purpose=${purposeFilter}`;
      } else if (purpose) {
        url += `&purpose=${purpose}`;
      } else if (purposeFilter2) {
        url += `&purpose=${purposeFilter2}`;
      }
      if (tagFilter) url += `&tags=${tagFilter}`;
      if (customerId) url += `&customerId=${customerId}`;
      if (minPrice) url += `&minPrice=${minPrice}`;
      if (maxPrice) url += `&maxPrice=${maxPrice}`;
      // 📌 LOCATION FILTERS
      if (selectedLocation2?.country)
        url += `&country=${selectedLocation2.country}`;
      if (selectedLocation2?.state) url += `&state=${selectedLocation2.state}`;
      if (selectedLocation2?.city) url += `&city=${selectedLocation2.city}`;

      if (Object.keys(advancedFilter).length > 0) {
        url += `&advancedFilter=${encodeURIComponent(
          JSON.stringify(advancedFilter)
        )}`;
      }

      // category=Hotels
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllData(response.data);
      setCount(response?.data?.totalcounts);
      setShowFilter(false);
      // 🔹 API ke baad filters reset
      setAdvancedFilter({
        Habitaciones: "",
        Banos: "",
        Condición: "",
        Estacionamientos: "",
        Mobiliario: "",
        Antigüedad: "",
        "Tipo de suelo": "",
        Orientación: "",
        Vistas: "",
        "Publicado por": "",
        Seguridad: "",
        Ambientes: "",
        Equipamientos: "",
        Servicios: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log("allData", allData);

  useEffect(() => {
    getAllData();
  }, [selectedLocation2, typeFilter2, purposeFilter2]);

  // Reusable function for any advanced filter checkbox group
  const handleAdvancedCheckboxChange = (category, value, checked) => {
    setAdvancedFilter((prev) => {
      let selectedValues = prev[category] ? prev[category].split(",") : [];

      if (checked) {
        if (!selectedValues.includes(value)) {
          selectedValues.push(value);
        }
      } else {
        selectedValues = selectedValues.filter((item) => item !== value);
      }

      return {
        ...prev,
        [category]: selectedValues.join(","), // Store as comma-separated string
      };
    });
  };

  // Wishlist Api
  useEffect(() => {
    if (!customerId2 || !token2) return;

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

    fetchWishlist();
  }, [customerId2, token2]);

  const handelWishlist = async (id) => {
    if (!token2) {
      toast.error("Please login first!");
      return;
    }
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

  // fatch foldet true/false
  const url = `${apiUrl}/profile/getById/${customerId2}`;
  const { data, error } = getApi(url);
  const folder = data?.isFolder;
  console.log("folder", folder);

  // folder options
  const getFolderData = async () => {
    if (!token2) return;
    try {
      const res = await axios.get(
        `${apiUrl}/property/get-Folders-byCustomerId?customerId=${customerId2}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      setFolderData(res?.data?.data);
      console.log("folderData", res?.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!token2 || !customerId) return;

    getFolderData();
  }, [token2, customerId]);

  // property add in folder
  useEffect(() => {
    if (!customerId || !token2) return;
    const fetchFolderProperty = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/property/getPropertyFolderData?customerId=${customerId2}`,
          {
            headers: { Authorization: `Bearer ${token2}` },
          }
        );

        const folderIds = Array.isArray(res?.data?.data)
          ? res?.data?.data.map((item) =>
              typeof item === "object" && item !== null
                ? Number(item.propertyId)
                : Number(item)
            )
          : [];
        // console.log("folderProperty", res?.data?.data);
        // console.log("folderPropertyids", folderIds);

        setWishlistFolderIds(folderIds);
      } catch (err) {
        setWishlistIds([]);
      } finally {
        setWishlistLoaded(true);
      }
    };

    fetchFolderProperty();
  }, [customerId, token2]);

  const handleAddFolder = async (pid) => {
    if (!token2) {
      toast.error("Please login first!");
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/property/addpropertyFolderData`,

        {
          propertyId: pid,
          folderId: Number(selectedFolderId),
          customerId: Number(customerId2),
        },
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );

      // Update UI instantly
      setWishlistFolderIds((prev) => [...prev, pid]);

      setFolderPopup(false);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setFolderPopup(false);
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

  // Discart Api
  const handleDiscart = async (id) => {
    const confirmDiscart = window.confirm(
      "Are you sure you want to descartar this Property?"
    );

    if (!confirmDiscart) return;
    try {
      const response = await axios.put(
        `${apiUrl}/property/property-discard/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response?.data?.message);
      getAllData();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleAdvancedSelectChange = (category, value) => {
    setAdvancedFilter((prev) => ({
      ...prev,
      [category]: value, // Direct value set karte hain dropdown ke liye
    }));
  };

  const handleAdvancedSingleCheckboxChange = (field, value) => {
    setAdvancedFilter((prev) => ({
      ...prev,
      [field]:
        value === "Todo"
          ? "" // "Todo" click hone par empty
          : prev[field] === value
          ? ""
          : value,
    }));
  };

  // Reset function
  const handleResetFilters = () => {
    setAdvancedFilter({
      Habitaciones: "",
      Banos: "",
      Condición: "",
      Estacionamientos: "",
      Mobiliario: "",
      Antigüedad: "",
      "Tipo de suelo": "",
      Orientación: "",
      Vistas: "",
      "Publicado por": "",
      Seguridad: "",
      Ambientes: "",
      Equipamientos: "",
      Servicios: "",
    });
    setTypeFilter("");
    setPurposeFilter("");
    setMaxPrice("");
    setMinPrice("");
    document
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = false));
  };

  // Type of property GET
  const getPropertyTypes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/category/getAllCategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPropertyTypes(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching property types:", error);
    }
  };
  useEffect(() => {
    getPropertyTypes();
  }, []);

  //  LOAD COUNTRIES (on page load)
  useEffect(() => {
    axios
      .get(`${apiUrl}/employee/allCountries`)
      .then((res) => setCountries(res.data?.data || []))
      .catch((err) => console.log(err));
  }, []);

  //  COUNTRY CHANGE → Load States
  const handleCountryChange = async (e) => {
    const countryId = e.target.value;
    setSelectedLocation2({ country: countryId, state: "", city: "" });

    setStates([]);
    setCities([]);

    if (!countryId) return;

    try {
      const res = await axios.get(`${apiUrl}/employee/allStates/${countryId}`);
      setStates(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  //  STATE CHANGE → Load Cities
  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setSelectedLocation2((prev) => ({ ...prev, state: stateId, city: "" }));

    setCities([]);

    if (!stateId) return;

    try {
      const res = await axios.get(`${apiUrl}/employee/allCities/${stateId}`);
      setCities(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // CITY CHANGE
  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedLocation2((prev) => ({ ...prev, city: cityId }));
  };

  // save search APIs
  const [savedSearchData, setSavedSearchData] = useState({
    purpose: "",
    type: "",
    countryId: null,
    stateId: null,
    cityId: null,
  });

  // Update saved search data when filters change
  useEffect(() => {
    setSavedSearchData({
      purpose: purposeFilter2 || "",
      type: typeFilter2 || "",
      countryId: selectedLocation2?.country || null,
      stateId: selectedLocation2?.state || null,
      cityId: selectedLocation2?.city || null,
    });
  }, [purposeFilter2, typeFilter2, selectedLocation2]);

  // Save search API - FIXED: Now properly called on click
  const handleSavedSearch = async () => {
    if (!token2) {
      toast.error("Please login first to save search!");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/property/addCustomerSavedSearch`,
        savedSearchData,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // Get Save Serch Data
  const getSavedSearch = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/getCustomerSavedSearch`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      setSavedSearchesData(response?.data?.data || []);
      console.log("firstResponse", response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSavedSearch();
  }, []);

  // filter for dropdown
  const handleSavedSearchSelect = (e) => {
    const id = e.target.value;

    setSelectedSavedSearch(id); // 🔥 dropdown me value show rahegi

    if (!id) return;

    const saved = savedSearchesData.find((item) => item.id == id);
    if (!saved) return;

    setPurposeFilter2(saved.purpose || "");
    setTypeFilter2(saved.type || "");

    setSelectedLocation2({
      country: saved.countryId || "",
      state: saved.stateId || "",
      city: saved.cityId || "",
    });
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
                        <select
                          className="form-select"
                          value={purposeFilter2}
                          onChange={(e) => setPurposeFilter2(e.target.value)}
                        >
                          <option>Transacción</option>
                          <option value="Vender">Comprar</option>
                          <option value="Alquilar">Alquilar</option>
                        </select>
                      </div>
                    </div>
                    <div className="fil2">
                      <div className="form-group">
                        <select
                          className="form-select"
                          value={typeFilter2}
                          onChange={(e) => {
                            setTypeFilter2(e.target.value);
                            getAllData({ typeFilter2: e.target.value });
                          }}
                        >
                          <option value="">Tipo de propiedad</option>
                          {propertyTypes.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="fil3">
                      <div className="form-group">
                        <select
                          className="form-select"
                          value={selectedLocation2?.country || ""}
                          onChange={handleCountryChange}
                        >
                          <option value="">País</option>
                          <option value="239">Venezuela</option>
                        </select>
                      </div>
                    </div>
                    <div className="fil3">
                      <div className="form-group">
                        <select
                          className="form-select"
                          value={selectedLocation2?.state || ""}
                          onChange={handleStateChange}
                          disabled={!states.length}
                        >
                          <option value="">Estados</option>
                          {states.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="fil4">
                      <div className="form-group">
                        <select
                          className="form-select"
                          value={selectedLocation2?.city || ""}
                          onChange={handleCityChange}
                          disabled={!cities.length}
                        >
                          <option value="">Ciudades</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="fil5">
                      <Link
                        className="btn-getstarted"
                        to="#"
                        onClick={handleSavedSearch}
                      >
                        <i className="fa fa-bell" style={{ marginRight: 8 }} />
                        Guardar búsqueda{" "}
                      </Link>
                    </div>
                    {/* <div className="fil6">
                      <p className="mb-0">
                        {" "}
                        ¿Necesita más opciones de búsqueda?
                      </p>
                    </div> */}
                    <div
                      className="fil7"
                      onClick={() => setShowFilter(true)}
                      style={{ transition: "0.5 linear" }}
                    >
                      <img src={filter_1} alt="filter" />
                    </div>
                  </div>
                </div>
              </section>

              <section className="filter">
                <div className="container">
                  <div className="main-filte">
                    <div className="fil1">
                      <div className="form-group">
                        <select
                          className="form-select"
                          value={selectedSavedSearch}
                          onChange={handleSavedSearchSelect}
                        >
                          <option value="">
                            Seleccionar búsqueda guardada
                          </option>
                          {savedSearchesData.map((item) => (
                            <option key={item.id} value={item.id}>
                              {[
                                item.purpose,
                                item.type,
                                item.country,
                                item.state,
                                item.city,
                              ]
                                .filter(Boolean)
                                .join(" || ")}
                              {" (" + item.totalMatching + ")"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="container">
                  <div className="row">
                    <div className="col-md-5">
                      <div style={{ position: "sticky", top: "100px" }}>
                        <PropertyMap selectedLocation={selectedLocation} />
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
                          {/* <img src={filter_2} style={{ marginLeft: 10 }} />
                          <img src={filter_3} style={{ marginLeft: 10 }} /> */}
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
                                  onClick={() => {
                                    const lat = Number(e.latitude);
                                    const lng = Number(e.longitude);

                                    if (
                                      !lat ||
                                      !lng ||
                                      isNaN(lat) ||
                                      isNaN(lng)
                                    )
                                      return;

                                    setSelectedLocation({
                                      lat,
                                      lng,
                                      name: e.name,
                                      image: e.images?.[0],
                                    });
                                  }}
                                >
                                  <div className="thumb">
                                    {/* <img
                                      className="img-whp"
                                      src={e.images[0]}
                                      alt="fp1.jpg"
                                      style={{ width: "100%" }}
                                    /> */}
                                    <div className="swiper-button-prev custom-pre bg-transparent">
                                      {" "}
                                      <i className="fa fa-chevron-left"></i>{" "}
                                    </div>
                                    <div className="swiper-button-next custom-nex bg-transparent">
                                      <i className="fa fa-chevron-right"></i>
                                    </div>
                                    <Swiper
                                      modules={[
                                        Autoplay,
                                        Pagination,
                                        Navigation,
                                      ]}
                                      // autoplay={{
                                      //   delay: 3000,
                                      //   disableOnInteraction: false,
                                      // }}
                                      pagination={{ clickable: true }}
                                      navigation={{
                                        nextEl: ".custom-nex",
                                        prevEl: ".custom-pre",
                                      }}
                                      loop={true}
                                      className="mySwiper"
                                    >
                                      {e.images.map((img, index) => (
                                        <SwiperSlide key={index}>
                                          <img
                                            className="img-whp"
                                            src={img}
                                            alt={`property-${index}`}
                                          />
                                        </SwiperSlide>
                                      ))}
                                    </Swiper>
                                    <div className="thmb_cntnt" style={{ zIndex: 1 }}>
                                      <ul className="tag mb0 p-0">
                                        {e.purpose && (
                                          <li
                                            className="list-inline-item"
                                            style={{
                                              backgroundColor: "#FFBD59",
                                            }}
                                          >
                                            <span style={{ color: "black" }}>
                                              {e.purpose}
                                            </span>
                                          </li>
                                        )}{" "}
                                        {e.tags && (
                                          <li
                                            className="list-inline-item"
                                            style={{
                                              backgroundColor: "#4b6bfb",
                                            }}
                                          >
                                            <span>{e.tags}</span>
                                          </li>
                                        )}
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
                                            // onClick={() =>
                                            //   handelWishlist(e?.id)
                                            // }
                                            onClick={() => {
                                              setSelectedPropertyId(e.id); // yaha store hoga
                                              folder
                                                ? setFolderPopup(true)
                                                : handelWishlist(e.id);
                                            }}
                                            // style={{
                                            //   color: wishlistIds.includes(e?.id)
                                            //     ? "red"
                                            //     : "",
                                            // }}
                                            style={{
                                              color:
                                                wishlistIds.includes(e?.id) ||
                                                wishlistFolderIds.includes(
                                                  e?.id
                                                )
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
                                          {Number(
                                            e.maxPrice
                                              ? e.maxPrice
                                              : e.rentalPrice
                                          ).toLocaleString("de-DE")}
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
                                      <Link to="#">
                                        <div className="dropdown position-relative">
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
                                            <li className="position-relative">
                                              <button
                                                className="dropdown-item"
                                                type="button"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  const dropdown =
                                                    e.currentTarget
                                                      .nextElementSibling;
                                                  dropdown.classList.toggle(
                                                    "d-none"
                                                  );
                                                }}
                                              >
                                                <img
                                                  src="img/my-img/share-icon.png"
                                                  className="me-2"
                                                  alt="Share"
                                                />
                                                Compartir
                                              </button>

                                              <div
                                                className="share-tooltip d-none position-absolute bg-white shadow rounded p-2"
                                                style={{
                                                  top: "100%",
                                                  left: "0",
                                                  zIndex: 1000,
                                                  minWidth: "150px",
                                                }}
                                              >
                                                <div>
                                                  <button
                                                    className="btn btn-light btn-sm text-start mb-1"
                                                    onClick={() =>
                                                      window.open(
                                                        `https://wa.me/?text=${encodeURIComponent(
                                                          `https://new-hauzzi.vercel.app/propert-details/${e.id}`
                                                        )}`,
                                                        "_blank"
                                                      )
                                                    }
                                                  >
                                                    <img
                                                      src="img/my-img/whatsapp.png"
                                                      width="16"
                                                    />
                                                    {/* WhatsApp */}
                                                  </button>

                                                  <button
                                                    className="btn btn-light btn-sm text-start mb-1"
                                                    onClick={() =>
                                                      window.open(
                                                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                                          `https://new-hauzzi.vercel.app/propert-details/${e.id}`
                                                        )}`,
                                                        "_blank"
                                                      )
                                                    }
                                                  >
                                                    <img
                                                      src="img/my-img/facebook.png"
                                                      width="16"
                                                    />
                                                    {/* Facebook */}
                                                  </button>

                                                  <button
                                                    className="btn btn-light btn-sm text-start mb-1"
                                                    onClick={() =>
                                                      window.open(
                                                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                                          `https://new-hauzzi.vercel.app/propert-details/${e.id}`
                                                        )}`,
                                                        "_blank"
                                                      )
                                                    }
                                                  >
                                                    <img
                                                      src={twitter}
                                                      width="16"
                                                    />
                                                    {/* Twitter */}
                                                  </button>

                                                  <button
                                                    className="btn btn-light btn-sm text-start"
                                                    onClick={() =>
                                                      window.open(
                                                        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                                          `https://new-hauzzi.vercel.app/propert-details/${e.id}`
                                                        )}`,
                                                        "_blank"
                                                      )
                                                    }
                                                  >
                                                    <img
                                                      src={link}
                                                      width="16"
                                                    />
                                                    {/* LinkedIn */}
                                                  </button>
                                                </div>
                                              </div>
                                            </li>

                                            <li>
                                              <Link
                                                className="dropdown-item"
                                                to="#"
                                                onClick={() =>
                                                  handleDiscart(e.id)
                                                }
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
      <div
        className={`sidebar-filter ${showFilter ? "active" : ""} p-0`}
        style={{ zIndex: 1102 }}
      >
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
                        strokeOpacity: 1,
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
                      id="Vender"
                      autoComplete="off"
                      onChange={(e) => setPurposeFilter(e.target.id)}
                      checked={purposeFilter === "Vender"} // radio-like behavior
                    />
                    <label className="Transacción" htmlFor="Vender">
                      Comprar
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Alquilar"
                      autoComplete="off"
                      onChange={(e) => setPurposeFilter(e.target.id)}
                      checked={purposeFilter === "Alquilar"} // radio-like behavior
                    />
                    <label className="Transacción" htmlFor="Alquilar">
                      Alquilar
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h5>Condición</h5>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {["Obra nueva", "Reformado", "Buen estado", "A reformar"].map(
                    (item) => (
                      <div className="new-container-box" key={item}>
                        <input
                          type="checkbox"
                          className="btn-check"
                          id={item}
                          autoComplete="off"
                          checked={advancedFilter["Condición"] === item} // sirf ek hi select rahega
                          onChange={() =>
                            handleAdvancedSingleCheckboxChange(
                              "Condición",
                              item
                            )
                          }
                        />
                        <label className="Transacción" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mb-3">
                <h5>Tipo de inmueble</h5>
                <div className="d-flex align-items-center gap-2 flex-wrap flex-wrap">
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Todos"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Todos"}
                    />
                    <label className="Transacción" htmlFor="Todos">
                      Todos
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Apartamentos"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Apartamentos"}
                    />
                    <label className="Transacción" htmlFor="Apartamentos">
                      Apartamentos
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Casas"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Casas"}
                    />
                    <label className="Transacción" htmlFor="Casas">
                      Casas
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Locales"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Locales"}
                    />
                    <label className="Transacción" htmlFor="Locales">
                      Locales
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Haciendas y fincas"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Haciendas y fincas"}
                    />
                    <label className="Transacción" htmlFor="Haciendas y fincas">
                      Haciendas y fincas
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Habitaciones"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Habitaciones"}
                    />
                    <label className="Transacción" htmlFor="Habitaciones">
                      Habitaciones
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Anexos"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Anexos"}
                    />
                    <label className="Transacción" htmlFor="Anexos">
                      Anexos
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Edificios"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Edificios"}
                    />
                    <label className="Transacción" htmlFor="Edificios">
                      Edificios
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Townhouses"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Townhouses"}
                    />
                    <label className="Transacción" htmlFor="Townhouses">
                      Townhouses
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Terrenos"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Terrenos"}
                    />
                    <label className="Transacción" htmlFor="Terrenos">
                      Terrenos
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Galpones"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Galpones"}
                    />
                    <label className="Transacción" htmlFor="Galpones">
                      Galpones
                    </label>
                  </div>
                  <div className="new-container-box">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="Oficinas"
                      autoComplete="off"
                      onChange={(e) => setTypeFilter(e.target.id)}
                      checked={typeFilter === "Oficinas"}
                    />
                    <label className="Transacción" htmlFor="Oficinas">
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
                      <label htmlFor="minimo">Mínimo</label>
                      <input
                        type="number"
                        id="minimo"
                        className="form-control mt-2"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </div>

                    <div className="col">
                      <label htmlFor="maximo">Máximo</label>
                      <input
                        type="number"
                        id="maximo"
                        className="form-control mt-2"
                        placeholder="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3 gy-3 justify-content-between">
                <div className="col-12">
                  <h5>Habitaciones</h5>
                  <div
                    className="btn-group property-categories w-100"
                    role="group"
                  >
                    {/* Todo styled as static orange button */}
                    {/* <label className="btn btn-orange d-flex align-items-center">
                      Todo
                    </label> */}

                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="property1"
                      autoComplete="off"
                      checked={advancedFilter.Habitaciones === "1"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Habitaciones", "1")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="property1"
                      style={{
                        backgroundColor:
                          advancedFilter.Habitaciones === "1" ? "#FFBD59" : "",
                        color:
                          advancedFilter.Habitaciones === "1" ? "white" : "",
                      }}
                    >
                      <span>1</span>
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="property2"
                      autoComplete="off"
                      checked={advancedFilter.Habitaciones === "2"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Habitaciones", "2")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="property2"
                      style={{
                        backgroundColor:
                          advancedFilter.Habitaciones === "2" ? "#FFBD59" : "",
                        color:
                          advancedFilter.Habitaciones === "2" ? "white" : "",
                      }}
                    >
                      <span>2</span>
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="property3"
                      autoComplete="off"
                      checked={advancedFilter.Habitaciones === "3"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Habitaciones", "3")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="property3"
                      style={{
                        backgroundColor:
                          advancedFilter.Habitaciones === "3" ? "#FFBD59" : "",
                        color:
                          advancedFilter.Habitaciones === "3" ? "white" : "",
                      }}
                    >
                      <span>3</span>
                    </label>

                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="property4"
                      autoComplete="off"
                      checked={advancedFilter.Habitaciones === "4+"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Habitaciones", "4+")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="property4"
                      style={{
                        backgroundColor:
                          advancedFilter.Habitaciones === "4+" ? "#FFBD59" : "",
                        color:
                          advancedFilter.Habitaciones === "4+" ? "white" : "",
                      }}
                    >
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
                      checked={advancedFilter.exactHabitaciones || false}
                      onChange={(e) =>
                        setAdvancedFilter((prev) => ({
                          ...prev,
                          exactHabitaciones: e.target.checked,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="col-12">
                  <h5>Baños</h5>
                  <div
                    className="btn-group property-categories w-100"
                    role="group"
                  >
                    {/* Todo styled as static orange button */}
                    {/* <label className="btn btn-orange d-flex align-items-center">
                      Todo
                    </label> */}
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="banos1"
                      autoComplete="off"
                      checked={advancedFilter.Baños === "1"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Baños", "1")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="banos1"
                      style={{
                        backgroundColor:
                          advancedFilter.Baños === "1" ? "#FFBD59" : "",
                        color: advancedFilter.Baños === "1" ? "white" : "",
                      }}
                    >
                      <span>1</span>
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="banos2"
                      autoComplete="off"
                      checked={advancedFilter.Baños === "2"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Baños", "2")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="banos2"
                      style={{
                        backgroundColor:
                          advancedFilter.Baños === "2" ? "#FFBD59" : "",
                        color: advancedFilter.Baños === "2" ? "white" : "",
                      }}
                    >
                      <span>2</span>
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="banos3"
                      autoComplete="off"
                      checked={advancedFilter.Baños === "3"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Baños", "3")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="banos3"
                      style={{
                        backgroundColor:
                          advancedFilter.Baños === "3" ? "#FFBD59" : "",
                        color: advancedFilter.Baños === "3" ? "white" : "",
                      }}
                    >
                      <span>3</span>
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="banos4"
                      autoComplete="off"
                      checked={advancedFilter.Baños === "+4"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange("Baños", "+4")
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="banos4"
                      style={{
                        backgroundColor:
                          advancedFilter.Baños === "+4" ? "#FFBD59" : "",
                        color: advancedFilter.Baños === "+4" ? "white" : "",
                      }}
                    >
                      <span>+4</span>
                    </label>
                  </div>
                  <div className="form-check form-switch d-flex justify-content-between mt-3 p-0">
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Indica el número exacto de Baños.
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
                  <div
                    className="btn-group property-categories w-100"
                    role="group"
                  >
                    {/* Todo styled as static orange button */}
                    {/* <label className="btn btn-orange d-flex align-items-center">
                      Todo
                    </label> */}
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="estacionamientos1"
                      autoComplete="off"
                      checked={advancedFilter.Estacionamientos === "1"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange(
                          "Estacionamientos",
                          "1"
                        )
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="estacionamientos1"
                      style={{
                        backgroundColor:
                          advancedFilter.Estacionamientos === "1"
                            ? "#FFBD59"
                            : "",
                        color:
                          advancedFilter.Estacionamientos === "1"
                            ? "white"
                            : "",
                      }}
                    >
                      <span>1</span>
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="estacionamientos2"
                      autoComplete="off"
                      checked={advancedFilter.Estacionamientos === "2"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange(
                          "Estacionamientos",
                          "2"
                        )
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="estacionamientos2"
                      style={{
                        backgroundColor:
                          advancedFilter.Estacionamientos === "2"
                            ? "#FFBD59"
                            : "",
                        color:
                          advancedFilter.Estacionamientos === "2"
                            ? "white"
                            : "",
                      }}
                    >
                      <span>2</span>
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="estacionamientos3"
                      autoComplete="off"
                      checked={advancedFilter.Estacionamientos === "3"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange(
                          "Estacionamientos",
                          "3"
                        )
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="estacionamientos3"
                      style={{
                        backgroundColor:
                          advancedFilter.Estacionamientos === "3"
                            ? "#FFBD59"
                            : "",
                        color:
                          advancedFilter.Estacionamientos === "3"
                            ? "white"
                            : "",
                      }}
                    >
                      <span>3</span>
                    </label>
                    <input
                      type="checkbox"
                      className="btn-check"
                      name="propertyCategory"
                      id="estacionamientos4"
                      autoComplete="off"
                      checked={advancedFilter.Estacionamientos === "+4"}
                      onChange={() =>
                        handleAdvancedSingleCheckboxChange(
                          "Estacionamientos",
                          "+4"
                        )
                      }
                    />
                    <label
                      className="btn Habitaciones"
                      htmlFor="estacionamientos4"
                      style={{
                        backgroundColor:
                          advancedFilter.Estacionamientos === "+4"
                            ? "#FFBD59"
                            : "",
                        color:
                          advancedFilter.Estacionamientos === "+4"
                            ? "white"
                            : "",
                      }}
                    >
                      <span>+4</span>
                    </label>
                  </div>
                  <div className="form-check form-switch d-flex justify-content-between mt-3 p-0">
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Indica el número exacto de Estacionamientos.
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
                  {["Amueblado", "Semiamueblado", "No amueblado"].map(
                    (item) => (
                      <div className="new-container-box" key={item}>
                        <input
                          type="checkbox"
                          className="btn-check"
                          id={item}
                          autoComplete="off"
                          checked={advancedFilter["Mobiliario"] === item}
                          onChange={() =>
                            handleAdvancedSingleCheckboxChange(
                              "Mobiliario",
                              item
                            )
                          }
                        />
                        <label className="Transacción" htmlFor={item}>
                          {item}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="mb-3">
                <h5>Publicado por</h5>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {[
                    "Agencia inmobiliaria",
                    "Agente inmobiliario",
                    "Particular",
                    "Constructor o promotor",
                  ].map((item) => (
                    <div className="new-container-box" key={item}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={item}
                        autoComplete="off"
                        checked={advancedFilter["Publicadopor"] === item}
                        onChange={() =>
                          handleAdvancedSingleCheckboxChange(
                            "Publicadopor",
                            item
                          )
                        }
                      />
                      <label className="Transacción" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-6">
                  <label htmlFor="">Antigüedad</label>
                  <select
                    name="Antigüedad"
                    className="form-select mt-2"
                    value={advancedFilter["Antigüedad"] || ""}
                    onChange={(e) =>
                      handleAdvancedSelectChange("Antigüedad", e.target.value)
                    }
                  >
                    <option value="">Indiferente</option>
                    <option value="A estrenar">A estrenar</option>
                    <option value="1 a 5 años">1 a 5 años</option>
                    <option value="6 a 10 años">6 a 10 años</option>
                    <option value="11 a 15 años">11 a 15 años</option>
                    <option value="16 a 25 años">16 a 25 años</option>
                    <option value="26 a 40 años">26 a 40 años</option>
                    <option value="40 años o ma">40 años o ma</option>
                  </select>
                </div>

                <div className="col-lg-6">
                  <label htmlFor="">Tipo de suelo</label>
                  <select
                    className="form-select mt-2"
                    name="Tipo de suelo"
                    value={advancedFilter["Tipo de suelo"] || ""}
                    onChange={(e) =>
                      handleAdvancedSelectChange(
                        "Tipo de suelo",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Indiferente</option>
                    <option selected="Madera">Madera</option>
                    <option selected="Cerámica o Porcelanato">
                      Cerámica o Porcelanato
                    </option>
                    <option selected="Granito">Granito</option>
                    <option selected="Cemento">Cemento</option>
                    <option selected="Vinil o PVC">Vinil o PVC</option>
                    <option selected="Marmol">Marmol</option>
                    <option selected="Terrazzo">Terrazzo</option>
                    <option selected="Alfombra">Alfombra</option>
                    <option selected="Piedra Natural">Piedra Natural</option>
                  </select>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="">Vistas</label>
                  <select
                    className="form-select mt-2"
                    name="Vistas"
                    value={advancedFilter["Vistas"] || ""}
                    onChange={(e) =>
                      handleAdvancedSelectChange("Vistas", e.target.value)
                    }
                  >
                    <option selected="">Indiferente</option>
                    <option selected="Vista al mar">Vista al mar</option>
                    <option selected="Vista a la montaña">
                      Vista a la montaña
                    </option>
                    <option selected="Vista a la ciudad">
                      Vista a la ciudad
                    </option>
                    <option selected="Vista al lago">Vista al lago</option>
                    <option selected="Vista al bosque">Vista al bosque</option>
                    <option selected="Vista al río">Vista al río</option>
                  </select>
                </div>
                <div className="col-lg-6">
                  <label htmlFor="">Orientación</label>
                  <select
                    className="form-select mt-2"
                    name="Orientación"
                    value={advancedFilter["Orientación"] || ""}
                    onChange={(e) =>
                      handleAdvancedSelectChange("Orientación", e.target.value)
                    }
                  >
                    <option selected="">Indiferente</option>
                    <option selected="Norte">Norte</option>
                    <option selected="Sur">Sur</option>
                    <option selected="Este">Este</option>
                    <option selected="Oeste">Oeste</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3 mt-3">
                <h5 className="">Seguridad</h5>

                {[
                  "Alarma",
                  "Vigilancia",
                  "Sistema de videointercomunicador",
                  "Cámaras de vigilancia (CCTV)",
                  "Cerco eléctrico",
                  "Cerco perimetral",
                  "Portón eléctrico",
                  "Iluminación de seguridad",
                  "Sistema contra incendios",
                  "Caja fuerte",
                  "Puerta blindada",
                ].map((item, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item}
                        onChange={(e) =>
                          handleAdvancedCheckboxChange(
                            "Seguridad",
                            item,
                            e.target.checked
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mb-3 mt-3">
                <h5 className="">Ambientes</h5>

                {[
                  "Piscina",
                  "Área de barbacoa/parrillera",
                  "Estudio u oficina",
                  "Cuarto de servicio",
                  "Área de comedor",
                  "Cancha de básquetbol",
                  "Cancha de paddle",
                  "Gimnasio",
                  "Bar",
                  "Patio",
                  "Área para mascotas",
                  "Canchas de usos múltiples",
                  "Salón de eventos",
                  "Cancha de fútbol",
                  "Sauna",
                  "Baño de visitas",
                  "Armarios",
                  "Sala de juegos",
                  "Jacuzzi",
                  "Jardines o áreas verdes",
                  "Sala de reuniones",
                  "Área de cine",
                  "Cocina",
                  "Vestier",
                  "Cuarto de lavado",
                  "Área para desayunar",
                  "Cancha de tenis",
                ].map((item, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item}
                        onChange={(e) =>
                          handleAdvancedCheckboxChange(
                            "Ambientes",
                            item,
                            e.target.checked
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row mb-3 mt-3">
                <h5 className="">Equipamientos</h5>
                {[
                  "Aire acondicionado",
                  "Ascensor",
                  "Conexión eléctrica de alta capacidad",
                  "Calentador a gas/eléctrico",
                  "Zona de carga para vehículos eléctricos",
                  "Acceso para movilidad reducida",
                  "Calefacción",
                  "Acceso a internet",
                  "Planta eléctrica",
                  "Cámara frigorífica",
                  "Chimenea",
                  "Ventilador",
                  "TV",
                  "Sistema de domótica",
                  "Cisterna de agua",
                  "Electrodomésticos",
                  "Sistema de ventilación",
                ].map((item, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item}
                        onChange={(e) =>
                          handleAdvancedCheckboxChange(
                            "Equipamientos",
                            item,
                            e.target.checked
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="row mb-3 mt-3">
                <h5 className="">Servicios</h5>

                {[
                  "Suministro de agua",
                  "Recolección de basura",
                  "Línea telefónica",
                  "Red eléctrica",
                  "Alcantarillado y drenaje",
                  "Energía solar",
                  "Gas",
                  "Suministro de agua potable",
                ].map((item, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={item}
                        onChange={(e) =>
                          handleAdvancedCheckboxChange(
                            "Servicios",
                            item,
                            e.target.checked
                          )
                        }
                      />
                      <label className="form-check-label" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h5>Extras</h5>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {[
                    "Negociable",
                    "Acepta financiamiento",
                    "Opción a compra",
                    "Opción de intercambio",
                  ].map((item) => (
                    <div className="new-container-box" key={item}>
                      <input
                        type="checkbox"
                        className="btn-check"
                        id={item}
                        autoComplete="off"
                        checked={tagFilter === item}
                        onChange={
                          () => setTagFilter(tagFilter === item ? "" : item) // ✅ single select checkbox
                        }
                      />
                      <label className="Transacción" htmlFor={item}>
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <button
                  className="Resetear-filtros border-0"
                  onClick={(e) => {
                    e.preventDefault();
                    getAllData();
                  }}
                >
                  Aplicar filtros
                </button>
                <button
                  className="Resetear-filtros2"
                  type="button"
                  onClick={handleResetFilters}
                >
                  Resetear filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* filters sidebar */}
      {/* select folder Modal  */}
      {folderPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="d-flex justify-content-between mb-2">
              <h5>Seleccionar carpeta </h5>
              <img
                src={cancel}
                alt=""
                style={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setFolderPopup(false)}
              />
            </div>
            <div>
              <select
                className="mb-4 w-100 add-folder-modal"
                name="folderId"
                value={selectedFolderId}
                onChange={(e) => setSelectedFolderId(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {folderData?.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button
                className="cancelar-btn"
                onClick={() => setFolderPopup(false)}
              >
                Cancelar
              </button>
              <button
                className="crear-btn"
                onClick={() => handleAddFolder(selectedPropertyId)}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* select folder Modal  */}
    </Fragment>
  );
};

export default PropertySell;
