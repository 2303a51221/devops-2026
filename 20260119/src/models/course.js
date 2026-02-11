const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            maxlength: [100, "Title must be 1-100 characters"],
            trim: true,
        },
        description: {
            type: String,
            maxlength: [500, "Description must be under 500 characters"],
        },
        price: {
            type: Number,
            default: 0,
            min: [0, "Price cannot be negative"],
        },
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Course", courseSchema);
