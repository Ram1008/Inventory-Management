import React, { useState } from 'react'

const ChangePassword = () => {

    const [cridentials, setCridentials] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setCridentials({ ...cridentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/resetpassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: cridentials.email, password: cridentials.password })
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
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} value={cridentials.password} name="password" id="password" />
                    </div>

                    <button type="submit" className="btn btn-outline-success" >Submit</button>
                </div>
            </form>

        </div>

    )
}
export default ChangePassword;