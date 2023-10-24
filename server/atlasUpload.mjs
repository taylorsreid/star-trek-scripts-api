import "./loadEnvironment.mjs";
import { Episode } from "./models.mjs";
import fs from "fs";

try {

    const showNames = ['tng', 'ds9', 'voy']
    let episodesToSave = [];

    showNames.forEach((showName) => {
        let jsonFile = JSON.parse(fs.readFileSync('../single_files/' + showName + '.json'))
        jsonFile.forEach((obj) => {
            let newEpisode = new Episode();
            newEpisode.show = showName;
            newEpisode.season = obj.schedule.season;
            newEpisode.episode = obj.schedule.episode;
            newEpisode.number = obj.schedule.number;
            newEpisode.airdate = obj.airdate;
            newEpisode.stardate = obj.stardate;
            newEpisode.title = obj.title;

            let lineNumber = 1;
            obj.scenes.forEach(scene => {
                scene.dialogue.forEach((dialogue) => {
                    newEpisode.lines.push({
                        number: lineNumber,
                        character: dialogue.character,
                        line: dialogue.line
                    })
                    lineNumber++;
                })
            });
            episodesToSave.push(newEpisode);
        })
    })
    console.log("Saving now, this make take a while. Please be patient...")
    let result = await Episode.bulkSave(episodesToSave);
    console.log(`Inserted ${result.insertedCount} new records.`)

} catch (error) {
    console.error(error)
}