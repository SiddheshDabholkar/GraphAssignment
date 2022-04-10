import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <div className="Header">
      <div className="HeaderLeft">
        <Link to="/" className="Link">
          Schedules
        </Link>
      </div>
      <div className="HeaderRight">
        <Link to="/" className="Link">
          Home
        </Link>
        <Link to="/bonus" className="Link">
          Bonus
        </Link>
      </div>
    </div>
  );
};

export default Header;
