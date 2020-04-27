import axios from 'axios';

// Simulate authentication service
const Auth = {
  _isAuthenticated: false,

  authenticate(email, password, cb) {
    //validation
    if (password.trim().length == 0 || email.trim().length == 0) {
      return;
    };
    //sending POST request for login.
    /*
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password: password })
    };
    
    fetch('https://giga-fashion.herokuapp.com/auth/login', requestOptions)
    .then((response) => {
      console.log(response.json());
      console.log('Success');
      console.log(response.body);
      console.log(response.message);
      if(response.message == "User registered successfully!") {
        this.props.history.push("/login");
        return true;
      } else {
        return;
      }
    }, (error) => {
      console.log('Failed');
      console.log(error);
      return;
    });
    
    fetch('https://giga-fashion.herokuapp.com/auth/login', requestOptions)
      .then(response => {
        console.log("RAW RESPONSE")
        response.json()
        console.log(response)
        console.log("MAPPED RESPONSE")
        console.log(response.body)
      })
      .then(data => {
        console.log("DATA")
        console.log(data.body)
      });
      */
    
    axios.post('https://giga-fashion.herokuapp.com/auth/login',{ username: email, password: password }, {'Content-Type': 'application/json'})
      .then((response) => {
        console.log(response.data);
        return true;
        //console.log(response.status);
        //console.log(response.statusText);
        //console.log(response.headers);
        //console.log(response.config);
      }, (err) => {
        console.log(err);
        return false;
      });
    /*
    axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      url: 'https://giga-fashion.herokuapp.com/auth/login',
      data: { email: this.name, password: (this.pass) }
    })
    .then((response) => {
      console.log("Success");
      console.log(response);
    }, (error) => {
      console.log("Failed");
      console.log(error);
    });
    */

    this._isAuthenticated = true;
    setTimeout(
      () =>
        cb({
          name: email,
          password: password
        }),
      100
    );
  },

  //Create a new user.
  registerUser(firstName, lastName, email, password) {

    console.log("At the logic")
    console.log(firstName, lastName, email, password);

    if (firstName.trim().length == 0 || lastName.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0) {
      return;
    };

    //sending POST request for signup
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password })
    };
    console.log({ firstName: firstName, lastName: lastName, email: email, password: password });
    fetch('https://giga-fashion.herokuapp.com/auth/signup', requestOptions)
      .then((response) => {
        console.log('Success');
        console.log(response);
        if (response.ok == true) {
          return true;
        } else {
          return false;
        }
      }, (error) => {
        console.log('Failed');
        console.log(error);
        return false;
      });
    /*
    this._isAuthenticated = true;
    setTimeout(
      () =>
        cb({
          name: name,
          password: pass
        }),
      100
    );
    */
  },

  signout(cb) {
    this._isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default Auth;
