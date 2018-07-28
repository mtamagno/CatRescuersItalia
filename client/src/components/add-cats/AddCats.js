import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/textFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCats } from "../../actions/profileAction";
import isEmpty from "../../validation/is_empty";

class AddCats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      photo: "",
      name: "",
      color: "",
      age: "",
      telephone: "",
      email: "",
      description: "",
      fivN: false,
      felvN: false,
      needAdoption: false,
      race: "",
      vaxins: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (isEmpty(this.state.photo)) this.state.photo = "/cat-icon.gif";
    const catData = {
      handle: this.state.handle,
      photo: this.state.photo,
      name: this.state.name,
      color: this.state.color,
      age: this.state.age,
      telephone: this.state.telephone,
      email: this.state.email,
      description: this.state.description,
      fivN: this.state.fivN,
      felvN: this.state.felvN,
      needAdoption: this.state.needAdoption,
      race: this.state.race,
      vaxins: this.state.vaxins,
      errors: this.state.errors,
      disabled: this.state.disabled
    };
    this.props.addCats(catData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="addCat">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn brn-light">
                Back
              </Link>
              <h1 className="display-4 text-ceter">Add cat</h1>
              <p className="lead text-ceter">
                Add a cat a need to your profile!
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <h3 style={{ marginTop: "10%", marginBottom: "3%" }}>
                  Personal Info
                </h3>
                <hr />
                <TextFieldGroup
                  placeholder="* Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Cat's Handle"
                />
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                  info="Cat's Name"
                />
                <TextFieldGroup
                  placeholder="* Photo-link"
                  name="photo"
                  value={this.state.photo}
                  onChange={this.onChange}
                  error={errors.photo}
                  info="The cat in need profile picture"
                />

                <TextFieldGroup
                  placeholder="* Color"
                  name="color"
                  value={this.state.color}
                  onChange={this.onChange}
                  error={errors.color}
                  info="Cat's color"
                />
                <TextFieldGroup
                  placeholder="age"
                  name="age"
                  value={this.state.age}
                  onChange={this.onChange}
                  error={errors.age}
                  info="Cat's age"
                />
                <TextFieldGroup
                  placeholder="Race"
                  name="race"
                  value={this.state.race}
                  onChange={this.onChange}
                  error={errors.race}
                  info="Cat's race"
                />
                <h3 style={{ marginTop: "10%", marginBottom: "3%" }}>
                  Personal Info
                </h3>
                <hr />

                <TextAreaFieldGroup
                  placeholder="Vaxins"
                  name="vaxins"
                  value={this.state.vaxins}
                  onChange={this.onChange}
                  error={errors.vaxins}
                  info="Cat's vaxins"
                />

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="fivN"
                    value={this.state.fivN}
                    checked={this.state.fivN}
                    onChange={this.onChange}
                    id="fivN"
                    style={{ marginRight: "5%" }}
                  />
                  <label
                    style={{ marginRight: "5%" }}
                    className="form-check-label"
                    htmlFor="fivN"
                  >
                    FivN
                  </label>
                  <input
                    style={{ marginLeft: "7%" }}
                    className="form-check-input"
                    type="checkbox"
                    name="felvN"
                    value={this.state.felvN}
                    checked={this.state.felvN}
                    onChange={this.onChange}
                    id="felvN"
                  />
                  <label
                    style={{ marginLeft: "10%" }}
                    className="form-check-label"
                    htmlFor="felvN"
                  >
                    FelvN
                  </label>
                </div>

                <h3 style={{ marginTop: "10%", marginBottom: "3%" }}>
                  Additional Info
                </h3>
                <hr />

                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="A little description"
                />
                <div className="form-check mb-4">
                  <input
                    style={{ marginRight: "5%" }}
                    className="form-check-input"
                    type="checkbox"
                    name="needAdoption"
                    value={this.state.needAdoption}
                    checked={this.state.needAdoption}
                    onChange={this.onChange}
                    id="needAdoption"
                  />
                  <label
                    style={{ marginRight: "5%" }}
                    className="form-check-label"
                    htmlFor="needAdoption"
                  >
                    Adoptable
                  </label>
                </div>
                <h3 style={{ marginTop: "10%", marginBottom: "3%" }}>
                  Contacts
                </h3>
                <hr />
                <TextFieldGroup
                  placeholder="Telephone"
                  name="telephone"
                  value={this.state.telephone}
                  onChange={this.onChange}
                  error={errors.telephone}
                  info="A way to contact "
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="Another contact"
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCats.propTypes = {
  addCats: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addCats }
)(withRouter(AddCats));
