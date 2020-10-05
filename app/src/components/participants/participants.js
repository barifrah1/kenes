import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./participants.css";
import ParticipantsTable from "../participantstable/participantstable";

function Participants() {
  return (
    <div className="par">
      <ParticipantsTable />
    </div>
  );
}
export default Participants;
