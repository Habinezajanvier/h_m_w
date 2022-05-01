import { useStyles } from "./styles/buttons";

const ButtonsWrapper = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.buttons_wrapper}>{children}</div>;
};

export default ButtonsWrapper;
