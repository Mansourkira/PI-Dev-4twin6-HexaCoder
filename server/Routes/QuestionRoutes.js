const express = require('express');
const router = express.Router();
const ClassSchema = require ('../models/Class');
const questions = require ('../models/Question');




router.get('/', async (req, res) => {
  try {
    const question = await questions.find({});
    res.send({ question })
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// router.get('/getAnswers/:id', async (req, res) => {
//   try { 
    
//       g=[]

      
//     const answers = await answerOptions.findById(req.params.id);
//     res.send({answers})
//  /*   projects.map(e=>{
//       console.log(e);

//       g.push(e);
//     })
//     res.send(g);*/
//   } catch (err) {
//     res.status(404).send({ message: 'answers not found!' });
//   }
// });



// @route   GET /api/teachers/:id
// @desc    Get a specific teachers
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const question = await questions.findById(req.params.id);
    
    res.send({ question });
  } catch (err) {
    res.status(404).send({ message: 'question not found!' });
  }
});



// router.get('/questionAnswers/:id', async (req, res) => {
//   //try {

//  questions.find({ question : req.params.id })
//   //   s=[]
//   //   const teacher = await Teachers.findById(req.params.id);
//   //   teacher.projects.map(e=>{
//   //     console.log(e);

//   //     s.push(e);
//   //   })
//   //   res.send(s);
//   // } catch (err) {
//   //   res.status(404).send({ message: 'Student not found!' });
//   // }

// .exec(function (err, answerOptions) {
//         if (err){
//             if(err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "answers not found with given Company Id " + req.params.id
//                 });                
//             }
//             return res.status(500).send({
//                 message: "Error retrieving Products with given Company Id " + req.params.id
//             });
//         }
                    
//         res.send(answerOptions);
//     });

// });

// @route   POST /api/teachers/
// @desc    Create a teachers
// @access  Public
router.post('/', async (req, res) => {
  try {
    // const newAnswers=await  answerOptions.create( {
    //                 isCorrect:req.body.isCorrect,
    //                 answerText:req.body.answerText
    //             });
   const newQuestion = await questions.create({ questionText: req.body.questionText, answerOptions:req.body.answerOptions});
     res.send({ newQuestion });
  } catch(err) {
    res.status(400).send({ error: err });
  }

});

// @route   PUT /api/teachers/:id
// @desc    Update a teachers
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const updatedQuestion = await questions.findByIdAndUpdate(req.params.id, req.body);
     res.send({ message: 'The question was updated' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE /api/teachers/:id
// @desc    Delete a teachers
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const removeQuestion = await questions.findByIdAndRemove(req.params.id);
     res.send({ message: 'The question was removed' });
  } catch(err) {
    res.status(400).send({ error: err });
  }
}); 



module.exports = router;