import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCats } from "../../actions/catsActions";
import CatItem from "./Cat-items";

class Cats extends Component {
  componentDidMount() {
    this.props.getCats();
  }

  render() {
    const Catss = this.props.cats.cats;

    let CatItems;
    console.log(this.props.cats.cats);
    console.log(Catss);

    if (Catss === null || Catss === undefined) {
      CatItems = <Spinner />;
    } else {
      console.log(Catss);
      if (Catss.length > 0) {
        CatItems = Catss.map(cats => <CatItem key={cats._id} cats={cats} />);
      } else {
        CatItems = <h3>There is no cat!</h3>;
      }
    }
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4 text-center">Rescuers Cats</div>
              <p className="lead text-center">Connect with other cats!</p>
              {CatItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cats.propTypes = {
  getCats: PropTypes.func.isRequired,
  cats: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cats: state.cats
});

export default connect(
  mapStateToProps,
  { getCats }
)(Cats);
