const router = require("express").Router()
const auth = require("../middleware/auth")
const Job = require("../models/Job")

// Get all jobs for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(jobs)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
})

// Create a job
router.post("/", auth, async (req, res) => {
  try {
    const { company, role, status, url, notes, appliedAt } = req.body
    const job = await Job.create({ user: req.user.id, company, role, status, url, notes, appliedAt })
    res.json(job)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
})

// Update a job (status, notes etc)
router.put("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json(job)
  } catch {
    res.status(500).json({ message: "Server error" })
  }
})

// Delete a job
router.delete("/:id", auth, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!job) return res.status(404).json({ message: "Job not found" })
    res.json({ message: "Deleted" })
  } catch {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router