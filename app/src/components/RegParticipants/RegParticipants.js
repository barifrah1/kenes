import React from "react";
import "./RegParticipants.less";
import RegParticipantsTable from "./RegParticipantsTable/RegParticipantsTable";
function RegParticipants() {
  return (
    <>
    <div className="bg"/>
    <div className="reg_participants_page">
      <RegParticipantsTable />
    </div>
    </>
  );
}
export default RegParticipants;