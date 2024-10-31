export interface IDefaultBehaviorTypes {
  response: {
    header: [
      {
        resultCode: string[];
        resultMsg: string[];
      }
    ];
    body: [
      {
        items: [{item: IBehaviorTypes[]}];
        numOfRows: string[];
        pageNo: string[];
        totalCount: string[];
      }
    ];
  };
}
export interface IBehaviorTypes {
  actRmks?: string[];
  contentsType: string[];
  contentsUrl?: string[];
  mainOrd: string[];
  safetyCate1: string[];
  safetyCate2: string[];
  safetyCate3: string[];
  safetyCateNm1: string[];
  safetyCateNm2: string[];
  safetyCateNm3: string[];
  subOrd: string[];
}
