import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import  mongoose  from 'mongoose'
import cors from 'cors'
import Pusher from 'pusher'

import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import requestRouter from './routes/request.js'
import friendRouter from './routes/friend.js'
import messageRouter from './routes/message.js'

import User from './models/User.js'

const app = express()
const port = process.env.PORT || 5000
const pusher = new Pusher({
  appId: process.env.APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true
});

app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false }).then(()=>console.log('mongoDB is connected')).catch((error)=>console.log(error))

const db = mongoose.connection
db.once('open',()=>{
  const collection = db.collection('messages')
  const changeStream = collection.watch()

  changeStream.on('change',async (change)=>{

    try {
      if(change.operationType === 'insert'){
        const messageDoc = change.fullDocument
        const from = await User.findById(messageDoc.from)
        const obj = {
          id:messageDoc._id,
          isSender:true,
          senderId:from._id,
          msg:messageDoc.text,
          timestamp:messageDoc.timestamp
         }
          pusher.trigger("messages", "inserted",  obj );
      }
      
    } catch (error) {
      console.log('Error Trigring Pusher')
    }
    
  })
})

app.use('/api/users',usersRouter)
app.use('/api/auth',authRouter)
app.use('/api/request',requestRouter)
app.use('/api/friend',friendRouter)
app.use('/api/message',messageRouter)

app.listen(port,console.log(`app is running at ${port}`))