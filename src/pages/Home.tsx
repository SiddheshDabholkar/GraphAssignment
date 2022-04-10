import React from "react";
import DateGraph from "../components/DateGraph";
import Error from "../components/Error";
import data from "../data.json";
import "./Home.scss";

export type ApiDataType = {
  schedule_time: string;
  slot: string;
  item_date: string;
};

const Home: React.FC = () => {
  const [date, setDate] = React.useState<string>("");
  return (
    <>
      <main className="Main">
        <div className="MainTop">
          <input
            className="MainTopStyle"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {date ? (
          <div className="MainBottom">
            <DateGraph date={date!} data={data} />
          </div>
        ) : (
          <Error message="Select date to see the graph" />
        )}
      </main>
    </>
  );
};

export default Home;
