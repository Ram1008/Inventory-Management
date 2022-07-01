import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const ForgotPassword = () => {
    const [cridentials, setCridentials] = useState({ email: "" })
    const onChange = (e) => {
        setCridentials({ ...cridentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/emailsend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: cridentials.email })
            });
            const json = await response.json();
            console.log(json);
        }
        catch (err) {
            alert("Invalid Credentials");
        }
    }
  return (
    <div className="card" style={{ "width": "18 rem" }}>
            <form onSubmit={handleSubmit}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} value={cridentials.email} id="email" name="email" placeholder="email@email.com" aria-describedby="emailHelp" />
                    </div>
                    
                    <Link type="submit" className="btn btn-outline-success" to="/resetpassword" >Submit</Link>
                </div>
            </form>

        </div>
  )
}
export default ForgotPassword;