import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./registeration.css";
import moment from "moment";
import Expanded from "../expanded/expanded";
import Modal from "react-awesome-modal";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LinearStepper from "../stepper/stepper";
import Header from "../header/header";
import Select from "react-select";
import SadnaotForm from "../sadnaot_form/sadnaot_form";

{
  /*import Header from "../header/header.js";
import ProminentAppBar from "../header_ui/header_ui.js";
import Logo from "../logo/logo.js";*/
}

function Registeration() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    nlplevel: "",
    email: "",
    phone: "",
    city: "",
    bdika: "",
    f_rang1: "",
    f_rang2: "",
    f_rang3: "",
  });
  const [lev, setLev] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [sadnaot, setSadnaot] = useState({});

  const updateActiveStep = (activeStep, change) =>
    setActiveStep(activeStep + change);

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

  return (
    <div>
      <Modal visible={true} width="700" height="700">
        <Header type="modal" />
        <div className="div_steps">
          <LinearStepper
            activeStep={activeStep}
            updateActiveStep={updateActiveStep}
          />
        </div>
        <div className="regis_form">
          <Formik
            initialValues={{
              Fname: "",
              Lname: "",
              nlplevel: "",
              email: "",
              phone: "",
              city: "",
              bdika: "",
              f_rang1: "",
              f_rang2: "",
              f_rang3: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              {activeStep === 0 && (
                <>
                  <label>שם פרטי :</label>
                  <Field type="text" name="Fname" />
                  <hr />
                  <label>שם משפחה :</label>
                  <Field type="text" name="Lname" />
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
                  <hr />
                  <label>אימייל :</label>
                  <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <hr />
                  <label>סלולרי :</label>
                  <Field type="text" name="phone" />
                  <ErrorMessage name="phone" component="div" />
                  <hr />
                  <label>יישוב :</label>
                  <Field type="text" name="city" />
                </>
              )}
              {activeStep === 1 && (
                <>
                  <SadnaotForm sadnaotData={sadnaot} />
                </>
              )}
              {activeStep === 2 && (
                <>
                  <label>בדיקה :</label>
                  <Field type="text" name="bdika" />
                  <hr />
                </>
              )}
              {activeStep === 3 && (
                <>
                  <button type="submit" disabled={isSubmitting}>
                    להשלמת הרשמה ומעבר לתשלום
                  </button>
                </>
              )}
            </Form>
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
