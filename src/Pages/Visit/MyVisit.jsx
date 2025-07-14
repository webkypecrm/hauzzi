import React, { useState, useEffect, Fragment } from "react";
import Header from "../MainPage/Header";
import Footer from "../MainPage/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

const languageOptions = {
  es: {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    days: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
  },
};

const MyVisit = () => {
  const lang = "es";
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarDays, setCalendarDays] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [popupData, setPopupData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem("token");
  const customerId = localStorage.getItem("tokenId");
  const apiUrl = import.meta.env.VITE_API_URL;

  const months = languageOptions[lang]?.months;
  const days = languageOptions[lang]?.days;

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];

      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (date > daysInMonth) {
          break;
        } else {
          week.push(new Date(year, month, date));
          date++;
        }
      }

      if (week.length > 0) {
        weeks.push(week);
      }

      if (date > daysInMonth) break;
    }

    setCalendarDays(weeks);
  };

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const isSelected = (date) => {
    return (
      date &&
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    );
  };

  const getCalendarData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/enquiry/getByUser/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCalendarData(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(
    "first",
    calendarData?.map((item) => item.property.name)
  );

  useEffect(() => {
    getCalendarData();
  }, []);

  // const getDataForDate = (date) => {
  //   if (!date) return [];

  //   const selectedStr = date.toISOString().split("T")[0]; // this is fine

  //   return calendarData.filter((item) => {
  //     const itemDate = new Date(item.date + "T00:00:00"); // ✅ Fix here
  //     const itemStr = itemDate.toISOString().split("T")[0];
  //     return itemStr === selectedStr;
  //   });
  // };

  const getDataForDate = (date) => {
  if (!date) return [];

  const selectedStr = date.toLocaleDateString('en-CA'); // returns YYYY-MM-DD

  return calendarData.filter((item) => item.date === selectedStr);
};


  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    const data = getDataForDate(date);
    if (data.length > 0) {
      setPopupData(data);
      setShowPopup(true);
    }
  };

  const formatDate = (input) => {
    if (!input) return "N/A";

    const date = new Date(input);
    if (isNaN(date)) return "N/A";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <Fragment>
      <div className="index-page">
        <Header />
        <main className="main">
          <section className="top-btn12">
            <div className="container-lg py-3">
              <div className="d-flex flex-wrap justify-content-center mb-4">
                <Link to={"/publish-propert"} className="nav-button">
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
                <Link to={"/myvisit"} className="nav-button active">
                  Mis visitas
                </Link>
                <Link to={"/myprofile"} className="nav-button">
                  Mi perfil
                </Link>
              </div>
              <hr style={{ borderColor: "#d7d6d6" }} />

              <div className="container-calendar">
                <div className="button-container-calendar">
                  <button id="previous" onClick={handlePrevious}>
                    <i className="bi bi-arrow-left" /> Anterior
                  </button>
                  <button id="next" onClick={handleNext}>
                    Siguiente <i className="bi bi-arrow-right" />
                  </button>
                </div>

                <div className="d-flex justify-content-between align-items-center gap-2 monthyear">
                  <select
                    className="calendar-select"
                    name="month"
                    value={currentMonth}
                    onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  >
                    {months.map((month, idx) => (
                      <option value={idx} key={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    className="calendar-select"
                    name="year"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  >
                    {Array.from(
                      { length: 2050 - 1970 + 1 },
                      (_, i) => 1970 + i
                    ).map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="table-responsive">
                  <table className="table-calendar" data-lang={lang}>
                    <thead>
                      <tr>
                        {days.map((day) => (
                          <th key={day}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendarDays.map((week, i) => (
                        <tr key={i}>
                          {week.map((date, j) => {
                            const hasData = getDataForDate(date).length > 0;
                            return (
                              <td
                                key={j}
                                className={`date-picker ${
                                  isSelected(date) ? "selected" : ""
                                }`}
                                onClick={() => handleDateClick(date)}
                              >
                                {date && (
                                  <span>
                                    {date.getDate()}
                                    {hasData && (
                                      <div
                                        className="type-label"
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        {getDataForDate(date)[0]?.type || ""}
                                      </div>
                                    )}
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* MODAL */}
          {showPopup && popupData.length > 0 && (
            <div className="popup-overlay" onClick={() => setShowPopup(false)}>
              <div
                className="popup-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h4>Detalles de visitas </h4>
                {popupData.map((item, index) => (
                  <div key={index} className="popup-entry d-flex gap-4">
                    <div className="">
                      <p>
                        <strong>Name:</strong> {item.property.name || "N/A"}
                      </p>
                      <p>
                        <strong>Tipo:</strong> {item.type || "N/A"}
                      </p>
                      <p>
                        <strong>Email:</strong> {item.email || "N/A"}
                      </p>
                      <p>
                        <strong>Teléfono:</strong> {item.phone || "N/A"}
                      </p>
                      <p>
                        <strong>Fecha:</strong> {formatDate(item.date)}
                      </p>
                      <p>
                        <strong>Hora:</strong> {item.time || "N/A"}
                      </p>
                    </div>
                    <div>
                      <img
                        src={item.property.images[0]}
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <hr />
                  </div>
                ))}
                <button
                  className="close-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          <Footer />
        </main>
      </div>
    </Fragment>
  );
};

export default MyVisit;
