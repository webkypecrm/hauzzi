import React, { Fragment } from "react";

const CreatePassword = () => {
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
                <h2>Crear nueva contraseña</h2>
              </div>
              <form action="">
                <p className="forgot-tetx">
                  Hemos restablecido su contraseña, cree una nueva contraseña
                </p>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Crear contraseña
                  </label>
                  <input
                    type="email"
                    className="form-control   input-filed-design-hauzzi"
                    id="email"
                    placeholder="Ingresar contraseña"
                  />
                </div>
                <button type="submit" className="Iniciar-bbtn w-100 my-4">
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

export default CreatePassword;
