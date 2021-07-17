import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import  mongoose  from 'mongoose'
import cors from 'cors'
import Pusher from 'pusher'
import path from 'path'

import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import requestRouter from './routes/request.js'
import friendRouter from './routes/friend.js'
import messageRouter from './routes/message.js'

import User from './models/User.js'

const app = express()
const port = process.env.PORT || 5000
const pusher = new Pusher({
  appId: "1233075",
  key: "6e3173648537bdc9fd8c",
  secret: "d317f10e2cb465281f28",
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
        const to = await User.findById(messageDoc.to)
        const obj = {
          id:messageDoc._id,
          isSender:true,
          senderId:from._id,
          recieverId:to._id,
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

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'/client/build')))

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

app.listen(port,console.log(`app is running at ${port}`))