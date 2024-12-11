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

export interface IWeatherSpecialNoticeType {
  /**지점 */
  BRNCH: number;
  /**발표시각 */
  PRSNTN_TM: string;
  /**발표일련번호 */
  PRSNTN_SN: number;
  /**예보관 */
  FCAST: string;
  /**특보발표코드 */
  SPNE_PRSNTN_CD: string;
  /**제목 */
  TTL: string;
  /**해당구역 */
  RLVT_ZONE: string;
  /**특보발효시각텍스트 */
  SPNE_FRMNT_TM_TXT: string;
  /**발표내용 */
  PRSNTN_CN: string;
  /**특보발효현황시각 */
  SPNE_FRMNT_PRCON_TM: string;
  /**특보발효현황내용 */
  SPNE_FRMNT_PRCON_CN: string;
  /**예비특보발표현황 */
  RSRV_SPNE_PRSNTN_PRCON_: string;
  /**참고사항 */
  REF_MTTR: string;
  /**행정안전부입수일시 */
  MAAS_OBNT_DT: string;
}
