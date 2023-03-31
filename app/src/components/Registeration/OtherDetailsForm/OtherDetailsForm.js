import React, { useState } from "react";
import "./OtherDetailsForm.less";
import Select from "react-select";
import { Field } from "formik";
import RadioButtonsGroup from "../../SharedComponents/RadioButtonsGroup/RadioButtonsGroup";
import { Checkbox } from "antd";
import Takanon from "../Takanon/Takanon";

const OtherDetails = (props) => {
  const options = [
    { value: "1", label: "פרונטלי", id: 1 },
    { value: "0", label: "זום", id: 0 },
  ];
  const optionsPhotos = [
    { value: "1", label: "כן", id: 1 },
    { value: "0", label: "לא", id: 0 },
  ];
  const [open, setOpen] = useState(false); //for takanon
  const errors = props.errors;
  const touched = props.touched;

  return (
    <div className="other_details">
      <label>מסלול :</label>
      <Field
        name="vegan"
        component={({ field, form }) => (
          <Select
            options={options}
            className="select_container"
            classNamePrefix="react_select"
            value={
              options
                ? options.find((option) => option.value === field.value)
                : ""
            }
            onChange={(option) => form.setFieldValue(field.name, option.value)}
            onBlur={field.onBlur}
          />
        )}
      />
      {touched.vegan && errors.vegan ? (
        <div className="error_div">{errors.vegan}</div>
      ) : null}
      <hr />
      <label>כיצד הגעת אלינו : </label>
      <Field type="text" name="way" />
      {touched.way && errors.way ? (
        <div className="error_div">{errors.way}</div>
      ) : null}
      <hr />
      <Field
        name="photos"
        component={({ field, form }) => (
          <RadioButtonsGroup
            name="photos"
            label="האם אתה מעוניין להצטלם?"
            options={optionsPhotos}
            onChange={(event) => {
              form.setFieldValue(field.name, event.target.value);
            }}
            value={form.values.photos}
          />
        )}
      />
      <hr />
      {props.editMode === true && (
        <>
          <>
            <Field
              name="payment"
              component={({ field, form }) => (
                <div className="payment_row">
                  <label className="invAndSumLabel">תשלום :</label>
                  <Checkbox
                    checked={parseInt(form.values.payment) === 1 ? true : false}
                    value={1}
                    onClick={(event) => {
                      form.setFieldValue(
                        field.name,
                        form.values.payment === 1 ? 0 : 1
                      );
                    }}
                  />
                </div>
              )}
            />
          </>
          <hr />
          <label className="invAndSumLabel">חשבונית : </label>
          <Field type="text" name="inv" className="invAndSum" />
          {touched.inv && errors.inv ? (
            <div className="error_div">{errors.inv}</div>
          ) : null}
          <label className="invAndSumLabel"> סכום ששולם :</label>
          <Field type="text" name="sum" className="invAndSum" />
          {touched.sum && errors.sum ? (
            <div className="error_div">{errors.sum}</div>
          ) : null}
        </>
      )}
      {props.editMode === false && (
        <>
          <Field
            name="takanon"
            component={({ field, form }) => (
              <>
                <div className="takanon_row">
                  <label>
                    <span>אני מאשר את תנאי </span>
                    <span>
                      <a
                        href="/"
                        onClick={(event) => {
                          event.preventDefault();
                          setOpen(true);
                        }}
                      >
                        התקנון
                      </a>
                    </span>
                  </label>
                  <span className="takanon_checkbox">
                    <Checkbox
                      checked={
                        parseInt(form.values.takanon) === 1 ? true : false
                      }
                      value={1}
                      onClick={(event) => {
                        form.setFieldValue(
                          field.name,
                          form.values.takanon === 1 ? 0 : 1
                        );
                      }}
                    />
                  </span>
                </div>
                {open && (
                  <Takanon
                    prices={props.prices}
                    open={open}
                    setOpen={setOpen}
                  />
                )}
              </>
            )}
          />

          {errors.takanon ? (
            <div className="error_div">{errors.takanon}</div>
          ) : null}
        </>
      )}
      <hr />
    </div>
  );
};

export default OtherDetails;
