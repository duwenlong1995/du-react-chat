const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  role: {
    type: String,
  },
  // 0启用
  // 1禁用
  state: {
    type: Number,
    default: 0,
  },
});
// const User = mongoose.model("Users", userSchema);
// User.create({
//   username: "gouya",
//   email: "duwenlong199535@gmail.com",
//   password: "",
//   role: "admin",
//   state: 0,
// })
//   .then(() => {
//     console.log("初始化管理员成功");
//   })
//   .catch((error) => {
//     console.log("初始化管理员失败", error);
//   });

module.exports = mongoose.model("Users", userSchema);
