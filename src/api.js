//this file will hold api calls/information 

//will need to POST, GET, PATCH, and DELETE things using the api

import bookmark from "./bookmark";

const baseURL = 'https://thinkful-list-api.herokuapp.com/skylar/bookmarks';

function getList() {
  return fetch(baseURL)
    .then(response => response.json());
}


function update(id, changeBookmark) {
 console.log(id)
  return fetch(baseURL + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: changeBookmark,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch(error => {
      console.log(error.message);
    })
    ;
}


function create(newBookmark) {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}


function remove(id) {
  return fetch(baseURL + `/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .catch(error => {
      console.log(error.message);
    });
}


export default {
  baseURL,
  getList,
  update,
  create,
  remove
}
