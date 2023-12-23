'use client'
import { useState } from "react"
import './login.css'
import axios from "axios"
const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }
    const login = async(e) =>{
        e.preventDefault();
        const res = await axios.post('/api/user/login',data);
        console.log(res,' this is res form backend')
    }
    return (
        <div> <h1>Login Page</h1>
            <form>
                <input type="text" onChange={handleChange} value={data.email} name='email' placeholder='Email' id='email' />
                <input type="text" onChange={handleChange} value={data.password} name='password' placeholder='Password' id='password' />
                <input type="button" value="Login" onClick={login} />
            </form>
        </div>
    )
}

export default Login

