import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { profileThunk } from "./services/auth-thunks";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const load = async () => {
      const { payload } = await dispatch(profileThunk(token));
      if (!payload) {
        navigate("/login");
      }
      setLoading(false);
    };
    load();
  }, []);
  return <div className={`${loading ? "d-none" : ""}`}>{children}</div>;
}

export default ProtectedRoute;
