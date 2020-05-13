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
import CircularProgress from "@material-ui/core/CircularProgress";

//axios
import axios from 'axios';

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems,
    loggedInUser: state.loggedInUser
  };
};

// This component shows the items user checked out from the cart.
class ConnectedWishlist extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      items: null,
      isLoading: true
    };
    this.getWishlistItems();
  }

  //get the wishlsit items 
  async getWishlistItems(userId, accessToken) {
    console.log("getWishlistItems")
    console.log(this.props.loggedInUser.accessToken)
    this.setState({ isLoading: true });
    axios.get(
      'https://giga-fashion.herokuapp.com/user/getwishlist?userID=' + this.props.loggedInUser.id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + (!!(this.props.loggedInUser) ? this.props.loggedInUser.accessToken : "accessToken"))
        }
      }
    )
      .then((response) => {
        console.log('Success : wishlsit items fetched');
        console.log(response.data);
        this.setState({
          items: response.data,
          isLoading: false,
        });
      }, (err) => {
        console.log('Error : occurred at fetching wishlsit items');
        console.log(err);
      });

    // Make sure this component is still mounted before we set state..
    if (this.isCompMounted) {
      this.setState({
        quantity: 1,
      });
    }
  }

  render() {
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);

    if (this.state.isLoading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.items) {
      return null;
    }

    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>
          Wishlist
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.items.map((item, index) => {
              return (
                <TableRow key={item._id}>
                  <TableCell>{item.prodName}</TableCell>
                  <TableCell>{item.prodPrice}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/*
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
{/*
<Button
          color="primary"
          variant="outlined"
          //disabled={totalPrice === 0}
          onClick={() => {
            console.log("purchased");
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button>
*/}
        

        {/*
        
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
const Wishlist = withRouter(connect(mapStateToProps)(ConnectedWishlist));

export default Wishlist;
