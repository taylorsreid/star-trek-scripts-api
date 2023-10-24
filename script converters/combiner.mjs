import fs from "fs";

try {
    const showAbbrs = ['ds9', 'tng', 'voy'];
    
    showAbbrs.forEach((showAbbr) => {

        // 
        fs.writeFileSync(`../single_files/${showAbbr}.json`, '[')

        // 
        fs.readdirSync(`../processed/${showAbbr}`).forEach((file, index, files) => {
            if (fs.lstatSync(`../processed/${showAbbr}/${file}`).isFile()) {
                fs.appendFileSync(`../single_files/${showAbbr}.json`, fs.readFileSync(`../processed/${showAbbr}/${file}`).toString())
                if (index !== files.length-1) {
                    fs.appendFileSync(`../single_files/${showAbbr}.json`, ',')
                }
            }
        })

        // 
        fs.appendFileSync(`../single_files/${showAbbr}.json`, ']')
    })

} catch (error) {
    console.error(error)
}