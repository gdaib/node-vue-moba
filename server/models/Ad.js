import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  items: [
    {
      image: { type: String },
      url: { type: String }
    }
  ]
});

export default mongoose.model("Ad", schema);
