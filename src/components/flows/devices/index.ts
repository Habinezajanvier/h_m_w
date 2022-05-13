import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  brands_container: {
    display: "flex",
    alignItems: "center",
    height: "150px",
    flexDirection: "column",
    gap: "35px",
    padding: "20px",
  },
  brands_text: {
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "20px",
    color: "rgba(228, 228, 231, 0.6)",
  },
});
