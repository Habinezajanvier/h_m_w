import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  dialog_title_container: {
    display: "flex",
    flex: "auto",
    gap: "14px",
    paddingLeft: "3.5%",
    transition: "ease-in-out .5s",
    backgroundColor: "#22242C",
  },
  closeIcon: {
    marginTop: "32px !important",
    marginRight: "43px !important",
    zIndex: 99,
    border: "2px solid red",
  },
  title_container: {
    display: "flex",
    gap: "25px",
  },
  submit_title_container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    gap: "25px",
  },
  submit_title: {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "Source Sans Pro",
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "30px",
  },
});
