import React, { Component } from "react";
import { useState, useEffect } from "react";
import "./sadnaot_details.css";
import Utils from "../../../../../Utils";
const SadnaotDetails = (props) => {
  const [sadnaot, setSadnaot] = useState([]);
  useEffect(() => {
    fetch(Utils.resolvePath() + "api/get_user_sadnaot", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: props.row.phone }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSadnaot(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error when fetching");
          throw error;
        }
      );
  }, []);

  return (
    <ul>
      {sadnaot.map((sadna) => {
        return (
          <li key={"sadna" + sadna.id}>
            <label>
              <b>{"סבב " + sadna.rang + " : "}</b>
            </label>
            <span>{" " + sadna.descr}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default SadnaotDetails;
