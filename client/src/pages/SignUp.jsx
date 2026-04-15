import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { signUp } from "../api/auth"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    try {
      const { user, token } = await signUp(name, email, password)
      login(user, token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#f5f4f0" }}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 p-14 flex flex-col gap-8">
        
        <Link to="/" className="w-fit">
          <span className="text-3xl font-bold text-gray-900">
            Apply<span className="text-blue-600">Log</span>
          </span>
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
            Get started.
          </h1>
          <p className="text-base text-gray-500">
            Create your account and start tracking applications today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Jane Smith"
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Confirm password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors w-full"
            />
            {confirmPassword.length > 0 && (
              <p className={`text-xs mt-1 ${
                password === confirmPassword ? "text-green-600" : "text-red-400"
              }`}>
                {password === confirmPassword ? "✓ Passwords match" : "Passwords don't match yet"}
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 text-base rounded-xl mt-1"
          >
            {loading ? "Creating account..." : "Create account →"}
          </Button>

        </form>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-gray-900 font-medium hover:underline">
            Sign in →
          </Link>
        </p>

      </div>
    </div>
  )
}