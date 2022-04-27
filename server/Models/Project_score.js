const mongoose = require('mongoose');


const ProjectScoreSchema = new mongoose.Schema({
soner_key : Number,
chatbot : Number,
vote : Number,
total : Number,



});
mongoose.models = {}
module.exports=mongoose.model('ProjectScore',ProjectScoreSchema)