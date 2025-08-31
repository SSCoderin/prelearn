import mongoose from "mongoose";

const webgazerDataSchema = new mongoose.Schema({
    gazeData: {
        type: mongoose.Schema.Types.Mixed, 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const webgazerDataModel = mongoose.models.webgazerData || mongoose.model("webgazerData", webgazerDataSchema);
export default webgazerDataModel;