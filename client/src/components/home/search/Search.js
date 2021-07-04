import React,{useEffect, useState} from 'react'
import './Search.css'
import { Avatar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../loading/Loading'
import { search } from '../../../actions/users'
import { getAllUsers,cancle,request } from '../../../actions/users'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const dispatch = useDispatch() 
    let users = useSelector(state=>state.users)

    useEffect(() => {
        console.log('action dispathed')
        dispatch(getAllUsers())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(search(searchQuery))
    }

    const handleRequest = (e,isSend,id) => {
        e.preventDefault()
        if(isSend){
            dispatch(cancle(id))
        }else{
            dispatch(request(id))
        }
    }

    return (
        <div className='search-main'>

            <div className='search-main__header'>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder='Search...' />
                    <button type='submit' >Search</button> 
                </form>
            </div>
    
            {!users.length?(<Loading />):users.map(obj=>((<div key = {obj.user._id} className='search'>
            <Avatar className='search__img'/>
            <div className='search__info'>
                <p>{obj.user.name}</p>
                <span>{obj.user.email}</span>
            </div>
            <button className='search__btn' onClick={e=>handleRequest(e,obj.isSend,obj.user._id)}>{obj.isSend?'Cancle':'Request'}</button>
            </div>)))}
           
        </div>
    )
}

export default Search