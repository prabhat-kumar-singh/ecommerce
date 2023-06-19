import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategory, updateCategory } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateCategory = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error:"",
    success:""
  });

  const {name, error, success} = values;

  const preload = categoryId => {
    getCategory(categoryId).then(data => {
      //console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: data.name,
          error: "",
          success:""
        });
      }
    });
  };


  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  //TODO: work on it
  const onSubmit = event => {
    event.preventDefault();
    updateCategory(match.params.categoryId, user._id, token, {name: name})
        .then(data =>{
            if(data.error){
                setValues({...values, error: data.error, success:false});
            }else{
                setValues({...values, success: true})
            }
        })
  };

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value});
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      <h4>updated successfully</h4>
    </div>
  );

  return (
    <Base
      title="Update Category!"
      description="Welcome Admin"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          <form className="form-group">
          <input value={name} className="form-control mt-3" type="text" onChange={handleChange("name")} />
          <button className="btn btn-success form-control mt-3" onClick={onSubmit}>Update</button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
