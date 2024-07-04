import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const userModal = mongoose.model.user || mongoose.model("user", userSchema);
export default userModal;
