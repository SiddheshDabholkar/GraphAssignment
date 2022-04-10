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
      <div className="BonusBottom">
        <PriorScheduling />
      </div>
    </div>
  );
}
