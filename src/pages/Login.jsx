import { Link } from 'react-router-dom'
import '../styles/Auth.css'

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Chat App</h1>
        <h2>Login</h2>
        
        <form>
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
              placeholder="Enter your password"
            />
          </div>
          
            <button 
              type="button" 
              className="auth-button"
            >
              Login
            </button>
        </form>
        
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login 