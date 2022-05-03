import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  select: {
    fontWeight: 400,
    fontSize: "16px",
    lineheight: "20px",
    color: "rgba(228, 228, 231, 0.4)",
    "&:focus": {
      backgroundColor: "#14161f",
    },
  },
  selectIcon: {
    position: "relative",
    color: "#e4e4e733 !important",
    fontSize: "24px",
  },
  paper: { borderRadius: 6, marginTop: 8 },
  list: {
    background: "#222431",
    width: "auto",
    height: "auto",
    "-ms-overflow-style": "none !important",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none !important",
    },
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      paddingTop: 8,
      paddingBottom: 8,
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "20px",
      color: "rgba(255, 255, 255, 0.8)",
    },
    "& li.Mui-selected": {
      color: "white",
      background: "rgba(1, 143, 106, 0.85)",
    },
  },
}));
