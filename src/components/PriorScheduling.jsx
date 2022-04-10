import React, { useState } from "react";
import "./PriorScheduling.scss";

function PriorScheduling() {
  const [from, setForm] = useState("");
  const [to, setTo] = useState("");

  return (
    <div>
      <div>
        <input
          className="MainTopStyle"
          type="date"
          name="date"
          value={from}
          onChange={(e) => setForm(e.target.value)}
        />
        <input
          className="MainTopStyle"
          type="date"
          name="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
          
      </div>
    </div>
  );
}

export default PriorScheduling;
