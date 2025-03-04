import React, { Component } from "react";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import Api from "../../Api";
import Paging from "../Paging/Paging";
import ProductsHeader from "../ProductsHeader/ProductsHeader"

//imports
import axios from 'axios';

// This component is responsible for fetching products. It determines from query string which products to fetch.
// The URL is checked on initial mount and when URL changes.
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.updateQueryString = this.updateQueryString.bind(this);
    let parsedQS = queryString.parse(this.props.location.search);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: []
    };
    
  }

  async fetchProducts() {
    this.setState({ loading: true });
    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);
    axios.get('https://giga-fashion.herokuapp.com/open/getproducts?page=1')
      .then((response) => {
        console.log('Fetched Products');
        console.log(response.data);
        this.setState({
          items: response.data,
          loading: false,
          totalItemsCount: response.length
        });
      }, (err) => {
        console.log('Error occurred at product fetching');
        console.log(err);
      });

  }
  /*
    async fetchData() {
  
      this.setState({ loading: true });
  
      // Parse the query string
      let qsAsObject = queryString.parse(this.props.location.search);
  
      let results = await Api.searchItems(qsAsObject);
      console.log("RESULT DATA")
      console.log(results.data);
      this.setState({
        items: results.data,
        loading: false,
        totalItemsCount: results.totalLength
      });
    }
  */
  componentDidMount() {
    //this.fetchData();
    this.fetchProducts();
  }

  updateQueryString(newValues) {
    let currentQS = queryString.parse(this.props.location.search);
    let newQS = { ...currentQS, ...newValues };
    this.props.history.push("/?" + queryString.stringify(newQS));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    let currentQS = queryString.parse(this.props.location.search);
    let oldQS = queryString.parse(prevProps.location.search);

    let areSameObjects = (a, b) => {
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (let key in a) {
        if (a[key] !== b[key]) return false;
      }
      return true;
    }

    // We will refetch products only when query string changes.
    if (!areSameObjects(currentQS, oldQS)) {
      //this.fetchData();
      this.fetchProducts();
    }
  }

  render() {

    let parsedQS = queryString.parse(this.props.location.search);

    if (this.state.loading) {
      return (
        <CircularProgress className="circular" />
      );
    }

    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ProductsHeader
          parsedQS={parsedQS}
          updateQueryString={this.updateQueryString}
          totalItemsCount={this.state.totalItemsCount} />

        <div style={{ flex: 1 }}>
          {/*Items in the product list.*/}
          {
          console.log('categoryId @ ProductList BY the LINK'),
          console.log(parsedQS.category),
          this.state.items.map(item => {
            //console.log('product category of every item')
            //console.log(item.prodCategory.categoryId)
            if (item.prodCategory.categoryId == parsedQS.category) {
              return <Item key={item._id} item={item} />;
            } 
            if (parsedQS.category == undefined ) {
              return <Item key={item._id} item={item} />;
            }
          })}
        </div>

        <Paging
          parsedQS={parsedQS}
          updateQueryString={this.updateQueryString}
          totalItemsCount={this.state.totalItemsCount}
        />
      </div >
    );

  }
}

export default ProductList;
