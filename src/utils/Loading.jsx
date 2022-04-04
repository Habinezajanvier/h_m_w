import React from "react"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

//  backdrop: {
//   zIndex: theme.zIndex.drawer + 1,
// }

export default function Loading() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}
