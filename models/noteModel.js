import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    Id: {
        type: String,
        
        required: true
    },
    course_Id: {
        type: String,
        required: true
    },
    chapterTitle: {
        type: String,
        required: true
    },
    notehtml: {
        type: String,
        required: true
    },
    
});

const Note = mongoose.models.notes || mongoose.model("notes", noteSchema);
export default Note;