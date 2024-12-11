import type {
  IWeatherNowTypes,
  IWeatherTodayTomorrowTypes,
} from "./weather/weatherTypes";

export type HtmlTxtTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "small";
export interface IDefaultApiResponse {
  response: {
    header: {
      resultMsg: string;
      resultCode: string;
    };
    body: {
      dataType: string;
      items: {item: IWeatherNowTypes[] | IWeatherTodayTomorrowTypes[]};
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}
export interface IDefaultSafetyDataTypes<T> {
  header: {
    resultMsg: string;
    resultCode: string;
    errorMsg: null;
  };
  numOfRows: string;
  pageNo: string;
  totalCount: string;
  body: T[];
}
