import React, { Fragment, use, useEffect, useState } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const Plans = () => {
  const [selected, setSelected] = useState(null);
  const [plan, setPlan] = useState([]);

  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId");
  const apiUrl = import.meta.env.VITE_API_URL;

  const getAllPlan = async () => {
    try {
      const res = await axios.get(`${apiUrl}/property/listPlans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlan(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching properties", err);
    }
  };
  console.log("plans", plan);

  useEffect(() => {
    getAllPlan();
  }, []);

  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section
            className="pricing_sec section light-background header-mt"
            style={{ marginTop: "6%" }}
          >
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
                {plan?.length > 0 && (
                  <div className="row gy-4">
                    {plan?.map((plan, index) => (
                    <div className="col-lg-4" key={index}>
                      {/* <div className="pricing-card"> */}
                      <div
                        className={`pricing-card ${
                          selected === plan.id ? "popular" : ""
                        }`}
                        onClick={() => setSelected(plan.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <h3>{plan.title}</h3>
                        <div className="price">
                          <span className="currency">$</span>{" "}
                          <span className="amount">{plan.price}</span>
                          <span className="period">/ month</span>
                        </div>
                        {/* <p className="description">
                          Sitúate entre los{" "}
                          <img src="img/my-img/arrow-top.png" /> destacados en
                          las primeras posiciones durante <b>7 días</b>.
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
                        </ul> */}
                        <div
    className="description"
    dangerouslySetInnerHTML={{ __html: plan.description }}
  ></div>
                        <Link to="#" className="btn btn-primary">
                          Elegir plan
                        </Link>
                      </div>
                    </div>
                    ))}
                  </div>
                )}
              </div>
          </section>

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default Plans;
