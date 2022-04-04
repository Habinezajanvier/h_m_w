import React, { Suspense } from "react"
import LinearProgress from "@mui/material/LinearProgress"

const styles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: 2,
  zIndex: 9999,
  backgroundColor: "rgb(255, 255, 255, 0.4)",
}
const withSuspense = BaseComponent => props =>
  (
    <Suspense fallback={<LinearProgress color="secondary" style={styles} />}>
      <BaseComponent {...props} />
    </Suspense>
  )

export default withSuspense
