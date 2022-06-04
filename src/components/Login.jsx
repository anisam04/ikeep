import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    //useNavigate hook to access the localstorage history for navigation
    const history = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZTgxMWE3M2E5YTk0MGVhZWExZDg0In0sImlhdCI6MTY1MzUyNjYzNn0.qgoreuxnJbwloWXbd6G9D1hQxhWpBDBmrus-81qNey0'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        })
        const json = await response.json()
        console.log(json)
        if (json.success){
            //if login credentials are correct, redirect to the Home Page
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
        <div className="container mt-5">
            <h3>Please Login to use ikeep</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={credentials.email} type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange}  />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={credentials.password} type="password" className="form-control" name="password" id="password" placeholder="Password"  onChange={onChange}  />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
                <h6 className="mt-2">New to iKeep? <a href="/signup">Sign Up</a></h6>
            </form>
        </div>
    );
}

