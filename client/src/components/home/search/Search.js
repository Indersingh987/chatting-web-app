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
    let data = useSelector(state=>state.users)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(search(searchQuery))
    }

    const handleRequest = (e,isSend,id,index) => {
        e.preventDefault()
        if(isSend){
            dispatch(cancle(id,index))
        }else{
            dispatch(request(id,index))
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
    
            {data.loading?(<Loading />):!data.users.length ? (<h1>No Result Found</h1>):data.users?.map((obj,index)=>((<div key = {obj.user._id} className='search'>
            <Avatar className='search__img'/>
            <div className='search__info'>
                <p>{obj.user.name}</p>
                <span>{obj.user.email}</span>
            </div>
            {!obj.btn ? (<Loading />):(<button className='search__btn' onClick={e=>handleRequest(e,obj.isSend,obj.user._id,index) }  >{obj.isSend?'Cancle':'Request'}</button>)}
            </div>)))}
        </div>
    )
}

export default Search