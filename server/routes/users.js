import express from 'express'
import {getUsers,search } from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/search',auth,search)
router.get('/',auth,getUsers)

export default router