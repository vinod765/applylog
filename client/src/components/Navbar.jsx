import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 shadow-sm">

      <Link
        to="/"
        className="text-3xl font-semibold tracking-tight text-gray-900"
      >
        Apply<span className="text-blue-600">Log</span>
      </Link>

      {user ? (
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-lg text-gray-500 hover:text-gray-900 transition-colors duration-150"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-lg px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <Link
            to="/sign-in"
            className="text-lg font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="text-lg px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-150">
            Get Started
          </Link>
        </div>
      )}

    </nav>
  )
}