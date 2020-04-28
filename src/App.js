import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { Switch, Route, withRouter } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";

//custom
import Wishlist from "./Components/Wishlist/Wishlist";
import Alert from "./Components/Alert/Alert";
import Profile from "./Components/Profile/Profile";
import { fetchCategories } from "./Redux/Actions";
import { connect } from "react-redux";

class ConnectedApp extends Component {
  constructor(props) {
    super(props);

    this.props.dispatch(fetchCategories());
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Menu />
          <div className="content">
            <CartDialog />
            <Alert />

            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <ProtectedRoute path="/order" component={Order} />
              <ProtectedRoute path="/wishlist" component={Wishlist} />
              <ProtectedRoute path="/profile" component={Profile} />
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const App = withRouter(connect()(ConnectedApp));

export default App;