import type {
  INewForeCastType,
  IWeatherTodayTomorrowTypes,
} from "~/types/weather/weatherTypes";

export const createNewArr = ({
  data,
  newWeatherData,
}: {
  data: IWeatherTodayTomorrowTypes[];
  newWeatherData: globalThis.Ref<INewForeCastType[]>;
}) => {
  const newArr: INewForeCastType[] = [];
  data.forEach(({fcstTime, category, fcstValue}) => {
    let exist = newArr.find((entry) => entry.fcstTime === fcstTime);

    if (!exist) {
      exist = {
        fcstTime: fcstTime,
      };
      newArr.push(exist);
    }
    if (category === "POP") {
      exist.POP = fcstValue;
    }
    if (category === "PCP") {
      exist.PCP = fcstValue;
    }
    if (category === "PTY") {
      exist.PTY = fcstValue;
    }
    if (category === "REH") {
      exist.REH = fcstValue;
    }
    if (category === "SKY") {
      exist.SKY = fcstValue;
    }
    if (category === "SNO") {
      exist.SNO = fcstValue;
    }
    if (category === "TMP") {
      exist.TMP = fcstValue;
    }
    if (category === "UUU") {
      exist.UUU = fcstValue;
    }
    if (category === "VEC") {
      exist.VEC = fcstValue;
    }
    if (category === "VVV") {
      exist.VVV = fcstValue;
    }
    if (category === "WAV") {
      exist.WAV = fcstValue;
    }
    if (category === "WSD") {
      exist.WSD = fcstValue;
    }
  });
  return (newWeatherData.value = newArr);
};
