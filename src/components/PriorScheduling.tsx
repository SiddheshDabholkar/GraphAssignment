import React from "react";
import data from "../data.json";
import { ApiDataType } from "../pages/Home";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PriorSchedulingType = {
  from: string;
  to: string;
};

const convert = (date: string) => {
  const formatted = new Date(date);
  const year = formatted.getFullYear();
  const month = formatted.getMonth() + 1;
  const day = formatted.getDate();
  const formatMonth = month.toString().length !== 1 ? month : `0${month}`;
  const formatDay = day.toString().length !== 1 ? day : `0${day}`;
  return `${year}-${formatMonth}-${formatDay}`;
};

const getDatesBetweenDates = (startDate: any, endDate: any) => {
  let dates: any[] = [];
  const sDate = new Date(startDate);
  const eDate = new Date(endDate);
  while (sDate < eDate) {
    dates = [...dates, convert(sDate.toString())];
    sDate.setDate(sDate.getDate() + 1);
  }
  dates.push(convert(eDate.toString()));
  return dates;
};

const PriorScheduling: React.FC<PriorSchedulingType> = ({ from, to }) => {
  const [converted, setConverted] = React.useState<ApiDataType[]>([]);
  //gets all the dates between from and to
  //use it as labels
  const dates = getDatesBetweenDates(from, to);

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

  //checks if scheduled time is same as above dates

  const generateDataForLabels = (data: string[]) => {
    const generatedData: number[] = Array(dates.length).fill(0);

    data.map((d, i) => {
      let count = 0;
      return converted.map((c) => {
        if (c.schedule_time === d) {
          count = count + 1;
          generatedData[i] = count;
          return { ...c };
        }
      });
    });

    return generatedData;
  };

  console.log("generateDataForLabels", generateDataForLabels(dates));

  const generateRandomColors = (length: number) => {
    const colors: string[] = Array(length).fill("");
    colors.map(
      (c, i) =>
        (colors[i] =
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
            .toUpperCase())
    );
    return colors;
  };

  const pieData = {
    labels: dates,
    datasets: [
      {
        label: "% of Schedules per day",
        data: generateDataForLabels(dates),
        backgroundColor: generateRandomColors(dates.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Pie data={pieData} />
    </div>
  );
};

export default PriorScheduling;
