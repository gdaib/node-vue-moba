import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/node-vue-moba", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

export default mongoose;
