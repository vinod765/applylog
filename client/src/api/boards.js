// src/api/jobs.js  — mock data
const mockJobs = [
  { id: "1", company: "Google",   role: "Frontend Engineer", status: "Applied",   url: "", notes: "", appliedAt: "2025-04-01" },
  { id: "2", company: "Stripe",   role: "React Developer",   status: "Interview", url: "", notes: "", appliedAt: "2025-04-03" },
  { id: "3", company: "Notion",   role: "UI Engineer",       status: "Offer",     url: "", notes: "", appliedAt: "2025-03-28" },
  { id: "4", company: "Meta",     role: "SWE Intern",        status: "Rejected",  url: "", notes: "", appliedAt: "2025-03-20" },
]

export const getJobs  = async ()           => mockJobs
export const addJob   = async (job)        => ({ ...job, id: Date.now().toString() })
export const updateJob= async (id, data)   => ({ id, ...data })
export const deleteJob= async (id)         => id