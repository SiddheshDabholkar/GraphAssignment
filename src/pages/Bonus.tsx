import React, { useState } from "react";
import "./Bonus.scss";
import PriorScheduling from "../components/PriorScheduling";

export default function Bonus() {
  const [from, setForm] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="Bonus">
      <div className="BonusTop">
        <input
          className="BonusTopStyle"
          type="date"
          name="date"
          value={from}
          onChange={(e) => setForm(e.target.value)}
        />
        <input
          className="BonusTopStyle"
          type="date"
          name="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      {to && from ? (
        <div className="BonusBottom">
          <PriorScheduling from={from} to={to} />
        </div>
      ) : (
        <div className="BonusNotSelected">
          <h1>Please select dates from above input</h1>
        </div>
      )}
    </div>
  );
}
