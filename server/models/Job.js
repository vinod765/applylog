const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  company:   { type: String, required: true },
  role:      { type: String, required: true },
  status:    { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"], default: "Applied" },
  url:       { type: String, default: "" },
  notes:     { type: String, default: "" },
  appliedAt: { type: Date, default: Date.now },
}, { timestamps: true })

module.exports = mongoose.model("Job", JobSchema)