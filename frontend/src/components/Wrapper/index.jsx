import React from "react";
import "./style.css"

//Page wrapper component
function Wrapper(props) {
  return (<div>{props.children}</div>);
}

export default Wrapper;