import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "@/components/ui/button"
import { signIn } from "../api/auth"

export default function SignIn() {
  const [email,    setEmail]    = useState("")
  const [password, setPassword] = useState("")
  const [error,    setError]    = useState("")
  const [loading,  setLoading]  = useState(false)

  const { login }  = useAuth()
  const navigate   = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const { user, token } = await signIn(email, password)
      login(user, token)
      navigate("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "#f5f4f0" }}
    >
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 p-14 flex flex-col gap-8">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            {/* TODO: replace with actual logo/icon from public/favicon.svg */}
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-3xl font-bold text-gray-900">
            Apply<span className="text-blue-600">Log</span>
          </span>
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
            Welcome back.
          </h1>
          <p className="text-base text-gray-500">
            Good to see you again — your job search continues here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Link
                to="/forgot-password"
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-gray-400 focus:bg-white transition-colors w-full"
            />
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
            {loading ? "Signing in..." : "Sign in →"}
          </Button>

        </form>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-gray-900 font-medium hover:underline">
            Create one →
          </Link>
        </p>

      </div>
    </div>
  )
}