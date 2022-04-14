const express = require('express')
const router = express.Router()
const Student = require('../models/Student')

// Arquitectura web
// NO-SQL

// MERN -> Mongo Express React Node

// React -> SpringBoot


const data = require('./data')
const notas = data.datos

router.get('/showall', (req, res) => {
  res.send(notas)
})

router.get('/:id', async function (req, res) {
  let id = req.params.id
  const student = await Student.findById(id)
  return res.json(student.notas)
})

// Student {
// notes: []
// }


// NOTES student_id , STUDENT id
router.post('/:id', async function (req, res) {
  const nota = req.body.nota
  const id = req.params.id
  // let usernotas
  await Student.findOneAndUpdate({ _id: id }, { $push: { notas: nota } })
  const student = await Student.findById(id)
  res.send(student.notas)
})

router.put('/:userId/:noteId', async function (req, res) {
  let nota = req.body.nota
  let noteId = req.params.noteId
  let userId = req.params.userId

  const student = await Student.findById(userId)
  const notas = student.notas.map((nota) => {
    if (nota._id.toString() === noteId) {
      return {
        _id: nota._id,
        title: req.body.nota.title,
        describe: req.body.nota.describe
      }
    }
    return nota
  })

  await Student.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        notas: notas
      }
    }
  )
  res.send(notas)

})

/*
router.put("/", function(req, res){    
    let idNotaMod = req.body.id;
    let contenido = req.body.nota;

    let i = 0;
    let flag = false;
    while(i<notas.length){
        if(notas[i].id==idNotaMod){
            notas[i].nota = contenido;
            flag = true;
        }
        i++;
    }

    if(flag){
        res.send("NOTA IS CHANGED");
    }else{
        res.status(400).send("ERROR CHANGING NOTE");
    }
});*/

router.delete('/:userId/:noteId', async function (req, res) {
  const noteId = req.params.noteId
  const userId = req.params.userId
  await Student.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        notas: { _id: noteId }
      }
    }
  )

  //Se envían los datos
  res.send('NOTE DELETED RIGHTLY')
})

module.exports = router
