import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="col-md-12 text-center">
        <h1 className="display-3 mb-4">Cats Rescuers</h1>
        <p className="lead"> Hello {user.name}, is nice to see you here!</p>

        <p className="lead">
          {" "}
          Share posts of cats in needs and get help from others!
        </p>
      </div>
    );

    const guestLinks = (
      <div className="col-md-12 text-center">
        <h1 className="display-3 mb-4">Cats Rescuers</h1>
        <p className="lead">
          {" "}
          Want to help cats? share posts of cats in needs and get help from
          others!
        </p>
        <hr />
        <Link to="register" className="btn btn-lg btn-info mr-2">
          Sign Up
        </Link>
        <Link to="login" className="btn btn-lg btn-light">
          Login
        </Link>
      </div>
    );

    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
