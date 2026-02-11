const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
        progress: {
            type: Number,
            default: 0,
            min: [0, "Progress must be >= 0"],
            max: [100, "Progress must be <= 100"],
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate enrollments
enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
