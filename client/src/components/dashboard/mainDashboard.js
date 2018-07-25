import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileAction from "../dashboard/ProfileAction";
import Cats from "./Cats";

class mainDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let mainDashboardContent;

    if (profile === null || loading) {
      mainDashboardContent = <Spinner />;
    } else {
      mainDashboardContent = <h2> Hellow </h2>;
      if (Object.keys(profile).length > 0) {
        mainDashboardContent = (
          <div>
            <p className="lead text-muted">
              Hey <Link to={`/profile/${profile.handle}`}>{user.name} </Link>
            </p>
            <ProfileAction />
            <Cats cats={profile.cats} />
            {/*TODO: cats*/}
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        mainDashboardContent = (
          <div
            style={{
              itemAlign: "center",
              textAlign: "center",
              marginTop: "8%",
              marginBottom: "8%"
            }}
          >
            <p className="lead text-muted">Hey {user.name} </p>
            <Spinner />
            <p>you did not create your profile yet</p>
            <Link to="/create-profile" className="btn btn-lg brn-info">
              Create it here!
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {mainDashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

mainDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(mainDashboard);
