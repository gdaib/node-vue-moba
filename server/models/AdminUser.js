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

schema.methods.validatePw = async function(pw1, pw2) {
  // const data = await schema.findByUserName(user.username);
  return pw1 === ph.generate(pw2);
};

export default mongoose.model("AdminUser", schema);
