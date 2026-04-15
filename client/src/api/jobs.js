const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000"

function getToken() {
  return localStorage.getItem("token")
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

export async function getJobs() {
  const res = await fetch(`${BASE}/api/jobs`, {
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to fetch jobs")
  // backend returns _id, frontend uses id — normalize here
  return data.map(j => ({ ...j, id: j._id }))
}

export async function addJob(jobData) {
  const res = await fetch(`${BASE}/api/jobs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(jobData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to add job")
  return { ...data, id: data._id }
}

export async function updateJob(id, updates) {
  const res = await fetch(`${BASE}/api/jobs/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to update job")
  return { ...data, id: data._id }
}

export async function deleteJob(id) {
  const res = await fetch(`${BASE}/api/jobs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || "Failed to delete job")
  return id
}