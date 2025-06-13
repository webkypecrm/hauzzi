import React, { Fragment, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const navigate = useNavigate();


  const apiUrl = import.meta.env.VITE_API_URL;
  const [forgotData, setforgotData] = useState({
    email: "",
    password: "",
  });

  const handelInputChange = (e) => {
    setforgotData({
      ...forgotData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/employee/forgot-password`,
        forgotData
      );
      toast.success("Password changed", {
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-7 position-relative p-0 ">
            <div className="position-relative">
              <div className="left-bannero-top d-md-block d-none">
                <img src="left-bannero-top.svg" alt="" />
              </div>
              <div className="left-banner-side">
                <img
                  className="d-md-block d-none img-fluid"
                  src="baner-bg.jpeg"
                  alt=""
                />
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
              <div className="my-3 Bienvenido">
                <h2>¿Ha olvidado su contraseña?</h2>
              </div>
              <form onSubmit={handelSubmit}>
                <p className="forgot-tetx">
                  ¿Ha olvidado su contraseña? No se preocupe, introduzca su
                  email y se la enviaremos.
                </p>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control   input-filed-design-hauzzi"
                    id="email"
                    placeholder="Ingresar correo electrónico"
                    name="email"
                    value={forgotData.email}
                    onChange={handelInputChange}

                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Crear contraseña
                  </label>
                  <input
                    type="text"
                    className="form-control   input-filed-design-hauzzi"
                    id="password"
                    placeholder="Ingresar contraseña"
                    name="password"
                    value={forgotData.password}
                    onChange={handelInputChange}
                  />
                </div>

                <button type="submit" className="Iniciar-bbtn w-100 my-4">
                  {/* Enviar */}
                  Crear nueva contraseña
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
