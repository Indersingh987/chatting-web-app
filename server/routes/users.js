import express from 'express'
import { register,login,getUser } from '../controllers/users.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',login)

//for verfication only
router.get('/user',auth,getUser)

export default router