import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./stepper.css";

const theme2 = createMuiTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#C281FF",
      light: purple[200],
      dark: purple[400],
    },
    secondary: {
      main: "#C281FF",
    },
  },
  typography: {
    fontFamily: '"Open Sans Hebrew", "serif"',
  },
});

const useStyles = makeStyles((theme2) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme2.spacing(1),
  },
  instructions: {
    marginTop: theme2.spacing(1),
    marginBottom: theme2.spacing(1),
  },
}));

function getSteps() {
  return ["פרטים אישיים", "בחירת סדנאות", "פרטים אחרונים ותשלום"];
}
function getStepContent(step) {
  switch (step) {
    case 0:
      return "השלם את הפרטים האישיים";
    case 1:
      return "בחר ממבחר הסדנאות שלנו...";
    case 2:
      return "כמעט סיימנו";
    default:
      return "";
  }
}

const LinearStepper = (props) => {
  const classes = useStyles();
  //const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const updateActiveStep = props.updateActiveStep;
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

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme2}>
        <Stepper activeStep={props.activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">אופציונלי</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div className="buttuns_instr">
          {props.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                כל השלבים הסתיימו - נותר רק לשלם!
              </Typography>
              <Button onClick={handleReset} className={classes.button}>
                נקה
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(props.activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={props.activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  חזור
                </Button>
                {isStepOptional(props.activeStep) && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    דלג
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button + { float: "left" }}
                >
                  {props.activeStep === steps.length - 1 ? "סיום" : "הבא"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default LinearStepper;
