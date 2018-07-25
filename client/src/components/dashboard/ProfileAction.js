import React from "react";
import { Link } from "react-router-dom";

const ProfileAction = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/editProfile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/addCats" className="btn btn-light">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Cat
      </Link>
    </div>
  );
};

export default ProfileAction;
