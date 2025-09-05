import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "@/store/authSlice";
import { clearSystem } from "@/store/systemSlice";

export const useAppContext = () => {
  const auth = useSelector((state) => state.auth);
  const system = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      dispatch(clearAuth());
      dispatch(clearSystem());
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [auth.token, dispatch, navigate]);

  return {
    token: auth.token,
    user: auth.user,
    system_id: system.system_id,
  };
};
