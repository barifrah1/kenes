import React from "react";
import { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import "./Registeration.css";
import Modal from "react-awesome-modal";
import LinearStepper from "../stepper/stepper";
import Header from "../header/header";
import Select from "react-select";
import SadnaotForm from "../SadnaotForm/SadnaotForm";
import Swal from "sweetalert2";
import OtherDetails from "../OtherDetailsForm/OtherDetailsForm";
import SendIcon from "@material-ui/icons/Send";
import Utils from "../../Utils";
import ValidationSchema from "./ValidationSchema";
import useWindow from "../useWindow/useWindow";

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
  const [paymentUrl, setPaymentUrl] = useState("www.google.com");
  const { height, width } = useWindow();
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
  /*list of fields by step used for validation part and for stepping logic*/
  const [fieldsByStep, setFieldBystep] = useState([
    ["Fname", "Lname", "nlplevel", "email", "phone", "city"],
    ["userSadnaot"],
    ["vegan", "way", "photos", "takanon"],
  ]);
  /*options of nlplevel field*/
  const nlpLevelOptions = [
    { value: "Student", label: "Student" },
    { value: "NLP Practitioner", label: "NLP Practitioner" },
    { value: "NLP Master", label: "NLP Master" },
    { value: "NLP Trainer", label: "NLP Trainer" },
    { value: "NLP Master Trainer", label: "NLP Master Trainer" },
  ];

  useEffect(() => {
    /*setWindoWSizes({
      height: window.screen.height,
      width: window.screen.width,
    });*/
    /*get all sadnaot by rang*/
    fetch(Utils.resolvePath() + "api/getSadnaot", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          /*rearange rsults by rang in order to save it by rangs in state*/
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

  /*formik submmiting function*/
  const handleSubmit = async (values, { setSubmitting }) => {
    const userSadnaotParams = Object.values(values.userSadnaot).map((sad) => [
      sad,
      values["phone"],
    ]);
    let id = -1;
    /*first we get new id*/
    await fetch(Utils.resolvePath() + "api/getMaxId", {
      method: "post",
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
    await fetch(Utils.resolvePath() + "api/InsertUserAndSadnaot", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        user: newUserParams,
        sadnaot: [userSadnaotParams],
        takanon: [values["phone"], values["takanon"]],
      }),
    }).then(
      (result) => {
        console.log("registeration succeussfull");
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log("error when fetching");
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
    await window.location.replace(paymentUrl);
  };

  /*rendering*/
  return (
    <div>
      <Modal
        visible={true}
        width={width <= 768 ? "100%" : "700"}
        height={width <= 768 ? "100%" : "700"}
      >
        <div className="Modal">
          <Header type="modal mobile" />
          <div className="regis_form">
            <Formik
              initialValues={values}
              validationSchema={ValidationSchema}
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
                        <OtherDetails
                          errors={errors}
                          touched={touched}
                          editMode={false}
                        />
                      </>
                    )}
                    {activeStep === 3 && (
                      <>
                        <div className="send_button">
                          <Button
                            variant="secondary"
                            size="lg"
                            disabled={isSubmitting}
                            onClick={(values, setSubmitting) =>
                              handleSubmit(values, setSubmitting)
                            }
                          >
                            שלח
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
