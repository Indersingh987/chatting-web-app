import mongoose from 'mongoose'

const friendSchema = new mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    messages:[{type:mongoose.Schema.Types.ObjectId,ref:'messages'}]
})

export default mongoose.model('friends',friendSchema)