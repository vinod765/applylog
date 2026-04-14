// src/components/CreateJobDialog.jsx
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

const EMPTY = {
  company:   "",
  role:      "",
  status:    "Applied",
  url:       "",
  notes:     "",
  appliedAt: new Date().toISOString().slice(0, 10),
}

export default function CreateJobDialog({ open, onClose, onCreate }) {
  const [form,    setForm]    = useState(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")

  if (!open) return null

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and role are required.")
      return
    }
    setLoading(true)
    setError("")
    try {
      await onCreate(form)
      setForm(EMPTY)
      onClose()
    } catch {
      setError("Failed to add job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xl p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add Application</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <Field label="Company *">
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. Stripe"
              className={inputCls}
              required
            />
          </Field>

          <Field label="Role *">
            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Engineer"
              className={inputCls}
              required
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputCls}
              >
                {["Applied", "Interview", "Offer", "Rejected"].map(s => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Date Applied">
              <input
                type="date"
                name="appliedAt"
                value={form.appliedAt}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Job URL">
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="https://..."
              className={inputCls}
            />
          </Field>

          <Field label="Notes">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Referral source, interview details..."
              rows={3}
              className={`${inputCls} resize-none`}
            />
          </Field>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 mt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Adding..." : "Add Application"}
            </Button>
          </div>

        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  "bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-colors w-full"