import React, { useState, useEffect, Fragment } from 'react';
import Header from '../MainPage/Header';
import Footer from '../MainPage/Footer';
import { Link } from 'react-router-dom';

const languageOptions = {
  es: {
    months: [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  },
};

const MyVisit = () => {
  const lang = 'es';
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarDays, setCalendarDays] = useState([]);

  const months = languageOptions[lang]?.months || languageOptions['es'].months;
  const days = languageOptions[lang]?.days || languageOptions['es'].days;

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

    if (date > daysInMonth) break; // Stop generating weeks after all dates are filled
  }

  setCalendarDays(weeks);
};

  const handleNext = () => {
    if (currentMonth === 11) {
      setCurrentYear(prev => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentMonth === 0) {
      setCurrentYear(prev => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(prev => prev - 1);
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
                <button className="nav-button">Mis comparaciones</button>
                <button className="nav-button active">Mis visitas</button>
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
              <hr style={{ borderColor: " #d7d6d6" }} />

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
                      <option value={idx} key={month}>{month}</option>
                    ))}
                  </select>
                  <select
                    className="calendar-select"
                    name="year"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 2050 - 1970 + 1 }, (_, i) => 1970 + i).map(year => (
                      <option value={year} key={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="table-responsive">
                  <table className="table-calendar" data-lang={lang}>
                    <thead>
                      <tr>
                        {days.map(day => (
                          <th key={day}>{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {calendarDays.map((week, i) => (
                        <tr key={i}>
                          {week.map((date, j) => (
                            <td
                              key={j}
                              className={date ? `date-picker ${isSelected(date) ? "selected" : ""}` : ""}
                              onClick={() => date && setSelectedDate(date)}
                            >
                              {date ? <span>{date.getDate()}</span> : ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default MyVisit;


