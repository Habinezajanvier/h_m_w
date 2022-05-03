import { FC } from "react";
import {
  buildStyles,
  CircularProgressbar as ProgressBar,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface progressProps {
  value: number;
  className: string;
}

const CircularProgressbar: FC<progressProps> = ({ value, className }) => {
  return (
    <ProgressBar
      value={value}
      text={`${value}%`}
      className={className}
      styles={buildStyles({
        rotation: 0,
        strokeLinecap: "butt",
        textSize: "16px",
        pathTransitionDuration: 0.5,
        pathColor: "rgba(1, 143, 106, 0.85)",
        textColor: "white",
        trailColor: "rgba(255, 255, 255, 0.8)",
        backgroundColor: "#3e98c7",
      })}
    />
  );
};

export default CircularProgressbar;
