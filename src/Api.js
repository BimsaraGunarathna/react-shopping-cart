import { sampleProducts } from "./Data";

//axios
import axios from 'axios';


class Api {

  //add a product rating by user
  postProductRating(newRating, userId, productId, accessToken) {
    console.log('postProductRating is initiated')
    console.log(' new rating: ' +newRating +' userId: '+userId+' product id: '+productId+' accessToken: '+accessToken)
    axios.post(
      'https://giga-fashion.herokuapp.com/user/addComment',
      {
        user_Id: userId,
        prod_Id: productId,
        rating: newRating
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + accessToken)
        }
      }
    )
      .then((response) => {
        console.log('Posting Rating @ API');
        console.log(response.data);
        return response;
      }, (err) => {
        console.log('Error occurred at Rating posting @API');
        console.log(err);
        return err;
      });
  }

  //create a new product category
  async createNewProductCategory(categoryName, accessToken ) {
    console.log('Data of the request @ API')
    console.log('(1) ' +categoryName + ' (2) ' + 'Bearer ' + accessToken)
    axios.post(
      'https://giga-fashion.herokuapp.com/admin/createproductcategory',
      {
        categoryName: categoryName
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
    )
      .then((response) => {
        console.log('SUCCESS: create new category');
        console.log(response.data);
        return true;
        //window.location.reload(false);
      }, (err) => {
        console.log('ERROR: create new category');
        console.log(err);
        return false;
      });
  }

  //create a new Store Manager
  createNewStoreManager(firstName, lastName, email, password, accessToken ) {
    console.log('Data of the request @ API')
    console.log('(1) ' + firstName + ' (2) ' + lastName + ' (3) ' +email + ' (4) ' + password + ' (5) ' + 'Bearer ' + accessToken)
    axios.post(
      'https://giga-fashion.herokuapp.com/admin/createmanager',
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
    )
      .then((response) => {
        console.log('SUCCESS: post new manager to the server');
        console.log(response.data);
        //window.location.reload(false);
      }, (err) => {
        console.log('ERROR: post new manager to the server');
        console.log(err);
      });
  }

  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }

  searchItems({
    category = "Books",
    term = "",
    sortValue = "lh",
    itemsPerPage = 10,
    usePriceFilter = "false",
    minPrice = 0,
    maxPrice = 1000,
    page = 1
  }) {

    // Turn this into a boolean
    usePriceFilter = usePriceFilter === "true" && true;

    return new Promise((resolve, reject) => {

      setTimeout(() => {

        let data = sampleProducts.filter(item => {
          if (
            usePriceFilter &&
            (item.price < minPrice || item.price > maxPrice)
          ) {
            return false;
          }

          if (category === "popular") {
            return item.popular;
          }

          if (category !== "All categories" && category !== item.category)
            return false;

          if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        data = this.sortByPrice(data, sortValue);

        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new Api();
