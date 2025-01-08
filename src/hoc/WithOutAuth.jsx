/* eslint-disable react/display-name */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* eslint-disable react-hooks/rules-of-hooks */
const WithOutAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
      if (token) {
        return navigate("/", { replace: true });
      }
    }, [token, navigate]);

    return token ? null : <WrappedComponent {...props} />;
  };
};

export default WithOutAuth;
