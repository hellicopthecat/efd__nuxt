export interface ISituationTypes {
  MisfortuneSituationNoticeMsg: [
    {
      head: [
        {
          totalCount: number;
        },
        {
          numOfRows: string;
          pageNo: string;
          type: string;
        },
        {
          RESULT: {
            resultCode: string;
            resultMsg: string;
          };
        }
      ];
    },
    {
      row: [
        {
          msg_id: string;
          msg_seq: number;
          clmy_pttn_cd: string;
          clmy_pttn_nm: string;
          titl: string;
          cnts1: string;
          inpt_date: string;
        }
      ];
    }
  ];
}
