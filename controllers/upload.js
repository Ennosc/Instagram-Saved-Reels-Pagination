const fs = require('fs')
const Upload = require('../models/Upload')

module.exports = {
    createUpload: async (req, res) => {
        try{
            //console.log(req.file)
            const fileContent = fs.readFileSync(req.file.path, "utf-8")
            const json = JSON.parse(fileContent)

            //console.log(json)

            const mediaArray = json.saved_saved_media
            //console.log(`total ${mediaArray.length} Items`)
            
            const chunkSize = 5000
            for (let i = 0; i < mediaArray.length; i += chunkSize){
                console.log(i, "chunk i")
                const chunk = mediaArray.slice(i, i + chunkSize)
                const docs = chunk.map(media => {
                    const savedOn = media.string_map_data["Saved on"]
                    return {
                        userId: req.user.id,
                        title: media.title,
                        href: savedOn.href,
                        timestamp: savedOn.timestamp,
                        savedAt: new Date(savedOn.timestamp * 1000)
                    }
                })

                await Upload.insertMany(docs, { ordered: false })
                //console.log(`Chunk ${i / chunkSize + 1} von ${Math.ceil(mediaArray.length / chunkSize)} gespeichert`)
            }
            //console.log("All media saved")
            if (req.file) fs.unlinkSync(req.file.path);

            return res.status(200).json({
                success: true,
                message: `${mediaArray.length} Items imported.`
            })
            
        }
        catch(err){
            console.error(err);
            res.status(500).json({ 
                success: false, 
                message: "Fehler bei der Verarbeitung der Datei." 
            });
        }
    }
}