const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user')
const cors = require('cors')
const bcrypt = require('bcrypt')
app.use(express.json())
// import bcrypt from 'bcrypt'
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect("mongodb+srv://sharmaraghu157:12345@cluster12.b6gri.mongodb.net/")

app.post("/user",(req,res)=>{
  const {name,email,username,password}= req.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
   User.create({name : name , email : email , username : username , password : hash}).then((result)=>{
    res.send(result)
   }).catch((err)=>{
    res.send(err)
   })
   console.log(`data saved  user ${req.body.name}`)
})

app.post("/login",(req,res)=>{
  const {name,password}= req.body
  User.findOne({name : name}).then((result)=>{
    console.log(`result ${result}`)
    if(result){
      const valid = bcrypt.compareSync(password, result.password)
      if(valid){
        res.status(200).send(result)
        console.log("password match")
      }else{
        res.status(404).send("password not match")
        console.log("password not match")
      }
    }else{
      res.status(404).send("user not found")
      console.log("user not found")
    }
  }).catch((err)=>{
    res.send(err)
  })
})

app.delete("/userg",(req,res)=>{
   User.findOneAndDelete(req.body).then((result)=>{
    res.send(result)
   }).catch((err)=>{
    res.send(err)
   })
   console.log(`delete ${req.body}`)

})


app.put("/user/:id",(req,res)=>{
//   const id = req.params.id
const data = req.body
  User.findByIdAndUpdate(req.params.id,req.body).then((result)=>{
    res.send(result)
    console.log(`update ${data}`)
  }).catch((err)=>{
    res.send(err)
  })
})
const port = 3000
app.listen(port, () => console.log(`app listening on port ${port}!`))