import React,{useEffect,useState} from 'react'
import './Room.css'
import { Avatar } from '@material-ui/core'
import { useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router'
import {getList,create} from '../../actions/room'
import Loading from '../loading/Loading'
import isEmpty from 'is-empty'
import moment from 'moment'
import Pusher from 'pusher-js'

const Room = () => {
    let {list,friend,loading} = useSelector(state=>state.room)
    const [List, setList] = useState(useSelector(state=>state.room.list))
    const [length,setLength] = useState(-1)
    const dispatch = useDispatch()
    const [text,setText] = useState('')
    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem(user))

    useEffect(() => {
        dispatch(getList(id))
    }, [dispatch,id])


    useEffect(() => {
        setList(list)
        setLength(Number(list.length-Number(1)))
    }, [list])

    useEffect(() => {
        const pusher = new Pusher('6e3173648537bdc9fd8c', {
            cluster: 'ap2'
        });
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
            if(data.senderId === id && data.recieverId === user._id){
                data.isSender = false
                setList(prev=>[...prev,data])
            }else{
                data.isSender = true
                setList(prev=>[...prev,data])
            }
         });

        return () => {
            channel.unbind_all()
            channel.unsubscribe()
        }
    }, [list,id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const time = moment().format('h:mm a')
        if(!isEmpty(text)){
            dispatch(create(id,text,time))
        }
        setText('')
    }

    const handleScroll = e =>{
        if(List.length !== length){
            e.target.scrollTop = e.target.scrollHeight
            setLength(List.length)
        }
    }

    return (
        <div className='room'>
           <div className='room__container'>
               {/* header */}
               <div className='room__header'>
                   <Avatar />
                   {!friend?(<Loading />):
                   (<div className='room__header__info'>
                        <p>{friend.name}</p>
                        <span>{friend.email}</span>
                    </div>)}
               </div>

               {/* chat box */}
               <div className='room__chat' onScroll={handleScroll}>
                   {loading?<Loading margin={'auto'} />:!List.length?<h1>Send Hii</h1>:List.map(message=>
                    (<div key={message.id} className={`room__message ${message.isSender && 'message-sender'}`}>
                        <p>{message.msg}</p>
                        <span>{message.timestamp}</span>
                    </div>))}
               </div>

               {/* footer */}
                   <form className='room__footer' onSubmit={handleSubmit}>
                       <input value={text} onChange={e=>setText(e.target.value)} type='text' placeholder='Send Message...'/>
                       <button type='submit'>Send</button>
                   </form>
           </div>
        </div>
    )
}

export default Room
