import React, { useEffect, useState } from "react";
import "../assets/styles/components/selectableInput.scss";
import indflag from "../assets/images/indiaFlag.png";
import usflag from "../assets/images/us-flag.png";
import ukflag from "../assets/images/uk-flag.png";
import polandflag from "../assets/images/poland.svg";
import turkeyflag from "../assets/images/turkey-flag.png";
import frenchflag from "../assets/images/french-flag.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PropTypes from "prop-types";

const countryCode_flag = {
  "+91": indflag,
  "+41": usflag,
  "+44": ukflag,
  "+48": polandflag,
  "+90": turkeyflag,
  "+689": frenchflag,
};

const SelectableInput = ({
  placeholder,
  type,
  maxLength,
  getValue,
  withSelectable,
  selectIcon,
  errText,
  inputValue,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("+91");

  useEffect(() => {
    getValue({ value, selectedValue });
  }, [value, selectedValue]);

  useEffect(() => {
    inputValue && setValue(inputValue);
  }, [inputValue]);

  return (
    <div className="sInputContainer">
      <div className="sInput">
        <div className="select">
          <div
            className="selectedValue"
            onClick={() => setShowOptions(!showOptions)}
          >
            {selectIcon ? (
              <img src={selectIcon ? selectIcon : indflag} alt="country flag" />
            ) : (
              <img src={countryCode_flag[selectedValue] } alt="country flag" />
            )}
            {withSelectable && <ArrowDropDownIcon className="gray-200" />}
          </div>
          {showOptions && withSelectable && (
            <ul className="selectOptions">
              <li
                className="flex items-center"
                onClick={() => {
                  setShowOptions(false);
                  setSelectedValue("+91");
                }}
              >
                <div>
                  <img src={indflag} alt="country flag" />
                </div>
                <div>India</div>
                <div>+91</div>
              </li>

              <li
                className="flex items-center"
                onClick={() => {
                  setShowOptions(false);
                  setSelectedValue("+44");
                }}
              >
                <div>
                  <img src={ukflag} alt="country flag" />
                </div>
                <div>United kingdom</div>
                <div>+44</div>
              </li>

              <li
                className="flex items-center"
                onClick={() => {
                  setShowOptions(false);
                  setSelectedValue("+48");
                }}
              >
                <div>
                  <img src={polandflag} alt="country flag" />
                </div>
                <div>Poland</div>
                <div>+48</div>
              </li>
              <li
                className="flex items-center"
                onClick={() => {
                  setShowOptions(false);
                  setSelectedValue("+90");
                }}
              >
                <div>
                  <img src={turkeyflag} alt="country flag" />
                </div>
                <div>Turkey</div>
                <div>+90</div>
              </li>
              <li
                className="flex items-center"
                onClick={() => {
                  setShowOptions(false);
                  setSelectedValue("+41");
                }}
              >
                <div>
                  <img src={usflag} alt="country flag" />
                </div>
                <div>United States</div>
                <div>+41</div>
              </li>
              <li
                className="flex items-center"
                onClick={() => {
                  setShowOptions(false);
                  setSelectedValue("+689");
                }}
              >
                <div>
                  <img src={frenchflag} alt="country flag" />
                </div>
                <div>French polynesias</div>
                <div>+689</div>
              </li>
            </ul>
          )}
        </div>
        <div className="inputBox">
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => {
              type === "number"
                ? setValue(e.target.value.replace(/\D/g, ""))
                : setValue(e.target.value);
            }}
          />
        </div>
      </div>
      {errText && <div className="sInputErrLabel">{errText}</div>}
    </div>
  );
};

export default SelectableInput;

SelectableInput.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  getValue: PropTypes.func.isRequired,
  withSelectable: PropTypes.bool,
  selectIcon: PropTypes.string,
  errText: PropTypes.string,
};

SelectableInput.defaultProps = {
  placeholder: "",
  type: "text",
  maxLength: 100,
  withSelectable: true,
  errText: "",
};
