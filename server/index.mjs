import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import { Episode } from "./models.mjs";

const PORT = process.env.PORT;
const app = express();
const route = express.Router();
app.use(cors());
app.use(express.json());
app.use(route)


route.get("/:show/:season/:episode", async (request, response) => {

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

route.get("/:show/:season/:episode/:line", async (request, response) => {

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
  response.status(500).send("An internal server error has occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
