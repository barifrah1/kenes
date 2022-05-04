import React from "react";
import "./Stepper.less";
import { Steps, Button } from "antd";
import useStep from "./useStep";
import Constants from "../../../Constants";

const LinearStepper = (props) => {
  const { Step } = Steps;
  const formSteps = Constants.formSteps;
  const {
    handleNext,
    handleBack,
    handleReset,
    handleSkip,
    isStepOptional,
  } = useStep(props);

  return (
    <>
      <Steps size="small" current={props.activeStep}>
        {formSteps.map((s) => (
          <Step key={s.title} title={s.title} />
        ))}
      </Steps>
      <div className="buttuns_instr">
        {props.activeStep === formSteps.length ? (
          <div>
            כל השלבים הסתיימו - נותר רק לשלם!
            <Button className="clean_button" onClick={handleReset}>
              נקה
            </Button>
          </div>
        ) : (
          <div>
            {formSteps[props.activeStep].content}
            <div>
              <Button disabled={props.activeStep === 0} onClick={handleBack}>
                הקודם
              </Button>
              {isStepOptional(props.activeStep) && (
                <Button onClick={handleSkip}>דלג</Button>
              )}
              <Button
                type="primary"
                className="next_button"
                onClick={handleNext}
              >
                {props.activeStep === formSteps.length - 1 ? "סיום" : "הבא"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LinearStepper;
