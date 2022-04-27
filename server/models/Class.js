const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
ClassName : String,
questions: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Questions' }
  ]


}, {
    timestamps: true
  });
  

module.exports=mongoose.model('Class',ClassSchema)