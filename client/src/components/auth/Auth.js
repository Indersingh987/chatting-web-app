import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Auth.css'
import LockIcon from '@material-ui/icons/Lock';
import { login,register } from '../../actions/auth'

const initialState={
    name:'',
    email:'',
    password:'',
    password2:''
}

const Auth = () => {
    const [formData, setFormData] = useState(initialState)
    const [isLogin,setIsLogin] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch()
    const errors = useSelector(state=>state.auth)

    const handleFormData = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isLogin){
            dispatch(login(formData,history))
        }else{
            dispatch(register(formData,history))
        }
        // setRedirect(prev=>!prev)
        setFormData({name:'',email:'',password:'',password2:''})
    }

    const handleToggle = (e) => {
        e.preventDefault()
        setIsLogin(isLogin?false:true)
    }

    return (
        <div className='auth'>
            <p>{isLogin?'Login':'Register'} <LockIcon className='auth__icon' /></p>
            <form className='form' onSubmit={handleSubmit}>

                {!isLogin && (<input name='name' value={formData.name} onChange={handleFormData} type='text' placeholder='Name' required/>)}

                <input name='email' value={formData.email} onChange={handleFormData} type='email' placeholder='Email' required/>
                <span className='red'>{errors?.email}</span>

                <input name='password' value={formData.password} onChange={handleFormData} type='password' placeholder='Password' required/>
                <span className='red'>{errors?.password}</span>

                {!isLogin && (<input name='password2' value={formData.password2} onChange={handleFormData} type='password' placeholder='Confitm Password' required/>)}

                <button type='submit'> {isLogin?'login':'Register'} </button>
            </form>

            <span> {isLogin?'Do not have an account? ':'Already have an account? '}<button onClick={handleToggle}>{isLogin?'register':'login'}</button> </span>
        </div>
    )
}

export default Auth
