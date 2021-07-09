import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getFriendList } from '../../../actions/friendList'
import { useHistory } from 'react-router-dom'
import './Friends.css'
import { Avatar } from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat';
import Loading from '../../loading/Loading'

const Friends = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    let {list,loading} = useSelector(state=> state.friendList)

    useEffect(() => {
        dispatch(getFriendList())
    }, [dispatch])

    const handleChat = (e,id) => {
        e.preventDefault()
        history.push(`/room/${id}`)
    }

    return (
        <div className='friends'>
            
           {loading?(<Loading />):!list.length?(<h1>Make Some Friends</h1>):list.map(user=>
            ( <div key={user._id} className='friend'>
                <Avatar />
                <div className='friend__info'>
                    <p>{user.name}</p>
                    <span>{user.email}</span>
                </div>
                <ChatIcon className='friend__chat-icon' onClick={e=>handleChat(e,user._id)}/>
             </div>))}

        </div>
    )
}

export default Friends
