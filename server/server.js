import express from 'express'
import bodyParser from 'body-parser'
import  mongoose  from 'mongoose'
import cors from 'cors'

import usersRouter from './routes/users.js'

const app = express()
const port = process.env.PORT || 5000
const url = 'mongodb://localhost:27017/test3'

app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology:true }).then(()=>console.log('mongoDB is connected')).catch((error)=>console.log(error))

app.get('/',(req,res)=>res.send('API is Running..'))        
app.use('/api/users',usersRouter)

app.listen(port,console.log(`app is running at ${port}`))