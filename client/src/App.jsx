// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Home      from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import SignIn    from "./pages/SignIn"
import SignUp    from "./pages/SignUp"
import Navbar    from "./components/Navbar"

// Redirects to /sign-in if user is not logged in
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/sign-in" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"          element={<><Navbar /><Home /></>} />
          <Route path="/sign-in"   element={<SignIn />} />
          <Route path="/sign-up"   element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}