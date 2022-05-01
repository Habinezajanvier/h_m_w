import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "../../../assets/styles/components/agencyFlows.scss";
import { TextField } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "371px",
    minHeight: "87px",
    background: "#1C1D22",
    borderRadius: "10px",
    fontWe0ight: "400",
    fontSize: "12px",
    lineHeight: "20px",
    color: "red !important",
    borderBottom: "none",
  },
}));

const OtherReasonBOx = () => {
  const classes = useStyles();
  return (
    <TextField
      hiddenLabel
      id="filled-hidden-label-normal"
      variant="filled"
      className={classes.textField}
      multiline
      maxRows={5}
      placeholder="Mention your reason for rejection here"
    />
  );
};

const RejectionReasonForm = () => {
  const [showOther, setShowOther] = React.useState(false);

  return (
    <FormControl className="rejection-reason-form">
      <FormLabel id="demo-radio-buttons-group-label" className="form-title">
        Select reason for your rejection
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Documents incorrect"
        name="radio-buttons-group"
        className="form-content"
      >
        <FormControlLabel
          value="Documents incorrect"
          control={
            <Radio
              sx={{
                "&, &.Mui-checked": {
                  color: "#018F6A",
                },
              }}
              onChange={() => setShowOther(false)}
            />
          }
          label="Documents incorrect"
        />
        <FormControlLabel
          value="Wrong mode of transport"
          control={
            <Radio
              sx={{
                "&, &.Mui-checked": {
                  color: "#018F6A",
                },
              }}
              onChange={() => setShowOther(false)}
            />
          }
          label="Wrong mode of transport"
        />
        <FormControlLabel
          value="Rejection from other agency"
          control={
            <Radio
              sx={{
                "&, &.Mui-checked": {
                  color: "#018F6A",
                },
              }}
              onChange={() => setShowOther(false)}
            />
          }
          label="Rejection from other agency"
        />
        <FormControlLabel
          value="Wrong product information"
          control={
            <Radio
              sx={{
                "&, &.Mui-checked": {
                  color: "#018F6A",
                },
              }}
              onChange={() => setShowOther(false)}
            />
          }
          label="Wrong product information"
        />
        <FormControlLabel
          value="Other"
          control={
            <Radio
              onChange={() => setShowOther(true)}
              sx={{
                "&, &.Mui-checked": {
                  color: "#018F6A",
                },
              }}
            />
          }
          label="Other"
        />
      </RadioGroup>
      {showOther && <OtherReasonBOx />}
    </FormControl>
  );
};

export default RejectionReasonForm;
