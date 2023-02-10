import React, { useState, useEffect } from "react";
import Utils from "../Utils";
import AsyncAjax from "../AsyncAjax";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
const useSubmit = () => {
  const [isSubmmiting, setSubmitting] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const handleSubmit = async (values, prices) => {
    const userSadnaotParams = Object.values(values.userSadnaot).map((sad) => [
      sad,
      values["id"],
    ]);
    let id = -1;
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
      values["nlplevel"].value,
    ];

    const paymentLink = Utils.getActivePaymentLink(prices);
    const objectToServer = {
      user: newUserParams,
      email: values["email"],
      sadnaot: [userSadnaotParams],
      takanon: [values["id"], values["takanon"]],
      paymentLink: paymentLink,
      allValues: values,
    };
    const result = await AsyncAjax.post("participant", objectToServer).catch(
      async (e) => {
        console.log("error when fetching");
        await Swal.fire({
          title: "תהליך ההרשמה נכשל",
          text: "נסה שוב",
          icon: "error",
          customClass: {
            container: "my-swal",
          },
        });
        throw e;
      }
    );
    console.log("mail sent");
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

  const handleEditSubmit = async (values, rowData, callbacks) => {
    const { handleEdit, setSubmitting, onClose, setActiveStep } = callbacks;
    const userSadnaotParams = Object.values(values.userSadnaot).map(
      (sad, index) => [sad, values["id"], index + 1]
    );

    const newUserParams = [
      values["category"],
      values["Fname"],
      values["Lname"],
      values["email"],
      values["payment"],
      parseInt(values["photos"]),
      parseInt(values["vegan"]),
      values["way"],
      values["inv"],
      values["sum"],
      values["nlplevel"].value,
      values["id"],
    ];
    /*add user and his sadnaot ajax call*/
    try {
      const token = await getAccessTokenSilently();
      const result = await AsyncAjax.put(
        "participant",
        { user: newUserParams, sadnaot: [userSadnaotParams] },
        token
      );

      const newRow = { ...rowData, ...values };
      await handleEdit(values);
      await Swal.fire({
        title: "הפרטים נקלטו!",
        text: "העדכון הושלם בהצלחה",
        icon: "success",
        customClass: {
          container: "my-swal",
        },
      });
      setSubmitting(false);
      setActiveStep(0);
      onClose();
      console.log(result);
    } catch (e) {
      console.log("error when updating user details");
      Swal.fire({
        title: "שגיאה",
        text: "עדכון הפרטים נכשל",
        icon: "error",
        customClass: {
          container: "my-swal",
        },
      });
      throw e;
    }
  };

  const initializeEditMode = (
    rowData,
    formikRef,
    setValues,
    setFieldBystep
  ) => {
    //set fields by step for edit mode
    setFieldBystep([
      ["Fname", "Lname", "category" /*, "nlplevel"*/, "email", "phone", "city"],
      ["userSadnaot"],
      ["vegan", "way", "photos", "inv", "sum"],
    ]);
    //set initial values for edited row
    getAccessTokenSilently()
      .then(async (token) => {
        const result = await AsyncAjax.get(
          `participant/${rowData.id}/sadnaot/`,
          {},
          token
        );
        const rowDataWithSadnaot = await buildSadnaotObject(rowData, result);
        fillSadnaotInForm(rowDataWithSadnaot, formikRef, setValues);
      })
      .catch((e) => {
        console.log("error when fetching user and sadnaot data");
        throw e;
      });
  };

  //for internal use
  const buildSadnaotObject = (data, sadnaotData) => {
    const rowDataWithSadnaot = { ...data };
    rowDataWithSadnaot.userSadnaot = {};
    for (let i = 1; i <= sadnaotData.length; i++)
      rowDataWithSadnaot.userSadnaot["f_rang" + i] = sadnaotData[i - 1].id;
    return rowDataWithSadnaot;
  };
  //for internal use
  const fillSadnaotInForm = (rowDataWithSadnaot, formikRef, setValues) => {
    setValues(rowDataWithSadnaot);
    if (Object.keys(rowDataWithSadnaot.userSadnaot).length > 0) {
      Object.keys(rowDataWithSadnaot).map((attr) =>
        formikRef.current.setFieldValue(
          attr,
          attr != "photos"
            ? rowDataWithSadnaot[attr]
            : String(rowDataWithSadnaot[attr])
        )
      );
    }
    return true;
  };

  return {
    isSubmmiting,
    setSubmitting,
    handleSubmit,
    handleEditSubmit,
    initializeEditMode,
  };
};
export default useSubmit;
