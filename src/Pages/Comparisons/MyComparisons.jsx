import React, { Fragment } from "react";
import Footer from "../MainPage/Footer";
import Header from "../MainPage/Header";
import { Link } from "react-router-dom";

const MyComparisons = () => {
  return (
    <Fragment>
      <div className="index-page">
        <Header />

        <main className="main">
          <section className="top-btn12">
            <div className="container-lg py-3">
              {/* Navigation */}
              {/* <div className="d-flex flex-wrap justify-content-center mb-2 myadsnav">
                <button className="nav-button">Publicar inmueble</button>
                <button className="nav-button">Mis anuncios</button>
                <button className="nav-button">Mis favoritos</button>
                <button className="nav-button">Mis alertas</button>
                <button className="nav-button">Mis mensajes</button>
                <button className="nav-button active">Mis comparaciones</button>
                <button className="nav-button">Mis visitas</button>
                <button className="nav-button">Mi perfil</button>
              </div> */}
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
                  <div className="dropdown d-xs-block">
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
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-share me-2" /> Compartir
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-download me-2" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-printer me-2" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-12 p-0 mt-4 my-comp">
                  <button className="btn bg-light btn-md me-1 text-capitalize active">
                    Vista general
                  </button>
                  <button className="btn bg-light btn-md me-1 text-capitalize">
                    Seguridad
                  </button>
                  <button className="btn bg-light btn-md me-1 text-capitalize">
                    Ambientes
                  </button>
                  <button className="btn bg-light btn-md me-1 text-capitalize">
                    Equipamientos
                  </button>
                  <button className="btn bg-light btn-md me-1 text-capitalize">
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
                <div className="col">
                  <div className="my-comp-img">
                    <img src="img/my-img/discovery.png" className="rounded" />
                    <span>
                      <img src="img/my-img/X-circle.png" />
                    </span>
                    <p>Eaton Garth Penthouse</p>
                  </div>
                </div>
                <div className="col">
                  <div className="my-comp-img">
                    <img src="img/my-img/discovery.png" className="rounded" />
                    <span>
                      <img src="img/my-img/X-circle.png" />
                    </span>
                    <p>Eaton Garth Penthouse</p>
                  </div>
                </div>
                <div className="col">
                  <div className="my-comp-img">
                    <img src="img/my-img/discovery.png" className="rounded" />
                    <span>
                      <img src="img/my-img/X-circle.png" />
                    </span>
                    <p>Eaton Garth Penthouse</p>
                  </div>
                </div>
                <div className="col">
                  <div className="my-comp-img">
                    <img src="img/my-img/discovery.png" className="rounded" />
                    <span>
                      <img src="img/my-img/X-circle.png" />
                    </span>
                    <p>Eaton Garth Penthouse</p>
                  </div>
                </div>
              </div>
              <h6 className="table_heading">Vista General</h6>
              <div className="table-container table-responsive mb-4">
                <table className="table table-striped text-center">
                  <thead>
                    <tr>
                      <th className="text-start">Status</th>
                      <th>Venta</th>
                      <th>Venta</th>
                      <th>Alquiler</th>
                      <th>Compartir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start">Precio</td>
                      <td>300.000$</td>
                      <td>275.000$</td>
                      <td>1.500$</td>
                      <td>750$</td>
                    </tr>
                    <tr>
                      <td className="text-start">M2</td>
                      <td>250m2</td>
                      <td>210m2</td>
                      <td>175m2</td>
                      <td>80m2</td>
                    </tr>
                    <tr>
                      <td className="text-start">Precio/m2</td>
                      <td>Status</td>
                      <td>Status</td>
                      <td>Status</td>
                      <td>Status</td>
                    </tr>
                    <tr>
                      <td className="text-start">Habitaciones</td>
                      <td>4</td>
                      <td>3</td>
                      <td>3</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td className="text-start">Baños</td>
                      <td>1</td>
                      <td>2</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td className="text-start">Estado</td>
                      <td>Status</td>
                      <td>A reformar</td>
                      <td>Status</td>
                      <td>Status</td>
                    </tr>
                    <tr>
                      <td className="text-start">Publica</td>
                      <td>Particular</td>
                      <td>Inmobiliaria</td>
                      <td>Particular</td>
                      <td>Particular</td>
                    </tr>
                    <tr>
                      <td className="text-start">Vistas</td>
                      <td>Montaña</td>
                      <td>Mar</td>
                      <td>Montaña</td>
                      <td>Montaña</td>
                    </tr>
                    <tr>
                      <td className="text-start">Orientación</td>
                      <td>Norte</td>
                      <td>Sur</td>
                      <td>Este</td>
                      <td>Oeste</td>
                    </tr>
                    <tr>
                      <td className="text-start">Tipo de suelo</td>
                      <td>Madera</td>
                      <td>Madera</td>
                      <td>Cemento</td>
                      <td>Madera</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h6 className="table_heading">Seguridad</h6>
              <div className="table-container1 table-responsive mb-4">
                <table className="table text-center">
                  <tbody>
                    <tr>
                      <td className="text-start">Cámaras de vigilancia</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Alarma</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Vigilancia</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Sistema de videocomunicador
                      </td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Cerco eléctrico</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Portón eléctrico</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Cerco perimetral</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">(CCTV)</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h6 className="table_heading">Ambientes</h6>
              <div className="table-container1 table-responsive mb-4">
                <table className="table text-center">
                  <tbody>
                    <tr>
                      <td className="text-start">Jardines o áreas verdes</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Terraza o solárium</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Área de barbacoa/parrillera
                      </td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Cocina</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Estudio u oficina</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Vestier</td>
                      <td>-</td>
                      <td>No</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className="text-start">Armarios</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Cuarto de servicio</td>
                      <td>-</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Cuarto de lavado</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>No</td>
                      <td>No</td>
                    </tr>
                    <tr>
                      <td className="text-start">Área de comedor</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Área para desayunar</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Canchas de usos múltiples</td>
                      <td>No</td>
                      <td>Sí</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h6 className="table_heading">Equipamientos</h6>
              <div className="table-container1 table-responsive mb-4">
                <table className="table text-center">
                  <tbody>
                    <tr>
                      <td className="text-start">Aire acondicionado</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Ascensor</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Ventilador</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Planta eléctrica</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className="text-start">Calefacción</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className="text-start">Acceso a internet</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Calentador a gas / eléctrico
                      </td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Electrodomésticos</td>
                      <td>Sí</td>
                      <td>Status</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">TV</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Sistema de domótica</td>
                      <td>No</td>
                      <td>No</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td className="text-start">Cisterna de agua</td>
                      <td>Sí</td>
                      <td>Status</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h6 className="table_heading">Servicios</h6>
              <div className="table-container1 table-responsive">
                <table className="table text-center">
                  <tbody>
                    <tr>
                      <td className="text-start">Suministro de agua</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Línea telefónica</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Red eléctrica</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Gas</td>
                      <td>Sí</td>
                      <td>No</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Recolección de basura</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">Alcantarillado y drenaje</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                    </tr>
                    <tr>
                      <td className="text-start">
                        Suministros de agua potable
                      </td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
                      <td>Sí</td>
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
      </div>
    </Fragment>
  );
};

export default MyComparisons;
