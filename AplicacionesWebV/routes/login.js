const express = require('express')
const router = express.Router()
const Student = require('../models/Student')

var data = require('./data.js')

router.post('/', async function (req, res) {
  let usuario = req.body.user
  let contra = req.body.password

  let i = 0
  let flag = false

  const students = await Student.find({})

  let student = null

  while (i < students.length && flag == false) {
    console.log(students[i].client + ' ' + students[i].password)
    if (students[i].client == usuario && students[i].password == contra) {
      student = students[i]
    }
    i++
  }

  // const foundUser = users.find(element => {
  //   return element.client === usuario && element.password === contra
  // })

  //   console.log(foundUser)

  //Una vez encontrado
  if (student) {
    console.log('SUCCESS IDENTIFICATION')
    return res.send({ id: student._id, ok: true })
  } else {
    console.log('USER NO IDENTIFIED (ACCESS DENIED)')
    return res.status(400).send('NO IDENTIFIED') //400 IT IS WRONGLY
  }
})

module.exports = router
