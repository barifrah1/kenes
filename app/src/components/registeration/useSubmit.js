import React, { useState, useEffect } from "react";
import Utils from "../../Utils";
import AsyncAjax from "../../AsyncAjax";
import Swal from "sweetalert2";

const useSubmit = () => {
  const [isSubmmiting, setSubmitting] = useState(false);

  const handleSubmit = async (values, prices) => {
    const userSadnaotParams = Object.values(values.userSadnaot).map((sad) => [
      sad,
      values["phone"],
    ]);
    let id = -1;
    /*first we get new id*/
    await fetch(Utils.resolvePath() + "api/participants/ids/max", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        id = res[0].id;
      });

    const newUserParams = [
      id,
      values["Fname"],
      values["Lname"],
      values["email"],
      values["city"],
      values["phone"],
      parseInt(values["photos"]),
      "code",
      parseInt(values["vegan"]),
      values["way"],
      values["nlplevel"],
    ];

    /*add user and his sadnaot ajax call*/
    /*const dataToSend = JSON.stringify({
        user: newUserParams,
        email: values["email"],
        sadnaot: [userSadnaotParams],
        takanon: [values["phone"], values["takanon"]],
      });
      const insertResult = await AsyncAjax("InsertUserAndSadnaot",dataToSend);*/
    await fetch(Utils.resolvePath() + "api/participant", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        user: newUserParams,
        email: values["email"],
        sadnaot: [userSadnaotParams],
        takanon: [values["phone"], values["takanon"]],
      }),
    })
      .then((result) => result.json())
      .then(async (result) => {
        /*build object to replace parameter in mail template*/
        const userSadnaot = result;
        const paymentLink = Utils.getActivePaymentLink(prices);
        const toReplace = Utils.buildReplacingObjectMail(
          values,
          paymentLink,
          userSadnaot
        );
        const res = await AsyncAjax.post("mail", {
          toReplace: toReplace,
        });
        console.log(res);
      })
      .catch(
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        async (error) => {
          console.log("error when fetching");
          await Swal.fire({
            title: "תהליך ההרשמה נכשל",
            text: "נסה שוב",
            icon: "error",
            customClass: {
              container: "my-swal",
            },
          });
          throw error;
        }
      );
    await Swal.fire({
      title: "הפרטים נקלטו!",
      text: "הפרטים נקלטו מיד תועבר לעמוד התשלום",
      icon: "success",
      customClass: {
        container: "my-swal",
      },
    });
    await alert(JSON.stringify(values, null, 2));
    await setSubmitting(false);
    const paymentUrlRow = await Utils.getActivePaymentLink({ ...prices });

    await window.location.replace(paymentUrlRow);
  };

  return { isSubmmiting, setSubmitting, handleSubmit };
};
export default useSubmit;
