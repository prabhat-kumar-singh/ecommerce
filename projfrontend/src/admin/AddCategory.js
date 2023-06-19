import React, {useState} from "react";
import { Link } from "react-router-dom"
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";



const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id, token, {name})
            .then(data =>{
                if(data.error){
                    setError(true);
                }else{
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            })
    }

    const successMessage = () =>{
        if(success){
            return <h4 className="text-success">Category created successfully</h4>
        }
    }
    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to create category</h4>
        }
    }

    const goBack = () =>(
        <div className="mt-5">
            <Link className="btn btn-sm btn-success mb-3" to ="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const myCategoryForm = () => {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the Category</p>
                    <input type="text" value={name} onChange={handleChange} className="form-control my-3000" autoFocus required placeholder="For ex. Summer" />
                    <button className="btn btn-outline-info" onClick={onSubmit}>Create Category</button>
                </div>
            </form>
        )
    }

    return(
        <Base title="Create a caterogy here" description="Add a new category for new tshirts" className="container bg-info p-4">
            <div className="row bg-white rounder">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;