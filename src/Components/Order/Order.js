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
import TextField from "@material-ui/core/TextField";
import { showAlertDialog} from "../../Redux/Actions";
//axios
import axios from 'axios';


//Get the state from redux store.
const mapStateToProps = state => {
  return {
      checkedOutItems: state.cartItems,
      loggedInUser: state.loggedInUser
  };
};

// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      city: '',
      zip: '',
      phoneNumber: '',
      delivery: '',
      paymentMethod: ''
    }
    
  }

  reOrderCartItems() {
    console.log('At the Oder.js')
    console.log(this.props.checkedOutItems)
    this.props.checkedOutItems.map((item) => {
      delete item.prodComments
      delete item.prodDescription
      delete item.prodImage 
      delete item.prodDiscount
      delete item.averageRating
      delete item.prodCategory
      delete item.prodName 
      delete item.prodPrice
      delete item.prodRating
      delete item.prodName 
    })
    console.log('Ordered List')
    console.log(this.props.checkedOutItems)
  }

  makeTheOrder() {
    console.log('At the request')
    console.log(this.props.checkedOutItems)
    axios.post(
      'https://giga-fashion.herokuapp.com/user/placeorder',
      {
          user_Id: this.props.loggedInUser.id,
	        products: this.props.checkedOutItems,
	        paymentMethod: this.state.paymentMethod,
	        paymentRefID: "1213214",
	        deliveryMethod: this.state.delivery
      },
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.props.loggedInUser.accessToken
          }
      }
  )
      .then((response) => {
          console.log('SUCCESS: order placed');
          console.log(response.data);
          //window.location.reload(false);
      }, (err) => {
          console.log('ERROR: placing order failed');
          console.log(err);
      });
  }
  render() {
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>
          Order Information
        </div>

        <div
          style={{
            height: "100%",
            display: "flex",
            marginLeft: 15,
            flexDirection: "column"
          }}
        >
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
              value={this.state.address}
              placeholder="Shipping address"
              onChange={e => {
                this.setState({ address: e.target.value });
              }}
            />
            <TextField
              style={{ width: 200, marginLeft: 50 }}
              value={this.state.delivery}
              placeholder="Delivery method"
              onChange={e => {
                this.setState({ delivery: e.target.value });
              }}
            />
            <TextField
              style={{ width: 200, marginLeft: 50 }}
              value={this.state.city}
              placeholder="City"
              onChange={e => {
                this.setState({ city: e.target.value });
              }}
            />
            <TextField
              style={{ width: 200, marginLeft: 50 }}
              value={this.state.zip}
              placeholder="ZIP"
              onChange={e => {
                this.setState({ zip: e.target.value });
              }}
            />
            <TextField
              style={{ width: 200, marginLeft: 50 }}
              value={this.state.phoneNumber}
              placeholder="Phone Number"
              onChange={e => {
                this.setState({ phoneNumber: e.target.value });
              }}
            />
            <TextField
              style={{ width: 200, marginLeft: 50 }}
              value={this.state.paymentMethod}
              placeholder="Payment method"
              onChange={e => {
                this.setState({ paymentMethod: e.target.value });
              }}
            />
          </div>
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
        */}

        <Button
          color="primary"
          variant="outlined"
          disabled={(this.state.delivery == '' || this.state.address == '' || this.state.city == '' || this.state.zip == '' || this.state.phoneNumber == '' || this.state.paymentMethod == '') }
          onClick={() => {
            this.reOrderCartItems();
            console.log("purchased");
            //this.props.dispatch(showAlertDialog(true));
            this.setState({
              address: '',
              city: '',
              zip: '',
              phoneNumber: '',
              delivery: '',
              paymentMethod: ''
            })
            
            this.makeTheOrder();
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          //disabled={totalPrice === 0}
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
            this.props.history.push("/");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
