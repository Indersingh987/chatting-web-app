import User from "../models/User.js"
import Request from "../models/request.js"
import Friend from "../models/friend.js"
import  mongoose  from 'mongoose'
import isEmpty from 'is-empty'

//filter function

const filter = (arr,from) => {
    if(!arr.length) return []
    let a = []
    for(let i=0;i < arr.length;i++){
        if( JSON.stringify(arr[i]._id) !=  JSON.stringify(from)){
            a.push(arr[i])
        }
    }
    return a
}


// @route GET /api/users
// @desc fetching all users
// @access private
const getUsers = async (req,res) => {
    const id  = req.userId
    let list = []

    try {
        const isValid = await mongoose.Types.ObjectId.isValid(id)
        if(isValid){
            let users = await User.find()
            users = users.filter(user=>user._id != id)
            const loginUser = await User.findById(id)
            const requestDocIds = loginUser.requestList
            const friendDocIds = loginUser.friendList
            let requestDocs = []
            let friendDocs = []

            for(let i=0; i <requestDocIds.length;i++){
                const doc = await Request.findById(loginUser.requestList[i])
                requestDocs.push(doc)
            }

            for(let i=0; i <friendDocIds.length;i++){
                const doc = await Friend.findById(loginUser.friendList[i])
                friendDocs.push(doc)
            }

            //filtering users already in friend list
            if(friendDocs.length){
                let arr = []
                for(let i=0; i < users.length; i++){
                    for(let j=0; j<friendDocs.length; j++){
                        if(JSON.stringify(friendDocs[j].user1) == JSON.stringify(users[i]._id) || JSON.stringify(friendDocs[j].user2) == JSON.stringify(users[i]._id)){
                            break
                        }else if(j == Number(friendDocs.length - Number(1))){
                            arr.push(users[i])
                            break
                        }else{
                            continue
                        }
                    }
                }
                users = arr
            }

            if(requestDocIds.length ){
                for(let i=0; i <requestDocs.length;i++){
                    let arr = []
                    arr = filter(users,requestDocs[i].from)
                    users=[]
                    users=arr;
                }

                for(let i=0;i<users.length;i++){
                    for(let j=0;j<requestDocs.length;j++){
                        if(JSON.stringify(users[i]._id) == JSON.stringify(requestDocs[j].to)){
                            list.push({
                                user:users[i],
                                isSend:true,
                                btn:true
                            })
                            break;
                        }else if( j < Number(requestDocs.length-Number(1))){
                            continue
                        }else{
                            list.push({
                                user:users[i],
                                isSend:false,
                                btn:true
                            })
                        }
                    }
                }
                
            }else{
                users.map(user=>{
                        list.push({
                            user,
                            isSend:false,
                            btn:true
                        })
                      
                })
            } 
            return res.status(200).json(list)
        }
        res.status(400)
    } catch (error) {
        console.log(error)
    }
    
} 

// @route POST /api/users/search
// @desc search query
// @access private

const search = async (req,res) => {
    const id  = req.userId
    let { searchQuery }  = req.body
    let list = []

    try {
        if(isEmpty(searchQuery)){
            searchQuery = 'a'
        }
        const isValid = await mongoose.Types.ObjectId.isValid(id)
        if(isValid){
            let query = new RegExp(searchQuery,"i")
            let users = await User.find({$or:[{"name":query},{"email":query}]})

            if(!users.length){
                res.status(201).json(list)
            }

            users = users.filter(user=>user._id != id)
            const loginUser = await User.findById(id)
            const requestDocIds = loginUser.requestList
            const friendDocIds = loginUser.friendList

            let requestDocs = []
            let friendDocs = []

            for(let i=0; i <requestDocIds.length;i++){
                const doc = await Request.findById(loginUser.requestList[i])
                requestDocs.push(doc)
            }

            for(let i=0; i <friendDocIds.length;i++){
                const doc = await Friend.findById(loginUser.friendList[i])
                friendDocs.push(doc)
            }

           //filtering users already in friend list
           if(friendDocs.length){
            let arr = []
            for(let i=0; i < users.length; i++){
                for(let j=0; j<friendDocs.length; j++){
                    if(JSON.stringify(friendDocs[j].user1) == JSON.stringify(users[i]._id) || JSON.stringify(friendDocs[j].user2) == JSON.stringify(users[i]._id)){
                        break
                    }else if(j == Number(friendDocs.length - Number(1))){
                        arr.push(users[i])
                        break
                    }else{
                        continue
                    }
                }
            }
            users = arr
        }

            //setting isSend and filtring accroding to request list
            if(requestDocIds.length){
                for(let i=0; i <requestDocs.length;i++){
                    let arr = []
                    arr = filter(users,requestDocs[i].from)
                    users=[]
                    users=arr;
                }
                
                for(let i=0;i<users.length;i++){
                    for(let j=0;j<requestDocs.length;j++){
                        if(JSON.stringify(users[i]._id) == JSON.stringify(requestDocs[j].to)){
                            list.push({
                                user:users[i],
                                isSend:true,
                                btn:true
                            })
                            break;
                        }else if( j < Number(requestDocs.length-Number(1))){
                            continue
                        }else{
                            list.push({
                                user:users[i],
                                isSend:false,
                                btn:true
                            })
                        }
                    }
                }
                
            } else{
                users.map(user=>{
                        list.push({
                            user,
                            isSend:false,
                            btn:true
                        })
                      
                })
            } 
            
            return res.status(201).json(list)
        }
        res.status(400)
    } catch (error) {
        console.log(error)
    }
}

export {getUsers,search}