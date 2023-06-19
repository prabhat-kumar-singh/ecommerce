import React, { useState } from "react";
import {Link} from "react-router-dom"

import Base from "../core/Base";

import {signup} from "../auth/helper/index"

const Signup = () => {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    const {name, email, password, error, success} = user;

    const handleChange = name => event => {
        setUser({...user, [name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setUser({...user, error:false})
        signup({name, email, password})
            .then(data => {
                if(data.error){
                    setUser({...user, error:data.error, success:false});
                }else{
                    setUser({...user, name:"", email:"", password:"", error:"", success:true})
                }
            })
            .catch(err => console.log("error in signup", err))
    }

    const successMessage = () => {
        return(
            <div className="alert alert-success" style={{display: success?"":"none"}}>
            New account was create Successfully. Please <Link to="/signin">Login here</Link>
            </div>
        )
    }

    const errorMessage = () => {
        return(
            <div className="alert alert-danger" style={{display: error?"":"none"}}>
            {error}
            </div>
        )
    }

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" value={name} className="form-control" onChange={handleChange("name")} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" value={email} className="form-control" onChange={handleChange("email")}  />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value={password} className="form-control" onChange={handleChange("password")} />
                        </div>

                        <button className="btn btn-success btn-block form-control" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return(
        <Base title="Sign up page" description="A page for user to sign up">
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
        </Base>
    )
}

export default Signup;