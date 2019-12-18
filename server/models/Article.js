import mongoose from "mongoose";

const DRAFT = 0;
const PUBLISH = 1;

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  importance: Number,
  summary: { type: String }, // 简介
  content: { type: String }, // 内容
  createTime: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  },
  publishTime: {
    type: Date,
    default: Date.now
  },
  status: { // 发布状态
    type: Number,
    enum: [DRAFT, PUBLISH],
    default: DRAFT
  }
});

export default mongoose.model("Article", schema);
