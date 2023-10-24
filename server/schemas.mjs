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

export {LineSchema, EpisodeSchema}