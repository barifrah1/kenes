import React, { useState } from "react";

const useStep = (props) => {
  const [skipped, setSkipped] = useState(new Set());
  const { updateActiveStep } = props;
  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(props.activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(props.activeStep);
    }
    updateActiveStep(
      props.activeStep,
      1,
      props.form_errors,
      props.touched_form
    );
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    updateActiveStep(
      props.activeStep,
      -1,
      props.form_errors,
      props.touched_form
    );
  };

  const handleSkip = () => {
    if (!isStepOptional(props.activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("לא ניתן לדלג על שלב");
    }

    updateActiveStep(
      props.activeStep,
      1,
      props.form_errors,
      props.touched_form
    );
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(props.activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    updateActiveStep(0, 0, {}, {});
  };

  return {
    handleNext,
    handleBack,
    handleReset,
    handleSkip,
    isStepOptional,
  };
};
export default useStep;
