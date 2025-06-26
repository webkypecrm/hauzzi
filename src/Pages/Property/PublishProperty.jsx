import React, { Fragment, useEffect, useState, useRef } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useParams } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import { Autocomplete } from "@react-google-maps/api";

const PublishProperty = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const token2 = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";
  const [images, setImages] = useState(Array(10).fill(null));
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [propertyCategory, setPropertyCategory] = useState([]);
  const [activeTypeIndex, setActiveTypeIndex] = useState(null);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);
  const [mode, setMode] = useState("vender");
  const [alsoRent, setAlsoRent] = useState(false);
  const [mastersData, setMastersData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [allData, setAllData] = useState([]);

  const {id} = useParams();

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      // Update preview
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);

      // Update corresponding photo in propertyData
      const photoKey = `photo${index + 1}`;
      setPropertyData((prev) => ({
        ...prev,
        [photoKey]: file,
      }));
    }
  };

  const handleToggle = (selectedMode) => {
    setMode(selectedMode);
    setAlsoRent(false); // Reset switch when toggling
    setPropertyData((prev) => ({
      ...prev,
      purpose: selectedMode === "vender" ? "Vender" : "Alquilar",
    }));
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
    } finally {
      setLoading(false);
    }
  };

  const handleSelectType = (type, index) => {
    setActiveTypeIndex(index);
    setPropertyData((prev) => ({
      ...prev,
      type: type.name,
    }));
    getPropertyCategory(type);
  };

  // property category GET
  const getPropertyCategory = async (type) => {
    try {
      const res = await axios.get(
        `${apiUrl}/category/getAllCategoryData/${type.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPropertyCategory(res.data?.data || []);
      setActiveCategoryIndex(null);
      setMastersData([]); 
    } catch (error) {}
  };

  // console.log("category", propertyCategory);
  const handleSelectCategory = (category, index) => {
    setActiveCategoryIndex(index);
    setPropertyData((prev) => ({
      ...prev,
      category: category.name,
    }));
    getMasters(category.id);
  };

  // masters GET
  const getMasters = async (categoryId) => {
    try {
      const res = await axios.get(
        `${apiUrl}/master/getMasterDataByCatId/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMastersData(res.data?.data || []);
    } catch (error) {}
  };

  // POST Api
  const initialData = {
    type: "",
    category: "",
    name: "",
    purpose: "",
    maxPrice: "",
    maxSize: "",
    maxPSF: "",
    rentalPrice: "",
    maintenancePrice: "",
    SecurityAmount: "",
    propertySize: "",
    features: "",
    listingDetails: {},
    address1: "",
    country: "",
    state: " ",
    city: "",
    builderName: "",
    societyName: "",
    zip: "",
    latitude: "",
    longitude: "",
    description: "",
    photo1: null,
    photo2: null,
    photo3: null,
    photo4: null,
    photo5: null,
    photo6: null,
    photo7: null,
    photo8: null,
    photo9: null,
    photo10: null,
    isDraft: "",
    customerId: localStorage.getItem("tokenId") || "",
    userType: localStorage.getItem("userType") || "",
  };

  const [propertyData, setPropertyData] = useState({
    ...initialData,
    purpose: "Vender", // default because mode is "vender"
  });

  const handleInputChange = (e) => {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleListingDetailChange = (label, value) => {
    setPropertyData((prev) => ({
      ...prev,
      listingDetails: {
        ...prev.listingDetails,
        [label]: value,
      },
    }));
  };

  const handleCheckboxGroupChange = (label, name) => {
    const checkboxes = document.querySelectorAll(
      `input[name="${name}"]:checked`
    );
    const selectedValues = Array.from(checkboxes).map((cb) => cb.value);

    setPropertyData((prev) => ({
      ...prev,
      listingDetails: {
        ...prev.listingDetails,
        [label]: selectedValues.join(", "),
      },
    }));
  };

  // Post Data Api

  // const handelPropertyDataSubmit = async (e) => {
  //   e.preventDefault();

  //   const clickedButton = e.nativeEvent.submitter?.value || "publish";
  //   const isDraftValue = clickedButton === "draft" ? "true" : "false";

  //   const updatedPropertyData = {
  //     ...propertyData,
  //     isDraft: isDraftValue,
  //   };

  //   try {
  //     const formData = new FormData();

  //     for (const key in updatedPropertyData) {
  //       const value = updatedPropertyData[key];

  //       // Handle images
  //       if (key.startsWith("photo") && value instanceof File) {
  //         formData.append(key, value);
  //       }

  //       // Handle listingDetails as JSON string
  //       else if (key === "listingDetails" && typeof value === "object") {
  //         formData.append("listingDetails", JSON.stringify(value));
  //       }

  //       // Other fields
  //       else if (value !== null && value !== undefined) {
  //         formData.append(key, value);
  //       }
  //     }

  //     const res = await axios.post(
  //       `${apiUrl}/property/add-property`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token2}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     setPropertyData(initialData);
  //     initialData.listingDetails = {};
  //     toast.success("Product added successfully!");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.response.data.message);
  //   }
  // };

  const [originalData, setOriginalData] = useState(null);

useEffect(() => {
  if (id) {
    axios
      .get(`${apiUrl}/property/property?isDraft=false&id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const fetchedData = res.data?.data?.[0];
        if (!fetchedData) {
          toast.error("Property data not found");
          return;
        }

        const fullData = { ...initialData, ...fetchedData, id };
        setOriginalData(fullData);
        setPropertyData(fullData);
      })
      .catch((err) => {
        toast.error("Failed to load property");
        console.error(err);
      });
  }
}, [id]);



   const handelPropertyDataSubmit = async (e) => {
    e.preventDefault();

    const clickedButton = e.nativeEvent.submitter?.value || "publish";
    const isDraftValue = clickedButton === "draft" ? "true" : "false";

    // 🧠 Merge originalData with new changes
    const updatedPropertyData = {
      ...(originalData || initialData), // full base
      ...propertyData,                  // new values overwrite old
      isDraft: isDraftValue,           // update draft status
    };

    try {
      const formData = new FormData();

      for (const key in updatedPropertyData) {
        const value = updatedPropertyData[key];

        // jo edit krte time muje send nhi krni h
        if (key === "userType" && !!id) continue;
        if (key === "slug" && !!id) continue;
        if (key === "bookedBy" && !!id) continue;
        if (key === "cancelledBy" && !!id) continue;
        if (key === "views" && !!id) continue;
        if (key === "saved" && !!id) continue;
        if (key === "createdAt" && !!id) continue;
        if (key === "updatedAt" && !!id) continue;
        if (key === "Customer" && !!id) continue;
        if (key === "cities" && !!id) continue;
        if (key === "states" && !!id) continue;
        if (key === "countries" && !!id) continue;
        if (key === "images" && !!id) continue;
        if (key === "propertyDocs" && !!id) continue;

        if (key.startsWith("photo") && value instanceof File) {
          formData.append(key, value);
        } else if (key === "listingDetails" && typeof value === "object") {
          formData.append("listingDetails", JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }

      const isEdit = !!id;
      const url = isEdit
        ? `${apiUrl}/property/update-property`
        : `${apiUrl}/property/add-property`;

      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token2}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        isEdit ? "Property updated successfully!" : "Property added successfully!"
      );

      setPropertyData({
        ...initialData,
        purpose: "Vender",
      });
      setOriginalData(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };



  // country Get
  const getCountries = async () => {
    try {
      const res = await axios.get(`${apiUrl}/employee/allCountries`);

      setCountries(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // state Get
  const getStates = async (countryId) => {
    try {
      const res = await axios.get(`${apiUrl}/employee/allStates/${countryId}`);

      setStates(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountryId(countryId);
    if (countryId) {
      getStates(countryId);
    } else {
      setStates([]);
    }
  };

  // city Get
  const getCities = async (stateId) => {
    try {
      const res = await axios.get(`${apiUrl}/employee/allCities/${stateId}`);

      setCities(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedStateId(stateId);
    if (stateId) {
      getCities(stateId);
    } else {
      setCities([]);
    }
  };

  // Get All Data
  const getAllData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/profile/getById/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      });

      setAllData(res.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //  console.log("allData", allData.userDetails.map((item) => item.phone));

  useEffect(() => {
    getPropertyTypes();
    getCountries();
    getAllData();
  }, []);

  // Google Map

  const libraries = ["places"];

  const defaultCenter = { lat: 28.6139, lng: 77.209 };

  const autocompleteRef = useRef(null);

  const [mapCenter, setMapCenter] = useState(defaultCenter);

  const onPlaceChanged = () => {
    // if (autocompleteRef.current) {
    //   const place = autocompleteRef.current.getPlace();
    //   if (!place.geometry) return;

    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    setPropertyData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));

    setMapCenter({ lat, lng }); // Move map & marker
  };
  // };

  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section className="top-btn12">
            <form onSubmit={handelPropertyDataSubmit}>
              <div className="container py-3">
                {/* Navigation */}
                <div className="d-flex flex-wrap justify-content-end mb-4">
                  <Link to={"/publish-propert"} className="nav-button active">
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
                {/* Title */}
                <h2 className="mt-4 mb-3">Publicar inmueble</h2>

                <h5 className="fw-bold">Tipo de inmueble</h5>
                {/* Property Type Buttons */}
                {loading ? (
                  <Loading />
                ) : (
                  <Fragment>
                    <div className="  mb-4">
                      {propertyTypes.map((type, index) => (
                        <button
                          type="button"
                          key={index}
                          className={`property-type-btn ${
                            activeTypeIndex === index ? "active" : ""
                          }`}
                          onClick={() => handleSelectType(type, index)}
                        >
                          {type.name}{" "}
                        </button>
                      ))}
                    </div>

                    {propertyCategory.length > 0 && (
                      <>
                        <h5 className="fw-bold">Categoría</h5>
                        <div className="d-flex flex-wrap mb-4">
                          {propertyCategory.map((e, index) => (
                            <button
                              type="button"
                              key={e.id}
                              className={`property-type-btn ${
                                activeCategoryIndex === index ? "active" : ""
                              }`}
                              onClick={() => handleSelectCategory(e, index)}
                            >
                              {e.name}{" "}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </Fragment>
                )}

                <h5 className="fw-bold">Nombre</h5>
                <div className="col-md-3 mb-3">
                  {/* <label className="form-label">Nombre de le propiedad</label> */}
                  <div className="d-flex align-items-center position-relative">
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      placeholder="Nombre de le propiedad"
                      name="name"
                      value={propertyData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <h5 className="mb-3 fw-bold">Transacción</h5>
                {/* Toggle Buttons */}
                <div className="d-flex align-items-center mb-2">
                  {/* <button className="toggle-btn active me-2"> */}
                  <button
                    className={`toggle-btn me-2 ${
                      mode === "vender" ? "active" : ""
                    }`}
                    onClick={() => handleToggle("vender")}
                    type="button"
                  >
                    Vender
                  </button>
                  {/* <button className="toggle-btn"> */}
                  <button
                    className={`toggle-btn ${
                      mode === "alquilar" ? "active" : ""
                    }`}
                    onClick={() => handleToggle("alquilar")}
                    type="button"
                  >
                    Alquilar
                  </button>
                </div>
                {/* También lo alquilo */}
                <div className="switch-label">
                  <span className="me-2">También lo alquilo</span>
                  <label className="switchSmall">
                    {/* <input
                    type="checkbox"
                    checked={alsoRent}
                    onChange={(e) => setAlsoRent(e.target.checked)}
                  /> */}
                    <input
                      type="checkbox"
                      checked={alsoRent}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setAlsoRent(checked);

                        const newPurpose = checked
                          ? "Vender y Alquilar"
                          : mode === "vender"
                          ? "Vender"
                          : "Alquilar";

                        setPropertyData((prev) => ({
                          ...prev,
                          purpose: newPurpose,
                        }));
                      }}
                    />

                    <small />
                  </label>
                </div>
                {/* Prices */}
                <div className="row form-section">
                  {(mode === "vender" || alsoRent) && (
                    <>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Precio de venta</label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Precio de venta"
                            name="maxPrice"
                            value={propertyData.maxPrice}
                            onChange={handleInputChange}
                          />
                          <button className="dollar-btn">$</button>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          Tamaño de la propiedad
                        </label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Tamaño de la propiedad"
                            name="maxSize"
                            value={propertyData.maxSize}
                            onChange={handleInputChange}
                          />
                          <button className="dollar-btn">
                            m<sup>2</sup>
                          </button>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          Tarifa por pie cuadrado
                        </label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Tarifa por pie cuadrado"
                            name="maxPSF"
                            value={propertyData.maxPSF}
                            onChange={handleInputChange}
                          />
                          <button className="dollar-btn">
                            m<sup>2</sup>
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {(mode === "alquilar" || alsoRent) && (
                    <>
                      <div className="col-md-3 mb-3">
                        <label className="form-label">Precio de alquiler</label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Precio de alquiler"
                            name="rentalPrice"
                            value={propertyData.rentalPrice}
                            onChange={handleInputChange}
                          />
                          <button className="dollar-btn">$/mes</button>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          Cargos de mantenimiento
                        </label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Cargos de mantenimiento"
                            name="maintenancePrice"
                            value={propertyData.maintenancePrice}
                            onChange={handleInputChange}
                          />
                          <button className="dollar-btn">$</button>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">Monto de seguridad</label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Monto de seguridad"
                            name="SecurityAmount"
                            value={propertyData.SecurityAmount}
                            onChange={handleInputChange}
                          />
                          <button className="dollar-btn">$</button>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <label className="form-label">
                          Tamaño del área de alquiler
                        </label>
                        <div className="d-flex align-items-center position-relative">
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder=" pies cuadrados"
                            name="propertySize"
                            value={propertyData.propertySize}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-md-3 mb-3">
                    <label className="form-label">Features</label>
                    <div className="d-flex align-items-center position-relative">
                      <input
                        type="text"
                        className="form-control border bg-transparent"
                        // placeholder="Precio de venta"
                        name="features"
                        value={propertyData.features}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Counters */}
                <div className="row">
                  {mastersData.find((arr) => arr[0]?.mastersId === 209) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Habitaciones</label>
                      <div className="d-flex align-items-center position-relative">
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleListingDetailChange(
                              "Habitaciones",
                              e.target.selectedOptions[0].textContent
                            )
                          }
                        >
                          <option disabled selected>
                            Seleccionar
                          </option>

                          {mastersData
                            .find((arr) => arr[0]?.mastersId === 209)
                            ?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 208) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Baños</label>
                      <div className="d-flex align-items-center position-relative">
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleListingDetailChange(
                              "Baños",
                              e.target.selectedOptions[0].textContent
                            )
                          }
                        >
                          <option disabled selected>
                            Seleccionar
                          </option>

                          {mastersData
                            .find((arr) => arr[0]?.mastersId === 208)
                            ?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* <div className="col-md-3 mb-3">
                  <label className="form-label">Estacionamientos</label>
                  <div className="d-flex align-items-center position-relative">
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      defaultValue={1}
                      readOnly=""
                    />
                    <button className="plus-btn">+</button>
                    <select className="form-select">
                      <option selected="">Seleccionar</option>
                    </select>
                  </div>
                </div> */}
                  {mastersData.find((arr) => arr[0]?.mastersId === 207) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Estacionamientos</label>
                      <div className="d-flex align-items-center position-relative">
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleListingDetailChange(
                              "Estacionamientos",
                              e.target.selectedOptions[0].textContent
                            )
                          }
                        >
                          <option disabled selected>
                            Seleccionar
                          </option>

                          {mastersData
                            .find((arr) => arr[0]?.mastersId === 207)
                            ?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}
                  {/* </div> */}

                  {/* Other Selects */}

                  {mastersData.find((arr) => arr[0]?.mastersId === 205) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Condición</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Condición",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>

                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 205)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 204) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Antigüedad</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Antigüedad",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>

                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 204)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* <div className="col-md-3 mb-3">
                  <label className="form-label">Tipo de suelo</label>
                  <select className="form-select">
                    <option selected="">Seleccionar</option>
                  </select>
                </div> */}
                  {mastersData.find((arr) => arr[0]?.mastersId === 201) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Tipo de suelo</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Tipodesuelo",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>

                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 201)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 199) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Orientación</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Orientación",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>

                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 199)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 200) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Vistas</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Vistas",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>

                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 200)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 203) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Publicado por</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Publicadopor",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>

                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 203)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 211) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Planta</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Planta",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>
                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 211)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {mastersData.find((arr) => arr[0]?.mastersId === 206) && (
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Mobiliario</label>
                      <select
                        className="form-select"
                        onChange={(e) =>
                          handleListingDetailChange(
                            "Mobiliario",
                            e.target.selectedOptions[0].textContent
                          )
                        }
                      >
                        <option disabled selected>
                          Seleccionar
                        </option>
                        {mastersData
                          .find((arr) => arr[0]?.mastersId === 206)
                          ?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
                <h5 className="mb-0 fw-bold">
                  Dirección del inmueble (Obligatorio)
                </h5>
                <h5 className="mb-4 fw-bold">
                  Una vez publicado, no podrás modificar la dirección.
                </h5>
                <div className="row g-3 mb-4">
                  <div className="col-md-4">
                    <label className="form-label">Dirección</label>
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      placeholder="Código postal"
                      name="address1"
                      value={propertyData.address1}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">País</label>
                    <select
                      className="form-select"
                      name="country"
                      value={propertyData.country}
                      onChange={(e) => {
                        setPropertyData({
                          ...propertyData,
                          country: e.target.value,
                        });
                        handleCountryChange(e); // Also load states
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Estado</label>

                    <select
                      className="form-select"
                      name="state"
                      value={propertyData.state}
                      onChange={(e) => {
                        setPropertyData({
                          ...propertyData,
                          state: e.target.value,
                        });
                        handleStateChange(e); // Also load cities
                      }}
                    >
                      <option value="">Seleccionar</option>
                      {states.map((state) => (
                        <option key={state.id} value={state.id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Ciudad</label>

                    <select
                      className="form-select"
                      name="city"
                      value={propertyData.city}
                      onChange={(e) =>
                        setPropertyData({
                          ...propertyData,
                          city: e.target.value,
                        })
                      }
                    >
                      <option value="">Seleccionar</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Nombre del constructor</label>
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      placeholder="Nombre del constructor"
                      name="builderName"
                      value={propertyData.builderName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Nombre de la sociedad</label>
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      placeholder="Nombre de la sociedad"
                      name="societyName"
                      value={propertyData.societyName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Código postal</label>
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      placeholder="Código postal"
                      name="zip"
                      value={propertyData.zip}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Longitud</label>
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      value={propertyData.longitude || ""}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Latitud</label>
                    <input
                      type="text"
                      className="form-control border bg-transparent"
                      value={propertyData.latitude || ""}
                      readOnly
                    />
                  </div>
                  <div className="col-md-12">
                    {/* <LoadScript
                      googleMapsApiKey="AIzaSyDAc6yU2PelDIJKgzSxOJZIepi7Bx43lXw"
                      libraries={libraries}
                    >
                      <div className="row mb-4">
                        <div className="col-md-12">
                          <Autocomplete
                            onLoad={(autoC) =>
                              (autocompleteRef.current = autoC)
                            }
                            onPlaceChanged={onPlaceChanged}
                          >
                            <input
                              type="text"
                              className="form-control border bg-transparent"
                              placeholder="Buscar dirección del inmueble"
                              
                            />
                          </Autocomplete>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-md-12">
                          <GoogleMap
                            mapContainerStyle={{
                              width: "100%",
                              height: "400px",
                            }}
                            center={mapCenter}
                            zoom={15}
                          >
                            <Marker position={mapCenter} />
                          </GoogleMap>
                        </div>
                      </div>
                    </LoadScript> */}
                    <div className="row mb-4">
                      <div className="col-md-12">
                        <Autocomplete
                          onLoad={(autoC) => (autocompleteRef.current = autoC)}
                          onPlaceChanged={onPlaceChanged}
                        >
                          <input
                            type="text"
                            className="form-control border bg-transparent"
                            placeholder="Buscar dirección del inmueble"
                          />
                        </Autocomplete>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="col-md-12">
                        <GoogleMap
                          mapContainerStyle={{
                            width: "100%",
                            height: "400px",
                          }}
                          center={mapCenter}
                          zoom={15}
                        >
                          <Marker position={mapCenter} />
                        </GoogleMap>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12"></div>
                </div>

                <h5 className="fw-bold mb-3">Descripción</h5>
                <textarea
                  className="form-control bg-transparent border p-3"
                  rows={10}
                  placeholder="Las personas valoran datos adicionales como la iluminación natural, las vistas, la tranquilidad de la zona o la accesibilidad a servicios. ¡Aprovecha este espacio para destacar estos aspectos!"
                  value={propertyData.description}
                  onChange={(e) =>
                    setPropertyData({
                      ...propertyData,
                      description: e.target.value,
                    })
                  }
                />
                <div className="d-flex justify-content-between mt-2 align-items-center">
                  <span className="char-count">0/2000 caracteres</span>
                  <div className="assistant-container">
                    {/* Message Bubble */}
                    <div className="bubble">
                      ¡Hola! ¿Te ayudo a describir tu inmueble?
                      <span className="close-btn">×</span>
                    </div>
                    {/* Assistant Image */}
                    <img
                      src="img/my-img/pp-textarea.png"
                      alt="Asistente"
                      className="assistant-img"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Multimedia del anuncio</label>
                  <div
                    className="upload-area upload-box mt-2"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    {/* The upload icon will be hidden if image is uploaded */}
                    {images.map((imageSrc, index) => (
                      <div key={index}>
                        {!imageSrc && (
                          <div
                            className="upload-icon"
                            id={`uploadIcon-${index}`}
                          >
                            <img
                              src="img/my-img/gallery-add.png"
                              alt="Upload icon"
                            />
                          </div>
                        )}

                        <div className="tb-container">
                          <div className="tb-img-view">
                            {imageSrc && (
                              <img
                                src={imageSrc}
                                alt="Uploaded Preview"
                                style={{
                                  display: "block",
                                  height: "100px",
                                  width: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>

                          {!imageSrc && (
                            <div className="upload-text">Añade fotos</div>
                          )}

                          <label
                            htmlFor={`tb-file-upload-${index}`}
                            style={{ cursor: "pointer" }}
                          >
                            Subir archivos
                          </label>

                          <input
                            type="file"
                            id={`tb-file-upload-${index}`}
                            accept="image/*"
                            onChange={(e) => handleFileChange(index, e)}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {mastersData.find((arr) => arr[0]?.mastersId === 187) && (
                  <>
                    <h5 className="fw-bold mb-3">Seguridad</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 187)
                        ?.map((item, idx) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec187-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="securityOptions"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Seguridad",
                                  "securityOptions"
                                )
                              }
                            />
                            <label htmlFor={`sec187-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {mastersData.find((arr) => arr[0]?.mastersId === 186) && (
                  <>
                    <h5 className="fw-bold mb-3">Ambientes</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 186)
                        ?.map((item, idx) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec186-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="ambientesOptions"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Ambientes",
                                  "ambientesOptions"
                                )
                              }
                            />
                            <label htmlFor={`sec186-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {mastersData.find((arr) => arr[0]?.mastersId === 185) && (
                  <>
                    <h5 className="fw-bold mb-3">Equipamientos</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 185)
                        ?.map((item, idx) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec185-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="electricOptions"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Equipamientos",
                                  "electricOptions"
                                )
                              }
                            />
                            <label htmlFor={`sec185-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {mastersData.find((arr) => arr[0]?.mastersId === 184) && (
                  <>
                    <h5 className="fw-bold mb-3">Servicios</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 184)
                        ?.map((item, idx) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec184-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="utilityOptions"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Servicios",
                                  "utilityOptions"
                                )
                              }
                            />
                            <label htmlFor={`sec184-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {mastersData.find((arr) => arr[0]?.mastersId === 210) && (
                  <>
                    <h5 className="fw-bold mb-3">Extras</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 210)
                        ?.map((item, idx) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec210-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="extrasOptions"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Extras",
                                  "extrasOptions"
                                )
                              }
                            />
                            <label htmlFor={`sec210-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {mastersData.find((arr) => arr[0]?.mastersId === 182) && (
                  <>
                    <h5 className="fw-bold mb-3">Localizacion</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 182)
                        ?.map((item) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec182-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageLiegend"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Localizacion",
                                  "meldungLageLiegend"
                                )
                              }
                            />
                            <label htmlFor={`sec182-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {mastersData.find((arr) => arr[0]?.mastersId === 181) && (
                  <>
                    <h5 className="fw-bold mb-3">Forma del terreno</h5>
                    <div className="row g-2 mb-4">
                      {mastersData
                        .find((arr) => arr[0]?.mastersId === 181)
                        ?.map((item) => (
                          <div className="col-md-auto" key={item.id}>
                            <input
                              id={`sec181-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageCondicion"
                              value={item.name}
                              onChange={() =>
                                handleCheckboxGroupChange(
                                  "Formadelterreno",
                                  "meldungLageCondicion"
                                )
                              }
                            />
                            <label htmlFor={`sec181-a${item.id}`}>
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                <h5 className="fw-bold mb-3">Etiquetas para tu anuncio</h5>
                <div className="row g-2 mb-4">
                          <div className="col-md-auto">
                            <input
                              // id={`sec181-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageCondicion"
                              // value={item.name}
                              // onChange={() =>
                              //   handleCheckboxGroupChange(
                              //     "Formadelterreno",
                              //     "meldungLageCondicion"
                              //   )
                              // }
                            />
                            <label >
                              Negociable
                            </label>
                          </div>
                          <div className="col-md-auto">
                            <input
                              // id={`sec181-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageCondicion"
                              // value={item.name}
                              // onChange={() =>
                              //   handleCheckboxGroupChange(
                              //     "Formadelterreno",
                              //     "meldungLageCondicion"
                              //   )
                              // }
                            />
                            <label >
                              A estrenar
                            </label>
                          </div>
                          <div className="col-md-auto">
                            <input
                              // id={`sec181-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageCondicion"
                              // value={item.name}
                              // onChange={() =>
                              //   handleCheckboxGroupChange(
                              //     "Formadelterreno",
                              //     "meldungLageCondicion"
                              //   )
                              // }
                            />
                            <label >
                              Acepta financiamiento
                            </label>
                          </div>
                          <div className="col-md-auto">
                            <input
                              // id={`sec181-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageCondicion"
                              // value={item.name}
                              // onChange={() =>
                              //   handleCheckboxGroupChange(
                              //     "Formadelterreno",
                              //     "meldungLageCondicion"
                              //   )
                              // }
                            />
                            <label >
                              Opción de compra
                            </label>
                          </div>
                          <div className="col-md-auto">
                            <input
                              // id={`sec181-a${item.id}`}
                              className="asButton"
                              type="checkbox"
                              name="meldungLageCondicion"
                              // value={item.name}
                              // onChange={() =>
                              //   handleCheckboxGroupChange(
                              //     "Formadelterreno",
                              //     "meldungLageCondicion"
                              //   )
                              // }
                            />
                            <label >
                              Opción de intercambio
                            </label>
                          </div>
                    </div>

                <h5 className="fw-bold mb-3">Tus datos de contacto</h5>
                <div className="row g-2">
                  <div className="col-md-3">
                    <div className="mb-3 position-relative">
                      <label className="mb-2">Teléfono</label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent">
                          <i className="bi bi-telephone-fill primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-transparent border"
                          id=""
                          name=""
                          // placeholder="+58 123 456 789"
                          value={
                            Array.isArray(allData?.userDetails)
                              ? allData.userDetails
                                  .map((item) => item.phone)
                                  .join(", ")
                              : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-3 position-relative">
                      <label className="mb-2">Whatsapp</label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent">
                          <i className="bi bi-whatsapp primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-transparent border"
                          id=""
                          name=""
                          // placeholder="+58 123 456 789"
                          // required=""
                          value={
                            Array.isArray(allData?.userDetails)
                              ? allData.userDetails
                                  .map((item) => item.whatsApp || "")
                                  .join(", ")
                              : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-2 mb-4">
                  <div className="col-md-4">
                    <div className="mb-3 position-relative">
                      <label className="mb-2">Email</label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent">
                          <i className="bi bi-envelope-fill primary-text" />
                        </span>
                        <input
                          type="email"
                          className="form-control bg-transparent border"
                          id=""
                          name=""
                          placeholder="nombre@gmail.com"
                          // required=""
                          disabled
                          value={allData?.email}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                    <div className="mb-3 position-relative">
                      <label className="mb-2">Página web</label>
                      <div className="input-group">
                        <span className="input-group-text bg-transparent">
                          <i className="bi bi-globe primary-text" />
                        </span>
                        <input
                          type="text"
                          className="form-control bg-transparent border"
                          id=""
                          name=""
                          placeholder="www.dominio.com"
                          required=""
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
                <h5 className="fw-bold">
                  ¿Quieres aumentar la visibilidad a tu anuncio?
                </h5>
                <div className="row g-2 mb-4">
                  <div className="col-md-auto">
                    <input
                      id="a56"
                      className="asButton"
                      type="checkbox"
                      name="meldungLageLiegend"
                      defaultValue="TOP destacado 7 días"
                    />
                    <label htmlFor="a56">
                      TOP destacado <b>7 días</b>
                    </label>
                  </div>
                  <div className="col-md-auto">
                    <input
                      id="a57"
                      className="asButton"
                      type="checkbox"
                      name="meldungLageLiegend"
                      defaultValue="TOP destacado 15 días"
                    />
                    <label htmlFor="a57">
                      TOP destacado <b>15 días</b>
                    </label>
                  </div>
                  <div className="col-md-auto">
                    <input
                      id="a58"
                      className="asButton"
                      type="checkbox"
                      name="meldungLageLiegend"
                      defaultValue="TOP destacado 30 días"
                    />
                    <label htmlFor="a58">
                      TOP destacado <b>30 días</b>
                    </label>
                  </div>
                  <div className="col-md-auto">
                    <input
                      id="a59"
                      className="asButton"
                      type="checkbox"
                      name="meldungLageLiegend"
                      defaultValue="No, estoy bien así"
                    />
                    <label htmlFor="a59">No, estoy bien así</label>
                  </div>
                </div>
              </div>
              <hr />
              <div className="container">
                <div className="row justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-auto ps-4 pe-4 me-3 text-capitalize"
                    name="action"
                    value="publish"
                  >
                    {/* Publicar inmueble */}
                    {id ? "Actualizar Inmueble" : "Publicar Inmueble"}
                  </button>
                  <button
                    type="submit"
                    className="btn border-primary border w-auto ps-4 pe-4 text-capitalize"
                    name="action"
                    value="draft"
                  >
                    Guardar borrador
                  </button>
                </div>
              </div>
            </form>
          </section>

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default PublishProperty;
