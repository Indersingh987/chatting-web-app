import express from 'express'
import { getList } from '../controllers/friend.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/',auth,getList)

export default router