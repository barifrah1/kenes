import React from "react";
import { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import "./Registeration.css";
import Modal from "react-awesome-modal";
import LinearStepper from "../stepper/stepper";
import Header from "../header/header";
import Select from "react-select";
import SadnaotForm from "./SadnaotForm/SadnaotForm";
import Swal from "sweetalert2";
import OtherDetails from "./OtherDetailsForm/OtherDetailsForm";
import SendIcon from "@material-ui/icons/Send";
import Utils from "../../Utils";
import ValidationSchema from "./ValidationSchema";
import useWindow from "../useWindow/useWindow";
import AsyncAjax from "../../AsyncAjax";
import Constants from "../../Constants";
import {
  fetchingPhones,
  fecthingPrices,
  getSadnaot,
  handleSubmit,
} from "./RegisterationHelpers";
import useLoading from "../useLoading/useLoading";
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
  /*list of fields by step used for validation part and for stepping logic*/
  const [fieldsByStep, setFieldBystep] = useState([
    ["Fname", "Lname", "nlplevel", "email", "phone", "city"],
    ["userSadnaot"],
    ["vegan", "way", "photos", "takanon"],
  ]);
  const [prices, setPrices] = useState({
    early: "",
    regular: "",
    cancel: "",
  });
  const [phones, setPhones] = useState([]);
  const { height, width } = useWindow();
  const { Loading, setLoading } = useLoading();
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

  useEffect(() => {
    //isSubmitting ? setLoading(true) : setLoading(false);
  }, isSubmitting);

  useEffect(async () => {
    const res = await fetchingPhones();

    setPhones(res);
    const pricesRes = await fecthingPrices();
    const pricesObj = {};
    await pricesRes.map((row) => (pricesObj[row.name] = row));
    setPrices(pricesObj);
    const sadnaotResult = await getSadnaot(values);
    setValues(sadnaotResult.newVal);
    setSadnaot(sadnaotResult.sadnaByrangs);
  }, []);

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
                              options={Constants.nlpLevelOptions}
                              className="select_container"
                              classNamePrefix="react_select"
                              value={
                                Constants.nlpLevelOptions
                                  ? Constants.nlpLevelOptions.find(
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
                          prices={prices}
                          errors={errors}
                          touched={touched}
                          editMode={false}
                        />
                      </>
                    )}
                    {activeStep === 3 && (
                      <>
                        <div className="send_button">
                          {/* <div className="loading">
                            <Loading />
                          </div> */}
                          <Button
                            variant="secondary"
                            size="lg"
                            disabled={isSubmitting}
                            onClick={(values) => {
                              setLoading(true);
                              handleSubmit(values, prices, setSubmitting);
                            }}
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
