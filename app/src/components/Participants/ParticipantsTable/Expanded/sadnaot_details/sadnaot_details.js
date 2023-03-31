import React, { useState, useEffect } from "react";
import "./sadnaot_details.less";
import { useAuth0 } from "@auth0/auth0-react";
import AsyncAjax from "../../../../../AsyncAjax";
const SadnaotDetails = (props) => {
  const [sadnaot, setSadnaot] = useState([]);
  const [giftState, setGift] = useState();
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAccessTokenSilently()
      .then(async (token) => {
        const giftResult = await AsyncAjax.get(
          `participant/${props.row.id}/gift`,
          {},
          token
        );
        setGift(giftResult[0]);
      })
      .catch((e) => {
        console.log("error when fetching");
        throw e;
      });

    getAccessTokenSilently()
      .then(async (token) => {
        const result = await AsyncAjax.get(
          `participant/${props.row.id}/sadnaot`,
          {},
          token
        );
        setSadnaot(result);
      })
      .catch((e) => {
        console.log("error when fetching");
        throw e;
      });
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
      {giftState && (
        <li>
          <label>
            <b>:מתנה לבחירה</b>
          </label>
          <span>{" " + giftState.descr}</span>
        </li>
      )}
    </ul>
  );
};
export default SadnaotDetails;
