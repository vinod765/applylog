// src/api/auth.js
// Mock auth — swap these for real fetch() calls once backend is ready

export async function signIn(email, password) {
  await new Promise(r => setTimeout(r, 700))
  if (!email || password.length < 3) throw new Error("Invalid credentials")
  return {
    user: { id: "u1", name: "Jane Smith", email },
    token: "mock-jwt-token",
  }
}

export async function signUp(name, email, password) {
  await new Promise(r => setTimeout(r, 700))
  if (!name || !email || password.length < 8) throw new Error("Invalid details")
  return {
    user: { id: "u1", name, email },
    token: "mock-jwt-token",
  }
}