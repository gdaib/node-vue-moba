import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
});

export default mongoose.model("Category", schema);