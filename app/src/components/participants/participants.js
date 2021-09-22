import React from "react";
import { useEffect, useState } from "react";
import "./Participants.css";
import ParticipantsTable from "./ParticipantsTable/ParticipantsTable";
import { useAuth0 } from "@auth0/auth0-react";
function Participants() {
  const { user, isAuthenticated, isLoading, withAuthenticationRequired } =
    useAuth0();

  return (
    <div className="par">
      <ParticipantsTable />
    </div>
  );
}
export default Participants;
