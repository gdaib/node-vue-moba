import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
});

export default mongoose.model("Item", schema);
