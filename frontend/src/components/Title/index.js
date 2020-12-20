import React from "react";
import "./index.css";

function Title(props) {
  return <h1 className="navbar bg-info justify-content-center border-bottom">{props.children}</h1>;
}

export default Title;