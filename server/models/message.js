import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    timestamp:{
        type:Date
    }
})

export default mongoose.model('messages',messageSchema)