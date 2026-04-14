// src/api/jobs.js
// Mock jobs data — swap for real fetch() calls once backend is ready

let mockJobs = [
  {
    id: "1",
    company: "Google",
    role: "Frontend Engineer",
    status: "Applied",
    url: "https://careers.google.com",
    notes: "Applied via referral from John.",
    appliedAt: "2025-04-01",
  },
  {
    id: "2",
    company: "Stripe",
    role: "React Developer",
    status: "Interview",
    url: "https://stripe.com/jobs",
    notes: "Phone screen scheduled for next week.",
    appliedAt: "2025-04-03",
  },
  {
    id: "3",
    company: "Notion",
    role: "UI Engineer",
    status: "Offer",
    url: "https://notion.so/careers",
    notes: "Offer received — reviewing compensation.",
    appliedAt: "2025-03-28",
  },
  {
    id: "4",
    company: "Meta",
    role: "SWE Intern",
    status: "Rejected",
    url: "",
    notes: "No feedback provided.",
    appliedAt: "2025-03-20",
  },
  {
    id: "5",
    company: "Linear",
    role: "Product Engineer",
    status: "Applied",
    url: "https://linear.app/careers",
    notes: "",
    appliedAt: "2025-04-10",
  },
]

export async function getJobs() {
  await new Promise(r => setTimeout(r, 500))
  return [...mockJobs]
}

export async function addJob(jobData) {
  await new Promise(r => setTimeout(r, 400))
  const newJob = { ...jobData, id: Date.now().toString() }
  mockJobs.push(newJob)
  return newJob
}

export async function updateJob(id, data) {
  await new Promise(r => setTimeout(r, 300))
  mockJobs = mockJobs.map(j => (j.id === id ? { ...j, ...data } : j))
  return mockJobs.find(j => j.id === id)
}

export async function deleteJob(id) {
  await new Promise(r => setTimeout(r, 300))
  mockJobs = mockJobs.filter(j => j.id !== id)
  return id
}