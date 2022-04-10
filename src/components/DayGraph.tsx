import React from "react";
import "./DayGraph.scss";
import { ApiDataType } from "../pages/Home";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DayGraphType = {
  date: string;
  // data: any[];
  data: ApiDataType[];
};

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

const DayGraph: React.FC<DayGraphType> = ({ date, data }) => {
  const getDataWhereScheduleTimeIsEqualToDate = (data: ApiDataType[]) => {
    return data.filter((d) => d.schedule_time.includes(date));
  };

  const segregateDataBaseOnTime = (data: ApiDataType[]) => {
    const timeDated: number[] = Array(4).fill(0);
    let NineTweleve: number = 0;
    let TweleveThree: number = 0;
    let ThreeSix: number = 0;
    let SixNine: number = 0;
    data.map((t) => {
      const timed = new Date(t.schedule_time).getHours();
      console.log("times", timed);
      if (timed > 9 && timed < 12) {
        NineTweleve = NineTweleve + 1;
        timeDated[0] = NineTweleve;
      } else if (timed > 12 && timed < 15) {
        console.log("TweleveThree", TweleveThree);
        TweleveThree = TweleveThree + 1;
        console.log("TweleveThree", TweleveThree);
        timeDated[1] = TweleveThree;
      } else if (timed > 15 && timed < 18) {
        ThreeSix = ThreeSix + 1;
        timeDated[2] = ThreeSix;
      } else if (timed > 18 && timed < 21) {
        SixNine = SixNine + 1;
        timeDated[3] = SixNine;
      }
    });
    return timeDated;
  };

  const graphdata = {
    labels: ["9am to 12am", "12am to 3pm", "3pm to 6pm", "6pm to 9pm"],
    datasets: [
      {
        label: "no of schedules",
        data: segregateDataBaseOnTime(
          getDataWhereScheduleTimeIsEqualToDate(data)
        ),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Chart type="bar" options={options} data={graphdata} />
    </div>
  );
};

export default DayGraph;
