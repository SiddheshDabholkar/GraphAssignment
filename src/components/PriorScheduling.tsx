import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import useConvertedData from "../hooks/useConvertedData";
import "./PriorScheduling.scss";
import Error from "./Error";

ChartJS.register(ArcElement, Tooltip, Legend);

type PriorSchedulingType = {
  from: string;
  to: string;
};

const PriorScheduling: React.FC<PriorSchedulingType> = ({ from, to }) => {
  const { converted, convertScheduledTimeIntoItemDateFormat: convert } =
    useConvertedData();

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
  //gets all the dates between from and to
  //use it as labels
  const dates = getDatesBetweenDates(from, to);

  //produces count of schedules on each day
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
  // produce %
  const generatePercentage = (nums: number[]) => {
    const percArray: any[] = [];
    const sum = nums.reduce((a, b) => a + b);
    nums.map((m, i) => {
      let perc = ((m * 100) / sum).toFixed(2);
      percArray[i] = perc;
    });
    if (sum === 0) {
      return [];
    } else {
      return percArray;
    }
  };

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

  const PercentageData = generatePercentage(generateDataForLabels(dates));

  const pieData = {
    labels: dates,
    datasets: [
      {
        label: "% of Schedules per day",
        data: PercentageData,
        backgroundColor: generateRandomColors(dates.length),
        borderWidth: 1,
      },
    ],
  };

  if (PercentageData.length !== 0) {
    return (
      <div className="PriorScheduling">
        <Pie data={pieData} />
      </div>
    );
  } else {
    return <Error message="No data found in this timeline" />;
  }
};

export default PriorScheduling;
