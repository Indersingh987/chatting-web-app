import User from '../models/User.js'
import Friend from '../models/friend.js'

// @route GET /api/friend
// @desc getting friend list 
// @access private

const getList = async (req,res) => {
    const id = req.userId

    try {
        const loginUser = await User.findById(id)
        const DocIds = loginUser.friendList
        let list = []
        for(let i=0;i<DocIds.length;i++){
            const doc = await Friend.findById(DocIds[i])
            if(JSON.stringify(loginUser._id) == JSON.stringify(doc.user1)){
                const friend = await User.findById(doc.user2)
                list.push(friend)
            }else{
                const friend = await User.findById(doc.user1)
                list.push(friend)
            }
        }
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

export { getList }