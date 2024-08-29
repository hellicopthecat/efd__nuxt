const date = new Date();
const YEAR = date.getFullYear();
const MONTH = String(date.getMonth() + 1).padStart(2, "0");
const DAY = String(date.getDate()).padStart(2, "0");
export const TIME = date.toTimeString().slice(0, 5).replace(":", "");
export const DDAY = `${YEAR}${MONTH}${DAY}`;
//초단기
export const NCST = "getUltraSrtNcst";
