import React from "react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <div className="Footer">
      <span>{new Date().getFullYear()} &copy; All rights reserved</span>
    </div>
  );
};

export default Footer;
