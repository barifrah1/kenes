import React from "react";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./EditForm.css";
import LinearStepper from "../../stepper/stepper";
import Header from "../../header/header";
import Select from "react-select";
import SadnaotForm from "../SadnaotForm/SadnaotForm";
import Swal from "sweetalert2";
import OtherDetails from "../OtherDetailsForm/OtherDetailsForm";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import Utils from "../../../Utils";
require("yup-phone");

const EditForm = (props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    category: "",
    nlplevel: "",
    email: "",
    phone: "",
    vegan: "",
    way: "",
    photos: "",
    payment: "",
    inv: "",
    sum: "",
    userSadnaot: {},
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [sadnaot, setSadnaot] = useState({});
  const formikRef = useRef();

  /*used in stepper component*/
  const updateActiveStep = async (activeStep, change, errors, touched) => {
    if (change == 1) {
      for (let i = 0; i < fieldsByStep[activeStep].length; i++) {
        if (errors[fieldsByStep[activeStep][i]] != undefined) {
          console.log("error in field " + fieldsByStep[activeStep][i]);
          await Swal.fire({
            title: "שגיאה",
            text: "קיימים שדות לא תקינים",
            icon: "error",
            customClass: {
              container: "my-swal",
            },
          });
          return;
        }
      }
    }
    console.log("no errors");
    setActiveStep(activeStep + change);
  };
  /*list of fields by step used for validation part and for stepping logic*/
  const [fieldsByStep, setFieldBystep] = useState([
    ["Fname", "Lname", "category", "nlplevel", "email", "phone", "city"],
    ["userSadnaot"],
    ["vegan", "way", "photos", "inv", "sum"],
  ]);
  /*options of nlplevel field*/
  const nlpLevelOptions = [
    { value: "Student", label: "Student" },
    { value: "NLP Practitioner", label: "NLP Practitioner" },
    { value: "NLP Master", label: "NLP Master" },
    { value: "NLP Trainer", label: "NLP Trainer" },
    { value: "NLP Master Trainer", label: "NLP Master Trainer" },
  ];

  /*options of category field*/
  const categoryOptions = [
    { value: "משתתף", label: "משתתפ/ת" },
    { value: "מרצה", label: "מרצה" },
    { value: "צוות הפקה", label: "צוות הפקה" },
    { value: "עובד/ת בדוכן", label: "עובד/ת בדוכן" },
  ];

  useEffect(() => {
    /*get all sadnaot by rang*/
    fetch(Utils.resolvePath() + "api/sadnaot", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          /*rearange results by round in order to save it by round in state*/
          let rangs = result.map((sadna) => sadna.rang);
          rangs = rangs
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort();
          let mapper = rangs.map((rang) => "f_rang" + rang);
          let newUserSadnaot = {};
          for (let j = 0; j < rangs.length; j++) {
            newUserSadnaot[mapper[j]] = "";
          }
          let newVal = values;
          newVal.userSadnaot = newUserSadnaot;
          setValues(newVal);
          let sadnaByrangs = [];
          for (let i = 1; i <= rangs.length; i++) {
            sadnaByrangs[i - 1] = result.filter((row) => row.rang == i);
          }
          setSadnaot(sadnaByrangs);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error when fetching");
          throw error;
        }
      );

    //set Form data with row data
    Object.keys(values).map((attr) =>
      formikRef.current.setFieldValue(attr, "")
    );
  }, []);

  useEffect(() => {
    var rowDataWithSadnaot = props.rowData;
    fetch(
      Utils.resolvePath() + `api/participant/${props.rowData.phone}/sadnaot/`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        //body: JSON.stringify({ phone: props.rowData.phone }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          rowDataWithSadnaot.userSadnaot = {};
          for (let i = 1; i <= result.length; i++)
            rowDataWithSadnaot.userSadnaot["f_rang" + i] = result[i - 1].id;

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
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error when fetching sadnaot");
          throw error;
        }
      );
  }, [props.rowData]);

  /*yup validation schema for formik*/
  const validationSchema = Yup.object().shape({
    Fname: Yup.string().required("שדה חובה"),
    Lname: Yup.string().required("שדה חובה"),
    category: Yup.string().required("קטגוריה לא תקינה"),
    nlplevel: Yup.string().required("לא נבחרה רמת נ.ל.פ"),
    email: Yup.string().email("אימייל לא תקין").required("אימייל לא תקין"),
    phone: Yup.string()
      .phone("IL")
      .required("טלפון לא תקין - שימוש בספרות בלבד"),
    userSadnaot: Yup.object().shape({
      f_rang1: Yup.string().required("לא נבחרה סדנה"),
      f_rang2: Yup.string().required("לא נבחרה סדנה"),
      f_rang3: Yup.string().required("לא נבחרה סדנה"),
    }),
    vegan: Yup.string().required("שדה חסר"),
    way: Yup.string().required("שדה חסר"),
    photos: Yup.string().required("שדה חסר"),
    inv: Yup.string().required("שדה חסר"),
    sum: Yup.string().required("שדה חסר"),
  });
  /*formik submmiting function*/
  const handleSubmit = async (values, { setSubmitting }) => {
    const userSadnaotParams = Object.values(values.userSadnaot).map(
      (sad, index) => [sad, values["phone"], index + 1]
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
      values["nlplevel"],
      values["phone"],
    ];
    /*add user and his sadnaot ajax call*/
    await fetch(Utils.resolvePath() + "api/participant", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        user: newUserParams,
        sadnaot: [userSadnaotParams],
      }),
    }).then(
      async (result) => {
        let newRow = props.rowData;
        newRow = { ...props.rowData, ...values };
        props.handleEdit(values);
        await Swal.fire({
          title: "הפרטים נקלטו!",
          text: "העדכון הושלם בהצלחה",
          icon: "success",
          customClass: {
            container: "my-swal",
          },
        });
        await setSubmitting(false);
        await setActiveStep(0);
        await props.closeModal();
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log("error when updating user details");
        Swal.fire({
          title: "שגיאה",
          text: "עדכון הפרטים נכשל",
          icon: "error",
          customClass: {
            container: "my-swal",
          },
        });
        throw error;
      }
    );
  };

  /*rendering*/
  return (
    <div>
      <Header type="modal" />

      <div className="regis_form">
        <Formik
          innerRef={formikRef}
          initialValues={values}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            initialValues,
          }) => (
            <Form>
              <div className="div_steps">
                <LinearStepper
                  activeStep={activeStep}
                  updateActiveStep={updateActiveStep}
                  form_errors={errors}
                  touched_form={touched}
                />
              </div>
              <div className="formDiv">
                {activeStep === 0 && (
                  <>
                    <label>שם פרטי :</label>
                    <Field type="text" name="Fname" />
                    {touched.Fname && errors.Fname ? (
                      <div className="error_div">{errors.Fname}</div>
                    ) : null}
                    <hr />
                    <label>שם משפחה :</label>
                    <Field type="text" name="Lname" />
                    {touched.Lname && errors.Lname ? (
                      <div className="error_div">{errors.Lname}</div>
                    ) : null}
                    <hr />
                    <label>קטגוריה: </label>
                    <Field
                      name="category"
                      component={({ field, form }) => (
                        <Select
                          options={categoryOptions}
                          className="select_container"
                          classNamePrefix="react_select"
                          value={
                            categoryOptions
                              ? categoryOptions.find(
                                  (option) => option.value === field.value
                                )
                              : ""
                          }
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                    {errors.category ? (
                      <div className="error_div">{errors.category}</div>
                    ) : null}
                    <hr />
                    <label>רמת NLP : </label>
                    <Field
                      name="nlplevel"
                      component={({ field, form }) => (
                        <Select
                          options={nlpLevelOptions}
                          className="select_container"
                          classNamePrefix="react_select"
                          value={
                            nlpLevelOptions
                              ? nlpLevelOptions.find(
                                  (option) => option.value === field.value
                                )
                              : ""
                          }
                          onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                          }
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                    {errors.nlplevel ? (
                      <div className="error_div">{errors.nlplevel}</div>
                    ) : null}
                    <hr />
                    <label>אימייל :</label>
                    <Field type="email" name="email" />
                    {touched.email && errors.email ? (
                      <div className="error_div">{errors.email}</div>
                    ) : null}
                    <hr />
                    <label>סלולרי :</label>
                    <Field type="text" name="phone" disabled={true} />
                    {touched.phone && errors.phone ? (
                      <div className="error_div">{errors.phone}</div>
                    ) : null}
                    <hr />
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <SadnaotForm sadnaotData={sadnaot} />
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <OtherDetails
                      errors={errors}
                      touched={touched}
                      editMode={true}
                    />
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <div className="send_button">
                      <Button
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        size="large"
                        fontSize="large"
                        /*className={classes.button}*/
                        endIcon={
                          <SendIcon
                            fontSize="large"
                            style={{ marginRight: 15 }}
                          />
                        }
                        onClick={(values, setSubmitting) =>
                          handleSubmit(values, setSubmitting)
                        }
                      >
                        Send
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default EditForm;
