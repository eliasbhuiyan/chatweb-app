import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { useState } from "react";
import { authServices } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { loggedUser } from "../store/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    email: "",
    password: "",
  });

  const handelLog = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.loginUser(regData);
      toast.success(res.success);
      dispatch(loggedUser(res.user));      
      setTimeout(() => {
        navigate(`/chat`);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="auth-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        rtl={false}
        theme="dark"
      />
      <div className="auth-card">
        <h1>Chat App</h1>
        <h2>Login</h2>

        <form onSubmit={handelLog}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) =>
                setRegData((prev) => ({ ...prev, email: e.target.value }))
              }
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setRegData((prev) => ({ ...prev, password: e.target.value }))
              }
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
