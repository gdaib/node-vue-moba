import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  parentId: { type: String }
});

export default mongoose.model("Category", schema);
