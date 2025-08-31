import mongoose from 'mongoose';    


const FlashCardSchema = new mongoose.Schema({
  
    course_Id: {
        type: String,
        required: true
    },
    flashcard: {
        type: Object,
        required: true
    },
   
});


const FlashCard = mongoose.models.flashcards || mongoose.model("flashcards", FlashCardSchema);
export default FlashCard;