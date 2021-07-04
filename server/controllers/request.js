import User from '../models/User.js'
import Request from '../models/request.js'
import Friend from '../models/friend.js'


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
    const reciever_id = req.body.id
    try {
        res.status(201).json({reciever_id})
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