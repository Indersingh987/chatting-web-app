import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Avatar } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../../actions/auth'
import './Header.css'

const Header = ({ screen ,setScreen }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const Logout = (e) => {
        e.preventDefault()
        dispatch(logout(history))
    }

    const setFriendsScreen = (e) => {
        e.preventDefault()
        setScreen({friends:true,requests:false,search:false})
    }

    const setRequestsScreen = (e) => {
        e.preventDefault()
        setScreen({friends:false,requests:true,search:false})
    }

    const setSearchScreen = (e) => {
        e.preventDefault()
        setScreen({friends:false,requests:false,search:true})
    }

    return (
        <div className='header'>
            <div className='header__container'>
                <Avatar />
                <div className='header__middle'>
                    <button className={!screen.friends ? 'header__middle__button':'header__middle__button selected--option'} onClick={setFriendsScreen}>FRIENDS</button>
                    <button className={!screen.requests ? 'header__middle__button':'header__middle__button selected--option'} onClick={setRequestsScreen}>REQUESTS</button>
                    <button className={!screen.search ? 'header__middle__button':'header__middle__button selected--option'} onClick={setSearchScreen}>SEARCH</button>
                </div>
                <ExitToAppIcon className='logout' onClick={Logout}/>
            </div>
        </div>
    )
}

export default Header
