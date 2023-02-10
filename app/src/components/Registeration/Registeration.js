import React from "react";
import { useState, useEffect, useMemo, useRef } from "react";
import { Formik, Form } from "formik";
import { Button } from "antd";
import "./Registeration.less";
import { Modal } from "antd";
import LinearStepper from "../SharedComponents/Stepper/Stepper";
import Header from "../Homepage/Header/Header";
import BasicDataForm from "./BasicDataForm/BasicDataForm";
import SadnaotForm from "./SadnaotForm/SadnaotForm";
import Swal from "sweetalert2";
import OtherDetails from "./OtherDetailsForm/OtherDetailsForm";
import Credit from "./Credit";
import { ValidationSchema, ValidationSchemaEdit } from "./ValidationSchema";
import useWindow from "../../hooks/useWindow";
import { fecthingPrices, getSadnaot } from "./RegisterationHelpers";
import useRegisteration from "../../hooks/useRegisteration";
import useLoading from "../../hooks/useLoading";
import { useHistory } from "react-router-dom";
function Registeration(props) {
  //state
  const [values, setValues] = useState({
    Fname: "",
    Lname: "",
    category: "",
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
  //hooks
  const formikRef = useRef();
  const { width } = useWindow();
  const { Loading, setLoading } = useLoading();
  const {
    isSubmitting,
    setSubmitting,
    handleSubmit,
    handleEditSubmit,
    initializeEditMode,
  } = useRegisteration();
  const history = useHistory();
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
  //side effects

  useEffect(() => {
    const getSadnaotAndPrices = async () => {
      const pricesRes = await fecthingPrices();
      const pricesObj = {};
      await pricesRes.map((row) => (pricesObj[row.name] = row));
      setPrices(pricesObj);
      const sadnaotResult = await getSadnaot(values);
      setValues(sadnaotResult.newVal);
      setSadnaot(sadnaotResult.sadnaByrangs);
    };
    getSadnaotAndPrices();
  }, []);

  //edit mode only
  useEffect(() => {
    if (props.rowData)
      initializeEditMode(props.rowData, formikRef, setValues, setFieldBystep);
  }, [props.rowData]);
  const modelHeight = width <= 768 ? "100% " : "700px";
  const modalStylePC = { position: "absolute", top: "5vh", left: "25%" };
  const modalStyleMobile = { position: "absolute", top: "8px", left: "8px" };
  const userSadnaot = useMemo(() => {
    const selectedSadnas = formikRef.current?.values?.userSadnaot
      ? Object.values(formikRef.current?.values?.userSadnaot)
      : undefined;
    console.log("cala");
    return selectedSadnas && selectedSadnas.length > 0
      ? sadnaot.map((sadnaotForRangeArray) =>
          sadnaotForRangeArray.filter((sad) => selectedSadnas.includes(sad.id))
        )
      : [];
  }, [activeStep]);
  return (
    <div className="main_container">
      <Modal
        visible={true}
        width={width <= 768 ? "100%" : "50%"}
        bodyStyle={{ height: modelHeight }}
        style={width < 768 ? modalStyleMobile : modalStylePC}
        footer={<div></div>}
        // confirmLoading={confirmLoading}
        onCancel={() => props.onClose() /*history.push("/")*/}
        className="modal_container"
      >
        <div className="modal_container">
          <Header type="modal mobile" />
          <div className="regis_form">
            <Formik
              innerRef={formikRef}
              initialValues={props.rowData ? props.rowData : values}
              validationSchema={
                props.rowData ? ValidationSchemaEdit : ValidationSchema
              }
              onSubmit={props.rowData ? handleEditSubmit : handleSubmit}
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
                      <BasicDataForm
                        errors={errors}
                        touched={touched}
                        rowData={props.rowData}
                      />
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
                          editMode={props.rowData ? true : false}
                        />
                      </>
                    )}
                    {activeStep === 3 && (
                      <>
                        <div className="send_button">
                          <div className="loading">
                            <Loading />
                          </div>
                          <div className="header_sadnaot">
                            בחרת להירשם לסדנאות הבאות:
                          </div>
                          <div className="chosen_sadnas">
                            <span className="sadna_row">
                              <span className="label_row">סדנה 1: </span>
                              <span>{userSadnaot[0][0]["descr"]}</span>
                            </span>
                            <span className="sadna_row">
                              <span className="label_row">סדנה 2:</span>
                              <span>{userSadnaot[1][0]["descr"]}</span>
                            </span>
                            <span className="sadna_row">
                              <span className="label_row">סדנה 3:</span>
                              <span>{userSadnaot[2][0]["descr"]}</span>
                            </span>
                          </div>
                          <Button
                            className="=send_button"
                            type="primary"
                            size="large"
                            disabled={isSubmitting}
                            onClick={async (e) => {
                              setLoading(true);
                              if (props.rowData) {
                                const callbacks = {
                                  setSubmitting,
                                  setActiveStep,
                                  handleEdit: props.handleEdit,
                                  onClose: props.onClose,
                                };
                                await handleEditSubmit(
                                  values,
                                  props.rowData,
                                  callbacks
                                );
                              } else await handleSubmit(values, prices);
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
      <Credit />
    </div>
  );
}

export default Registeration;
