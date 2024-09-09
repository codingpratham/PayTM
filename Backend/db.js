const mongoose= require('mongoose')

mongoose.connect("mongodb+srv://prathamkoranne11:Pratham@pratham.6apub.mongodb.net/")
.then(()=>{
    console.log("Connected to MongoDB")
})

const userSchema= new mongoose.Schema({
    email: String,
    password: String,
    
})

const User=mongoose.model("user",userSchema)


module.export ={User}