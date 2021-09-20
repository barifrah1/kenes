import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./Expanded.css";
import moment from "moment";
import smartSearch from "smart-search";
import ExpandedDetails from "./ExpandedDetails/ExpandedDetails";
import SadnaotDetails from "./sadnaot_details/sadnaot_details";

const Expanded = (props) => {
  return (
    <div className="expanded_div">
      <span className="details">
        <ExpandedDetails
          cols={props.cols}
          row={props.row}
          printAllFields={false}
        />
      </span>
      <span className="sadnaot_gifts">
        <SadnaotDetails row={props.row} />
      </span>
    </div>
  );
};

export default Expanded;
