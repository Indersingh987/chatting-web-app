import Friend from '../models/friend.js'
import Message from '../models/message.js'
import User from '../models/User.js'

const getList = async (req,res) => {
    const loginUserId = req.userId
    const friendId = req.body.id
    
    try {
        const friend = await User.findById(friendId)
        const loginUser = await User.findById(loginUserId)
        for(let i=0; i< loginUser.friendList.length; i++){
            for(let j=0; j<friend.friendList.length; j++){
                if(JSON.stringify(loginUser.friendList[i]) === JSON.stringify(friend.friendList[j])){
                    const friendDoc = await Friend.findById(loginUser.friendList[i])
                    let list = []
                    for(let k=0; k<friendDoc.messages.length ;k++){
                        const messageDoc = await Message.findById(friendDoc.messages[k])
                        if(JSON.stringify(messageDoc.from) === JSON.stringify(loginUser._id)){
                            list.push({id:messageDoc._id,
                                isSender:true,
                                sender:loginUser.name,
                                msg:messageDoc.text,
                                timestamp:messageDoc.timestamp
                            })
                        }else{
                            list.push({id:messageDoc._id,
                                isSender:false,
                                sender:friend.name,
                                msg:messageDoc.text,
                                timestamp:messageDoc.timestamp
                            })
                        }
                    }
                    return res.status(200).json({list,friend})
                }
            }
        }

        return res.status(404)
    } catch (error) {
        console.log(err)
        res.status(500).json(error.message)
    }
}


const create = async (req,res) => {
        const text = req.body.text
        const time = req.body.time
        const friendId = req.body.id
        const loginUserId = req.userId

        try {
            const friend = await User.findById(friendId)
            const loginUser = await User.findById(loginUserId)

            const messageDoc = await Message.create({
                from:loginUser._id,
                to:friend._id,
                text:text,
                timestamp:time
            })

            for(let i=0; i< loginUser.friendList.length; i++){
                for(let j=0; j<friend.friendList.length; j++){
                    if(JSON.stringify(loginUser.friendList[i]) === JSON.stringify(friend.friendList[j])){
                        const friendDoc = await Friend.findById(loginUser.friendList[i])
                        friendDoc.messages.push(messageDoc._id)
                        await friendDoc.save()
                    }
                }
            }
            res.status(201).json({
                id:messageDoc._id,
                isSender:true,
                sender:loginUser.name,
                msg:messageDoc.text,
                timestamp:messageDoc.timestamp
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error.message)
        }
}

export { getList,create }