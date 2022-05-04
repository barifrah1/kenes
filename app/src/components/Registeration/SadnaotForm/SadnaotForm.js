import React from "react";
import "./SadnaotForm.less";
import Select from "react-select";
import { Field } from "formik";

const SadnaotForm = (props) => {
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
                      key={"s_rang" + round}
                      options={options}
                      className="select_container_sad"
                      classNamePrefix="react_select"
                      value={
                        options
                          ? options.find(
                              (option) => option.value === field.value
                            )
                          : ""
                      }
                      onChange={(option) =>
                        form.setFieldValue(field.name, option.value)
                      }
                      onBlur={field.onBlur}
                    />
                    <hr />
                  </>
                )}
              />
            }
          </>
        );
      })}
    </>
  );
};
export default SadnaotForm;
