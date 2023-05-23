import React from "react";
import "./Expanded.less";
import ExpandedDetails from "./ExpandedDetails/ExpandedDetails";
import SadnaotDetails from "./sadnaot_details/sadnaot_details";

const Expanded = (props) => {
  const { deleteUser }  = props;
  const { checkinUser }   = props;
  return (
    <div className="expanded_comp">
      <div className="expanded_div">
        <span className="details">
          <ExpandedDetails
            cols={props.cols}
            row={props.row}
            printAllFields={false}
          />
        </span>
      </div>
      <div className="left_comp">
        <span className="sadnaot_gifts">
          <SadnaotDetails row={props.row} />
        </span>
        <span className="delete_user">
          <button type="button" onClick={(e) => deleteUser(props.row["id"])}>
            מחק משתתף
          </button>
        </span>
      </div>
      <div className="button_container">
          <span className="checkin_user">
            <button type="button" onClick={(e) => checkinUser(props.row["id"])}>
             רישום משתתף
            </button>
          </span>
        </div>
    </div>
  );
};

export default Expanded;

