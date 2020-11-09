

import $ from 'jquery';
import store from './store'; 
import 'normalize.css';
import './index.css';
import api from './api';
import book from './bookmark';




function main() {
  //console.log("I'm here.")
    api.getList()
    .then(res => {
      store.createStoreArray(res);
      book.renderMain();
      book.handleNewClick();
      book.handleCancelClick();
      book.submitNewBookmark();
      book.handleBookmarkClick();
      book.handleBookmarkUpdate();
      book.handleFilterClick();
    })
  ;
};

$(main);
