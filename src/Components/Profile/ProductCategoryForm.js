import React, { Component, Alert } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//axios
import axios from 'axios';

//redux
import { connect } from "react-redux";
import { setCreateCategoryError } from "../../Redux/Actions";

//Get the state from redux store.
const mapStateToProps = state => {
    return {
        loggedInUser: state.loggedInUser,
        createCategoryError: state.createCategoryError
    };
};
class ConnectedProductCategoryForm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            item: null,
            categoryName: "",
            isError: false
        }
        console.log("This is a create product category section.");
        console.log(this.props.loggedInUser.roles);
    }

    //create a new product category
    async createNewProductCategory(categoryName, accessToken) {
        console.log('Data of the request @ API')
        console.log('(1) ' + categoryName + ' (2) ' + 'Bearer ' + accessToken)
        axios.post(
            'https://giga-fashion.herokuapp.com/admin/createproductcategory',
            {
                categoryName: categoryName
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
            .then((response) => {
                console.log('SUCCESS: create new category');
                console.log(response.data);
                //window.location.reload(false);
            }, (err) => {
                //trigger action
                this.props.dispatch(
                    setCreateCategoryError({
                        error: err
                    })
                );
                console.log('ERROR: create new category');
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

                    <span style={{ fontSize: 15, color: "#504F5A", marginTop: 10, marginBottom: 10 }}>Create a Product Category</span>
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
                            value={this.state.categoryName}
                            placeholder="Product Category Name"
                            onChange={e => {
                                console.log(this.state.isError)
                                this.setState({ categoryName: e.target.value });
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
                                console.log('At the Create a Product Category');
                                console.log(this.state.categoryName);
                                this.createNewProductCategory(this.state.categoryName, this.props.loggedInUser.accessToken);
                                console.log('IS there are a error');
                                console.log(this.state.isError);
                            }}
                        >
                            Create Product Category
                        </Button>
                    </div>
                </div>


            )
        } else {
            return <span />
        }
    }
}

const ProductCategoryForm = connect(mapStateToProps)(ConnectedProductCategoryForm);

export default ProductCategoryForm;
