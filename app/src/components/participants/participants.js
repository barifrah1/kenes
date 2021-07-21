import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./Participants.css";
import ParticipantsTable from "./ParticipantsTable/ParticipantsTable";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Utils from "../../Utils";
function Participants() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const toRedirect = async () => {
      if (!isAuthenticated) {
        return true;
      } else if (user.email && user.email_verified) {
        const res = await Utils.checkPermissions(user.email);
        return !res;
      } else {
        return true;
      }
    };
    if (toRedirect == true) setRedirect(toRedirect);
  }, []);

  if (isLoading) {
    return <div>טוען...</div>;
  }

  return (
    <>
      {isAuthenticated && (
        <div className="par">
          <ParticipantsTable />
        </div>
      )}
      ;{redirect && <Redirect to="/" />}
    </>
  );
}
export default Participants;
