// src/hooks/useBoard.js
import { useState, useEffect, useCallback } from "react"
import { getJobs, addJob, updateJob, deleteJob } from "../api/jobs"

export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"]

export function useBoard() {
  const [jobs,    setJobs]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  // --- fetch on mount ---
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(() => setError("Failed to load jobs."))
      .finally(() => setLoading(false))
  }, [])

  // --- add ---
  const createJob = useCallback(async (jobData) => {
    const newJob = await addJob(jobData)
    setJobs(prev => [...prev, newJob])
    return newJob
  }, [])

  // --- update status (used by kanban drag or card actions) ---
  const moveJob = useCallback(async (id, newStatus) => {
    // Optimistic update
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: newStatus } : j))
    try {
      await updateJob(id, { status: newStatus })
    } catch {
      // Rollback on failure — refetch
      getJobs().then(setJobs)
    }
  }, [])

  // --- update any field(s) ---
  const editJob = useCallback(async (id, data) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...data } : j))
    await updateJob(id, data)
  }, [])

  // --- delete ---
  const removeJob = useCallback(async (id) => {
    setJobs(prev => prev.filter(j => j.id !== id))
    await deleteJob(id)
  }, [])

  // --- group by status for the kanban board ---
  const columns = STATUSES.reduce((acc, status) => {
    acc[status] = jobs.filter(j => j.status === status)
    return acc
  }, {})

  return { jobs, columns, loading, error, createJob, moveJob, editJob, removeJob }
}