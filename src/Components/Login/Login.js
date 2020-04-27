import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

//imports
import axios from 'axios';


class ConnectedLogin extends Component {
  state = {
    email: "",
    password: "",
    redirectToReferrer: false,
    isUserLoggedIn: false
  };

  async getUserLoggedIn() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    axios.post(
      'https://giga-fashion.herokuapp.com/auth/login', 
      { username: this.state.email, password: this.state.password }, 
      { 'Content-Type': 'application/json' })
      .then((response) => {
        console.log(response.data);
        this.props.dispatch(setLoggedInUser({ 
          id: response.data.id, 
          username: response.data.username, 
          email: response.data.email,
          roles: response.data.roles[0],
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          }));
        this.setState(() => ({
          redirectToReferrer: true
        }));
        this.props.history.push("/");
        return <Redirect to={from} />;
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);
      }, (err) => {
        console.log(err);
        this.setState(() => ({
          redirectToReferrer: false
        }));
        this.setState(() => ({
          email: '',
          password: ''
        }));
        return;
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    // If user was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
      }}>
        <div
          style={{
            height: 300,
            width: 200,
            padding: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Avatar style={{ marginBottom: 10 }}>
            <LockOutlinedIcon />
          </Avatar>
          <div
            style={{
              marginBottom: 20,
              fontSize: 24,
              textAlign: "center"
            }}
          >
            {" "}
            Log in
            {" "}
          </div>
          <TextField
            value={this.state.email}
            placeholder="Email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <TextField
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
          <Button
            style={{ marginTop: 20, width: 200 }}
            variant="outlined"
            color="primary"
            onClick={() => {
              //validation
              if (this.state.password.trim().length == 0 || this.state.email.trim().length == 0) {
                return;
              };
              //initiate login request
              this.getUserLoggedIn()
              /*
              console.log("LoggedIn DONE");
              console.log(this.state.isUserLoggedIn);
              if (this.state.isUserLoggedIn == true) {
                this.props.dispatch(setLoggedInUser({ name: this.state.email }));
                this.setState(() => ({
                  redirectToReferrer: true
                }));
              } else {
                this.setState(() => ({
                  email: '',
                  password: ''
                }));
                return;
              }
              
              // Simulate authentication call
              Auth.authenticate(this.state.email, this.state.password, user => {

                if (!user) {
                  this.setState({ wrongCred: true });

                }

                this.props.dispatch(setLoggedInUser({ name: user.email }));
                this.setState(() => ({
                  redirectToReferrer: true
                }));
              });
              */
            }}
          >
            Log in
          </Button>
          {this.state.wrongCred && (
            <div style={{ color: "red" }}>Wrong username and/or password</div>
          )}
        </div>
      </div>
    );
  }
}
const Login = withRouter(connect()(ConnectedLogin));

export default Login;
