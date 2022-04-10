import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import "./DateGraph.scss";
import DayGraph from "./DayGraph";
import useConvertedData from "../hooks/useConvertedData";
import Error from "./Error";

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
      text: "Items Scheduled on Each day",
    },
  },
};

type DateGraphTypes = {
  date: string;
  // data: ApiDataType[];
  data: any;
};

const DateGraph: React.FC<DateGraphTypes> = ({ date, data }) => {
  const { converted, convertScheduledTimeIntoItemDateFormat } =
    useConvertedData();
  const chartRef = React.useRef();
  const [selectedDate, setSelectedDate] = React.useState("");

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

  const dataforGraph = generateDataForLabels(generateLabels(date));
  console.log("dataforGraph", dataforGraph);

  const graphdata = {
    labels: generateLabels(date),
    datasets: [
      {
        label: "no of schedules",
        data: dataforGraph,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const onClick = (event: any) => {
    const { current: chart } = chartRef;
    if (!chart) {
      return;
    }
    const printElementAtEvent = (element: any) => {
      if (!element.length) return;
      const { index } = element[0];
      setSelectedDate(graphdata.labels[index]);
    };
    printElementAtEvent(getElementAtEvent(chart, event));
  };

  return (
    <div className="DateGraph">
      <div className="DateGraphCont">
        <Bar
          options={options}
          data={graphdata}
          ref={chartRef}
          onClick={onClick}
        />
        {selectedDate ? (
          <div className="DateGraphContDayGraph">
            <DayGraph date={selectedDate} data={data} />
          </div>
        ) : (
          <Error message="Tap on one of the above bar to see the schedules by time" />
        )}
      </div>
    </div>
  );
};

export default DateGraph;
