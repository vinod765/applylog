// src/pages/Dashboard.jsx
import { useState } from "react"
import { Plus, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "../context/AuthContext"
import { useBoard } from "../hooks/useBoard"
import KanbanBoard from "../components/KanbanBoard"
import CreateJobDialog from "../components/CreateJobDialog"

export default function Dashboard() {
  const { user }                    = useAuth()
  const { columns, loading, error,
          createJob, moveJob,
          removeJob, jobs }          = useBoard()
  const [dialogOpen, setDialogOpen] = useState(false)

  const firstName = user?.name?.split(" ")[0] ?? "there"

  const total      = jobs.length
  const active     = jobs.filter(j => j.status === "Applied" || j.status === "Interview").length
  const offers     = jobs.filter(j => j.status === "Offer").length
  const interviews = jobs.filter(j => j.status === "Interview").length

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="w-full px-8 py-10 flex flex-col gap-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-gray-400">
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-sm">Dashboard</span>
            </div>
            <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-gray-500 text-base">Here's your job search at a glance.</p>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            className="gap-2 self-start sm:self-auto text-base px-5 py-5"
          >
            <Plus className="w-5 h-5" />
            Add Application
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Total Applied"  value={total}      color="text-gray-900" />
          <StatCard label="Active"         value={active}     color="text-blue-600" />
          <StatCard label="Interviews"     value={interviews} color="text-amber-600" />
          <StatCard label="Offers"         value={offers}     color="text-green-600" />
        </div>

        {/* Board */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="text-center py-20 text-red-500 text-base">{error}</div>
        ) : (
          <KanbanBoard
            columns={columns}
            onDelete={removeJob}
            onMove={moveJob}
          />
        )}

      </div>

      <CreateJobDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={createJob}
      />
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-6 flex flex-col gap-2">
      <p className="text-sm text-gray-400 font-medium">{label}</p>
      <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-72" />
      ))}
    </div>
  )
}