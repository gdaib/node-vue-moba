import mongoose from "mongoose";
import ph from "password-hash";

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    set(val) {
      return ph.generate(val);
    }
  }
});

schema.statics.findByUserName = function(username) {
  return this.findOne({ username });
};

schema.methods.validatePw = async function(password) {
  return ph.verify(password, this.password);
};

export default mongoose.model("AdminUser", schema);
