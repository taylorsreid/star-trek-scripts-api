import mongoose from "./mongoose.mjs";
import { EpisodeSchema, LineSchema } from "./schemas.mjs"

const Episode = mongoose.model('episode', EpisodeSchema)
// const Line = mongoose.model('line', LineSchema)

export {Episode}