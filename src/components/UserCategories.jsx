import React from "react";

const UserCategories = props => {
  return (
    <div className="row text-center">
      <div className="col">
        <h3 className="text-center">Photo</h3>
      </div>
      <div className="col">
        <span onClick={props.handleSort}><h3 className="text-center">Name</h3></span>
      </div>
      <div className="col">
        <h3 className="text-center">Phone Number</h3>
      </div>
      <div className="col">
        <h3 className="text-center">Email</h3>
      </div>
      <div className="col">
        <h3 className="text-center">Birthday</h3>
      </div>
    </div>
  )
};

export default UserCategories;