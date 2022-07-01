import React from 'react'
import { Link , useNavigate} from 'react-router-dom';


const Navbar = () => {

    let navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate("/login")
        
      }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Inventory Management</Link>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-outline-success mx-2" to='/login' role="button">Login</Link>
                        <Link className="btn btn-outline-success mx-2" to='/signup' role="button">Signup</Link>
                    </form> : 
                    <div>
                    <button onClick={handleLogout} className="btn btn-outline-success mx-2">Logout</button>
                    <Link className="btn btn-outline-success mx-2" to='/changepassword'>Change Password</Link>
                    </div>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar;