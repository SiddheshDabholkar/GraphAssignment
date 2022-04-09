import React, { useEffect } from "react";
import { ApiDataType } from "../App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./DateGraph.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

type DateGraphTypes = {
  date: string;
  // data: ApiDataType[];
  data: any;
};

const DateGraph: React.FC<DateGraphTypes> = ({ date, data }) => {
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

  useEffect(() => {
    setConverted(convertAll(data));
  }, [data]);

  const getYesterday = (date: string) => {
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);
    const day = convertScheduledTimeIntoItemDateFormat(String(yesterday));
    return day;
  };

  const getTomorrow = (date: string) => {
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const day = convertScheduledTimeIntoItemDateFormat(String(tomorrow));
    return day;
  };

  const generateLabels = (date: string) => {
    return [getYesterday(date), date, getTomorrow(date)];
  };

  const generateDataForLabels = (data: string[]) => {
    const generatedData: number[] = Array(3).fill(0);

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

  const graphdata = {
    labels: generateLabels(date),
    datasets: [
      {
        label: "no of schedules",
        data: generateDataForLabels(generateLabels(date)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  if (date) {
    return (
      <div className="DateGraph">
        <div className="DateGraphCont">
          <Bar options={options} data={graphdata} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="DateGraph">
        <h1>Select date to see the graph</h1>
      </div>
    );
  }
};

export default DateGraph;
