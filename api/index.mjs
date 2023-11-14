import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import { AccessEvent, Episode } from "./models.mjs";

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const app = express();
const route = express.Router();
app.use(cors());
app.use(express.json());
app.use(route);
app.use(express.static("./"));

route.get("/", (request, response) => {
    logAccess(request)
    response.redirect("./index.htm")
})

route.get("/api/random", async (request, response) => {

    logAccess(request)

    let docCount = await Episode.countDocuments().exec()
    let randomNumber = Math.floor(Math.random() * docCount)
    let randomEpisode = await Episode.findOne().skip(randomNumber).exec();
    let randomLineNumber = Math.floor(Math.random() * randomEpisode.lines.length)
    response.send(randomEpisode.lines[randomLineNumber])
});

route.get("/api/:show/:season/:episode", async (request, response) => {

    logAccess(request)

    try {
        let query = { show: request.params.show, season: request.params.season, episode: request.params.episode }
        let result = await Episode.findOne(query).exec()
    
        if (!result){
            response.send("Not found").status(404);
        }
        else {
            response.send(result).status(200);
        }
    } catch (error) {
        console.error(error)
    }

});

route.get("/api/:show/:season/:episode/:line", async (request, response) => {

    logAccess(request)

    try {
        let query = { show: request.params.show, season: request.params.season, episode: request.params.episode }
        let result = await Episode.findOne(query).exec()
    
        if (!result){
            response.send("Not found").status(404);
        }
        else {
            response.send(result.lines[request.params.line]).status(200);
        }
    } catch (error) {
        console.error(error)
    }

});

// Global error handling
app.use((err, request, response, next) => {
    console.error(err)
    response.status(500).send("An internal server error has occured.")
})

// start the Express server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on host: ${HOST}`);
    console.log(`Server is running on port: ${PORT}`);
});

// basic access logging function that saves to MongoDB via Mongoose
async function logAccess(request) {
    new AccessEvent({
            // running in prod on railway           // running on localhost
        ip: request.headers['x-forwarded-for'] || request.socket.remoteAddress,
        timestamp: Date.now(),
        ua: request.headers['user-agent'],
        params: request.params
    }).save()
}