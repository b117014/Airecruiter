const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
      default: "",
      trim: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },
    user_type: {
      type: String,
      default: "",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    token: {
      type: String,
      trim: true,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    return next();
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
});

userSchema.methods.Compare = async function (userPassword, next) {
  try {
    let isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
