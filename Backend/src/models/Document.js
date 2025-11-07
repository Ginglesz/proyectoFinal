import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    datos: { type: Object, required: true },
    creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
