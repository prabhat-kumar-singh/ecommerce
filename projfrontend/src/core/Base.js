import React from "react";

import Menu from "./Menu";

const Base = ({
    title="My title",
    description="My Description",
    className = "bg-dark text-white p-4",
    children
}) => {
    return(
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center py-0 mb-0">
                    <h2 className="display-4" >{title}</h2>
                    <p className="">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>

            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-center">
                    <h4>If you have any doubt feel free to reach out!</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container-fluid">
                    <span className="text-muted">MERN Bootcamp</span>
                </div>
            </footer>
        </div>
    )
}

export default Base;