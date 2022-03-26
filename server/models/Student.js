const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    
fname: String,
lname :String,
email : String,
password : String,
avatar:String,


EnrolledClass : {
  type:mongoose.Schema.Types.ObjectId,
  ref:'Class'
},

team:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Team'
}
}, {
    timestamps: true
  });
  



module.exports=mongoose.model('Student',StudentSchema)
