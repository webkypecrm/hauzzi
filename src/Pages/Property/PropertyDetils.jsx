import React, { useState, useRef, useEffect, Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import img2 from "../../assets/img/my-img/icon_123.png";
import img3 from "../../assets/img/my-img/icon.png";
import img4 from "../../assets/img/my-img/Vector_1.png";
import img5 from "../../assets/img/my-img/icon_1.png";
import img6 from "../../assets/img/my-img//building.png";
import img7 from "../../assets/img/my-img//judge.png";
import img8 from "../../assets/img/my-img//apple.png";
import img9 from "../../assets/img/my-img//money-send.svg";
import img10 from "../../assets/img/my-img//like-shapes.png";
import img11 from "../../assets/img/my-img/Line arrow-down.png";
// import map from "../../assets/img/my-img/map-1view.png";
// import img12 from "../../assets/img/my-img/image31.png";
import whatsapp from "../../assets/img/my-img/whatsapps.png";
// import img13 from "../../assets/img/my-img/ellipse_1.png";
import telephn from "../../assets/img/my-img/call12.png";
import msg from "../../assets/img/my-img/sms.svg";
import global from "../../assets/img/my-img/global.png";
import Map from "../../Map";
import locationn from "../../assets/img/my-img/vector.png";
import { toast } from "react-toastify";
// import Calendar from "../../Calendar";
import hauzzi from "../../assets/img/hauzziIcon.png";
import share from "../../assets/img/my-img/share-icon.png";
import call from "../../assets/img/blackCall.png";
import mail from "../../assets/img/blackMail.png";
import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css';
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import link from "../../assets/img/link.png";
import twitter from "../../assets/img/twitter.png";
import face from "../../assets/img/facebook.png";
import whats from "../../assets/img/whatsapp.png";
import getApi from "../../Hook.js";
import cancel from "../../assets/img/X-circle.png";

const PropertyDetils = () => {
  // -------------lightbox---------
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("agendar");
  const [propertyData, setPropertyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeDirection, setFadeDirection] = useState("");
  const [count, setCount] = useState("");
  const [mainData, setMainData] = useState([]);
  const [allIds, setAllIds] = useState([]);
  // const [allData, setAllData] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [daysArray, setDaysArray] = useState([]);
  const [compareIds, setCompareIds] = useState([]);
  const [compareLoaded, setCompareLoaded] = useState(false);
  const [wishlistFolderIds, setWishlistFolderIds] = useState([]);
  const [folderPopup, setFolderPopup] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [folderData, setFolderData] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const token2 = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId") || "";

  console.log("propertyData", propertyData);

  // lightbox
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsClosing(true);
    setTimeout(() => {
      setLightboxOpen(false);
      setIsClosing(false);
    }, 400);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFadeDirection("right");

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 200);
  };

  const nextImage = () => {
    if (isAnimating) return; // prevent double click
    setIsAnimating(true);
    setFadeDirection("left");

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsAnimating(false);
    }, 200);
  };

  // ---------------Get Property Data----------
  const { id } = useParams();

  const getPropertyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/property/property?isDraft=false&id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(response?.data?.totalcount);

      // Get data safely depending on response shape
      let property = null;

      if (Array.isArray(response.data?.data)) {
        property = response.data.data[0];
      } else if (typeof response.data?.data === "object") {
        property = response.data.data;
      }

      setPropertyData(property);

      if (property?.images?.length > 0) {
        const fullImagePaths = property.images.map((img) =>
          img.startsWith("http") ? img : `${apiUrl}/${img}`
        );

        setImages(fullImagePaths);

        fullImagePaths.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  let showData = [];
  let profileType = "";

  if (propertyData?.Customer?.userDetails?.length > 0) {
    showData = propertyData.Customer.userDetails;
    profileType = "user";
  } else if (propertyData?.Customer?.agentDetails?.length > 0) {
    showData = propertyData.Customer.agentDetails;
    profileType = "agent";
  } else if (propertyData?.Customer?.agencyDetails?.length > 0) {
    showData = propertyData.Customer.agencyDetails;
    profileType = "agency";
  }

  console.log("propertyData", propertyData);

  useEffect(() => {
    setActiveTab("agendar");
    getPropertyData();
  }, [id]);
  // ---------------------------------------------------
  const seguridadList = (propertyData?.listingDetails?.Seguridad ?? "")
    .split(",")
    .map((item) => item.trim());
  const ambientes = (propertyData?.listingDetails?.Ambientes ?? "")
    .split(",")
    .map((item) => item.trim());
  const Equipamientos = (propertyData?.listingDetails?.Equipamientos ?? "")
    .split(",")
    .map((item) => item.trim());
  const Servicios = (propertyData?.listingDetails?.Servicios ?? "")
    .split(",")
    .map((item) => item.trim());
  const Extras = (propertyData?.listingDetails?.Extras ?? "")
    .split(",")
    .map((item) => item.trim());
  const Localizacion = (propertyData?.listingDetails?.Localizacion ?? "")
    .split(",")
    .map((item) => item.trim());
  const Formadelterreno = (propertyData?.listingDetails?.Formadelterreno ?? "")
    .split(",")
    .map((item) => item.trim());

  //----------map--------

  const location = useLocation();
  const {
    lat: latRaw,
    lng: lngRaw,
    name,
    image,
    allProducts = [],
  } = location.state || {};

  const lat = parseFloat(latRaw);
  const lng = parseFloat(lngRaw);

  const map1Ref = useRef(null);
  const map2Ref = useRef(null);

  useEffect(() => {
    if (!lat || !lng || !window.google) return;

    // --- Map 1: With InfoWindow
    const map1 = new window.google.maps.Map(map1Ref.current, {
      center: { lat, lng },
      zoom: 13,
    });

    const marker1 = new window.google.maps.Marker({
      position: { lat, lng },
      map: map1,
      title: name,
    });

    const infoWindow1 = new window.google.maps.InfoWindow({
      content: `
        <div style="text-align:center;">
          <img src="${image}" alt="${name}" style="width:120px;height:70px;object-fit:cover;border-radius:5px;" />
          <p style="margin:5px 0 0;">${name}</p>
        </div>
      `,
    });

    infoWindow1.open(map1, marker1);

    // --- Map 2: Only Markers
    const map2 = new window.google.maps.Map(map2Ref.current, {
      center: { lat, lng },
      zoom: 13,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map: map2,
      title: name + " (Current Location)",
      // icon: {
      //   url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      // },
    });

    allProducts.forEach((product) => {
      const productLat = parseFloat(product.lat);
      const productLng = parseFloat(product.lng);

      // Optional: skip if it’s the same lat/lng as current
      if (productLat === lat && productLng === lng) return;

      if (!isNaN(productLat) && !isNaN(productLng)) {
        new window.google.maps.Marker({
          position: { lat: productLat, lng: productLng },
          map: map2,
          title: product.name,
          // icon: {
          //   url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          // },
        });
      }
    });
  }, [lat, lng, allProducts, name, image]);

  // Get three property
  const getMainData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/property/property?isDraft=false&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMainData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all IDs for navigation

  const currentId = parseInt(id);

  const getAllPropertyIds = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/property?isDraft=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ids = response?.data?.data?.map((item) => item.id);

      const sortedIds = ids.sort((a, b) => a - b);

      // setAllData(response?.data?.data);

      // setAllIds(ids);
      setAllIds(sortedIds);
    } catch (error) {
      console.error("Error fetching property IDs:", error);
    }
  };

  useEffect(() => {
    getMainData();
    getAllPropertyIds();
  }, []);

  const currentIndexid = allIds.indexOf(currentId);
  const prevId = currentIndexid > 0 ? allIds[currentIndexid - 1] : null;
  const nextId =
    currentIndexid < allIds.length - 1 ? allIds[currentIndexid + 1] : null;

  // Wishlist Api

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/property/getWishlist/${customerId}`,
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

    if (customerId) fetchWishlist();
  }, [customerId]);

  const handelWishlist = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/addToWishlist/${customerId}-${id}`,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );

      toast.success(response.data.message);

      // Update the wishlist state to toggle icon color
      setWishlistIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // fatch foldet true/false
  const url = `${apiUrl}/profile/getById/${customerId}`;
  const { data, error } = getApi(url);
  const folder = data?.isFolder;
  console.log("folder", folder);

  // folder options
  const getFolderData = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/property/get-Folders-byCustomerId?customerId=${customerId}`,
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
    getFolderData();
  }, []);

  // property add in folder
  useEffect(() => {
    const fetchFolderProperty = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/property/getPropertyFolderData?customerId=${customerId}`,
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
  }, []);

  const handleAddFolder = async (pid) => {
    // console.log(id)
    try {
      const response = await axios.post(
        `${apiUrl}/property/addpropertyFolderData`,

        {
          propertyId: pid,
          folderId: Number(selectedFolderId),
          customerId: Number(customerId),
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
          `${apiUrl}/property/getCompare/${customerId}`,
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

    if (customerId) fetchCompareList();
  }, [customerId]);

  const handleCompare = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/property/addToCompare/${customerId}-${id}`,
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
      getMainData();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ----------------------Calender------------------

  const today = new Date();

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    let days = [];

    // Add empty slots before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push("");
    }

    // Add actual days
    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }

    setDaysArray(days);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const formattedDate = new Date(currentYear, currentMonth).toLocaleString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  // calender POST Api
  const initialState = {
    email: "",
    phone: "",
    type: "En persona",
    date: "",
    time: "",
    propertyId: id || "",
    userId: localStorage.getItem("tokenId") || "",
  };
  // console.log("first", customerId);
  const [calenderData, setCalenderData] = useState(initialState);

  const handelCalenderInputChange = (e) => {
    const { name, value } = e.target;
    setCalenderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateSelect = (day) => {
    if (!day) return;

    const selected = new Date(currentYear, currentMonth, day);
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (selected < todayOnly) return;

    const formatted =
      selected.getFullYear() +
      "-" +
      String(selected.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(selected.getDate()).padStart(2, "0");

    setCalenderData((prev) => ({
      ...prev,
      date: formatted,
    }));
  };

  const handelCalenderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/enquiry/add`, calenderData, {
        headers: {
          Authorization: `Bearer ${token2}`,
        },
      });
      setCalenderData(initialState);
      console.log("response", response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Request Information
  const initialState2 = {
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyId: Number(id) || "",
  };

  const [msgSendDAta, setMsgSendDAta] = useState(initialState2);
  const handelRequestInputChange = (e) => {
    const { name, value } = e.target;
    setMsgSendDAta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handelMsgSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/request-enquiry/add`,
        msgSendDAta,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
          },
        }
      );
      setMsgSendDAta(initialState2);
      console.log("response", response);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section className="top-btn12">
            <div className="container">
              <div className="top-bt">
                <div className="f-bt">
                  <Link className="btn-getstarted" to="#">
                    <i className="fa fa-long-arrow-left p-2" />
                    Volver{" "}
                  </Link>
                </div>
                <div className="s-bt">
                  {/* <Link
                    className="btn-getstarted"
                    to={`/propert-details/${parseInt(id) - 1}`}
                  >
                    <i className="fa fa-long-arrow-left p-2" />
                    Anterior{" "}
                  </Link> */}
                  {prevId ? (
                    <Link
                      className="btn-getstarted"
                      to={`/propert-details/${prevId}`}
                      // state={{ lat: propertyData?.latitude, lng: propertyData?.longitude, name: propertyData?.name,image: propertyData?.images[0]}}
                    >
                      <i className="fa fa-long-arrow-left p-2" />
                      Anterior
                    </Link>
                  ) : (
                    <Link className="btn-getstarted" disabled>
                      <i className="fa fa-long-arrow-left p-2" />
                      Anterior
                    </Link>
                  )}
                  {/* <Link
                    className="btn-getstarted"
                    to={`/propert-details/${parseInt(id) + 1}`}
                  >
                    {" "}
                    Siguiente <i className="fa fa-long-arrow-right p-2" />
                  </Link> */}
                  {nextId ? (
                    <Link
                      className="btn-getstarted"
                      to={`/propert-details/${nextId}`}
                      // state={{ lat: propertyData?.latitude, lng: propertyData?.longitude, name: propertyData?.name,image: propertyData?.images[0]}}
                    >
                      Siguiente <i className="fa fa-long-arrow-right p-2" />
                    </Link>
                  ) : (
                    <Link className="btn-getstarted" disabled>
                      Siguiente <i className="fa fa-long-arrow-right p-2" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
          {images.length > 0 && (
            <section className="gallery">
              <section className="p-0 container">
                <div className="row d-flex">
                  <div
                    className="col-md-6 position-relative"
                    style={{ padding: 2.5 }}
                  >
                    <div
                      className="lightbox_img_wrap"
                      style={{ height: "99%" }}
                    >
                      <img
                        className="lightbox-enabled"
                        src={images[0]}
                        onClick={() => openLightbox(0)}
                        alt="Main"
                      />
                    </div>
                    <div className="bottom-btn">
                      <Link className="btn-getstarted" to="#">
                        <img src="img/my-img/camera.png" alt="" />
                        {images.length} Fotos
                      </Link>
                      {/* <Link
                        className="btn-getstarted"
                        to="#"
                        style={{ backgroundColor: "#fff", color: "#000" }}
                      >
                        3D Visita Virtual
                      </Link> */}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      {images.slice(1, 5).map((img, index) => (
                        <div
                          className="col-md-6"
                          key={index + 1}
                          style={{ padding: 2.5 }}
                        >
                          <div className="lightbox_img_wrap position-relative">
                            <img
                              loading="lazy"
                              className="lightbox-enabled"
                              src={img}
                              onClick={() => openLightbox(index + 1)}
                              alt={`Sub ${index + 1}`}
                            />
                            {index === 3 && (
                              <div
                                className="img-count1"
                                onClick={() => openLightbox(4)}
                              >
                                <Link
                                  to="#"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <h2>+{images.length - 4} fotos</h2>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </section>
          )}
          {/* ----------- LIGHTBOX ----------- */}
          {lightboxOpen && (
            <section
              className={`lightbox-container ${!isClosing ? "active" : ""}`}
              onClick={closeLightbox}
            >
              <span
                className="material-icons lightbox-btn left"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <i className="fa fa-long-arrow-left"></i>
              </span>
              <span
                className="material-icons lightbox-btn right"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <i className="fa fa-long-arrow-right"></i>
              </span>
              <span className="close material-icons" onClick={closeLightbox}>
                <i className="fa fa-close"></i>
              </span>
              {/* <div
                className="lightbox-image-wrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                key={currentIndex} 
                  ref={lightboxImageRef}
                  src={images[currentIndex] || ""}
                  alt="lightbox"
                  className="lightbox-image"
                />
              </div> */}
              <div
                className={`lightbox-image-wrapper fade-wrapper ${
                  isAnimating ? `fade-${fadeDirection}` : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* <img
    key={currentIndex}
    ref={lightboxImageRef}
    src={images[currentIndex]}
    alt="lightbox"
    className="lightbox-image"
  /> */}
                {images[currentIndex] ? (
                  <img src={images[currentIndex]} className="lightbox-image" />
                ) : (
                  <div
                    className="spinner-border text-light"
                    role="status"
                  ></div>
                )}
              </div>
            </section>
          )}
          <section className="ham12">
            <div className="container">
              <div className="home-claas">
                <ul className="ham-class">
                  <li style={{ listStyle: "none", color: "#767373" }}>
                    Inicio
                  </li>
                  <li style={{ color: "#767373" }}>Listado</li>
                  <li style={{ color: "#767373" }}>Caracas</li>
                  <li style={{ color: "#000" }}>{propertyData?.name}</li>
                </ul>
                <div className="top-bt topp-view12">
                  <div className="f-bt">
                    <Link className="btn-getstarted" to="#">
                      {" "}
                      {propertyData?.purpose}{" "}
                    </Link>
                    <Link className="btn-getstarted" to="#">
                      <i className="fa fa-eye p-2" aria-hidden="true" />
                      Visto: {propertyData?.views}{" "}
                    </Link>
                    <Link className="btn-getstarted" to="#">
                      <i className="fa fa-heart p-2" /> Favorito: 0{" "}
                    </Link>
                    <Link className="btn-getstarted" to="#">
                      {" "}
                      Publicado: Hace 10 días{" "}
                    </Link>
                  </div>
                  <div className="s-bt ">
                    <Link
                      className="btn-getstarted"
                      to="#"
                      // onClick={() => handelWishlist(propertyData?.id)}
                      onClick={() => {
                        setSelectedPropertyId(propertyData.id);
                        folder
                          ? setFolderPopup(true)
                          : handelWishlist(propertyData.id);
                      }}
                      style={{
                        backgroundColor: "#fff",
                        border: "1.5px solid #EEEEEE",
                      }}
                    >
                      {/* <i className="fa fa-heart p-2" /> */}
                      <i
                        className="fa fa-heart p-2"
                        // style={{
                        //   color: wishlistIds.includes(propertyData?.id)
                        //     ? "red"
                        //     : "",
                        // }}
                        style={{
                          color:
                            wishlistIds.includes(propertyData?.id) ||
                            wishlistFolderIds.includes(propertyData?.id)
                              ? "red"
                              : "",
                        }}
                      />
                      <span style={{ fontWeight: "500" }}>Favorito </span>
                    </Link>

                    <Link
                      className="btn-getstarted"
                      to="#"
                      style={{
                        backgroundColor: "#fff",
                        border: "1.5px solid #EEEEEE",
                      }}
                    >
                      <i className="fa fa-share-alt p-2" /> Compartir{" "}
                    </Link>
                    {/* <Link
                      className="btn-getstarted"
                      to="#"
                      onClick={() => handleCompare(propertyData?.id)}
                      style={{backgroundColor: "#fff",border: "1.5px solid #EEEEEE"}}
                    >
                      <i
                        key={compareIds.join(",")}
                        className="fa fa-exchange p-2"
                        style={{
                          color: compareIds.includes(Number(propertyData?.id))
                            ? "red"
                            : "",
                        }}
                      />

                    </Link> */}
                    <Link
                      className="ms-2"
                      style={{
                        border: "1.5px solid #EEEEEE",
                        borderRadius: "6px",
                        padding: "7.5px 10px",
                      }}
                    >
                      <svg
                        width={24}
                        height={13.33}
                        viewBox="0 0 24 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleCompare(propertyData?.id)}
                      >
                        <path
                          d="M23.0845 15.5834C23.5359 15.9897 23.5359 16.6668 23.0845 17.073L19.4734 20.6841C18.7964 21.3612 17.6679 20.9098 17.6679 19.9168V18.1112H15.0047C14.8241 18.1112 14.6887 18.0661 14.5984 17.9758L11.3936 14.5452L13.8311 11.9723L16.2234 14.5001H17.6679V12.7397C17.6679 11.7466 18.7964 11.2952 19.4734 11.9723L23.0845 15.5834ZM0.876217 7.27789C0.560244 7.27789 0.33455 7.05219 0.33455 6.73622V4.20844C0.33455 3.93761 0.560244 3.66678 0.876217 3.66678H5.84149C6.02205 3.66678 6.15747 3.75705 6.24774 3.84733L9.4526 7.27789L7.0151 9.8508L4.66788 7.27789H0.876217ZM17.6679 7.27789H16.2234L6.24774 17.9758C6.15747 18.0661 6.02205 18.1112 5.84149 18.1112H0.876217C0.560244 18.1112 0.33455 17.8855 0.33455 17.5696V15.0418C0.33455 14.7709 0.560244 14.5001 0.876217 14.5001H4.66788L14.5984 3.84733C14.6887 3.75705 14.8241 3.66678 15.0047 3.66678H17.6679V1.90636C17.6679 0.913305 18.7964 0.461916 19.4734 1.139L23.0845 4.75011C23.5359 5.15636 23.5359 5.83344 23.0845 6.23969L19.4734 9.8508C18.7964 10.5279 17.6679 10.0765 17.6679 9.08344V7.27789Z"
                          fill={
                            compareIds.includes(Number(propertyData?.id))
                              ? "red"
                              : "black"
                          }
                        />
                      </svg>
                    </Link>
                    <Link
                      className="ms-2"
                      style={{
                        border: "1.5px solid #EEEEEE",
                        borderRadius: "6px",
                        padding: "7.5px 10px",
                      }}
                    >
                      <svg
                        width={24}
                        height={14.33}
                        viewBox="0 0 29 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.375 7.25H4.29167M4.29167 7.25H27.625M4.29167 7.25V26.5C4.29167 27.2293 4.59896 27.9288 5.14594 28.4445C5.69292 28.9603 6.43479 29.25 7.20833 29.25H21.7917C22.5652 29.25 23.3071 28.9603 23.8541 28.4445C24.401 27.9288 24.7083 27.2293 24.7083 26.5V7.25M8.66667 7.25V4.5C8.66667 3.77065 8.97396 3.07118 9.52094 2.55546C10.0679 2.03973 10.8098 1.75 11.5833 1.75H17.4167C18.1902 1.75 18.9321 2.03973 19.4791 2.55546C20.026 3.07118 20.3333 3.77065 20.3333 4.5V7.25M11.5833 14.125V22.375M17.4167 14.125V22.375"
                          stroke="#1E1E1E"
                          style={{
                            stroke: "color(display-p3 0.1176 0.1176 0.1176)",
                            strokeOpacity: 1,
                          }}
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    <Link
                      className="ms-2"
                      style={{
                        border: "1.5px solid #EEEEEE",
                        borderRadius: "6px",
                        padding: "7.5px 10px",
                      }}
                    >
                      <svg
                        width={24}
                        height={14}
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.5 10.25V1.5H21.5V10.25M6.5 21.5H4C3.33696 21.5 2.70107 21.2366 2.23223 20.7678C1.76339 20.2989 1.5 19.663 1.5 19V12.75C1.5 12.087 1.76339 11.4511 2.23223 10.9822C2.70107 10.5134 3.33696 10.25 4 10.25H24C24.663 10.25 25.2989 10.5134 25.7678 10.9822C26.2366 11.4511 26.5 12.087 26.5 12.75V19C26.5 19.663 26.2366 20.2989 25.7678 20.7678C25.2989 21.2366 24.663 21.5 24 21.5H21.5M6.5 16.5H21.5V26.5H6.5V16.5Z"
                          stroke="#1E1E1E"
                          style={{
                            stroke: "color(display-p3 0.1176 0.1176 0.1176)",
                            strokeOpacity: 1,
                          }}
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="property-det">
            <div className="container">
              <div className="row">
                <div className="col-md-7">
                  <h2>{propertyData?.name}</h2>
                  <p>
                    <i
                      className="fa fa-map-marker"
                      aria-hidden="true"
                      style={{ marginRight: 7, color: "#ffbd59" }}
                    />
                    {propertyData?.address1}
                  </p>
                  <ul className="prop_details mb0 p-0">
                    <li className="list-inline-item">
                      <span>
                        {" "}
                        <img src={img3} /> {propertyData?.Habitaciones} Hab.{" "}
                      </span>
                    </li>{" "}
                    <li className="list-inline-item">
                      <span>
                        <img src={img4} /> {propertyData?.Baños} Baños{" "}
                      </span>
                    </li>
                    <li className="list-inline-item">
                      <span>
                        <img src={img5} /> {propertyData?.maxSize} sqf{" "}
                      </span>
                    </li>
                  </ul>
                  <div className="row mt-4">
                    <div className="col-md-3">
                      <p className="view-m">
                        <img src={img6} style={{ marginRight: 8, width: 18 }} />
                        {propertyData?.category}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p className="view-m">
                        <img src={img7} style={{ marginRight: 8, width: 18 }} />
                        {/* {propertyData?.type} */}
                        Antigüedad : {propertyData?.listingDetails?.Antigüedad}
                      </p>
                    </div>
                    {/* <div className="col-md-3">
                      <p className="view-m">
                        <img src={img5} style={{ marginRight: 8, width: 18 }} />
                        {propertyData?.builderName}
                      </p>
                    </div> */}
                    <div className="col-md-3">
                      <p className="view-m">
                        <img src={img5} style={{ marginRight: 8, width: 18 }} />
                        {propertyData?.listingDetails?.Condición}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p className="view-m">
                        <img src={img5} style={{ marginRight: 8, width: 18 }} />
                        Vistas : {propertyData?.listingDetails?.Vistas}
                      </p>
                    </div>

                    <div className="col-md-3">
                      <p className="view-m">
                        <img src={img9} style={{ marginRight: 8, width: 18 }} />
                        ${propertyData?.maxPSF}/sqft
                      </p>
                    </div>
                    {propertyData?.listingDetails?.Tipodesuelo && (
                      <div className="col-md-2">
                        <p className="view-m">
                          <img
                            src={img8}
                            style={{ marginRight: 8, width: 18 }}
                          />
                          {propertyData?.listingDetails?.Tipodesuelo}
                        </p>
                      </div>
                    )}

                    {propertyData?.listingDetails?.Publicadopor && (
                      <div className="col-md-4">
                        <p className="view-m">
                          <img
                            src={img10}
                            style={{ marginRight: 8, width: 18 }}
                          />
                          {propertyData?.listingDetails?.Publicadopor}
                        </p>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-2">
                    $
                    {propertyData.maxPrice
                      ? Number(propertyData.maxPrice).toLocaleString()
                      : Number(propertyData.rentalPrice).toLocaleString()}{" "}
                    <span style={{ fontSize: 13, color: "#00BF63" }}>
                      <img src={img11} style={{ width: 20 }} />
                      Ha bajado $5.000{" "}
                    </span>
                  </h3>

                  <h6 className="mt-4" style={{ fontWeight: 800 }}>
                    {propertyData?.name}
                  </h6>
                  <p className="mt-4 ">{propertyData?.description}</p>
                  {Array.isArray(propertyData?.features) &&
                    propertyData.features.length > 0 && (
                      <>
                        <h6 className="mt-4" style={{ fontWeight: 800 }}>
                          Features include:
                        </h6>
                        <ul>
                          {propertyData.features.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}

                  <p style={{ color: "#FFBD59" }}>Detalles</p>
                  <div className="l1">
                    {propertyData?.listingDetails?.Habitaciones && (
                      <p>
                        Habitaciones :{" "}
                        <b>{propertyData.listingDetails.Habitaciones} </b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Baños && (
                      <p>
                        Baños : <b>{propertyData.listingDetails.Baños} </b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Estacionamientos && (
                      <p>
                        Estacionamientos :{" "}
                        <b>{propertyData.listingDetails.Estacionamientos} </b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Condición && (
                      <p>
                        Condición :{" "}
                        <b>{propertyData.listingDetails.Condición}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Antigüedad && (
                      <p>
                        Antigüedad :{" "}
                        <b>{propertyData.listingDetails.Antigüedad}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Tipodesuelo && (
                      <p>
                        Tipo de suelo :{" "}
                        <b>{propertyData.listingDetails.Tipodesuelo}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Orientación && (
                      <p>
                        Orientación :{" "}
                        <b>{propertyData.listingDetails.Orientación}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Vistas && (
                      <p>
                        Vistas : <b>{propertyData.listingDetails.Vistas}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Publicadopor && (
                      <p>
                        Publicado por :{" "}
                        <b>{propertyData.listingDetails.Publicadopor}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Planta && (
                      <p>
                        Planta : <b>{propertyData.listingDetails.Planta}</b>
                      </p>
                    )}

                    {propertyData?.listingDetails?.Mobiliario && (
                      <p>
                        Mobiliario :{" "}
                        <b>{propertyData.listingDetails.Mobiliario}</b>
                      </p>
                    )}
                  </div>

                  {/* <img src={map} className="img-fluid mt-4" /> */}
                  <div
                    ref={map2Ref}
                    className="img-fluid mt-4"
                    style={{
                      height: "300px",
                      width: "100%",
                      borderRadius: "15px",
                    }}
                  ></div>

                  {seguridadList && seguridadList.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Seguridad
                    </p>
                  )}
                  <ul className="lit">
                    {seguridadList.length > 1 &&
                      seguridadList.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>

                  {ambientes && ambientes.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Ambientes
                    </p>
                  )}
                  <ul className="lit">
                    {ambientes.length > 1 &&
                      ambientes.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>

                  {Equipamientos && Equipamientos.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Equipamientos
                    </p>
                  )}
                  <ul className="lit">
                    {Equipamientos.length > 1 &&
                      Equipamientos.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>
                  {Servicios && Servicios.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Servicios
                    </p>
                  )}
                  <ul className="lit">
                    {Servicios.length > 1 &&
                      Servicios.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>
                  {Extras && Extras?.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Extras
                    </p>
                  )}
                  <ul className="lit">
                    {Extras.length > 1 &&
                      Extras.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>
                  {Localizacion && Localizacion?.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Localizacion
                    </p>
                  )}
                  <ul className="lit">
                    {Localizacion.length > 1 &&
                      Localizacion.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                  </ul>

                  {Formadelterreno && Formadelterreno?.length > 1 && (
                    <p style={{ color: "#FFBD59" }} className="mt-3">
                      Forma del terreno
                    </p>
                  )}

                  {Formadelterreno.length > 1 && (
                    <ul className="lit">
                      {Formadelterreno.map((item, index) => (
                        <li key={index} style={{ fontSize: "14px" }}>
                          <i
                            className="fa fa-check"
                            style={{ marginRight: 7, fontSize: 11 }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div
                    ref={map1Ref}
                    className="img-fluid mt-4"
                    style={{
                      height: "400px",
                      width: "100%",
                      borderRadius: "15px",
                    }}
                  ></div>

                  <h6 className="mt-3">Cercanías del inmueble</h6>
                  <div className="loc">
                    <Map
                      lat={propertyData?.latitude}
                      lng={propertyData?.longitude}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  {showData?.map((item) => (
                    <div key={item.id}>
                      <Link
                        to={
                          profileType === "agent"
                            ? `/agentprofile/${item.customerId}`
                            : profileType === "agency"
                            ? `/agencyprofile/${item.customerId}`
                            : "#"
                        }
                      >
                        <div className="sidebar-det position-relative">
                          {/* <div className="whatsapp">
                          <img src={whatsapp} className="img-fluid what" />
                        </div> */}
                          <div className="side-c text-center">
                            <img src={item.photoUrl} className="img-r" />
                            <div
                              className="side-design text-center"
                              style={{ marginTop: "15px" }}
                            >
                              <h6>{propertyData?.Customer?.name}</h6>
                              <p style={{ fontSize: 13 }}>
                                {count} listados de inmuebles
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="card-de" key={item.id}>
                        <div className="pr-det" style={{ marginTop: "10%" }}>
                          <p className="de-i"></p>
                          <p
                            style={{
                              marginLeft: "40px",
                              marginRight: "22%",
                              fontSize: "13px",
                            }}
                          >
                            <img
                              src={telephn}
                              style={{ width: 18, marginRight: 9 }}
                            />
                            Teléfono
                          </p>
                          <p>
                            <b style={{ fontSize: "13px" }}>{item.phone}</b>
                          </p>
                          <p />
                        </div>
                        <div className="pr-det">
                          <p className="de-i"></p>
                          <p
                            style={{
                              marginLeft: "40px",
                              marginRight: "25%",
                              fontSize: "13px",
                            }}
                          >
                            <img
                              src={msg}
                              style={{ width: 18, marginRight: 9 }}
                            />
                            Correo
                          </p>
                          <p>
                            <b style={{ fontSize: "13px" }}>
                              {propertyData?.Customer.email}
                            </b>
                          </p>
                          <p />
                        </div>
                        <div className="pr-det">
                          <p className="de-i"></p>
                          <p
                            style={{
                              marginLeft: "40px",
                              marginRight: "17%",
                              fontSize: "13px",
                            }}
                          >
                            <img
                              src={global}
                              style={{ width: 18, marginRight: 9 }}
                            />
                            Página web
                          </p>
                          <p>
                            <b style={{ fontSize: "13px" }}>{item.website}</b>
                          </p>
                          <p />
                        </div>
                      </div>
                    </div>
                  ))}

                  <h5 className="mt-4 text-center" style={{ fontWeight: 700 }}>
                    Contacta con el anunciante
                  </h5>
                  <div className="tab-v12">
                    <div className="tab tab1">
                      <button
                        className={`tablinks ${
                          activeTab === "agendar" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("agendar")}
                      >
                        Agendar tour
                      </button>
                      <button
                        className={`tablinks ${
                          activeTab === "solicitar" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("solicitar")}
                      >
                        Solicitar información
                      </button>
                    </div>

                    {activeTab === "agendar" && (
                      <form onSubmit={handelCalenderSubmit}>
                        <div id="agendar" className="tabcontent mt-4">
                          <div className="radio12">
                            <label className="container1">
                              En persona
                              <input
                                type="radio"
                                name="type"
                                value="En persona"
                                checked={calenderData.type === "En persona"}
                                onChange={handelCalenderInputChange}
                              />
                              <span className="checkmark" />
                            </label>
                            <label className="container1">
                              Videollamada
                              <input
                                type="radio"
                                name="type"
                                value="Videollamada"
                                checked={calenderData.type === "Videollamada"}
                                onChange={handelCalenderInputChange}
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <div className="calendar">
                            <header>
                              <pre className="left" onClick={handlePrevMonth}>
                                ◀
                              </pre>
                              <div className="header-display">
                                <p className="display">{formattedDate}</p>
                              </div>
                              <pre className="right" onClick={handleNextMonth}>
                                ▶
                              </pre>
                            </header>

                            <div className="week">
                              {dayNames.map((day, i) => (
                                <div key={i}>{day}</div>
                              ))}
                            </div>

                            <div className="days">
                              {daysArray.map((day, i) => {
                                if (!day) {
                                  return (
                                    <div
                                      key={i}
                                      className="day-box empty"
                                    ></div>
                                  );
                                }

                                const isToday =
                                  today.getDate() === day &&
                                  today.getMonth() === currentMonth &&
                                  today.getFullYear() === currentYear;

                                const formattedDay = `${currentYear}-${String(
                                  currentMonth + 1
                                ).padStart(2, "0")}-${String(day).padStart(
                                  2,
                                  "0"
                                )}`;
                                const isSelected =
                                  calenderData.date === formattedDay;

                                const isPast =
                                  new Date(currentYear, currentMonth, day) <
                                  new Date(
                                    today.getFullYear(),
                                    today.getMonth(),
                                    today.getDate()
                                  );

                                return (
                                  <div
                                    key={i}
                                    className={`day-box 
          ${isToday ? "current-date" : ""} 
          ${isSelected ? "selected-date" : ""} 
          ${isPast ? "disabled-date" : ""}`}
                                    onClick={() =>
                                      !isPast && handleDateSelect(day)
                                    }
                                  >
                                    {day}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="form-group mt-2">
                            <label htmlFor="usr">Hora</label>
                            <input
                              type="text"
                              className="form-control"
                              id="usr"
                              placeholder="Ingresa la hora"
                              name="time"
                              value={calenderData.time}
                              onChange={handelCalenderInputChange}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="Ingresa tu correo electrónico"
                              name="email"
                              value={calenderData.email}
                              onChange={handelCalenderInputChange}
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="teléfono">Teléfono</label>
                            <input
                              type="text"
                              className="form-control"
                              id="teléfono"
                              placeholder="Ingresa tu teléfono"
                              name="phone"
                              value={calenderData.phone}
                              onChange={handelCalenderInputChange}
                            />
                          </div>
                          <div className="checkbox mt-3 mb-3">
                            <label>
                              <input type="checkbox" defaultValue="" /> Quiero
                              recibir alertas de inmuebles similares a este
                            </label>
                          </div>
                          <div className="text-center mb-4">
                            <button
                              type="submit"
                              className="btn btn-warning"
                              style={{ width: "90%" }}
                            >
                              Agendar tour
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {activeTab === "solicitar" && (
                      <div id="solicitar" className="tabcontent mt-3">
                        <form onSubmit={handelMsgSubmit}>
                          <div className="form-group mt-2">
                            <label htmlFor="nombre">Tus nombre</label>
                            <input
                              type="text"
                              className="form-control"
                              id="nombre"
                              name="name"
                              value={msgSendDAta.name}
                              onChange={handelRequestInputChange}
                              placeholder="Ingresa tu nombre"
                              required
                            />
                          </div>
                          <div className="form-group mt-2">
                            <label htmlFor="tus">Tus correo</label>
                            <input
                              type="email"
                              className="form-control"
                              id="tus"
                              name="email"
                              value={msgSendDAta.email}
                              onChange={handelRequestInputChange}
                              placeholder="Ingresa tu correo electrónico"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="tu">Tu teléfono</label>
                            <input
                              type="text"
                              className="form-control"
                              id="tu"
                              name="phone"
                              value={msgSendDAta.phone}
                              onChange={handelRequestInputChange}
                              placeholder="Ingresa tu teléfono"
                              required
                            />
                          </div>
                          <div className="form-group mt-3">
                            <select className="form-control" id="sel1">
                              <option>
                                ¿Cuál es el motivo de tu contacto?
                              </option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                          </div>
                          <div className="form-group mt-3">
                            <textarea
                              className="form-control"
                              rows={5}
                              id="comment"
                              name="message"
                              value={msgSendDAta.message}
                              onChange={handelRequestInputChange}
                              placeholder="Estoy buscando en Hauzzi y me gustaría recibir más información sobre el inmueble con referencia"
                              required
                            />
                          </div>
                          <div className="checkbox mt-3 mb-3">
                            <label>
                              <input type="checkbox" defaultValue="" /> Quiero
                              recibir alertas de inmuebles similares a este
                            </label>
                          </div>
                          <div className="text-center mb-4">
                            {/* <Link class="btn-getstarted agendar-tour" to="#">
            Agendar tour </Link> */}
                            <button
                              type="submit"
                              className="btn btn-warning"
                              style={{ width: "90%" }}
                            >
                              Contactar ahora
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="services section light-background">
            {/* Section Title */}
            <div
              className="container section-title aos-init aos-animate"
              data-aos="fade-up"
            >
              <h2>Descubre inmuebles similares</h2>
            </div>
            {/* End Section Title */}
            {mainData?.data?.length > 0 ? (
              <div className="container">
                <div className="row gy-4">
                  {mainData?.data?.map((e) => (
                    <div className="col-xl-4 col-md-6" key={e.id}>
                      <div
                        className="feat_property"
                        style={{ height: "410px" }}
                      >
                        <Link
                          // to={`/propert-details/${e.id}`}
                          to={""}
                          state={{
                            lat: e.latitude,
                            lng: e.longitude,
                            name: e.name,
                            image: e.images[0],
                            allProducts: mainData.data,
                          }}
                        >
                          <div className="thumb">
                            {/* <img
                              className="img-whp"
                              src={e.images[0]}
                              alt="property"
                            /> */}
                            <Swiper
                              modules={[Autoplay, Pagination]}
                              autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                              }}
                              pagination={{ clickable: true }}
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
                                    style={{ backgroundColor: "#FFBD59" }}
                                  >
                                    <span style={{ color: "black" }}>
                                      {e.purpose}
                                    </span>
                                  </li>
                                )}{" "}
                                {e.tags && (
                                  <li
                                    className="list-inline-item"
                                    style={{ backgroundColor: "#4b6bfb" }}
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
                                      color: compareIds.includes(Number(e?.id))
                                        ? "red"
                                        : "gray",
                                    }}
                                  />
                                </li>
                                <li
                                  className="list-inline-item"
                                  style={{ background: "unset" }}
                                >
                                  <i
                                    className="fa fa-heart hrt-icon"
                                    aria-hidden="true"
                                    // onClick={() => handelWishlist(e?.id)}
                                    onClick={() => {
                                      setSelectedPropertyId(e.id);
                                      folder
                                        ? setFolderPopup(true)
                                        : handelWishlist(propertyData.id);
                                    }}
                                    // style={{
                                    //   color: wishlistIds.includes(e?.id)
                                    //     ? "red"
                                    //     : "",
                                    // }}
                                    style={{
                                      color:
                                        wishlistIds.includes(e?.id) ||
                                        wishlistFolderIds.includes(e?.id)
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
                              allProducts: mainData.data,
                            }}
                          >
                            <div
                              className="tc_contentt"
                              style={{ height: "150px" }}
                            >
                              <div className="title-price">
                                <h4 className="line-clamp-2">{e.name}</h4>
                                <span className="fp_price">
                                  $
                                  {e.maxPrice
                                    ? Number(e.maxPrice).toLocaleString()
                                    : Number(e.rentalPrice).toLocaleString()}
                                </span>
                              </div>
                              <p className="line-clamp-1">
                                <img src={locationn} alt="hh" />
                                {/* <img src="" alt="" /> */}
                                <span style={{ marginLeft: 5 }}>
                                  {e.address1}
                                </span>
                              </p>
                              <ul className="prop_details mb0 p-0">
                                <li className="list-inline-item">
                                  <span>
                                    <img src={img3} />{" "}
                                    {e?.listingDetails?.Habitaciones} Hab.
                                  </span>
                                </li>
                                <li className="list-inline-item">
                                  <span>
                                    <img src={img4} />{" "}
                                    {e?.listingDetails?.Baños} Baños
                                  </span>
                                </li>
                                <li className="list-inline-item">
                                  <span>
                                    <img src={img5} />{" "}
                                    {e?.propertySize || e?.maxSize} m2
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
                                allProducts: mainData.data,
                              }}
                            >
                              <ul className="fp_meta float-left mb-0 p-0">
                                <li
                                  className="list-inline-item d-flex justify-content-around"
                                  style={{ marginRight: "0px" }}
                                >
                                  <span>
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
                                  </span>
                                  <span
                                    className="d-flex align-items-center"
                                    style={{ marginLeft: "5px" }}
                                  >
                                    {e.Customer.name}
                                  </span>
                                </li>
                              </ul>
                            </Link>

                            <div className="fp_pdate float-right d-flex">
                              <Link className="btn-getstarted gt" to="#">
                                <img src={mail} width="35%" alt="email" />
                                Email
                              </Link>
                              <Link className="btn-getstarted gt" to="#">
                                <img src={call} width="25%" alt="call" />
                                Llamar
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
                                            e.currentTarget.nextElementSibling;
                                          dropdown.classList.toggle("d-none");
                                        }}
                                      >
                                        <img
                                          src={share}
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
                                            <img src={whats} width="16" />
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
                                            <img src={face} width="16" />
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
                                            <img src={twitter} width="16" />
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
                                            <img src={link} width="16" />
                                            {/* LinkedIn */}
                                          </button>
                                        </div>
                                      </div>
                                    </li>

                                    <li>
                                      <Link
                                        className="dropdown-item"
                                        to="#"
                                        onClick={() => handleDiscart(e.id)}
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
                  {/* "Mostrar todos los inmuebles" Button */}
                  <div className="col-md-12" style={{ textAlign: "center" }}>
                    <Link
                      className="btn-getstarted"
                      to="/propertysell"
                      style={{ padding: 16 }}
                    >
                      Mostrar todos los inmuebles
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container text-center">
                <p>No Data found</p>
              </div>
            )}
          </section>

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

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default PropertyDetils;
