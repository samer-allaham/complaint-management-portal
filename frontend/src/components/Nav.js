
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


            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                    </li>
                </ul>
            </div>

        )
    } else {

        menu = (


            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/login" onClick={logout}>Logout</Link>
                    </li>
                </ul>
                <span class="navbar-text text-dark h5">
                    Hi there {props.name}
                </span>
            </div>

        )

    }
    return (
        <div>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Complaint Manegment system</Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarText"
                        aria-controls="navbarText"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>
                    {menu}
                </div>
            </nav>


        </div>
    );
}


export default Nav