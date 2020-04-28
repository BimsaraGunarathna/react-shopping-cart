import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import { showAlertDialog, setCheckedOutItems, removeCheckoutItems } from "../../Redux/Actions";
import { withRouter } from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const mapStateToProps = state => {
  return { open: state.showAlertDialog, items: state.cartItems };
};

class ConnectedAlert extends Component {
  render() {
    let totalPrice = this.props.items.reduce((accumulator, item) => {
      return accumulator + item.prodPrice * item.quantity;
    }, 0);

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => {
            this.props.dispatch(showAlertDialog(false));
          }}
        >
          <AppBar position="static" style={{ backgroundColor: "#3863aa" }}>
            <Toolbar>
              <ThumbUpIcon
                fontSize="large"
                style={{ color: "white", marginRight: 20 }}
              />
              Done
            </Toolbar>
          </AppBar>

          <div
            style={{
              maxHeight: 400,
              padding: 10,
              fontWeight: "1",
              overflow: "auto"
            }}
          >
            Your order has been successfully placed.
          </div>

          <div style={{ display: "flex", padding: 20, alignItems: "center", justifyContent: "center" }}>
            
            <Button
              variant="outlined"
              color="primary"
              disabled={totalPrice === 0}
              onClick={() => {
                this.props.dispatch(showAlertDialog(false));
                this.props.history.push("/");
              }}
            >
              OK
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
const Alert = withRouter(connect(mapStateToProps)(ConnectedAlert));
export default Alert;
