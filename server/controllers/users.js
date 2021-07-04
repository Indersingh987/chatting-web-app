import User from "../models/User.js"
import Request from "../models/request.js"
import  mongoose  from 'mongoose'
import isEmpty from 'is-empty'

//filter function

const filter = (arr,from) => {
    if(!arr.length) return []
    let a = []
    for(let i=0;i < arr.length;i++){
        if(arr[i]._id != from){
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
            let requestDocs = []

            for(let i=0; i <requestDocIds.length;i++){
                const doc = await Request.findById(loginUser.requestList[i])
                requestDocs.push(doc)
            }
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
                                isSend:true
                            })
                            break;
                        }else if( j < Number(requestDocs.length-Number(1))){
                            continue
                        }else{
                            list.push({
                                user:users[i],
                                isSend:false
                            })
                        }
                    }
                }
                
            }else{
                users.map(user=>{
                        list.push({
                            user,
                            isSend:false
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
                users = await User.find()
            }

            users = users.filter(user=>user._id != id)
            const loginUser = await User.findById(id)
            const requestDocIds = loginUser.requestList

            let requestDocs = []

            for(let i=0; i <requestDocIds.length;i++){
                const doc = await Request.findById(loginUser.requestList[i])
                requestDocs.push(doc)
            }
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
                                isSend:true
                            })
                            break;
                        }else if( j < Number(requestDocs.length-Number(1))){
                            continue
                        }else{
                            list.push({
                                user:users[i],
                                isSend:false
                            })
                        }
                    }
                }
                
            } else{
                users.map(user=>{
                        list.push({
                            user,
                            isSend:false
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