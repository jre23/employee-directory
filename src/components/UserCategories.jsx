import React from "react";
// this UserCategories component creates the column titles and handles the sorting of the list by name
const UserCategories = props => {
  return (
    <div className="row text-center">
      <div className="col">
        <h3 className="text-center">Photo</h3>
      </div>
      <div className="col">
        <span onClick={props.handleSort}><h3 className="text-center" value="name">Name</h3></span>
      </div>
      <div className="col">
        <span onClick={props.handleSort}>
          <h3 className="text-center" value="phone">Phone Number</h3></span>
      </div>
      <div className="col">
        <span onClick={props.handleSort}>
          <h3 className="text-center" value="email">Email</h3></span>
      </div>
      <div className="col">
        <span onClick={props.handleSort}>
          <h3 className="text-center" value="birthday">Birthday</h3></span>
      </div>
    </div>
  )
};

export default UserCategories;