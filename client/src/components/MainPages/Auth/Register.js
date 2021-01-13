import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await axios.post('/user/register', {...user})

            localStorage.setItem('firstLogin', true)

            window.location.href = '/'

        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                
                <input type="text" name="name" placeholder="Name" value={user.name} onChange={onChangeInput} required />
                
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={onChangeInput} required />
                
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={onChangeInput} required autoComplete="on" />

                <div className="row">
                    <button type="submit">Register</button>
                    
                    <Link to="/login">Login</Link>
                </div>

            </form>
        </div>
    )
}

export default Register
