import React from "react";
import { Radio } from "antd";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";

const RadioButtonsGroup = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    // <FormControl component="fieldset">
    //   <FormLabel component="legend">{props.label}</FormLabel>
    //   <RadioGroup
    //     aria-label={props.name}
    //     name={props.name}
    //     value={props.value}
    //     onChange={props.onChange}
    //   >
    //     {props.options.map((option) => (
    //       <FormControlLabel
    //         value={option.value}
    //         control={<Radio />}
    //         label={option.label}
    //       />
    //     ))}
    //   </RadioGroup>
    // </FormControl>
    <>
      <label>{props.label}</label>
      <Radio.Group
        name={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        {props.options.map((option, index) => (
          <Radio
            key={"keyOfRadio" + option.label + String(index)}
            value={option.value}
          >
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    </>
  );
};

export default RadioButtonsGroup;
