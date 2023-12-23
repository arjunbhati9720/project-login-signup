'use client'
import { useState } from "react"
import './signup.css';
import axios from 'axios';

const Signup = () => {
    const [data, setData] = useState({
        userName: '',
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

    const signup = async (e) => {
        e.preventDefault()
        let res = await axios.post('/api/user/signup', data)
        console.log(res,'this is response coming from backend')
        setData({
            userName: '',
            email: '',
            password: ''
        })

    }
    return (
        <div> <h1>Signup Page</h1>
            <form>
                <input type="text" onChange={handleChange} value={data.email} name='email' placeholder='Email' id='email' />
                <input type="text" onChange={handleChange} value={data.userName} name='userName' placeholder='UserName' id='userName' />
                <input type="text" onChange={handleChange} value={data.password} name='password' placeholder='Password' id='password' />
                <button type="submit" onClick={signup}>Submit</button>
            </form>
        </div>
    )
}

export default Signup