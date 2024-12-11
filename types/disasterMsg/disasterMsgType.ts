export interface IDisasterMsgType {
  /** 메세지 내용 */
  MSG_CN: string;
  /** 경보 지역 */
  RCPTN_RGN_NM: string;
  /** 생성일시 */
  CRT_DT: string;
  /** 등록일자 */
  REG_YMD: string;
  /** 긴급단계명 */
  EMRG_STEP_NM: string;
  /** 일련번호 */
  SN: number;
  /** 재해구분명 */
  DST_SE_NM: string;
  /** 수정일자 */
  MDFCN_YMD: string;
}
