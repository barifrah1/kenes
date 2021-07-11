import React, { Component } from "react";
import "./other_details_form.css";
import Select, { Option, ReactSelectProps } from "react-select";
import { Formik, Form, Field, FieldProps } from "formik";
import RadioButtonsGroup from "../radio_buttons_group/radio_buttons_group";
import Checkbox from "@material-ui/core/Checkbox";
import { string } from "yup";

const OtherDetails = (props) => {
  const options = [
    { value: "1", label: "כן", id: 1 },
    { value: "0", label: "לא", id: 0 },
  ];

  const errors = props.errors;
  const touched = props.touched;

  return (
    <>
      <label>טבעוני :</label>
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
      {errors.vegan ? <div className="error_div">{errors.vegan}</div> : null}
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
            options={options}
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
                <>
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
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                </>
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
                <label>אני מאשר את תנאי התקנון</label>
                <Checkbox
                  checked={parseInt(form.values.takanon) === 1 ? true : false}
                  value={1}
                  onClick={(event) => {
                    form.setFieldValue(
                      field.name,
                      form.values.takanon === 1 ? 0 : 1
                    );
                  }}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </>
            )}
          />
          {errors.takanon ? (
            <div className="error_div">{errors.takanon}</div>
          ) : null}
        </>
      )}
      <hr />
    </>
  );
};

export default OtherDetails;
