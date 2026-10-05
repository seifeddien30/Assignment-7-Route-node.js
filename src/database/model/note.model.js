import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      validate: {
        validator: (v) => {
          return v !== v.toUpperCase();
        },
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  },
);

export const noteModel = mongoose.model("Notes", noteSchema);
