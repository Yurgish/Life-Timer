import React, { useEffect, useState } from "react";
import { Month, Day } from "../utils/date";
import {
  getAvailableMonths,
  getAvalibleDaysOfWeek,
  getAvailableYears,
} from "../utils/date";

const useDatePicker = (language) => {
  const rowsCount = 6;
  const [currentMonth, setCurrentMonth] = useState(() => {
    return new Month(null, language);
  });
  const avalibleDaysOfWeek = getAvalibleDaysOfWeek(language);
  const avalibleMonth = getAvailableMonths(language);
  const avalibleYears = getAvailableYears();

  const getPrevSlicedMonth = () => {
    if (currentMonth.firstDayOfMonthIndex === 0) {
      return [];
    }

    const prevMonthDays = [];
    const daysInPrevMonth = new Date(
      currentMonth.year,
      currentMonth.number - 1,
      0
    ).getDate(); // Returns date of last month day (if  0 is las day of month)

    for (let i = 1; i <= currentMonth.firstDayOfMonthIndex; i++) {
      const prevDate = new Date(
        currentMonth.year,
        currentMonth.number - 1 - 1,
        daysInPrevMonth - currentMonth.firstDayOfMonthIndex + i
      );
      prevMonthDays.push(new Day(prevDate, language));
    }

    return prevMonthDays;
  };

  const getNextSlicedMonth = () => {
    const remainingDays =
      7 * rowsCount -
      (currentMonth.firstDayOfMonthIndex + currentMonth.numberOfDays);

    if (remainingDays <= 0) {
      return [];
    }

    const nextMonthDays = [];

    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(currentMonth.year, currentMonth.number, i);
      nextMonthDays.push(new Day(nextDate, language));
    }

    return nextMonthDays;
  };

  const nextYear = () => {
    setCurrentMonth(new Month(new Date(currentMonth.year + 1, 0), language));
  };

  const prevYear = () => {
    setCurrentMonth(new Month(new Date(currentMonth.year - 1, 11), language));
  };

  const nextMonth = () => {
    if (currentMonth.number === 12) {
      nextYear();
    } else {
      setCurrentMonth(
        new Month(
          new Date(currentMonth.year, currentMonth.number + 1 - 1),
          language
        )
      );
    }
  };

  const prevMonth = () => {
    if (currentMonth.number === 1) {
      prevYear();
    } else {
      setCurrentMonth(
        new Month(
          new Date(currentMonth.year, currentMonth.number - 1 - 1),
          language
        )
      );
    }
  };

  const goToDate = (year, month) => {
    const monthIndex =
      typeof month === "string" ? avalibleMonth.indexOf(month) : month - 1; // Якщо число, то використовуємо його
    setCurrentMonth(new Month(new Date(year, monthIndex), language));
  };

  const goToToday = () => {
    const today = new Day(new Date(), language);
    goToDate(today.year, today.monthNumber);
  };

  return {
    goToDate,
    prevMonth,
    nextMonth,
    currentMonth,
    avalibleDaysOfWeek,
    avalibleMonth,
    avalibleYears,
    getPrevSlicedMonth,
    getNextSlicedMonth,
    goToToday,
  };
};

export default useDatePicker;
