import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    studyType: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    coursedata: {
        type: Object,
        required: true
    }
});

const Data = mongoose.models.data || mongoose.model("data", dataSchema);
export default Data;