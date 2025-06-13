import React, { Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";

const Plans = () => {
  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section className="pricing_sec section light-background header-mt">
            {/* Section Title */}
            <div className="container section-title">
              <h2 className="mb-0">
                Tu inmueble está <span className="primary-text">publicado</span>
                , ¿qué hacer ahora para{" "}
                <span className="primary-text">brillar</span>?
              </h2>
              <p className="mb-3">Aumenta la visibilidad de tu anuncio</p>
            </div>
            {/* End Section Title */}
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-4">
                  <div className="pricing-card">
                    <h3>Top destacado 7 días</h3>
                    <div className="price">
                      <span className="currency">$</span>{" "}
                      <span className="amount">5.99</span>
                    </div>
                    <p className="description">
                      Sitúate entre los <img src="img/my-img/arrow-top.png" />{" "}
                      destacados en las primeras posiciones durante{" "}
                      <b>7 días</b>.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bi bi-check2" />
                        Posicionamiento en el listado
                      </li>
                      <li>
                        <i className="bi bi-check2" />
                        Primeras posiciones durante 7 días
                      </li>
                    </ul>
                    <Link to="#" className="btn btn-primary">
                      Elegir plan
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="pricing-card popular">
                    <div className="popular-badge">Most Popular</div>
                    <h3>Top destacado 15 días</h3>
                    <div className="price">
                      <span className="currency">$</span>{" "}
                      <span className="amount">9.99</span>
                    </div>
                    <p className="description">
                      Sitúate entre los <img src="img/my-img/arrow-top.png" />{" "}
                      destacados en las primeras posiciones durante{" "}
                      <b>15 días</b>.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bi bi-check2" />
                        Posicionamiento en el listado
                      </li>
                      <li>
                        <i className="bi bi-check2" />
                        Primeras posiciones durante 15 días
                      </li>
                    </ul>
                    <Link to="#" className="btn btn-primary">
                      Elegir plan
                    </Link>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="pricing-card">
                    <h3>Top destacado 30 días</h3>
                    <div className="price">
                      <span className="currency">$</span>{" "}
                      <span className="amount">25.99</span>{" "}
                      <span className="period">/ month</span>
                    </div>
                    <p className="description">
                      Sitúate entre los <img src="img/my-img/arrow-top.png" />{" "}
                      destacados en las primeras posiciones durante{" "}
                      <b>30 días</b>.
                    </p>
                    <ul className="features-list">
                      <li>
                        <i className="bi bi-check2" />
                        Posicionamiento en el listado
                      </li>
                      <li>
                        <i className="bi bi-check2" />
                        Primeras posiciones durante 30 días
                      </li>
                    </ul>
                    <Link to="#" className="btn btn-primary">
                      Elegir plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default Plans;
