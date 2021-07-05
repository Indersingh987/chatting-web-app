import User from '../models/User.js'
import Request from '../models/request.js'
import Friend from '../models/friend.js'


const findRequestDocAndRemove = async (recieverId,senderId) => {
    const reciever = await User.findById(recieverId)
    const sender = await User.findById(senderId)
    for(let i=0;i < reciever.requestList.length ;i++){
        for(let j=0; j < sender.requestList.length ;j++){
           if(JSON.stringify(reciever.requestList[i]) == JSON.stringify(sender.requestList[j])){
               await User.findOneAndUpdate({email:reciever.email},{$pull:{requestList:reciever.requestList[i]}})
               await User.findOneAndUpdate({email:sender.email},{$pull:{requestList:sender.requestList[j]}})
               await Request.findByIdAndDelete(reciever.requestList[i])
           }
        }
    }
}

// @route POST /api/request/send
// @desc request send 
// @access private
const send = async (req,res) => {
    const recieverId = req.body.id
    const id = req.userId
    try {
        const requestDoc = await Request.create({
            to:recieverId,
            from:id
        })
        const loginUser = await User.findById(id)
        const recieverUser = await User.findById(recieverId)
        loginUser.requestList.push(requestDoc._id)
        loginUser.save()
        recieverUser.requestList.push(requestDoc._id)
        recieverUser.save()
        res.status(201).json({recieverId})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'something went wrong'})
    }
}

// @route POST /api/request/cancle
// @desc request cancle
// @access private
const cancle = async (req,res) => {
    const recieverId = req.body.id
    const id = req.userId
    try {
        findRequestDocAndRemove(recieverId,id)
        res.status(201).json({recieverId})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'something went wrong'})
    }
}

// @route POST /api/request/accept
// @desc request accept
// @access private
const accept = async (req,res) => {

    try {
        
    } catch (error) {
        console.log(error)
    }
}

// @route POST /api/request/reject
// @desc request reject
// @access private
const reject = async (req,res) => {

    try {
        
    } catch (error) {
        console.log(error)
    }
}

// @route POST /api/request/list
// @desc request list
// @access private
const getList = async (req,res) => {

    try {
        
    } catch (error) {
        console.log(error)
    }
}

export { send,cancle,accept,reject,getList }