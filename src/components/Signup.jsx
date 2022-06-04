import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/createuser"
        const { name, email, password } = credentials
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZTgxMWE3M2E5YTk0MGVhZWExZDg0In0sImlhdCI6MTY1MzUyNjYzNn0.qgoreuxnJbwloWXbd6G9D1hQxhWpBDBmrus-81qNey0'
            },
            body: JSON.stringify({ name, email, password })

        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            //if sign up credentials are correct, redirect to the Home Page
            localStorage.setItem('token', json.authtoken)
            history('/')

        } else {
            alert("username and/or password not valid")
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value }
        )
    }
    return (
        <div className="container">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={credentials.name} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter name" onChange={onChange} />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={credentials.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={credentials.password} type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input value={credentials.password} type="password" className="form-control" name="cpassword" id="cpassword" placeholder="Password" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

