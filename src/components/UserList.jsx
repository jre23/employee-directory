import React from "react";

const UserList = props => {
  let birthdayDate = new Date(props.dob.date).toLocaleDateString("en-US");
  return (
    <>
      <div className="row text-center">
        <div className="col-12">
          <div className="row ml-1">
            <div className="col">
              <img src={props.picture.medium} alt={`random user ${props.name.first}`}></img>
            </div>
            <div className="col">
              {props.name.first} {props.name.last}
            </div>
            <div className="col">
              {props.cell}
            </div>
            <div className="col">
              {props.email}
            </div>
            <div className="col">
              {birthdayDate}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;