import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

const Register = () => {
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[status,setStatus]=useState();
    const[redirect,setRedirect]=useState(false);
    const submit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:name}));
        

        await fetch('http://127.0.0.1:8000/api/auth/register/',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:name,
                email:email,
                password:password,
                status:status
            })
        }).then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            console.log('from register',response);
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
                    alert(jsonError.email[0]);
                }).catch(genericError => {
                    console.log("Generic error from API");
                    console.log(error.statusText);
                });
            } else {
                console.log("Fetch error");
                console.log(error);
            }
        });

        

        // fetch("api/v1/demo", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         "data": "demo"
        //     })
        // })
            // .then(response => {
            //     if (!response.ok) {
            //         return Promise.reject(response);
            //     }
            //     return response.json();
            // })
            // .then(data => {
            //     console.log("Success");
            //     console.log(data);
            // })
            // .catch(error => {
            //     if (typeof error.json === "function") {
            //         error.json().then(jsonError => {
            //             console.log("Json error from API");
            //             console.log(jsonError);
            //         }).catch(genericError => {
            //             console.log("Generic error from API");
            //             console.log(error.statusText);
            //         });
            //     } else {
            //         console.log("Fetch error");
            //         console.log(error);
            //     }
            // });


        setRedirect(true);




    }

    if (redirect) {
        return <Redirect to="/login/"/>
    }




    return (
        <div>
            <form onSubmit={submit}>

                <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                <input type="text" className="form-control" placeholder="Name" required onChange={e=>setName(e.target.value)}/>

                <input type="email" className="form-control" placeholder="Email Address" 
                onChange={e=>setEmail(e.target.value)}
                required />


                <input type="password" className="form-control" placeholder="Password"
                onChange={e=>setPassword(e.target.value)}
                 required />

{/* CUSTOMER = 1
    ADMIN = 2 */}


                <select id="role" className="form-control"  onChange={e=>setStatus(e.target.value)}>
                <option value="1">CUSTOMER</option>
                <option value="2">ADMIN</option>

                </select>



                <button className="w-100 btn btn-lg btn-primary" type="submit">submit</button>

            </form>
        </div>
    );
}


export default Register