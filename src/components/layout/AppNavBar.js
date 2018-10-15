import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";

class AppNavBar extends Component {
  state = {
    isAuthenticaated: false
  };

  static getDerivedStateFromProps(props, state, checkAdminStatus) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticaated: true };
    } else {
      return { isAuthenticaated: false };
    }
  }

  onLogOutClick = e => {
    e.preventDefault();
    const { firebase } = this.props;
    //Logout firebase
    firebase.logout();
  };

  render() {
    const { isAuthenticaated } = this.state;
    const {
      auth,
      settings: { allowRegistration }
    } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-info mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-university fa-2x" /> Client Panels
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="navbar-collapse collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticaated ? (
                <li className="nav-item">
                  <Link to="/" style={{ color: "white" }}>
                    DashBoard
                  </Link>
                </li>
              ) : null}
            </ul>
            {isAuthenticaated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    <i className="fas fa-user" /> : {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link">
                    <i className="fas fa-cogs" /> : Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={this.onLogOutClick}
                  >
                    <i className="fas fa-sign-out-alt" /> : Logout
                  </a>
                </li>
              </ul>
            ) : null}

            {allowRegistration && !isAuthenticaated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavBar);
