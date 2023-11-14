import mongoose from "./mongoose.mjs";
import { EpisodeSchema } from "./schemas.mjs"

const Episode = mongoose.model('episode', EpisodeSchema)

export {Episode}