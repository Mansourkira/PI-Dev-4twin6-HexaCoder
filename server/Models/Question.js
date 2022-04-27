const mongoose = require('mongoose');


const QuestionsShcema = new mongoose.Schema({
questionText:String,

Class: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'Class' 
},

answerOptions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'answerOptions' }
  ]

})
mongoose.models = {}
module.exports=mongoose.model("Question",QuestionsShcema);

