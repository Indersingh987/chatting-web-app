import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String
    },
    timestamp: {
        type:String
    }  
})

export default mongoose.model('messages',messageSchema)