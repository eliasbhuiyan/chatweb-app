import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import "./App.css";
import OtpVerify from "./pages/OtpVerify";
import Layout from "./components/Layout";
import UserProfile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp/:email" element={<OtpVerify />} />
        <Route path="/chat" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="/chat/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
