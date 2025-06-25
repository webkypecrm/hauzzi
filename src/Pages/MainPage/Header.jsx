import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import logo from "../../assets/img/my-img/logo1.png";
import arrow from "../../assets/img/my-img/arrow45.png";

const Header = () => {
  const [redirectTo, setRedirectTo] = useState("/login");
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

      setAllData(res.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const profileImg = allData?.userDetails?.map((item) => item.photoUrl);
  const photo = allData?.userDetails?.map((item) => item.photo);

  const headerRef = useRef(null);

  useEffect(() => {
    getAllData();
    const header = headerRef.current;
    const sticky = header.offsetTop;

    const handleScroll = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token) {
      setRedirectTo("/dashboard");
    } else {
      setRedirectTo("/login");
    }
  }, []);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Search get api
  const [search, setSearch] = useState("");

  const handelSearchInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Fragment>
      <header id="myHeader" ref={headerRef} className="fixed-top">
        <nav
          className="navbar navbar-expand-lg navbar-custom header mx-auto mt-4"
          style={{ width: "96.5%" }}
        >
          <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
            {/* Logo */}
            <Link className="navbar-brand fw-bold fs-4 me-2 ms-2" to="/">
              {/* <img src="img/my-img/logo1.png" /> */}
              <img src={logo} />
            </Link>
            <div className="d-lg-none d-flex align-items-center ms-3">
              <button className="h-icon-btn">
                <i className="bi bi-heart-fill" />
              </button>
              <button className="h-icon-btn">
                <img src={arrow} alt="arrow" />
              </button>
              <button className="h-icon-btn">
                <i className="bi bi-bell-fill" />
              </button>
            </div>
            {/* Toggler for mobile */}
            <button
              className="btn d-lg-none"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#hauzziOffcanvas"
              aria-controls="hauzziOffcanvas"
            >
              <i className="bi bi-list fs-3" />
            </button>

            {/* Right-side buttons for desktop */}
            <div className="d-none d-lg-flex align-items-center flex-grow-1 mx-lg-3">
              <div className="d-flex align-items-center flex-grow-1">
                <div className="d-flex justify-content-between p-1 border rounded-pill search_sec me-3">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Busca por dirección, ciudad o código postal"
                    onChange={handelSearchInput}
                    value={search}
                  />
                  <button className="search-btn">
                    <Link
                      to={`/propertysell?search=${search}`}
                      style={{ color: "black" }}
                    >
                      <i className="bi bi-search" />
                    </Link>
                  </button>
                </div>
                <div className="dropdown menu-dropdown">
                  <span
                    className="dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Menú{" "}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/index2">
                        Index 2
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/index3">
                        Index 3
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" to="/dashboard">
                        Dashboard
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link className="dropdown-item" to="/agentprofile">
                   
                        Agent Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link className="dropdown-item" to="/agentmobiliario">
                        Agent Mobiliario
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/appdownload">
                        App Download
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" to="/myads">
                        My Ads
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myfavoriets">
                        My Favoriets
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/mymessages">
                        My Messages
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myalert">
                        My Alert
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myvisit">
                        My Visit
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/myprofile">
                        My Profile
                      </Link>
                    </li> */}
                    <li>
                      <Link className="dropdown-item" to="/mycomparisons">
                        My Comparisons
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/plans">
                        Plans
                      </Link>
                    </li>
                    {/* <li>
                      <Link className="dropdown-item" to="/propertysell">
                        Property Sell
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/publish-propert">
                        Publish Property
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/propert-details">
                        Property Details
                      </Link>
                    </li> */}
                    <li>
                      <Link className="dropdown-item" to="/real-state-agencies">
                        Agencies
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/agencyprofile">
                        Agencies Details
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/sellforrent">
                        Sell for Rent
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="d-flex align-items-center ms-3">
                <Link
                  to="/myfavoriets"
                  className="h-icon-btn"
                  style={{ color: "black" }}
                >
                  <i className="bi bi-heart-fill" />
                </Link>
                <Link to="/mycomparisons" className="h-icon-btn">
                  <img src={arrow} alt="arrow" />
                </Link>
                <button className="h-icon-btn">
                  <i className="bi bi-bell-fill" />
                </button>
                <Link
                  to={"/publish-propert"}
                  className="publish-btn "
                  style={{ marginRight: "10px", color: "black" }}
                >
                  <i className="bi bi-plus-circle me-1" />
                  Publica tu anuncio gratis
                </Link>

                {photo == "" || photo == null ? (
                  <Link
                    to="/login"
                    className="h-icon-btn"
                    style={{
                      color: "black",
                      fontSize: "20px",
                      marginRight: "0px",
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleUser} />
                  </Link>
                ) : (
                  <a
                    href={redirectTo}
                    {...(isLoginPage ? { target: "_blank" } : {})}
                  >
                    <img
                      src={profileImg}
                      alt="Perfil"
                      className="profile-pic "
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Offcanvas for mobile */}
        <div
          className="offcanvas offcanvas-end"
          tabIndex={-1}
          id="hauzziOffcanvas"
          aria-labelledby="hauzziOffcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="hauzziOffcanvasLabel">
              Hauzzi
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </div>
          <div className="offcanvas-body">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between p-1 border rounded-pill search_sec">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Busca por dirección, ciudad o código postal"
                />
                <button className="search-btn">
                  <i className="bi bi-search" />
                </button>
              </div>
              <div className="dropdown menu-dropdown">
                <span
                  className="dropdown-toggle w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menú <i className="bi bi-chevron-down" />
                </span>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Configuración
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="d-flex flex-wrap align-items-center mt-3">
                <button className="publish-btn w-100">
                  <i className="bi bi-plus-circle me-1" />
                  Publica tu anuncio gratis
                </button>
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Perfil"
                  className="profile-pic"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
