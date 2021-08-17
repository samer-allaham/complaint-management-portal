
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Nav = (props) => {

    // logout and delete token from cookies

    const logout = async () => {
        await fetch('https://cmpbackend.herokuapp.com/api/auth/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            SameSite: 'Strict',
            credentials: 'include',
        });
        props.onNameChange('')
    }

    // change the view based if the user is logged in or not
    let menu;
    if (props.name === '') {
        menu = (


            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                    </li>
                </ul>
            </div>

        )
    } else {

        menu = (


            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login" onClick={logout}>Logout</Link>
                    </li>
                </ul>
                <span className="navbar-text text-dark h5">
                    Hi there {props.name}
                </span>
            </div>

        )

    }
    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Complaint Manegment system</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <li className="fas fa-bars"></li>
                    </button>
                    {menu}
                </div>
            </nav>


        </div>
    );
}


export default Nav