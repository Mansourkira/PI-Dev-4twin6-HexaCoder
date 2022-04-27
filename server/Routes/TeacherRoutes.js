const express = require('express');
const router = express.Router();
const ClassSchema = require ('../models/Class');
const Teachers = require ('../Models/Teachers');
const Project=require('../Models/Project');
// Student model


// router.get('/testt',async (req,res)=>
// {
//     try {
//         const CLassSt = [
        
//         ]
//         const classes = await ClassSchema.find({});
//         //var size = Object.keys(classes).length;
//         Object.keys(classes)
//         //r
//         const s = 0;
//         for (let index = 0; index <  Object.keys(classes).length; index++) {
//           const element = classes[index];
//           const student = await Students.find({EnrolledClass:element._id});
       

//           CLassSt.push(student);
   


//         //  CLassSt.push({classN:element})
         
         


//        //   CLassSt.push(student)
//         }   
//         function groupBy(array, groupBy){
//           return array.reduce((acc,curr,index,array) => {
//              var  idx = curr[groupBy]; 
//                 if(!acc[idx]){
//                       acc[idx] = array.filter(item => item[groupBy] === idx)
//                 } 
//               return  acc;
//           },{})
//       }
  
//   // call
//   groupBy(CLassSt,'EnrolledClass');
// res.send( JSON.stringify(CLassSt))

//     }
//     catch(err) {
//         res.status(400).send({ error: err });
//       }
// })

// router.get('/class', async (req, res) => {


//   try {
    
//     let studentsLi = [{
//       classN: '',
//       studen :[
//         {
//           fname : ''
//         }
//       ]
//     }]
    
    
//     const classes = await ClassSchema.find({});
//     res.send({classes});
   
//   } catch(err) {
//     res.status(400).send({ error: err });
//   }
// });

// @route   GET /api/teachers/
// @desc    Get all teachers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const teachers = await Teachers.find({});
    res.send({ teachers })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});
router.get('/getProject/:id', async (req, res) => {
  try { 
    
      g=[]

      
    const projects = await Project.findById(req.params.id);
    res.send({projects})
 /*   projects.map(e=>{
      console.log(e);

      g.push(e);
    })
    res.send(g);*/
  } catch (err) {
    res.status(404).send({ message: 'project not found!' });
  }
});



// @route   GET /api/teachers/:id
// @desc    Get a specific teachers
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teachers.findById(req.params.id);
    
    res.send({ teacher });
  } catch (err) {
    res.status(404).send({ message: 'Student not found!' });
  }
});
router.get('/TeacherProject/:id', async (req, res) => {
  //try {

 Project.find({ teacher : req.params.id })
  //   s=[]
  //   const teacher = await Teachers.findById(req.params.id);
  //   teacher.projects.map(e=>{
  //     console.log(e);

  //     s.push(e);
  //   })
  //   res.send(s);
  // } catch (err) {
  //   res.status(404).send({ message: 'Student not found!' });
  // }

.exec(function (err, Projects) {
        if (err){
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Products not found with given Company Id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error retrieving Products with given Company Id " + req.params.id
            });
        }
                    
        res.send(Projects);
    });

});

// @route   POST /api/teachers/
// @desc    Create a teachers
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newTeacher = await Teachers.create({ userName: req.body.userName,  email: req.body.email,password : req.body.password ,tuto:req.body.tuto ,poste:req.body.poste,projects:req.body.projects});
     res.send({ newTeacher });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/teachers/:id
// @desc    Update a teachers
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedTeacher = await Teachers.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The teacher was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/teachers/:id
// @desc    Delete a teachers
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeTeacher = await Teachers.findByIdAndRemove(req.params.id);
     res.send({ message: 'The teacher was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
}); 



module.exports = router;