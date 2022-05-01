import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStyles } from "./styles/simpleSelectorStyles";
import "../../../assets/styles/components/flowDialog.scss";

export default function SimpleSelectorInput({ label, options, className }) {
  const classes = useStyles();

  const menuProps = {
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
    disableScrollLock: true,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    getContentAnchorEl: null,
  };

  const [option, setOption] = React.useState(
    (options.length && options[0].value) || "value"
  );

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ minWidth: 100 }}
      className="selector-input-form"
    >
      <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={option}
        onChange={handleChange}
        label={label}
        className={className}
        disableUnderline
        MenuProps={menuProps}
        classes={{
          select: classes.select,
          icon: classes.selectIcon,
        }}
      >
        <MenuItem disabled value="" className="select-header">
          {options[0]?.value}
        </MenuItem>
        {options.map(({ label, value }) => (
          <MenuItem
            value={value}
            className="selector-content"
            aria-label={label}
          >
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
