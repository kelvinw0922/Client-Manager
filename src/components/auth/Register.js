import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import classnames from "classnames";
import { notifyUser } from "../../actions/notifyActions";
import Alert from "../layout/Alert";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  componentWillMount = () => {
    const { allowRegistration } = this.props.settings;
    if (!allowRegistration) {
      this.props.history.push("/");
    }
  };

  componentDidMount = () => {
    this.props.notifyUser(null, null);
  };

  onChange = e => {
    //Set error to false everytime a user tries to input username or password
    this.setState({ error: false });

    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { firebase, notifyUser } = this.props;
    const { email, password } = this.state;

    // Register with firebase
    firebase
      .createUser({ email, password })
      .catch(
        err =>
          notifyUser("That User Already Exists", "error") &&
          this.setState({ error: true })
      );
  };

  render() {
    const { message, messageType } = this.props.notify;
    return (
      <div className="row">
        <div className="col-md-10 mx-auto mt-5">
          <div className="card">
            <div className="card-body">
              {message ? (
                <Alert message={message} messageType={messageType} />
              ) : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-info">
                  <i className="fas fa-user-lock fa-2x" /> Register
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email..."
                    required
                    className={classnames("form-control", {
                      "is-invalid": this.state.error === true
                    })}
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                    className={classnames("form-control", {
                      "is-invalid": this.state.error === true
                    })}
                  />
                  {this.state.error && (
                    <div className="invalid-feedback">
                      Email has already been used
                    </div>
                  )}
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-success btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.object.isRequired,
  notify: PropTypes.object.isRequired,
  notifyUser: PropTypes.func.isRequired
};

export default compose(
  firebaseConnect(),
  connect(
    (state, props) => ({
      notify: state.notify,
      settings: state.settings
    }),
    { notifyUser }
  )
)(Login);
