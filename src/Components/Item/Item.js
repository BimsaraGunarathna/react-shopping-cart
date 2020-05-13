import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { connect } from "react-redux";
import { addItemInCart } from "../../Redux/Actions";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

//
import Details from "../Details/Details";

class ConnectedItem extends Component {
  constructor(props) {
    super(props);
    console.log("This is ID of the Item");
    console.log(this.props.item._id);
  }
  render() {
    return (
      <Card
        style={{ width: 200, height: 270, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
          onClick={() => {
            console.log("This is ID of the Item"+ this.props.item._id);
            //Details(this.props.item._id);
            this.props.history.push({pathname: "/details/" + this.props.item._id,state: { id: this.props.item._id}});
          }}
        >
          
          <CardContent style={{ height: 50 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {this.props.item.prodName}
            </div>
            <div style={{ margin: 5 }}>Price: {this.props.item.prodPrice} $</div>
            <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
              {this.props.item.prodCategory.categoryName}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", alignItems: "center", height: 45 }}
        >
          <Button
            size="small"
            style={{ marginRight: 60, display: 'none'}}
            onClick={() => {
              console.log("This is ID of the Item"+ this.props.item._id)
              this.props.history.push("/details/" + this.props.item._id);
            }}
          >
            {" "}
            Details
          </Button>
          <Tooltip title="Add to cart">
            <IconButton
              style={{display: 'none'}}
              size="small"
              onClick={e => {
                e.stopPropagation();
                this.props.dispatch(
                  addItemInCart({ ...this.props.item, quantity: 1 })
                );
              }}
              color="primary"
              aria-label="Add to shopping cart"
            >
              <AddShoppingCartIcon size="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(connect()(ConnectedItem));
