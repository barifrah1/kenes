import React from "react";
import "./SadnaotForm.less";
import Select from "react-select";
import { Field } from "formik";

const SadnaotForm = (props) => {
  let giftsOptions = props.giftsOptions.map((gift) => {
    return { value: gift.id, label: gift.descr };
  });
  return (
    <>
      {props.sadnaotData.map((rangData) => {
        let options = rangData.map((sad) => {
          return { value: sad.id, label: sad.descr };
        });
        let round = rangData[0].rang;
        return (
          <>
            <label>{"סדנה סבב - " + round}</label>
            {
              <Field
                name={"userSadnaot.f_rang" + round}
                key={"f_rang" + round}
                component={({ field, form }) => (
                  <>
                    <Select
                      id={"userSadnaot.f_rang" + round}
                      name={"userSadnaot.f_rang" + round}
                      key={"s_rang" + round}
                      options={options}
                      className="select_container_sad"
                      classNamePrefix="react_select"
                      isSearchable={false}
                      value={
                        options
                          ? options.find(
                              (option) => option.value === field.value
                            )
                          : ""
                      }
                      onChange={(option) => {
                        form.setFieldValue(field.name, option.value);
                      }}
                      onBlur={(e) => {
                        props.touched[field.name] = true;
                      }}
                      // onBlur={field.onBlur}
                    />
                    <hr />
                    {field.name in props.touched &&
                    props.touched[field.name] &&
                    props.errors.userSadnaot ? (
                      props.errors.userSadnaot["f_rang" + round]
                    ) : undefined ? (
                      <div className="error_div">
                        {props.errors.userSadnaot["f_rang" + round]}
                      </div>
                    ) : null}
                  </>
                )}
              />
            }
          </>
        );
      })}
      <>
        <label>מתנה לבחירה</label>
        {
          <Field
            name="gift"
            key={"gift"}
            component={({ field, form }) => (
              <>
                <Select
                  id={"gift"}
                  name={"gift"}
                  key={"gift"}
                  options={giftsOptions}
                  className="select_container_sad"
                  classNamePrefix="react_select"
                  isSearchable={false}
                  value={
                    giftsOptions
                      ? giftsOptions.find(
                          (option) => option.value === field.value
                        )
                      : ""
                  }
                  onChange={(option) => {
                    form.setFieldValue(field.name, option.value);
                  }}
                  onBlur={(e) => {
                    props.touched[field.name] = true;
                  }}
                  // onBlur={field.onBlur}
                />
                <hr />
                {field.name in props.touched &&
                props.touched[field.name] &&
                props.errors["gift"] ? (
                  <div className="error_div">{props.errors.gift}</div>
                ) : null}
              </>
            )}
          />
        }
      </>
    </>
  );
};
export default SadnaotForm;
