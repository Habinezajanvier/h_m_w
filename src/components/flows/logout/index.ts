import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  logout_btn: {
    width: "130px !important",
    height: "36px !important",
    background: "#b73052 !important",
    borderRadius: "4px",
  },
  logout_container: {
    display: "flex",
    alignItems: "center",
    height: "150px",
    flexDirection: "column",
    gap: "35px",
    marginTop: "1.5rem",
  },
  text: {
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "20px",
    letterSpacing: "-0.015em",
    color: "rgba(228, 228, 231, 0.8)",
  },
});
