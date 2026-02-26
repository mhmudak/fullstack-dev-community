import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "Developer",
        required: true
    },
}, { timestamps: true });

export default models.Post ?? model("Post", PostSchema);