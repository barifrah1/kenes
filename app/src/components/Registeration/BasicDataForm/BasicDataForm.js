import React from "react";
import Constants from "../../../Constants";
import Select from "react-select";
import { Field } from "formik";

const BasicDataForm = (props, value) => {
  const { errors, touched, rowData } = props;
  const { Option } = Select;
  // const onChangeField = (props, value) => {
  //   const { field, form } = props;
  //   form.setFieldValue(field.name, value);
  // };

  return (
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
            placeholder="רמת NLP"
            size="large"
            className="select_container"
            value={Constants.nlpLevelOptions ? field.value : ""}
            classNamePrefix="react_select"
            // value={

            // }
            onChange={(option) => form.setFieldValue(field.name, option)}
            onBlur={field.onBlur}
          >
            {Constants.nlpLevelOptions.map((option) => (
              <Option value={option.value}>{option.label}</Option>
            ))}
          </Select>
        )}
      />
      {errors.nlplevel ? (
        <div className="error_div">{errors.nlplevel}</div>
      ) : null}
      <hr />
      {rowData && (
        <>
          <label>קטגוריה: </label>
          <Field
            name="category"
            component={({ field, form }) => (
              <Select
                options={Constants.categoryOptions}
                className="select_container"
                classNamePrefix="react_select"
                value={
                  Constants.categoryOptions
                    ? Constants.categoryOptions.find(
                        (option) => option.value == field.value
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
        </>
      )}
      <label>אימייל :</label>
      <Field type="email" name="email" />
      {touched.email && errors.email ? (
        <div className="error_div">{errors.email}</div>
      ) : null}
      <hr />
      <label>סלולרי :</label>
      <Field type="text" name="phone" disabled={rowData ? true : false} />
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
  );
};
export default BasicDataForm;
