import React, { Component } from "react";
//import logo from "./logo.svg";

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
