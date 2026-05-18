import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },

    originalUrl: {
        type: String,
        required: true,
        trim: true
    },

    shortCode: {
        type: String,
        required: true,
        unique: true
    }

},
{
    timestamps: true
});

export const Url = mongoose.model("Url", urlSchema);