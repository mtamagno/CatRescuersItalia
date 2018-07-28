import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCats from "./ProfileCats";
import Spinner from "../common/Spinner";
import { getProfileByHandle } from "../../actions/profileAction";
import { getCatsByProfileHandle } from "../../actions/catsActions";
var ciao = 0;

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
      this.props.getCatsByProfileHandle(this.props.match.params.handle);
    }
  }

  render() {
    const { profile, Ploading } = this.props.profile;
    const { cats, Cloading } = this.props.cats;

    let profileContent;
    console.log(this.props);

    if (profile === null || Ploading || cats == null || Cloading) {
      profileContent = <Spinner />;
    } else {
      console.log(cats);
      profileContent = (
        <div>
          <div className="row">
            <div className="md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back to Profiles
              </Link>
            </div>
            <div className="md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCats cats={cats} />
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getCatsByProfileHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  cats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  cats: state.cats
});

export default connect(
  mapStateToProps,
  { getProfileByHandle, getCatsByProfileHandle }
)(Profile);
