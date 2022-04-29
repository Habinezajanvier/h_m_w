import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  menuItem: {
    display: "flex",
  },
  formControl: {
    "& .MuiInputBase-root": {
      color: "#6EC177",
      borderColor: "#6EC177",
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "6px",
      minWidth: "120px",
      justifyContent: "center",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      paddingRight: "0px",
    },
  },
  select: {
    width: "100%",
    fontSize: "12px",

    "&:focus": {
      backgroundColor: "#222431",
    },
  },
  selectIcon: {
    position: "relative",
    color: "rgba(228, 228, 231, 0.2)",
    fontSize: "24px",
  },
  paper: {
    borderRadius: 6,
    marginTop: 8,
  },
  list: {
    backgroundColor: " #222431",
    paddingTop: 0,
    paddingBottom: 0,
    "& li": {
      fontWeight: 200,
      paddingTop: 8,
      paddingBottom: 8,
      fontSize: "12px",
      color: "white",
    },
    "& li.Mui-selected": {
      color: "white",
      background: "rgba(1, 143, 106, 0.85)",
    },
    "& li.Mui-selected:hover": {
      background: "rgba(1, 143, 106, 0.85)",
    },
  },
}));
