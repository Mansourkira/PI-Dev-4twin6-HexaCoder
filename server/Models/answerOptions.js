const mongoose = require('mongoose');

const answerOptionsShcema = new mongoose.Schema({
answerText:String,

isCorrect : Boolean,
questions:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Questions'
}


})
module.exports=mongoose.model('answerOptions',answerOptionsShcema)