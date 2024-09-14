const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://prathamkoranne11:Pratham@pratham.6apub.mongodb.net/")
.then(()=>{
    try {
        if (mongoose.connect) {
            console.log("Connected successfully")
        }
    } catch (error) {
        console.error("Error detected",error)
    }
})

const userScehma= new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String
})

const User=mongoose.model('user',userScehma)

const AccountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const Account=mongoose.model('account',AccountSchema)

module.exports ={User,Account}