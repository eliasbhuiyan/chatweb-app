import { Link } from 'react-router-dom'
import '../styles/Auth.css'

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Chat App</h1>
        <h2>Register</h2>
        
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
            />
          </div>
            <button 
              type="button" 
              className="auth-button"
            >
              Register
            </button>
        </form>
        
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register 