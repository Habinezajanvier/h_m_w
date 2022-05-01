import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  pointer: {
    cursor: "pointer",
  },
  dialog_content_wrapper: {
    color: "rgba(228, 228, 231, 0.6)",
    minHeight: "749px",
    paddingTop: "1.5%",
    "-ms-overflow-style": "none",
    scrollbarWidth: "none",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none !important",
    },
  },
  dialog_title: {
    fontStyle: "normal",
    fontweight: 700,
    fontSize: "20px",
    lineHeight: "30px",
    color: "rgba(255, 255, 255, 0.8)",
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
