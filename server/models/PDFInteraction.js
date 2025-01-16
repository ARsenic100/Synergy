import mongoose from "mongoose";

const PDFInteractionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: true }
);

const PDFInteraction = mongoose.model('PDFInteraction', PDFInteractionSchema);
export default PDFInteraction;


