import { Schema, models, model } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        requried: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;