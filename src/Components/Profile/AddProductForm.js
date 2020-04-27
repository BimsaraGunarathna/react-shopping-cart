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

class ConnectedAddProductForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            prodName: '',
            prodDescription: '',
            prodPrice: '',
            prodCategory: '',
        }
        console.log("This is a new section.");
        console.log(this.props.loggedInUser.roles);
    }

    //create a new Store Manager
    createNewProduct(prodName, prodDescription, prodPrice, prodCategory, accessToken) {
        console.log('Data of the request @ API')
        console.log('(1) ' + prodName + ' (2) ' + prodDescription + ' (3) ' + prodPrice + ' (4) ' + prodCategory + ' (5) ' + 'Bearer ' + accessToken)
        axios.post(
            'https://giga-fashion.herokuapp.com/manager/addproduct',
            {
                prodName: prodName,
                prodDescription: prodDescription,
                prodPrice: prodPrice,
                prodCategory: prodCategory
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
            .then((response) => {
                console.log('SUCCESS: create a new product');
                console.log(response.data);
                //window.location.reload(false);
            }, (err) => {
                console.log('ERROR: create a new product');
                console.log(err);
            });
    }

    render() {

        if (this.props.loggedInUser.roles == "ROLE_STORE_MANAGER") {
            return (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        marginLeft: 15,
                        flexDirection: "column"
                    }}
                >
                    <span style={{ fontSize: 15, color: "#504F5A", marginTop: 10, marginBottom: 10 }}>Create a new Product</span>
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
                            value={this.state.prodName}
                            placeholder="Product Name"
                            onChange={e => {
                                this.setState({ prodName: e.target.value });
                            }}
                        />
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.prodDescription}
                            placeholder="Description"
                            onChange={e => {
                                this.setState({ prodDescription: e.target.value });
                            }}
                        />
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.prodPrice}
                            placeholder="Price"
                            onChange={e => {
                                this.setState({ prodPrice: e.target.value });
                            }}
                        />
                        <TextField
                            style={{ width: 200, marginLeft: 50 }}
                            value={this.state.prodCategory}
                            placeholder="Category"
                            onChange={e => {
                                this.setState({ prodCategory: e.target.value });
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
                                console.log('At the Add a new product');
                                console.log(this.state.prodName, this.state.prodDescription, this.state.prodPrice, this.state.prodCategory);
                                //this.createNewProduct();
                                this.createNewProduct(this.state.prodName, this.state.prodDescription, this.state.prodPrice, this.state.prodCategory, this.props.loggedInUser.accessToken)
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

const AddProductForm = connect(mapStateToProps)(ConnectedAddProductForm);

export default AddProductForm;
