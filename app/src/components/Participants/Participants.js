import React from "react";
import "./Participants.less";
import ParticipantsTable from "./ParticipantsTable/ParticipantsTable";
function Participants() {
  return (
    <>
    <div className="bg"/>
    <div className="participants_page">
      <ParticipantsTable />
    </div>
    </>
  );
}
export default Participants;
