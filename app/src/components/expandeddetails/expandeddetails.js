import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./expandeddetails.css";
import moment from "moment";

const ExpandedDetails = (props) => {
  return (
    <ul>
      {props.cols.map((col) => {
        if (col.hidden == true) {
          if (col.type != "date") {
            return (
              <li>
                <label>
                  <b>{col.text + ":"}</b>
                </label>
                <span>{" " + props.row[col.dataField]}</span>
              </li>
            );
          } else {
            return (
              <li>
                <label>
                  <b>{col.text + ":"}</b>
                </label>
                <span>
                  {" " + moment(props.row[col.dataField]).format("DD/MM/yyyy")}
                </span>
              </li>
            );
          }
        }
      })}
    </ul>
  );
};

export default ExpandedDetails;
