import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import  mongoose  from 'mongoose'
import cors from 'cors'

import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import requestRouter from './routes/request.js'

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true,useUnifiedTopology:true }).then(()=>console.log('mongoDB is connected')).catch((error)=>console.log(error))
    
app.use('/api/users',usersRouter)
app.use('/api/auth',authRouter)
app.use('/api/request',requestRouter)

app.listen(port,console.log(`app is running at ${port}`))