import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems } from "../../Redux/Actions";

//css
import "./Profile.css";

//form sections
import StoreManagerForm from "./StoreManagerForm";
import ProductCategoryForm from "./ProductCategoryForm";
import AddProductForm from "./AddProductForm";
import AddDiscountForm from "./AddDiscountForm";

//Get the state from redux store.
const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

// This component shows the items user checked out from the cart.
class ConnectedProfile extends Component {

  //render create a store manager form
  renderStoreManagerForm() {
    console.log('@renderStoreManagerForm')
    console.log(this.props.loggedInUser.role[0])
    if (this.props.loggedInUser.roles[0] == "ROLE_USER") {
      return (
        <span style={{ fontSize: 12, color: "#504F5A", marginTop: 5 }}>Create a Store Manager</span>
      );
    }
    return;
  }

  render() {

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>
          Profile
        </div>
        <div style={{ marginLeft: 40,}}>
          <StoreManagerForm />
          <ProductCategoryForm />
          <AddProductForm />
          <AddDiscountForm />
        </div>

        {/*
          <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
          Total price: {totalPrice} $
        </div>
        <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            console.log("purchased");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
        */}
      </div>
    );
  }
}
const Profile = withRouter(connect(mapStateToProps)(ConnectedProfile));

export default Profile;
