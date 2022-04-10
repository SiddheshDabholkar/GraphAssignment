import React from "react";
import data from "../data.json";
import { ApiDataType } from "../pages/Home";

function useConvertedData() {
  const [converted, setConverted] = React.useState<ApiDataType[]>([]);

  const convertScheduledTimeIntoItemDateFormat = (date: string) => {
    const formatted = new Date(date);
    const year = formatted.getFullYear();
    const month = formatted.getMonth() + 1;
    const day = formatted.getDate();
    const formatMonth = month.toString().length !== 1 ? month : `0${month}`;
    const formatDay = day.toString().length !== 1 ? day : `0${day}`;
    return `${year}-${formatMonth}-${formatDay}`;
  };

  const convertAll = (data: ApiDataType[]) => {
    return data.map((d) => {
      return {
        ...d,
        schedule_time: convertScheduledTimeIntoItemDateFormat(d.schedule_time),
      };
    });
  };

  React.useEffect(() => {
    setConverted(convertAll(data));
  }, [data]);

  return { converted, convertScheduledTimeIntoItemDateFormat };
}

export default useConvertedData;
