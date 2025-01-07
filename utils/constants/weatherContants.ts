//초단기 실황
export const NCST = "getUltraSrtNcst";
//초단기 예보
export const FCST = "getUltraSrtFcst";
//단기 예보 - 0500시 발표
export const VFCST = "getVilageFcst";

//Date
const DATE = new Date();
export let year = DATE.getFullYear();
export let month = String(DATE.getMonth() + 1).padStart(2, "0");
export let date = String(DATE.getDate()).padStart(2, "0");
export const isLeapYear =
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const lastDays = [
  31,
  isLeapYear ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
const thirtyOne: {[key: number]: boolean} = {
  1: true,
  3: true,
  5: true,
  7: true,
  8: true,
  10: true,
  12: true,
};
const thirty: {[key: number]: boolean} = {4: true, 6: true, 9: true, 11: true};
//time
const min =
  DATE.getMinutes() <= 29 ? "45" : String(DATE.getMinutes()).padStart(2, "0");
const hour =
  DATE.getMinutes() <= 29
    ? String(DATE.getHours() - 1).padStart(2, "0")
    : String(DATE.getHours()).padStart(2, "0");
export const TIME = DATE.toTimeString().slice(0, 5).replace(":", "");
export const DDAY = `${year}${month}${date}`;

export const forecastTime = `${hour}${min}`;

export const forecastDate = () => {
  if (DATE.getHours() === 0 && DATE.getMinutes() <= 29) {
    let prevDate = Number(date) - 1;
    if (prevDate === 0) {
      let prevMonth = Number(month) - 1;
      if (prevMonth === 0) {
        prevMonth = 12;
        year = year - 1;
      }
      month = String(prevMonth).padStart(2, "0");
      date = String(lastDays[prevMonth - 1]);
    } else {
      date = String(prevDate).padStart(2, "0");
    }
    return `${year}${month}${date}`;
  }
  return `${year}${month}${date}`;
};

export const VFCSTTIME = (time: number) => {
  if (time >= 2310 || time < 210) {
    return "2310";
  } else if (time >= 210 && time < 510) {
    return "0210";
  } else if (time >= 510 && time < 810) {
    return "0510";
  } else if (time >= 810 && time < 1110) {
    return "0810";
  } else if (time >= 1110 && time < 1410) {
    return "1110";
  } else if (time >= 1410 && time < 1710) {
    return "1410";
  } else if (time >= 1710 && time < 2010) {
    return "1710";
  } else if (time >= 2010 && time < 2310) {
    return "2010";
  }
};

const endOfDate = (
  month: number,
  date: number,
  after: boolean | undefined | null
) => {
  if (date + 1 >= 31 && thirtyOne[month]) {
    return after ? "02" : "01";
  } else if (date + 1 >= 30 && thirty[month]) {
    return after ? "02" : "01";
  } else if (isLeapYear && date + 1 === 29) {
    return after ? "02" : "01";
  } else {
    return after
      ? String(date + 2).padStart(2, "0")
      : String(date + 1).padStart(2, "0");
  }
};
const changeMonth = (month: number, date: number) => {
  if (date === 31 && month + 1 > 12) {
    return "01";
  }
  if (date + 1 >= 31 && thirtyOne[month]) {
    return String(month + 1).padStart(2, "0");
  }
  if (date + 1 >= 30 && thirty[month]) {
    return String(month + 1).padStart(2, "0");
  }
  if (month === 2 && (date === 28 || (date === 29 && isLeapYear))) {
    return String(month + 1).padStart(2, "0");
  }

  return String(month).padStart(2, "0");
};

const changeYear = (month: number, date: number) => {
  if (month === 12 && date === 31) {
    return year + 1;
  } else {
    return year;
  }
};
export const tomorrowDate = endOfDate(Number(month), Number(date), false);
export const dayAfterDate = endOfDate(Number(month), Number(date), true);
export const VFCSTMONTH = changeMonth(Number(month), Number(date));
export const VFCSTYEAR = changeYear(Number(month), Number(date));
