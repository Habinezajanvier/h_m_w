import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStyles } from "./styles/selectorStyles";
import "../../../assets/styles/components/flowDialog.scss";

interface selectorProps {
  label: string;
  options: Array<{
    label: string;
    validfrom: string;
    valid: string;
    toLocation: string;
    toDid: string;
    ewayBillNumber: string;
  }>;
  className: string;
  isLoading: boolean;
  onChange: () => void;
}

const SelectorInput: React.FC<selectorProps> = ({
  label,
  options,
  className,
  isLoading,
  onChange,
}) => {
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
    (options?.length && options[0].ewayBillNumber) || ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
    onChange();
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
        disabled={isLoading}
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
        {options?.map(({ label, ewayBillNumber, validfrom, toLocation }) => (
          <MenuItem
            value={ewayBillNumber}
            className="selector-content"
            key={Math.random()}
            onClick={() => console.log()}
          >
            <h1 className="bill-number">{ewayBillNumber}</h1>
            <h1 className="bill-valid">{validfrom}</h1>
            <h1 className="bill-deliv">{toLocation}</h1>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectorInput;
