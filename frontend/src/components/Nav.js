
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Nav = (props) => {

    // const { name, setting } = this.props;
    // const setName=()=>{props.name=''};
    // console.log('YOOOOOOOOO',props);
    // const[name,setName]=useState();

    const logout=async()=>{
        await fetch('https://cmpbackend.herokuapp.com/api/auth/logout/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            SameSite:'Strict',
            credentials:'include',
        });
        props.onNameChange('')
    }

    let menu;
    if (props.name === '') {
        menu = (<ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
            </li>

        </ul>)
    }else{

        menu = (<ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
           
                <Link className="nav-link active" aria-current="page" to="/login" onClick={logout}>Logout</Link>
                
                <span className="nav-link active">
                Hi there {props.name}
                </span>
            </li>


        </ul>)

    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>

                    <div className="collapse navbar-collapse" id="navbarCollapse">

                        {menu}


                    </div>
                </div>
            </nav>

        </div>
    );
}


export default Nav