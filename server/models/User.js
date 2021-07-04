import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    requestList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Request'
    }],
    friendList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Friend'
    }],
})

export default mongoose.model('users',userSchema) 