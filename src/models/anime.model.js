const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const animeSchema = new Schema({
    id: ObjectId,
    anime_name: String,
    anime_type: String,    
    anime_rated: String,
    anime_description: String
})

const AnimeModel = mongoose.model("cadastro/anime", animeSchema)
module.exports = AnimeModel;