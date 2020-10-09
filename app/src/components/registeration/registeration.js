import React from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./registeration.css";
import Modal from "react-awesome-modal";
import LinearStepper from "../stepper/stepper";
import Header from "../header/header";
import Select from "react-select";
import SadnaotForm from "../sadnaot_form/sadnaot_form";
import Swal from "sweetalert2";
import OtherDetails from "../other_details_form/other_details_form";
require("yup-phone");
function Registeration() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    nlplevel: "",
    email: "",
    phone: "",
    city: "",
    vegan: "",
    way: "",
    photos: "1",
    takanon: "0",
    userSadnaot: {},
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [sadnaot, setSadnaot] = useState({});
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
      if (Object.keys(touched).length == 0) {
        console.log("touched errors");
        await Swal.fire({
          title: "Oops...",
          text: "שדות לא תקינים",
          icon: "error",
          customClass: {
            container: "my-swal",
          },
        });
        return;
      }
    }
    console.log("no errors");
    setActiveStep(activeStep + change);
  };
  const [fieldsByStep, setFieldBystep] = useState([
    ["Fname", "Lname", "nlplevel", "email", "phone", "city"],
    ["userSadnaot"],
    ["vegan", "way", "photos", "takanon"],
  ]);

  const nlpLevelOptions = [
    { value: "Student", label: "Student" },
    { value: "NLP Practitioner", label: "NLP Practitioner" },
    { value: "NLP Master", label: "NLP Master" },
    { value: "NLP Trainer", label: "NLP Trainer" },
    { value: "NLP Master Trainer", label: "NLP Master Trainer" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/getSadnaot", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
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
  }, []);

  const validationSchema = Yup.object().shape({
    Fname: Yup.string().required("שדה חובה"),
    Lname: Yup.string().required("שדה חובה"),
    nlplevel: Yup.string().required("לא נבחרה רמת נ.ל.פ"),
    email: Yup.string().email("אימייל לא תקין").required("אימייל לא תקין"),
    phone: Yup.string()
      .phone("IL")
      .required("טלפון לא תקין - שימוש בספרות בלבד"),
    city: Yup.string().required("יישוב לא תקין"),
    userSadnaot: Yup.object().shape({
      f_rang1: Yup.string().required("לא נבחרה סדנה"),
      f_rang2: Yup.string().required("לא נבחרה סדנה"),
      f_rang3: Yup.string().required("לא נבחרה סדנה"),
    }),
    vegan: Yup.string().required("שדה חסר"),
    way: Yup.string().required("שדה חסר"),
    photos: Yup.string().required("שדה חסר"),
    takanon: Yup.number().required("לא אישרת את תנאי התקנון"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setActiveStep(1);
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };
  return (
    <div>
      <Modal visible={true} width="700" height="700">
        <Header type="modal" />

        <div className="regis_form">
          <Formik
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
                      <Field type="text" name="phone" />
                      {touched.phone && errors.phone ? (
                        <div className="error_div">{errors.phone}</div>
                      ) : null}
                      <hr />
                      <label>יישוב :</label>
                      <Field type="text" name="city" />
                      {touched.city && errors.city ? (
                        <div className="error_div">{errors.city}</div>
                      ) : null}
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <SadnaotForm sadnaotData={sadnaot} />
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <OtherDetails errors={errors} touched={touched} />
                    </>
                  )}
                  {activeStep === 3 && (
                    <>
                      <button type="submit" disabled={isSubmitting}>
                        להשלמת הרשמה ומעבר לתשלום
                      </button>
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <div className="credit">
        Icons made by{" "}
        <a href="https://roundicons.com/" title="Roundicons">
          Roundicons
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
}
export default Registeration;
