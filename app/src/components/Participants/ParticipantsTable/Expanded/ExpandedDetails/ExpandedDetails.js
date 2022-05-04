import React from "react";
import "./ExpandedDetails.less";
import moment from "moment";

const ExpandedDetails = (props) => {
  const booleanMapper = (col, value) => {
    console.log(col.type, value);
    if (col.type == "bool") {
      return value == 0 ? "לא" : "כן";
    }
    return value;
  };

  return (
    <ul>
      {props.cols.map((col) => {
        if (col.hidden == true || props.printAllFields) {
          if (col.type != "date") {
            return (
              <li key={col.dataField}>
                <label>
                  <b>{col.text + ":"}</b>
                </label>
                <span>
                  {" " + booleanMapper(col, props.row[col.dataField])}
                </span>
              </li>
            );
          } else {
            return (
              <li key={col.dataField}>
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
