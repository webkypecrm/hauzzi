import React, { Fragment, useEffect, useState } from "react";
import Footer from "../MainPage/Footer";
import Header from "../MainPage/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import { toast } from "react-toastify";

const MyComparisons = () => {
  const [comparisonsData, setComparisonsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBtn, setActiveBtn] = useState("vista");

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";
  const customerId = localStorage.getItem("tokenId") || "";

  const getComparisons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}/property/getCompare/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComparisonsData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log("comparisonsData", comparisonsData);

  useEffect(() => {
    getComparisons();
  }, []);

  // remove comparision
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

      toast.success(response.data.message);
      getComparisons();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // button scroll
  const scrollTo = (id) => {
    setActiveBtn(id);

    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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

            <main className="main">
              <section className="top-btn12">
                <div className="container-lg py-3">
                  {/* Navigation */}
                  <div className="d-flex flex-wrap justify-content-center mb-4 ">
                    <Link to={"/publish-propert"} className="nav-button ">
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
                    <Link to={"/mycomparisons"} className="nav-button active">
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
                  <div className="row g-4 mb-4">
                    <div className="col-lg-9 col-9">
                      <h5>Comparador de inmuebles</h5>
                    </div>
                    <div className="col-lg-3 col-3 text-end">
                      <div className="d-none d-lg-block d-xl-block">
                        <button className="btn btn-outline-secondary me-2">
                          <i className="bi bi-share" /> Compartir
                        </button>
                        <button className="btn btn-outline-secondary me-2">
                          <i className="bi bi-download" />
                        </button>
                        <button className="btn btn-outline-secondary">
                          <i className="bi bi-printer" />
                        </button>
                      </div>
                    </div>
                    <div className="col-md-12 p-0 mt-4 my-comp">
                      <button
                        className={`btn bg-light btn-md me-1 text-capitalize ${
                          activeBtn === "vista" ? "active" : ""
                        }`}
                        onClick={() => scrollTo("vista")}
                      >
                        Vista general
                      </button>
                      <button
                        className={`btn bg-light btn-md me-1 text-capitalize ${
                          activeBtn === "seguridad" ? "active" : ""
                        }`}
                        onClick={() => scrollTo("seguridad")}
                      >
                        Seguridad
                      </button>
                      <button
                        className={`btn bg-light btn-md me-1 text-capitalize ${
                          activeBtn === "ambientes" ? "active" : ""
                        }`}
                        onClick={() => scrollTo("ambientes")}
                      >
                        Ambientes
                      </button>
                      <button
                        className={`btn bg-light btn-md me-1 text-capitalize ${
                          activeBtn === "equipamientos" ? "active" : ""
                        }`}
                        onClick={() => scrollTo("equipamientos")}
                      >
                        Equipamientos
                      </button>
                      <button
                        className={`btn bg-light btn-md me-1 text-capitalize ${
                          activeBtn === "servicios" ? "active" : ""
                        }`}
                        onClick={() => scrollTo("servicios")}
                      >
                        Servicios
                      </button>
                    </div>
                  </div>
                  <div className="row g-4 mb-4 propertyrow">
                    <div className="col align-content-center text-center">
                      <button className="propertiesbtn btn bg-light btn-md me-1 text-capitalize">
                        Hasta 4 propiedades
                      </button>
                    </div>
                    {comparisonsData.map((item, index) => (
                      <div className="col" key={index}>
                        <div className="my-comp-img">
                          <img src={item?.images[0]} className="rounded" />
                          <span onClick={() => handleCompare(item.id)}>
                            <img src="img/my-img/X-circle.png" />
                          </span>
                          <p>{item?.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h6 id="vista" className="table_heading">
                    Vista General
                  </h6>
                  <div className="table-container table-responsive mb-4">
                    <table className="table table-striped text-center">
                      <thead>
                        <tr>
                          <th className="text-start">Status</th>
                          {comparisonsData.map((item, index) => (
                            <th key={index}>{item?.purpose}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-start">Precio</td>
                          {comparisonsData?.map((item, idx) => (
                            <td key={idx}>
                              {item?.maxPrice
                                ? `${item.maxPrice}$`
                                : item?.rentalPrice
                                ? `${item.rentalPrice}$`
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">M2</td>
                          {comparisonsData?.map((item, idx) => (
                            <td key={idx}>
                              {item?.maxSize
                                ? `${item.maxSize} m²`
                                : item?.propertySize
                                ? `${item.propertySize} m²`
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Precio/m2</td>
                          {comparisonsData?.map((item, idx) => (
                            <td key={idx}>
                              {item?.maxPSF ? `${item.maxPSF} m²` : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Habitaciones</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.listingDetails?.Habitaciones
                                ? item?.listingDetails?.Habitaciones
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Baños</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.listingDetails?.Baños
                                ? item?.listingDetails?.Baños
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Estado</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.states?.name ? item?.states?.name : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Publica</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.listingDetails?.Publicadopor
                                ? item?.listingDetails?.Publicadopor
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Vistas</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.listingDetails?.Vistas
                                ? item?.listingDetails?.Vistas
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Orientación</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.listingDetails?.Orientación
                                ? item?.listingDetails?.Orientación
                                : "--"}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <td className="text-start">Tipo de suelo</td>
                          {comparisonsData.map((item, index) => (
                            <td key={index}>
                              {item?.listingDetails?.Tipodesuelo
                                ? item?.listingDetails?.Tipodesuelo
                                : "--"}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h6 id="seguridad" className="table_heading">
                    Seguridad
                  </h6>
                  <div className="table-container1 table-responsive mb-4">
                    <table className="table text-center">
                      <tbody>
                        <tr>
                          <td className="text-start">Cámaras de vigilancia</td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const hasCCTV = seguridad.includes(
                              "Cámaras de vigilancia (CCTV)"
                            );
                            return <td key={index}>{hasCCTV ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Alarma</td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const includesAlarma = seguridad.includes("Alarma");
                            return (
                              <td key={index}>
                                {includesAlarma ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Vigilancia</td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const vigilancia = seguridad.includes("Vigilancia");
                            return (
                              <td key={index}>{vigilancia ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Sistema de videocomunicador
                          </td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const sistema = seguridad.includes(
                              "Sistema de videointercomunicador"
                            );
                            return <td key={index}>{sistema ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Cerco eléctrico</td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const cercoEléctrico =
                              seguridad.includes("Cerco eléctrico");
                            return (
                              <td key={index}>
                                {cercoEléctrico ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Portón eléctrico</td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const portónEléctrico =
                              seguridad.includes("Portón eléctrico");
                            return (
                              <td key={index}>
                                {portónEléctrico ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Cerco perimetral</td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const cercoPerimetral =
                              seguridad.includes("Cerco perimetral");
                            return (
                              <td key={index}>
                                {cercoPerimetral ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Sistema contra incendio
                          </td>
                          {comparisonsData.map((item, index) => {
                            const seguridad =
                              item?.listingDetails?.Seguridad || "";
                            const sistemaContra = seguridad.includes(
                              "Sistema contra incendio"
                            );
                            return (
                              <td key={index}>{sistemaContra ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h6 id="ambientes" className="table_heading">
                    Ambientes
                  </h6>
                  <div className="table-container1 table-responsive mb-4">
                    <table className="table text-center">
                      <tbody>
                        <tr>
                          <td className="text-start">
                            Jardines o áreas verdes
                          </td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const jardines = Ambientes.includes(
                              "Jardines o áreas verdes"
                            );
                            return (
                              <td key={index}>{jardines ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Terraza o solárium</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const terraza =
                              Ambientes.includes("Terraza o solárium");
                            return <td key={index}>{terraza ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Área de barbacoa/parrillera
                          </td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const areaDeBarbacoa = Ambientes.includes(
                              "Área de barbacoa/parrillera"
                            );
                            return (
                              <td key={index}>
                                {areaDeBarbacoa ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Cocina</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const cocina = Ambientes.includes("Cocina");
                            return <td key={index}>{cocina ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Estudio u oficina</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const estudio =
                              Ambientes.includes("Estudio o oficina");
                            return <td key={index}>{estudio ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Vestier</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const vestier = Ambientes.includes("Vestier");
                            return <td key={index}>{vestier ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Armarios</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const armarios = Ambientes.includes("Armarios");
                            return (
                              <td key={index}>{armarios ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Cuarto de servicio</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const cuartoDeServicio =
                              Ambientes.includes("Cuarto de servicio");
                            return (
                              <td key={index}>
                                {cuartoDeServicio ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Cuarto de lavado</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const cuartoDeLavado =
                              Ambientes.includes("Cuarto de lavado");
                            return (
                              <td key={index}>
                                {cuartoDeLavado ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Área de comedor</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const areaDeComedor =
                              Ambientes.includes("Área de comedor");
                            return (
                              <td key={index}>{areaDeComedor ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Área para desayunar</td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const areaParaDesayunar = Ambientes.includes(
                              "Área para desayunar"
                            );
                            return (
                              <td key={index}>
                                {areaParaDesayunar ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Canchas de usos múltiples
                          </td>
                          {comparisonsData.map((item, index) => {
                            const Ambientes =
                              item?.listingDetails?.Ambientes || "";
                            const canchasMúltiples = Ambientes.includes(
                              "Canchas de usos múltiples"
                            );
                            return (
                              <td key={index}>
                                {canchasMúltiples ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h6 id="equipamientos" className="table_heading">
                    Equipamientos
                  </h6>
                  <div className="table-container1 table-responsive mb-4">
                    <table className="table text-center">
                      <tbody>
                        <tr>
                          <td className="text-start">Aire acondicionado</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const aireAcondicionado =
                              Equipamientos.includes("Aire acondicionado");
                            return (
                              <td key={index}>
                                {aireAcondicionado ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Ascensor</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const ascensor = Equipamientos.includes("Ascensor");
                            return (
                              <td key={index}>{ascensor ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Ventilador</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const ventilador =
                              Equipamientos.includes("Ventilador");
                            return (
                              <td key={index}>{ventilador ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Planta eléctrica</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const pantaEléctrica =
                              Equipamientos.includes("Planta eléctrica");
                            return (
                              <td key={index}>
                                {pantaEléctrica ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Calefacción</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const calefacción =
                              Equipamientos.includes("Calefacción");
                            return (
                              <td key={index}>{calefacción ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Acceso a internet</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const accesoInternet =
                              Equipamientos.includes("Acceso a internet");
                            return (
                              <td key={index}>
                                {accesoInternet ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Calentador a gas / eléctrico
                          </td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const calentadorEléctrico = Equipamientos.includes(
                              "Calentador a gas/ eléctrico"
                            );
                            return (
                              <td key={index}>
                                {calentadorEléctrico ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Electrodomésticos</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const electrodomésticos =
                              Equipamientos.includes("Electrodomésticos");
                            return (
                              <td key={index}>
                                {electrodomésticos ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">TV</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const TV = Equipamientos.includes("TV");
                            return <td key={index}>{TV ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Sistema de domótica</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const Sistemadedomótica = Equipamientos.includes(
                              "Sistema de domótica"
                            );
                            return (
                              <td key={index}>
                                {Sistemadedomótica ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Cisterna de agua</td>
                          {comparisonsData.map((item, index) => {
                            const Equipamientos =
                              item?.listingDetails?.Equipamientos || "";
                            const Cisternadeagua =
                              Equipamientos.includes("Cisterna de agua");
                            return (
                              <td key={index}>
                                {Cisternadeagua ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h6 id="servicios" className="table_heading">
                    Servicios
                  </h6>
                  <div className="table-container1 table-responsive">
                    <table className="table text-center">
                      <tbody>
                        <tr>
                          <td className="text-start">Suministro de agua</td>
                          {comparisonsData.map((item, index) => {
                            const serviciosArr = (
                              item?.listingDetails?.Servicios || ""
                            )
                              .split(",")
                              .map((s) => s.trim());

                            const hasRegular =
                              serviciosArr.includes("Suministro de agua");
                            return (
                              <td key={index}>{hasRegular ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Línea telefónica</td>
                          {comparisonsData.map((item, index) => {
                            const Servicios =
                              item?.listingDetails?.Servicios || "";
                            const Líneatelefónica =
                              Servicios.includes("Línea telefónica");
                            return (
                              <td key={index}>
                                {Líneatelefónica ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Red eléctrica</td>
                          {comparisonsData.map((item, index) => {
                            const Servicios =
                              item?.listingDetails?.Servicios || "";
                            const Redeléctrica =
                              Servicios.includes("Red eléctrica");
                            return (
                              <td key={index}>{Redeléctrica ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Gas</td>
                          {comparisonsData.map((item, index) => {
                            const Servicios =
                              item?.listingDetails?.Servicios || "";
                            const Gas = Servicios.includes("Gas");
                            return <td key={index}>{Gas ? "Sí" : "No"}</td>;
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">Recolección de basura</td>
                          {comparisonsData.map((item, index) => {
                            const Servicios =
                              item?.listingDetails?.Servicios || "";
                            const Recoleccióndebasura = Servicios.includes(
                              "Recolección de basura"
                            );
                            return (
                              <td key={index}>
                                {Recoleccióndebasura ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Alcantarillado y drenaje
                          </td>
                          {comparisonsData.map((item, index) => {
                            const Servicios =
                              item?.listingDetails?.Servicios || "";
                            const Alcantarilladoydrenaje = Servicios.includes(
                              "Alcantarillado y drenaje"
                            );
                            return (
                              <td key={index}>
                                {Alcantarilladoydrenaje ? "Sí" : "No"}
                              </td>
                            );
                          })}
                        </tr>
                        <tr>
                          <td className="text-start">
                            Suministros de agua potable
                          </td>
                          {comparisonsData.map((item, index) => {
                            const serviciosArr = (
                              item?.listingDetails?.Servicios || ""
                            )
                              .split(",")
                              .map((s) => s.trim());
                            const hasPotable = serviciosArr.includes(
                              "Suministro de agua potable"
                            );
                            return (
                              <td key={index}>{hasPotable ? "Sí" : "No"}</td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="assistant-container myads mb-4">
                    {/* Message Bubble */}
                    <div className="bubble">
                      ¡Hola! ¿Te ayudo a analizar tu comparación?
                      <span className="close-btn">×</span>
                    </div>
                    {/* Assistant Image */}
                    <img
                      src="img/my-img/pp-textarea.png"
                      alt="Asistente"
                      className="assistant-img"
                    />
                  </div>
                  <h6 className="table_heading">Privado</h6>
                  <div className="table-notas table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <td className="text-nowrap fw-medium">
                            Notas personales
                          </td>
                          <td>
                            Buen espacio para los niños sin embargo hay que
                            remodelar la cocina
                          </td>
                          <td>
                            Buen espacio para los niños sin embargo hay que
                            remodelar la cocina
                          </td>
                          <td>
                            Buen espacio para los niños sin embargo hay que
                            remodelar la cocina
                          </td>
                          <td>
                            Buen espacio para los niños sin embargo hay que
                            remodelar la cocina
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </section>

              <Footer />
            </main>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default MyComparisons;
