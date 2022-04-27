const express = require('express');
const router = express.Router();
const QuestionSchema = require ('../models/Question');
// Student model
const answerOptionses = require('../models/answerOptions');
const project_score = require('../models/Project_score');

router.get('/testt1',async (req,res)=>
{
    try {
        const CLassSt = [
        
        ]
        const classes = await QuestionSchema.find({});
        //var size = Object.keys(classes).length;
        Object.keys(classes)
        //r
        const s = 0;
        for (let index = 0; index <  Object.keys(classes).length; index++) {
          const element = classes[index];
          const student = await answerOptionses.find({questions:element._id});
       

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
  groupBy(CLassSt,'questions');
res.send( JSON.stringify(CLassSt))

    }
    catch(err) {
        res.status(400).send({ error: err });
      }
})

router.get('/question', async (req, res) => {


  try {
    
    let studentsLi = [{
      Question: '',
      answerOptions :[
        {
          answerText : ''
        }
      ]
    }]
    
    
    const classes = await QuestionSchema.find({});
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
    const answerOptions = await answerOptionses.find({});
    res.send({answerOptions})
  } catch(err) {
    res.status(400).send({ error: err });
  }
});


// @route   GET /api/students/:id
// @desc    Get a specific student
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const answerOptions = await answerOptionses.findById(req.params.id);
    res.send({ answerOptions });
  } catch (err) {
    res.status(404).send({ message: 'Student not found !' });
  }
});

// @route   POST /api/students/
// @desc    Create a student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newanswerOptions = await answerOptionses.create({ answerText: req.body.answerText, isCorrect:req.body.isCorrect, questions: req.body.questions });
     res.send({ newanswerOptions });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/students/:id
// @desc    Update a student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedanswerOptions = await answerOptionses.findByIdAndUpdate(req.params.id, req.body);
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
    const removeanswerOptions = await answerOptionses.findByIdAndRemove(req.params.id);
     res.send({ message: 'The answers was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
}); 


router.post('/scoreProject', async (req, res) => {
  try {
    const scoreProject= await project_score.create({soner_key: req.body.soner_key, chatbot:req.body.chatbot, vote: req.body.vote });
     res.send({ scoreProject });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});


module.exports = router;