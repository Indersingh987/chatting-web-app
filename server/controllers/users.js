import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import validateRegisterData from "../validator/registor.js"
import validateLoginData from "../validator/login.js"
import User from "../models/User.js"
import  mongoose  from 'mongoose'

// @route POST /api/users/register
// @desc register route
// @access public
const register = async (req,res) => {
    const data = req.body

    const {errors,isValid} = validateRegisterData(data)

    if(!isValid){
        return res.status(400).json(errors)
    }

    try {
        const existingUser = await User.findOne({email:data.email})
        if(existingUser) return res.status(400).json({email:'Email already exists'})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(data.password,salt)

        const newUser = new User({
            name:data.name,
            email:data.email,
            password:hash
        })
        const registerUser = await User.create(newUser)
        
        const token = jwt.sign({id:registerUser._id},process.env.JWT_SECRET,{expiresIn:604800})

        res.status(201).json({token,user:registerUser})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
    
}

// @route POST /api/users/login
// @desc login route
// @access public
const login = async (req,res) => {
    const data = req.body

    const {errors,isValid} = validateLoginData(data)

    if(!isValid){
        return res.status(400).json(errors)
    }

    try {
        const existingUser = await User.findOne({email:data.email})
        if(!existingUser){
            return res.status(404).json({email:'Email is incorrect'})
        }
        const doesPasswordMatch = await bcrypt.compare(data.password,existingUser.password)
        if(!doesPasswordMatch){
            return res.status(400).json({password:'Password is incorrect'})
        }

        const payload = JSON.stringify({id:existingUser._id})
        const token = await jwt.sign({id:existingUser._id},process.env.JWT_SECRET)

        res.status(201).json({token,user:existingUser})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Something went wrong"})
    }

}

//for verification only
const getUser = async (req,res) => {
    const id  = req.userId

    try {
        const isValid = await mongoose.Types.ObjectId.isValid(id)
        if(isValid){
            const user = await User.findById(id)
            return res.status(200).json(user)
        }
        res.status(400)
    } catch (error) {
        console.log(error)
    }
    
} 

export {register,login,getUser}