import React,{ useEffect } from 'react'
import './Requests.css'
import { Avatar } from '@material-ui/core'
import { useDispatch,useSelector } from 'react-redux'
import { getRequestList, acceptRequest } from '../../../actions/requestList'
import Loading from '../../loading/Loading'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Requests = () => {
    const dispatch = useDispatch()
    let { list,loading } = useSelector(state=>state.requestList)

    useEffect(() => {
        dispatch(getRequestList())
    }, [dispatch])

    const accept = (e,index,id) => {
        e.preventDefault()
        dispatch(acceptRequest(id,index))
    }

    const reject = (e,index,id) => {
        e.preventDefault()
        console.log('reject')
    }

    return (
        <div className='requests'>

            {loading?(<Loading />):!list.length ? (<h1>No Request</h1>):list.map((obj,index)=>
            (<div key={obj.user._id} className='request'>
                <Avatar className='request__img'/>
                <div className='request__info'>
                    <p>{obj.user.name}</p>
                    <span>{obj.user.email}</span>
                </div>
                {!obj.btn?(<Loading />):<div className='request__btn'>
                    <CheckCircleIcon color={'primary'} cursor={'pointer'} onClick={(e)=>accept(e,index,obj.user._id)}/>
                    <CancelIcon color={'secondary'} cursor={'pointer'} onClick={(e)=>reject(e,index,obj.user._id)}/>
                </div>}
            </div>))}
            
        </div>
    )
}

export default Requests
