import mongoose from "./mongoose.mjs";

const LineSchema = new mongoose.Schema({
    number: Number,
    character: String,
    line: String 
})

const EpisodeSchema = new mongoose.Schema({
    show: String,
    season: Number,
    episode: Number,
    number: Number,
    airdate: Number,
    stardate: String,
    title: String,
    lines: [LineSchema]
})

const AccessEventSchema = new mongoose.Schema({
    ip: String,
    timestamp: Date,
    ua: String,
    params: Map
})

const Episode = mongoose.model('episode', EpisodeSchema)
const AccessEvent = mongoose.model('accessEvent', AccessEventSchema)

export { Episode, AccessEvent}