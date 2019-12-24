import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    set(val) {
      // return require('bc')
    }
  }
});

export default mongoose.model("AdminUser", schema);
