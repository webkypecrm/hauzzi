import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [daysArray, setDaysArray] = useState([]);

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    generateCalendar(currentYear, currentMonth);
  }, [currentMonth, currentYear]);

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();

    let days = [];

    // Add empty slots before the first day
    for (let i = 0; i < firstDay; i++) {
      days.push("");
    }

    // Add actual days
    for (let i = 1; i <= lastDay; i++) {
      days.push(i);
    }

    setDaysArray(days);
  };

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const formattedDate = new Date(currentYear, currentMonth).toLocaleString(
    "en-US",
    { month: "short", year: "numeric" }
  );

  const today = new Date();

  return (
    <div className="calendar">
      <header>
        <pre className="left" onClick={handlePrevMonth}>
          ◀
        </pre>
        <div className="header-display">
          <p className="display">{formattedDate}</p>
        </div>
        <pre className="right" onClick={handleNextMonth}>
          ▶
        </pre>
      </header>

      {/* ✅ Day name row */}
      <div className="week">
        {dayNames.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      {/* ✅ Days grid */}
      <div className="days">
        {daysArray.map((day, i) => {
          const isToday =
            day &&
            today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;

          return (
            <div
              key={i}
              className={isToday ? "current-date" : ""}
              data-date={
                day
                  ? new Date(currentYear, currentMonth, day).toDateString()
                  : ""
              }
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
