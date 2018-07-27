import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
  getCats
} from "../../actions/profileAction";
import Spinner from "../common/Spinner";
import ProfileAction from "../dashboard/ProfileAction";
import { deleteCats } from "../../actions/profileAction";

class mainDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getCats();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  onDeleteClickCat(cat_id) {
    console.log(this.props);
    this.props.deleteCats(cat_id);
    this.props.getCats();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const profileCats = this.props.profile.profileCats;
    let mainDashboardContent;
    //const cats = this.props.getCats();
    //console.log(this.props.profile);

    if (profile === null || loading || profileCats === null) {
      mainDashboardContent = <Spinner />;
    } else {
      mainDashboardContent = <h2> Hellow </h2>;
      // console.log(this);
      const cat = profileCats.map(cat => (
        <tr style={{ verticalAlign: "middle" }} key={cat._id}>
          <td>
            <img
              style={{ width: "100px", height: "100px" }}
              src={cat.photo}
              alt=""
              className="img-thumbnail"
            />
          </td>
          <td style={{ verticalAlign: "middle" }}>{cat.name}</td>
          <td style={{ verticalAlign: "middle" }}>{cat.age}</td>
          <td style={{ verticalAlign: "middle" }}>{cat.location}</td>
          <td style={{ verticalAlign: "middle" }}>
            <button
              onClick={this.onDeleteClickCat.bind(this, cat._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));

      if (Object.keys(profile).length > 0) {
        mainDashboardContent = (
          <div>
            <p className="lead text-muted">
              Hey <Link to={`/profile/${profile.handle}`}>{user.name} </Link>
            </p>
            <ProfileAction />
            <div>
              <h3>Cats in Need</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th />
                    <th>Name</th>
                    <th>age</th>
                    <th>Location</th>
                    <th />
                  </tr>
                </thead>
                <tbody>{cat}</tbody>
              </table>
            </div>
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
            <Link to="/createProfile" className="btn btn-lg brn-info">
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
  deleteCats: PropTypes.func.isRequired,
  getCats: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  profileCats: state.profile.profileCats,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getCats, deleteCats }
)(mainDashboard);
