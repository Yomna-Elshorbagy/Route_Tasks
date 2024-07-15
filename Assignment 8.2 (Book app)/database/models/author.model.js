import mongoose from "mongoose";

let autherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },
    bio: {
      type: String,
    },
    books: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    }],
    birthDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let autherModel = mongoose.model("Auther", autherSchema);

export default autherModel;
