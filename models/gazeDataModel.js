import mongoose from "mongoose";

const gazeDataSchema = new mongoose.Schema({
  user_Id: {
    type: String,
    required: true,
  },
  course_Id: {
    type: String,
    required: true,
  },
  studyType: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});



const gazeDataModel = mongoose.models.gazeData || mongoose.model("gazeData", gazeDataSchema);
export default gazeDataModel;