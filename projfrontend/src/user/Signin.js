import React, {useState} from "react";
import {Redirect} from "react-router-dom"

import Base from "../core/Base";

import { authetication, isAuthenticated, signin } from "../auth/helper";

const Signin = () => {

    const [userData, setUserData] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect: false
    });

    const {email, password, error, loading, didRedirect} = userData;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
        setUserData({...userData, [name]: event.target.value});
    }

    const onSubmit = event => {
        event.preventDefault();
        setUserData({...userData, error:false, loading:true})
        signin({email, password})
            .then(data => {
                if(data.error){
                    setUserData({...userData, error:data.error, loading:false});
                }else{
                    authetication(data, ()=>{
                        setUserData({...userData, didRedirect: true})
                    })
                    setUserData({...userData, email:"", password:"", error:""})
                }
            })
            .catch(err => console.log("Signin request failed"))
    }

    const performRedirect = () => {
        if(didRedirect){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }

        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return(
            <div className="alert alert-danger" style={{display: error?"":"none"}}>
            {error}
            </div>
        )
    }

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="email" value={email} className="form-control" onChange={handleChange("email")} />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" value={password} className="form-control"  onChange={handleChange("password")}/>
                        </div>

                        <button className="btn btn-success btn-block form-control" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign in page" description="A page for user to sign in">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
        </Base>
    )
}

export default Signin;