import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Auth.css";
import { useState } from "react";
import { authServices } from "../services/api";
import { useSelector } from "react-redux";
function Register() {
  const user = useSelector((state) => state.authSlice.user);
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handelReg = async (e) => {
    e.preventDefault();
    try {
      const res = await authServices.registration(regData);
      toast.success(res.success);
      setTimeout(() => {
        navigate(`/verify-otp/${regData.email}`);
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
   if (user) {
    return <Navigate to="/chat" replace />;
  }
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
        <h2>Register</h2>

        <form onSubmit={handelReg}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              onChange={(e) =>
                setRegData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              type="text"
              id="fullName"
              placeholder="Enter your full name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
