const mongoose = require('mongoose');
const Team = new mongoose.Schema({

team_Name:String,


// One To Many [Team to Student]
membres:[
    {
        type:mongoose.Schema.Types.ObjectId,ref:'Student'
    },
],


// One To One [Team To Project]
project:{
    type:mongoose.Schema.Types.ObjectId,ref:'projects'
}
}, {
    timestamps: true
  });
  


 
  
  module.exports=mongoose.model('Team',Team)
