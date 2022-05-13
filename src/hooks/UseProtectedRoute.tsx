/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/levelDB";

const useProtectedRoute = (Component: FC) => (props: any) => {
  const [token, setToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    db.get("logintoken")
      .then(() => {
        setToken(true);
      })
      .catch((error) => {
        setToken(false);
      });
  }, [token]);

  if (!token) {
    navigate("../", { replace: true });
  }

  return <Component {...props} />;
};

export default useProtectedRoute;
