import React,{useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../api'

const Home = () => {
    const history = useHistory()

    useEffect(() => {
        api.get('api/users/user')
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }, [])

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('user')
        localStorage.clear()
        history.push('/')
    }
    
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Home
