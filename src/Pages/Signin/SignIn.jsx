import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handelInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${apiUrl}/employee/customerLogin`,
        loginData
      );

      localStorage.setItem("token", res.data.data.Token);
      localStorage.setItem("tokenId", res.data.data.id);
      localStorage.setItem("userType", res.data.data.userType);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-7 position-relative p-0 overflow-hidden">
            <div className="position-relative">
              <div className="left-bannero-top d-md-block d-none">
                <img src="left-bannero-top.svg" alt="" />
              </div>
              <div className="left-banner-side">
                <img className="d-md-block d-none" src="baner-bg.jpeg" alt="" />
                <img
                  className="d-md-none d-block"
                  src="image 6 (1).png"
                  alt=""
                />
              </div>
              <div className="left-banerr-bottom d-md-block d-none">
                <img src="left-banerr-bottom.svg" alt="" />
              </div>
            </div>
            <div className="white-logoleft">
              <img src="logo-white.svg" alt="" />
              <p>Busca, Compara y Elige</p>
            </div>
          </div>
          <div className="col-md-5 p-0">
            <div className="right-banner-side" style={{ padding: "0px 40px" }}>
              <div className="black-logo-right text-center">
                <img src="logo-black.svg" alt="" />
              </div>
              <div className="d-flex justify-content-center align-items-center gap-3 my-3">
                <button className="login-bttn">
                  Iniciar sesión <img src="login.svg" alt="" />
                </button>
                <Link className="refister-bttn" to={"/sign-up"}>
                  Regístrate <img src="user-edit (2).svg" alt="" />
                </Link>
              </div>
              <form
                onSubmit={handelSubmit}
                style={{ borderBottom: "1px solid #E5E5E5" }}
              >
                <h1 className="header-text">Nos da gusto volver a verte</h1>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Introduce tu email para iniciar sesión
                  </label>
                  <input
                    type="email"
                    className="form-control   input-filed-design-hauzzi"
                    id="email"
                    placeholder="Ingresa tu correo electrónico"
                    name="email"
                    value={loginData.email}
                    onChange={handelInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div
                    className="input-group"
                    style={{ border: "1ox solid #E5E5E5" }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control input-filed-design-hauzzi border-0"
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      name="password"
                      value={loginData.password}
                      onChange={handelInputChange}
                    />
                    <span
                      className="input-group-text  border-0"
                      style={{ background: "#f2f2f2" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      />
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="d-flex align-items-center">
                    <label className="switch">
                      <input type="checkbox" className="toogle-switch" />
                      <span className="slider" />
                    </label>
                    <span className="ms-2 toogle-switch-text">Recuérdame</span>
                  </div>
                  <Link
                    to={"/forgot-password"}
                    // to={"/create-password"}
                    className="text-decoration-none new-forgot-pasword"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <button type="submit" className="Iniciar-bbtn w-100 my-4">
                  Iniciar sesión
                </button>
              </form>
              <div className="continue-with-section position-relative mt-3">
                <div className="continue-with">
                  <img src="apple.svg" alt="" />
                </div>
                <div className="continue-with-text">
                  <p>Continuar con Apple</p>
                </div>
              </div>
              <div className="continue-with-section position-relative mt-3">
                <div className="continue-with">
                  <img src="facebook.svg" alt="" />
                </div>
                <div className="continue-with-text">
                  <p>Continuar con Facebook</p>
                </div>
              </div>
              <div className="continue-with-section position-relative mt-3">
                <div className="continue-with">
                  <img src="GOOGLE.svg" alt="" />
                </div>
                <div className="continue-with-text">
                  <p>Continuar con Google</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-end">
                  <p className="mb-0 dont-have-acount">
                    <a className="me-2" href="">
                      ¿No tienes cuenta?
                    </a>
                    Crear cuenta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
