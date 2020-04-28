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

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
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
      paymentMethod: ''
    }
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
              placeholder="Shipping Address"
              onChange={e => {
                this.setState({ address: e.target.value });
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
          disabled={(this.state.address == '' || this.state.city == '' || this.state.zip == '' || this.state.phoneNumber == '' || this.state.paymentMethod == '') }
          onClick={() => {
            console.log("purchased");
            this.props.dispatch(showAlertDialog(true));
            this.setState({
              address: '',
              city: '',
              zip: '',
              phoneNumber: '',
              paymentMethod: ''
            })
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
            //this.props.dispatch(setCheckedOutItems([]));
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
