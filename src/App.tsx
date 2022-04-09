import React from "react";
import "./App.scss";
import DateGraph from "./components/DateGraph";
import data from "./data.json";

export type ApiDataType = {
  schedule_time: string;
  slot: "L" | "D";
  item_date: string;
};

const App: React.FC = () => {
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
        <div>
          <DateGraph date={date!} data={data} />
        </div>
      </main>
    </>
  );
};

export default App;