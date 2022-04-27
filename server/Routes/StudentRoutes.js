const express = require('express');
const router = express.Router();
const ClassSchema = require ('../models/Class');
// Student model
const Students = require('../models/Student');

router.get('/testt',async (req,res)=>
{
    try {
        const CLassSt = [
        
        ]
        const classes = await ClassSchema.find({});
        //var size = Object.keys(classes).length;
        Object.keys(classes)
        //r
        const s = 0;
        for (let index = 0; index <  Object.keys(classes).length; index++) {
          const element = classes[index];
          const student = await Students.find({EnrolledClass:element._id});
       

          CLassSt.push(student);
   


        //  CLassSt.push({classN:element})
         
         


       //   CLassSt.push(student)
        }   
        function groupBy(array, groupBy){
          return array.reduce((acc,curr,index,array) => {
             var  idx = curr[groupBy]; 
                if(!acc[idx]){
                      acc[idx] = array.filter(item => item[groupBy] === idx)
                } 
              return  acc;
          },{})
      }
  
  // call
  groupBy(CLassSt,'EnrolledClass');
res.send( JSON.stringify(CLassSt))

    }
    catch(err) {
        res.status(400).send({ error: err });
      }
})

router.get('/class', async (req, res) => {


  try {
    
    let studentsLi = [{
      classN: '',
      studen :[
        {
          fname : ''
        }
      ]
    }]
    
    
    const classes = await ClassSchema.find({});
    res.send({classes});
   

/*
    classes.forEach(x => {
      Students.find({EnrolledClass : x._id}).then(studens =>(studens.map(p=>{
     //   studentsLi.push({studen:[{fname : p.fname}]})
    //   l.concat(p)
    console.log(p);
 //   studentsLi.push({classN:x.ClassName,studen:[{fname : p.fname}]})

      })))

     // studentsLi.push({classN : x._id ,studen : [{fname:"kk"} , {fname : "ssd"}]})

  //    console.log({fname});
     // console.log(item);

    //  studentsLi.push({clasN : x._id ,studen : [{fname:}]})
 //     studentsLi.studen.push({})
    })

    console.log(studentsLi);
    classes.forEach(Element =>{
      
      id = Element._id
      Students.find({EnrolledClass : id}).then(studens =>(studentsLi.push({classN : Element._id,students : studens})))


     
      
     //  studentsLi.classN.push({id})
    // studentsLi.student.push(Students.find({EnrolledClass:id}))

    })
    */
 //   res.send({array});
/*
    students.forEach(Element =>{
      studentsLi.class = Element.EnrolledClass
      studentsLi.student.push({_id : Element._id,fname:Element.fname})
      
     // console.log(Element.password);
    })
    console.log(studentsLi);
    console.log(studentsLi.class);*/

  } catch(err) {
    res.status(400).send({ error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Students.find({});
    res.send({students})
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    res.send({ student });
  } catch (err) {
    res.status(404).send({ message: 'Student not found !' });
  }
});

// @route   POST /api/students/
// @desc    Create a student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newStudent = await Students.create({ fname: req.body.fname, lname:req.body.lname, email: req.body.email,password : req.body.password, avatar: req.body.avatar,EnrolledClass:req.body.EnrolledClass , team:req.body.team });
     res.send({ newStudent });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The student was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});
// @route   GET /api/students/class
// @desc    Get all students
// @access  Public



// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeStudent = await Students.findByIdAndRemove(req.params.id);
     res.send({ message: 'The student was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
}); 





module.exports = router;