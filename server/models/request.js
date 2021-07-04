import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
})

export default mongoose.model('requests',requestSchema)