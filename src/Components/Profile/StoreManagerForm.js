import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//axios
import axios from 'axios';

//redux
import { connect } from "react-redux";

//Get the state from redux store.
const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser
    };
};

class ConnectedStoreManagerForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            item: null,
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
        console.log("This is a new section.");
        console.log(this.props.loggedInUser.roles);
    }

    //create a new Store Manager
    createNewStoreManager(firstName, lastName, email, password, accessToken) {
        console.log('Data of the request @ API')
        console.log('(1) ' + firstName + ' (2) ' + lastName + ' (3) ' + email + ' (4) ' + password + ' (5) ' + 'Bearer ' + accessToken)
        axios.post(
            'https://giga-fashion.herokuapp.com/admin/createmanager',
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
            .then((response) => {
                console.log('SUCCESS: post new manager to the server');
                console.log(response.data);
                //window.location.reload(false);
            }, (err) => {
                console.log('ERROR: post new manager to the server');
                console.log(err);
            });
    }

    render() {

        if (this.props.loggedInUser.roles == "ROLE_ADMIN") {
            return (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        marginLeft: 15,
                        flexDirection: "column"
                    }}
                >
                    <span style={{ fontSize: 15, color: "#504F5A", marginTop: 10, marginBottom: 10 }}>Create a Store Manager</span>
                    <div
                        style={{
                            width: 150,
                            padding: 10,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            marginBottom: 10
                        }}
                    >
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.firstName}
                            placeholder="First Name"
                            onChange={e => {
                                this.setState({ firstName: e.target.value });
                            }}
                        />
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.lastName}
                            placeholder="Last Name"
                            onChange={e => {
                                this.setState({ lastName: e.target.value });
                            }}
                        />
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.email}
                            placeholder="Email"
                            onChange={e => {
                                this.setState({ email: e.target.value });
                            }}
                        />
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.password}
                            type="Password"
                            placeholder="Password"
                            onChange={e => {
                                this.setState({ password: e.target.value });
                            }}
                        />
                        <Button
                            style={{ marginTop: 20, width: 150 }}
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                /*
                                //form validation
                                if (this.state.firstName.trim().length == 0 || this.state.lastName.trim().length == 0 || this.state.email.trim().length == 0 || this.state.password.trim().length == 0) {
                                    return;
                                };
                                */
                                //initiate signup
                                console.log('At the Create a Store Manager');
                                console.log(this.state.firstName, this.state.lastName, this.state.email, this.state.password);
                                //this.createNewStoreManager();
                                this.createNewStoreManager(this.state.firstName, this.state.lastName, this.state.email, this.state.password, this.props.loggedInUser.accessToken)
                            }}
                        >
                            Create Store Manager
                        </Button>
                    </div>
                </div>
            )
        } else {
            return <span />
        }
    }
}

const StoreManagerForm = connect(mapStateToProps)(ConnectedStoreManagerForm);

export default StoreManagerForm;
