import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String }
});

export default mongoose.model("Hero", schema);
