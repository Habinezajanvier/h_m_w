import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import indoorIcon from "../../../assets/images/devices/indoor.svg";
import outdoorIcon from "../../../assets/images/devices/outdoor.svg";
import "../../../assets/styles/components/addDevice.scss";

const IndoorOutDoorChoose = () => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="female"
          sx={{
            color: "white",
          }}
          control={
            <Radio
              sx={{
                "&, &.Mui-checked": {
                  color: "#018F6A",
                },
              }}
            />
          }
          label={
            <div className="indoor-outdoor-label">
              <img src={indoorIcon} alt="" />
              <span>Indoor</span>
            </div>
          }
        />
        <FormControlLabel
          value="male"
          control={<Radio />}
          label={
            <div className="indoor-outdoor-label">
              <img src={outdoorIcon} alt="" />
              <span>Outdoor</span>
            </div>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default IndoorOutDoorChoose;
