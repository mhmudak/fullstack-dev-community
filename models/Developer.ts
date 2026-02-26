import { Schema, models, model } from "mongoose";

const DeveloperSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    image: { type: String },
    githubId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default models.Developer ?? model("Developer", DeveloperSchema);
