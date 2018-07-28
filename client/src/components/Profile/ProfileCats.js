import React, { Component } from "react";

class ProfileCats extends Component {
  render() {
    const { cats } = this.props;
    console.log(this.props);
    const catItems = cats.map(cat => (
      <tr
        className="list-group-item"
        style={{
          verticalAlign: "middle",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        key={cat._id}
      >
        <td style={{ verticalAlign: "middle", width: "20%" }}>{cat.name}</td>
        <td style={{ verticalAlign: "middle", width: "20%" }}>{cat.age}</td>
        <td style={{ verticalAlign: "top", width: "40%" }}>
          {cat.description}
        </td>
        <td style={{ verticalAlign: "middle", width: "20%" }}>
          <img
            style={{ width: "100px", height: "100px" }}
            src={cat.photo}
            alt=""
            className="img-thumbnail"
          />
        </td>
      </tr>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">CATS</h3>
            <table className="lead">{catItems}</table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCats;
