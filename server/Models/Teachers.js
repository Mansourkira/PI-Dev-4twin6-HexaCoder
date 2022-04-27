const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
userName:String,

email : String,
password : String,
tuto:Boolean,poste:String,

projects: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'projects' }
  ]
})
module.exports=mongoose.model('Teacher',TeacherSchema)