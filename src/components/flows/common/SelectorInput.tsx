import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStyles } from "./styles/selectorStyles";
import "../../../assets/styles/components/flowDialog.scss";

export default function SelectorInput({ label, options, className }) {
  const classes = useStyles();

  const menuProps = {
    classes: {
      list: classes.list,
      paper: classes.paper,
    },
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
    (options?.length && options[0].value) || ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };

  return (
    <FormControl
      variant="standard"
      sx={{ minWidth: 320 }}
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
        MenuProps={menuProps}
        classes={{
          select: classes.select,
          icon: classes.selectIcon,
        }}
      >
        <MenuItem disabled value="" className="select-header">
          <h1>E-way Bill No.</h1>
          <h1>Valid From</h1>
          <h1>Delivery Loc</h1>
        </MenuItem>
        {options.map(({ label, value, valid_from, delivery_loc }) => (
          <MenuItem
            value={value}
            className="selector-content"
            key={Math.random()}
          >
            <h1 className="bill-number">{value}</h1>
            <h1 className="bill-valid">{valid_from}</h1>
            <h1 className="bill-deliv">{delivery_loc}</h1>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
