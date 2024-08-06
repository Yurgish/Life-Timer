function isLeapYear(year) {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

export class Day {
  constructor(date = null, language = "default") {
    date = date ?? new Date();

    this.Date = date;
    this.date = date.getDate();
    this.day = date.toLocaleString(language, { weekday: "long" });
    this.dayShort = date.toLocaleString(language, { weekday: "short" });
    this.year = date.getFullYear();
    this.yearShort = Number(date.toLocaleString(language, { year: "2-digit" }));
    this.month = date.toLocaleString(language, { month: "long" });
    this.monthShort = date.toLocaleString(language, { month: "short" });
    this.monthNumber = date.getMonth() + 1;
    this.dateShort = this.formatDate("YYYY-MM-DD");
  }

  get isToday() {
    return this.isEqualTo(new Date());
  }

  formatDate(format) {
    if (
      !format.includes("YYYY") ||
      !format.includes("MM") ||
      !format.includes("DD")
    ) {
      return "Invalid format";
    }

    const formattedDate = format
      .replace("YYYY", this.year)
      .replace("MM", this.monthNumber.toString().padStart(2, "0"))
      .replace("DD", this.date.toString().padStart(2, "0"));

    return formattedDate;
  }

  isEqualTo(date) {
    // Перевіряє, чи переданий аргумент `date` є об'єктом класу `Day` і отримуємо його дату.
    date = date instanceof Day ? date.Date : date;

    return (
      date.getDate() === this.date &&
      date.getMonth() === this.monthNumber - 1 &&
      date.getFullYear() === this.year
    );
  }
}

export class Month {
  constructor(date = null, language = "default") {
    const day = new Day(date, language);
    const monthSizes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    this.language = language;
    this.name = day.month;
    this.number = day.monthNumber;
    this.year = day.year;
    this.firstDayOfMonthIndex = this.getFirstDayOfMonthIndex();
    this.numberOfDays = monthSizes[this.number - 1];
    this.monthShort = day.monthShort;

    if (this.number === 2) {
      this.numberOfDays += isLeapYear(this.year) ? 1 : 0;
    }

    // Кастомний ітератор
    this[Symbol.iterator] = function* () {
      let number = 1;
      yield this.getDay(number);
      while (number < this.numberOfDays) {
        ++number;
        yield this.getDay(number);
      }
    };
  }

  getFirstDayOfMonthIndex() {
    const firstDayOfMonth = new Date(this.year, this.number - 1, 1);
    let dayIndex = firstDayOfMonth.getDay();

    dayIndex = (dayIndex + 6) % 7;
    return dayIndex;
  }

  getDay(date) {
    return new Day(new Date(this.year, this.number - 1, date), this.language);
  }

  getAllDays() {
    return Array.from({ length: this.numberOfDays }, (_, index) =>
      this.getDay(index + 1)
    );
  }
}

export const getAvalibleDaysOfWeek = (language) => {
  const daysOfWeek = [];
  const currentDate = new Date(2024, 0);

  for (let i = 1; i <= 7; i++) {
    currentDate.setDate(i);

    daysOfWeek.push(
      currentDate.toLocaleDateString(language, {
        weekday: "short",
      })
    );
  }

  return daysOfWeek;
};

export const getAvailableMonths = (language) => {
  const availableMonths = [];

  for (let i = 0; i < 12; i++) {
    const currentDate = new Date(2022, i);

    availableMonths.push(
      currentDate.toLocaleDateString(language, {
        month: "short",
      })
    );
  }

  return availableMonths;
};

export const getAvailableYears = () => {
  const currentYear = new Date().getFullYear();
  const avalibleYears = [];
  for (let year = currentYear; year >= currentYear - 150; year--) {
    avalibleYears.push(year);
  }
  return avalibleYears;
};
