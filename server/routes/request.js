import express from 'express'
import {send,cancle,accept,reject,getList } from '../controllers/request.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/send',auth,send)
router.post('/cancle',auth,cancle)
router.post('/accept',auth,accept)
router.post('/reject',auth,reject)
router.get('/',auth,getList)

export default router