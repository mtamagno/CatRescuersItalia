import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authAction";

import PrivateRoute from "./components/common/PrivateRoute";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

//import logo from "./logo.svg";

import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import store from "./store";
import mainDashboard from "./components/dashboard/mainDashboard";
import CreateProfile from "./components/createProfile/CreateProfile";
import EditProfile from "./components/edit-profile/EditoProfile";
import AddCats from "./components/add-cats/AddCats";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileAction";

//Check for token

if (localStorage.jwtToken) {
  //Set header auth
  setAuthToken(localStorage.jwtToken);
  //Decode
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //LogOut user
    store.dispatch(logOutUser());
    // Clear
    store.dispatch(clearCurrentProfile());
    //Redirect
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute
                  exact
                  path="/dashboard"
                  component={mainDashboard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/createProfile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/editProfile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/addCats" component={AddCats} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
