import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import './App.css'

function App() {
  // Static user data for design purposes
  const mockUser = {
    id: 'user123',
    name: 'John Doe',
    email: 'john@example.com'
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat user={mockUser} />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
