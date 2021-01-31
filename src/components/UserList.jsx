import React from "react";
import "../styles/UserList.css";
// this UserList component creates the list of random employees
const UserList = props => {
  // change the API returned birthday format to a more readable format
  let birthdayDate = new Date(props.dob.date).toLocaleDateString("en-US");
  return (
    <>
      <div className="row text-center">
        <div className="col-12">
          <div className="row ml-1">
            <div className="col text-break p-0 p-sm-2">
              <img src={props.picture.medium} alt={`random user ${props.name.first}`}></img>
            </div>
            <div className="col text-break">
              <p>{props.name.first} {props.name.last}</p>
            </div>
            <div className="col text-break">
              <p>{props.cell}</p>
            </div>
            <div className="col text-break">
              <p>{props.email}</p>
            </div>
            <div className="col text-break">
              <p> {birthdayDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;