import React, { Component } from "react";
import Button from "@material-ui/core/Button";
//icons
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import StarsIcon from '@material-ui/icons/Stars';
import CircularProgress from "@material-ui/core/CircularProgress";

import { addItemInCart } from "../../Redux/Actions";
//import Api from "../../Api";
//import Item from "../Item/Item";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
//import Paper from '@material-ui/core/Paper';

//custom imports
import { Comment, Form, Header } from 'semantic-ui-react'
import ReactStars from 'react-rating-stars-component'

import axios from 'axios';
import API from '../../Api';

//CSS
import "./Details.css";

//Get the state from redux store.
const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

class ConnectedDetails extends Component {
  constructor(props) {
    super(props);
    this.fetchProductDetail();
    this.isCompMounted = false;

    this.state = {
      quantity: 1,
      item: null,
      isLoading: false,
      comment: '',
      commenting: false
    };
  }

  //handle comment submission.
  async onSubmitCommentClicked() {
    console.log("COMMENT SECTION");
    console.log(this.props.location.state.id)
    axios.post(
      'https://giga-fashion.herokuapp.com/user/addComment',
      {
        user_Id: this.props.loggedInUser.id,
        prod_Id: this.props.location.state.id,
        comment: this.state.comment
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.props.loggedInUser.accessToken)
        }
      }
    )
      .then((response) => {
        console.log('Posting Single Commnent');
        console.log(response.data);
        this.setState({ commenting: true });
        window.location.reload(false);
      }, (err) => {
        console.log('Error occurred at Single Product posting');
        console.log(err);
      });
  }

  //Get the full details of a single product
  async fetchProductDetail() {
    console.log("FETCHED USER DETAILS from REDUX")
    console.log(this.props.loggedInUser)
    this.setState({ isLoading: true });
    axios.get(
      'https://giga-fashion.herokuapp.com/open/getproduct?prod_Id=' + this.props.location.state.id,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + (!!(this.props.loggedInUser) ? this.props.loggedInUser.accessToken : "accessToken"))
        }
      }
    )
      .then((response) => {
        console.log('Success : Product Details fetched');
        console.log(response.data);
        this.setState({
          item: response.data,
          isLoading: false,
        });
        console.log('Image base64');
        console.log(this.state.item.prodImage)
      }, (err) => {
        console.log('Error : occurred at fetching Product Details');
        console.log(err);
      });

    // Make sure this component is still mounted before we set state..
    if (this.isCompMounted) {
      this.setState({
        quantity: 1,
      });
    }
  }


  //post user rating on the product
  async postProductRating(newRating) {
    console.log('postProductRating is initiated')
    console.log(newRating)
    axios.post(
      'https://giga-fashion.herokuapp.com/user/addComment',
      {
        user_Id: this.props.loggedInUser.id,
        prod_Id: this.props.location.state.id,
        rating: newRating
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.props.loggedInUser.accessToken)
        }
      }
    )
      .then((response) => {
        console.log('Posting Single Commnent');
        console.log(response.data);
        this.setState({ commenting: true });
      }, (err) => {
        console.log('Error occurred at Single Product posting');
        console.log(err);
      });
  }

  //add items to the wishlist 
  addProductToWishlist() {
    console.log('addProductToWishlist is initiated')
    axios.post(
      'https://giga-fashion.herokuapp.com/user/addtowishlist',
      {
        user_Id: this.props.loggedInUser.id,
        prod_Id: this.props.location.state.id
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + this.props.loggedInUser.accessToken)
        }
      }
    )
      .then((response) => {
        console.log('Adding product to the user wishlist');
        console.log(response.data);
      }, (err) => {
        console.log('Error occurred at Adding product to the user wishlist');
        console.log(err);
      });
  }

  //get the rating for the product submitted by logged in user.
  refineUserRating(productComments) {
    console.log('@refineUserRating@')
    console.log(this.state.item.prodComments)
    this.state.item.prodComments.map(
      comment => {
        console.log('@refineUserRating@')
        console.log(comment);
      },
    )
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    // If ID of product changed in URL, refetch details for that product
    if (this.props.match.params.id !== prevProps.match.params.id) {
      //this.fetchProductAndRelatedItems(this.props.match.params.id);
      //this.props.match.params.id
      //this.fetchProductDetail();
    }

  }

  componentDidMount() {
    this.isCompMounted = true;
    //this.fetchProductAndRelatedItems(this.props.match.params.id);
    //this.props.match.params.id
    this.fetchProductDetail();
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }


  render() {
    if (this.state.isLoading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (
      <div style={{ padding: 10,}}>
        <div
          style={{
            marginBottom: 20,
            marginTop: 10,
            fontSize: 22
          }}
        >
          {this.state.item.prodName}
        </div>
        <div style={{ display: "flex" }}>

          <img src={this.state.item.prodImage} alt="" width={250} height={250}
            style={{
              border: "1px solid lightgray",
              borderRadius: "5px",
              objectFit: "cover"
            }} />

          <div
            style={{
              flex: 1,
              marginLeft: 20,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div style={{
              fontSize: 16,

            }}>
              ID: {this.state.item.prod_id}
            </div>
            <div style={{
              fontSize: 16,

            }}>
              Price: {this.state.item.prodPrice} $
            </div>
            <div style={{
              fontSize: 16,

            }}>
              Rating: {this.state.item.averageRating}
            </div>
            <div style={{
              fontSize: 16,
            }}>
              Discount: {!!(this.state.item.prodDiscount) ? this.state.item.prodDiscount.discountValue : 0} %
            </div>

            <div
              className={!!(this.props.loggedInUser) ? 'show-btn' : 'hide-btn'}
            >
              <ReactStars
                count={5}
                value={
                  this.state.item.prodRating
                }
                onChange={
                  (newRating) => {
                    console.log("New Ratings Added")
                    console.log(newRating)
                    try {
                      API.postProductRating(
                        newRating,
                        this.props.loggedInUser.id,
                        this.props.location.state.id,
                        this.props.loggedInUser.accessToken
                      );
                      this.state.item.prodRating = newRating;
                    } catch (err) {
                      console.log("Error occurred @ posting new prodRating");
                      console.log(err);
                    }
                  }
                }
                size={24}
                color2={'#ffd700'}
              />
            </div>


            {/*
            {this.state.item.popular && (
              <div style={{ fontSize: 14, marginTop: 5, color: "#228B22" }}>
                (Popular product)
              </div>
            )}
            */}

            <div
              className={!!(this.props.loggedInUser) ? 'show-btn' : 'hide-btn'}
            >
              <TextField
                type="number"
                value={this.state.quantity}
                style={{ marginTop: 20, marginBottom: 10, width: 70 }}
                label="Quantity"
                inputProps={{ min: 1, max: 10, step: 1 }}
                onChange={e => {
                  this.setState({ quantity: parseInt(e.target.value) });
                }}
              />

              <Button
                style={{ width: 170, marginTop: 5 }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.props.dispatch(
                    addItemInCart({
                      ...this.state.item,
                      quantity: this.state.quantity
                    })
                  );
                }}
              >
                Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
              </Button>

              <Button
                style={{ width: 170, marginTop: 5 }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.addProductToWishlist(this.props.loggedInUser.user_Id, this.state.item.prod_Id)
                }}
              >
                Add to wishlist <StarsIcon style={{ marginLeft: 5 }} />
              </Button>
            </div>

          </div>
        </div>

        {/* Product description */}
        <div
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 22
          }}
        >
          Product Description
        </div>
        <div
          style={{
            maxHeight: 200,
            fontSize: 15,
            overflow: "auto"
          }}
        >
          {this.state.item.prodDescription}
          {this.state.item.prodDescription ? this.state.item.description : "Not available"}
        </div>

        {/*Comment Section*/}

        <div
          style={{
            marginTop: 20,
            marginBottom: 10,
            fontSize: 22
          }}
        >
          Comments
        </div>
        {
          this.state.item.prodComments.map(
            comment => {
              return (
                <Comment>
                  <Comment.Content>
                    <Comment.Text>{comment.comment_msg}</Comment.Text>
                  </Comment.Content>
                </Comment>
              )
            },
          )
        }
        {/*
        {
          <Comment>
            <Comment.Content>
              <Comment.Text>{this.state.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        }
        */}
        <div
          className={!!(this.props.loggedInUser) ? 'show-btn' : 'hide-btn'}
        >
          <TextField
            style={{ width: 500, marginTop: 5, marginRight: 30 }}
            value={this.state.comment}
            type="Add your comment"
            placeholder="I think this product is "
            onChange={e => {
              this.setState({ comment: e.target.value });
              //console.log(this.state.comment);
            }}
          />
          <Button

            style={{ height: 30, width: 120, marginTop: 0, marginRight: 30 }}
            color="primary"
            variant="outlined"
            onClick={() => {
              this.onSubmitCommentClicked();
            }
            }
          >
            submit comment
        </Button>
        </div>

      </div >
    );
  }
}

let Details = connect(mapStateToProps)(ConnectedDetails);
export default Details;
