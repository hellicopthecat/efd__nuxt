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

export interface IWeatherNowTypes {
  baseDate: string;
  baseTime: string;
  category: "PTY" | "REH" | "RN1" | "T1H" | "UUU" | "VEC" | "VVV" | "WSD";
  nx: number;
  ny: number;
  obsrValue: string;
}
export interface IWeatherTodayTomorrowTypes {
  baseDate: string;
  baseTime: string;
  category:
    | "LGT"
    | "PTY"
    | "RN1"
    | "SKY"
    | "T1H"
    | "REH"
    | "UUU"
    | "VVV"
    | "VEC"
    | "WSD"
    | "POP"
    | "WAV"
    | "PCP"
    | "SNO"
    | "TMP";
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

export interface INewForeCastType {
  fcstTime: string;
  /** 1시간 기온 */
  TMP?: string;
  /** 하늘상태 */
  SKY?: string;
  /** 습도 */
  REH?: string;
  /** 풍향 */
  VEC?: string;
  /** 풍속 */
  WSD?: string;
  /** 풍속(동서) */
  UUU?: string;
  /** 풍속(남북) */
  VVV?: string;
  /** 1시간 강수량 */
  PCP?: string;
  /** 강수확률 */
  POP?: string;
  /** 강수형태 */
  PTY?: string;
  /** 1시간적설 */
  SNO?: string;
  /** 파고 */
  WAV?: string;
}
