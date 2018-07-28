import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is_empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{profile.user.name}'s Bio</h3>
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>No bio at the moment</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
