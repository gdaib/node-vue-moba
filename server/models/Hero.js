import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String }, // 头像
  title: { type: String },  // 标题
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 分类 id
  scores: { // 各种评分
    difficult: { type: Number }, // 难度评分
    skills: { type: Number },    // 技能评分
    attack: { type: Number },    // 攻击评分
    survive: { type: Number },   //生存评分
  },
  // 技能数组
  skills: [{
    icon: { type: String }, // 技能图标
    name: { type: String }, // 技能名称
    description: { type: String }, // 技能描述
    tips: { type: String } // 技能提示
  }],
  // 顺风出装顺序
  followingWindItems: [
    { type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }
  ],
  // 逆风出装顺序
  headWindItems: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'Item'
  }],
  // 使用技巧
  usageTips: { type: String },
  battleTips: { type: String }, //对抗技巧
  teamTips: { type: String }, //  团战思路
  // 英雄关系
  partners: [{
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
});

export default mongoose.model("Hero", schema);
