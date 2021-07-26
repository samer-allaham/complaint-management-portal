import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

import axios from 'axios';
const Login = (props) => {

    const [email, setEmail] = useState();

    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);

    const submit = async (e) => {
        e.preventDefault()


        const res = await fetch('https://cmpbackend.herokuapp.com/api/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            SameSite: 'Strict',
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })

        }).then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then(data => {
            console.log("Success");
            console.log(data);
        })
        .catch(error => {
            if (typeof error.json === "function") {
                error.json().then(jsonError => {
                    console.log("Json error from API");
                    console.log(jsonError);
                    alert(jsonError.detail);
                }).catch(genericError => {
                    console.log("Generic error from API");
                    console.log(error.statusText);
                });
            } else {
                console.log("Fetch error");
                console.log(error);
            }
        });

    axios
    .get('https://cmpbackend.herokuapp.com/api/auth/user/',{withCredentials:true})
    .then(res=>{
      console.log(res.data);
      if (res.data.name) {
       
     
        props.onNameChange(res.data.name)
        props.onRoleChange(res.data.status)
        props.onIdChange(res.data.id)
        
      }else if(!res.name){
        props.onNameChange('')

      }
    })
    .catch(error=>{
    //   alert("wrong email or password, try again ")
      console.log(error);
    })



        setRedirect(true);

    }

    if (redirect) {
        return <Redirect to="/" />
    }



    return (
        <div>


            <form onSubmit={submit}>

                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>


                <input type="email" className="form-control" placeholder="name@example.com" required onChange={e => setEmail(e.target.value)} />


                <input type="password" className="form-control" placeholder="Password" onChange={e => setPassword(e.target.value)} required />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>

            </form>

        </div>
    );
}


export default Login