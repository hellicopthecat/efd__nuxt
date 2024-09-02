export interface IDefaultApiResponse {
  response: {
    header: {
      resultMsg: string;
      resultCode: string;
    };
    body: {
      dataType: string;
      items: {item: [IWeatherNowProps]};
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
}

export interface IWeatherNowProps {
  baseDate: string;
  baseTime: string;
  category: "PTY" | "REH" | "RN1" | "T1H" | "UUU" | "VEC" | "VVV" | "WSD";
  nx: number;
  ny: number;
  obsrValue: string;
}
