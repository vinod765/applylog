// src/components/KanbanBoard.jsx
import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  useDroppable,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import JobApplicationCard from "./JobApplicationCard"

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"]

// --- Sortable Card ---
function SortableCard({ job, onDelete, onMove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: job.id, data: { job } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <JobApplicationCard job={job} onDelete={onDelete} onMove={onMove} />
    </div>
  )
}

// --- Column ---
function KanbanColumn({ status, jobs, onDelete, onMove, isOver }) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className={`
        rounded-xl border-2 p-7 flex flex-col gap-5
        min-h-[680px] w-full min-w-[320px]
        bg-white transition-colors duration-150
        ${isOver ? "border-blue-400 bg-blue-50" : "border-gray-200"}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        <span className="text-base text-gray-400 font-medium">{jobs.length}</span>
      </div>

      {/* Cards */}
      <SortableContext items={jobs.map(j => j.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-4 flex-1 min-h-[400px]">
          {jobs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-400 min-h-[400px]">
              Drop here
            </div>
          ) : (
            jobs.map(job => (
              <SortableCard key={job.id} job={job} onDelete={onDelete} onMove={onMove} />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  )
}

// --- Main Board ---
export default function KanbanBoard({ columns, onDelete, onMove }) {
  const [activeJob, setActiveJob] = useState(null)
  const [overStatus, setOverStatus] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  function handleDragStart({ active }) {
    setActiveJob(active.data.current?.job ?? null)
  }

  function handleDragOver({ over }) {
    if (!over) { setOverStatus(null); return }
    const overId = over.id
    if (STATUSES.includes(overId)) {
      setOverStatus(overId)
    } else {
      const targetStatus = STATUSES.find(s =>
        (columns[s] || []).some(j => j.id === overId)
      )
      setOverStatus(targetStatus ?? null)
    }
  }

  function handleDragEnd({ active, over }) {
    setActiveJob(null)
    setOverStatus(null)
    if (!over || !activeJob) return

    const overId = over.id
    const newStatus = STATUSES.includes(overId)
      ? overId
      : STATUSES.find(s => (columns[s] || []).some(j => j.id === overId))

    if (newStatus && newStatus !== activeJob.status) {
      onMove(activeJob.id, newStatus)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="px-6 py-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {STATUSES.map(status => (
            <KanbanColumn
              key={status}
              status={status}
              jobs={columns[status] || []}
              onDelete={onDelete}
              onMove={onMove}
              isOver={overStatus === status}
            />
          ))}
        </div>

        <DragOverlay>
          {activeJob ? (
            <div style={{ transform: "rotate(2deg)", opacity: 0.95 }}>
              <JobApplicationCard job={activeJob} onDelete={() => {}} onMove={() => {}} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  )
}