const express = require('express');
const router = express.Router();

const ClassSchema = require('../models/Class');



//get Class 
router.get('/',async (req,res)=>
{
    try {
        const classes = await ClassSchema.find({});
        
        res.send({classes})
    }
    catch(err) {
        res.status(400).send({ error: err });
      }
})


// get class By id
router.get('/:id', async (req, res) => {
  try {
    const classe = await ClassSchema.findById(req.params.id);
    res.send({ classe });
  } catch (err) {
    res.status(404).send({ message: 'Class not found!' });
  }
});

//Add Class
router.post('/', async (req, res) => {
    try {
      const newClass = await ClassSchema.create({ ClassName : req.body.ClassName });
       res.send({ newClass });
    } catch(err) {
      res.status(400).send({ error: err });
    }
  
  });


  //update

  router.put('/update/:id', async (req, res) => {
    try {
      const updateClass = await ClassSchema.findByIdAndUpdate(req.params.id, req.body);
       res.send({ message: 'The Class was updated' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
  });


// Get Classes
//router.get('/')
 module.exports =router