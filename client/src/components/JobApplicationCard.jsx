// src/components/JobApplicationCard.jsx
import { useState } from "react"
import { Trash2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"

const STATUS_STYLES = {
  Applied:   "bg-blue-50   text-blue-600   border-blue-100",
  Interview: "bg-amber-50  text-amber-600  border-amber-100",
  Offer:     "bg-green-50  text-green-600  border-green-100",
  Rejected:  "bg-red-50    text-red-500    border-red-100",
}

export default function JobApplicationCard({ job, onDelete, onMove }) {
  const [expanded, setExpanded] = useState(false)

  const date = new Date(job.appliedAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  })

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-150 p-5 flex flex-col gap-4">

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 min-w-0">
          <p className="font-semibold text-gray-900 text-base truncate">{job.company}</p>
          <p className="text-sm text-gray-500 truncate">{job.role}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => onDelete(job.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status badge + date */}
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium px-3 py-1 rounded-full border ${STATUS_STYLES[job.status]}`}>
          {job.status}
        </span>
        <span className="text-sm text-gray-400">{date}</span>
      </div>

      {/* Move to status */}
      <select
        value={job.status}
        onChange={e => onMove(job.id, e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 outline-none focus:border-gray-400 cursor-pointer"
      >
        {["Applied", "Interview", "Offer", "Rejected"].map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {/* Notes toggle */}
      {job.notes && (
        <div>
          <button
            onClick={() => setExpanded(p => !p)}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? "Hide notes" : "Show notes"}
          </button>
          {expanded && (
            <p className="mt-2 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2.5 leading-relaxed">
              {job.notes}
            </p>
          )}
        </div>
      )}

    </div>
  )
}