import React,{useEffect, useState } from 'react'

import Header from './header/Header'
import Friends from './friends/Friends'
import Requests from './requests/Requests'
import Search from './search/Search'
import './Home.css'
import { useDispatch } from 'react-redux'
import { getAllUsers } from '../../actions/users'

const Home = () => {
    const [screen, setScreen] = useState({friends:true,requests:false,search:false})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])
    
    return (
        <div className='home'>
            <Header screen={screen} setScreen={setScreen}/>
            {screen.friends && (<Friends />)}
            {screen.requests && (<Requests />)}
            {screen.search && (<Search />)}
        </div>
    )
}

export default Home
