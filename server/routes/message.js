import express from 'express'
import {create,getList } from '../controllers/message.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/new',auth,create)

router.post('/',auth,getList)

export default router