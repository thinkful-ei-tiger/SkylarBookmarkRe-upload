// this file will hold functions necessary to implement data into the DOM

import $ from 'jquery';
import api from './api';
import store from './store';
import cuid from 'cuid';

function topOfPage() {
  return `
    <section class="topPage">
    <h1>My Bookmarks</h1>
    </section>`
}
function topButtons() {
  return `
<section class="topButtons">
<div class="btnLeft">
<button id="newBookMark">Create New</button>
</div>

<div class="btnRight"> 
    <form id="filter">
      <select name="" id="rating">
      <option>Filter By</option>
      <option value="1">1 heart</option>
      <option value="2">2 hearts</option>
      <option value="3">3 hearts</option>
      <option value="4">4 hearts</option>
      <option value="5">5 hearts</option>
      </select>
    </form>
</div>
</section>`;
}

function listAddition(singleBookmark) {
  if (singleBookmark.expand) {
    return `
        <li id="${singleBookmark.id}">
          <div class="li-title expanded-title">
            <div class="left-block">
              <p>${singleBookmark.title}</p>
            </div>
            <div class="right-block">
              <p>${singleBookmark.rating} Hearts</p>
            </div>
          </div>
          <div class="expanded-info">
            <div class="expanded-buttons">
              <div class="btnLeft">
                <button class="edit" id="edit">Edit</button>
              </div>
              <div class="btnRight">
                <button id="delete" class="delete">Delete</button>
              </div>
            </div>
            <div class="expanded-top">
              <div class="heartsExpanded">
                <p>${singleBookmark.rating} Hearts</p>
              </div>
            </div>
            <div class="description">
              <div class="expanded-description">
                <p>${singleBookmark.desc}</p>
              </div>
              <div class="visit">
              <a href="${singleBookmark.url}" target="_blank"><button class="visitBtn" id="visit">Visit Website</button></a>
              </div>
            </div>
          </div>
        </li>
      `;
  }

  return `
      <li id="${singleBookmark.id}">
        <div class="li-title">
          <div class="left-li-block">
            <p>${singleBookmark.title}</p>
          </div>
          <div class="right-li-block">
            <p>${singleBookmark.rating} Hearts</p>
          </div>
        </div>
      </li>
    `;
}

function createFullList(everyBookmark, filter) {
  //console.log(everyBookmark)
  //console.log(filter)
  let filt = parseInt(filter);
  //console.log(filt)
  const filterArray = everyBookmark.filter(bookmark => parseInt(bookmark.rating) >= filt);
  //console.log(filterArray)
  const listArray = filterArray.map(bookmark => {
    return listAddition(bookmark);
  });


  const listEl = listArray.join('');
  //console.log("I MADE IT MOM")
  //console.log(listArray)

  return `
      <section class="bookmark-display">
        <ul>
          ${listEl}
        </ul>
      </section>
    `;
}

function newBookmarkForm() {
  if (store.error === 'url') {
    return `
        <section class="new-bookmark-section">
          <form id="new-bookmark-form">
          <div class="errorTextHold">
        <p> URL Invalid. Please include a valid URL. </p>
    </div>
            <div class="link-text-container">
              <label for="link-text"></label>
              <input type="text" name="url" id="link-text" placeholder="https://www.google.com" value="" required>
            </div>
            <div class="description-container">
              <input type="text" name="title" id="link-title" placeholder="Link Title" required>

              <textarea name="desc" id="" cols="30" rows="10" placeholder="Describe Your Bookmark" value="" required></textarea>
              
              <div class="heartRate">
                <p>Rating: </p>
                <div class="heart">
                  <label for="heart-1">1</label>
                  <input type="radio" name="rating" id="heart-1" value="1">
                </div>
                <div class="heart">
                  <label for="heart-2">2</label>
                  <input type="radio" name="rating" id="heart-2" value="2">
                </div>
                <div class="heart">
                  <label for="heart-3">3</label>
                  <input type="radio" name="rating" id="heart-3" value="3">
                </div>
                <div class="heart">
                  <label for="heart-4">4</label>
                  <input type="radio" name="rating" id="heart-4" value="4">
                </div>
                <div class="heart">
                  <label for="heart-5">5</label>
                  <input type="radio" name="rating" id="heart-5" value="5" checked>
                </div>
              </div>
            </div>
          </form>
          <div class="form-buttons">
            <div class="btnLeft">
              <button id="cancel">Cancel</button>
            </div>
            <div class="btnRight">
              <button type="submit" id="create" form="new-bookmark-form">Create</button>
            </div>
          </div>
        </section>
      `;
  }

  return `
    <section class="new-bookmark-section">
    <form id="new-bookmark-form">
      <div class="link-text-container">
        <label for="link-text"></label>
        <input type="text" name="url" id="link-text" placeholder="https://www.google.com" value="" required>
      </div>
      <div class="description-container">
        <input type="text" name="title" id="link-title" placeholder="Link Title" required>

        <textarea name="desc" id="" cols="30" rows="10" placeholder="Describe Your Bookmark" value="" required></textarea>
        
        <div class="heartRate">
          <p>Rating: </p>
          <div class="heart">
            <label for="heart-1">1</label>
            <input type="radio" name="rating" id="heart-1" value="1">
          </div>
          <div class="heart">
            <label for="heart-2">2</label>
            <input type="radio" name="rating" id="heart-2" value="2">
          </div>
          <div class="heart">
            <label for="heart-3">3</label>
            <input type="radio" name="rating" id="heart-3" value="3">
          </div>
          <div class="heart">
            <label for="heart-4">4</label>
            <input type="radio" name="rating" id="heart-4" value="4">
          </div>
          <div class="heart">
            <label for="heart-5">5</label>
            <input type="radio" name="rating" id="heart-5" value="5" checked>
          </div>
        </div>
      </div>
    </form>
    <div class="form-buttons">
      <div class="btnLeft">
        <button id="cancel">Cancel</button>
      </div>
      <div class="btnRight">
        <button type="submit" id="create" form="new-bookmark-form">Create</button>
      </div>
    </div>
  </section>
    `;
}

function updateBookmark() {
  if (store.error === 'url') {
    return `
        <section class="new-bookmark-section">
          <form id="update-bookmark-form">
            <div class="link-text-container">
              <label for="link-text"></label>
              <input type="text" name="url" id="link-text" value="" required>
            </div>
            <div class="description-container">
              <input type="text" name="title" id="link-title" placeholder="Link Title" required>

              <textarea name="desc" id="" cols="30" rows="10" placeholder="Describe Your Bookmark" value="" required></textarea>
              
              <div class="heartRate">
                <p>Rating: </p>
                <div class="heart">
                  <label for="heart-1">1</label>
                  <input type="radio" name="rating" id="heart-1" value="1">
                </div>
                <div class="heart">
                  <label for="heart-2">2</label>
                  <input type="radio" name="rating" id="heart-2" value="2">
                </div>
                <div class="heart">
                  <label for="heart-3">3</label>
                  <input type="radio" name="rating" id="heart-3" value="3">
                </div>
                <div class="heart">
                  <label for="heart-4">4</label>
                  <input type="radio" name="rating" id="heart-4" value="4">
                </div>
                <div class="heart">
                  <label for="heart-5">5</label>
                  <input type="radio" name="rating" id="heart-5" value="5" checked>
                </div>
              </div>
            </div>
          </form>
          <div class="form-buttons">
            <div class="btnLeft">
              <button id="cancel">Cancel</button>
            </div>
            <div class="btnRight">
              <button type="submit" id="update" form="update-bookmark-form">Update</button>
            </div>
          </div>
        </section>
      `;
  }

  return `
      <section class="new-bookmark-section">
        <form id="update-bookmark-form">
          <div class="link-text-container">
            <label for="link-text">Update your bookmark</label>
            <input type="text" name="url" id="link-text" placeholder="https://www.google.com" value="" required>
          </div>
          <div class="description-container">
            <input type="text" name="title" id="link-title" placeholder="Link Title" required>

            <textarea name="desc" id="" cols="30" rows="10" placeholder="Describe Your Bookmark" value="" required></textarea>
            
            <div class="heartRate">
              <p>Rating: </p>
              <div class="heart">
                <label for="heart-1">1</label>
                <input type="radio" name="rating" id="heart-1" value="1">
              </div>
              <div class="s">
                <label for="heart-2">2</label>
                <input type="radio" name="rating" id="heart-2" value="2">
              </div>
              <div class="heart">
                <label for="heart-3">3</label>
                <input type="radio" name="rating" id="heart-3" value="3">
              </div>
              <div class="heart">
                <label for="heart-4">4</label>
                <input type="radio" name="rating" id="heart-4" value="4">
              </div>
              <div class="heart">
                <label for="heart-5">5</label>
                <input type="radio" name="rating" id="heart-5" value="5" checked>
              </div>
            </div>
          </div>
        </form>
        <div class="form-buttons">
          <div class="btnLeft">
            <button id="cancel">Cancel</button>
          </div>
          <div class="btnRight">
            <button type="submit" id="update" form="update-bookmark-form">Update</button>
          </div>
        </div>
      </section>
    `;
}

function startPage() {
  const title = topOfPage();
  const nav = topButtons();
  const list = createFullList(store.bookmarks, store.filter);

  return title + nav + list;
}

function formPage() {
  const title = topOfPage();
  const form = newBookmarkForm();

  return title + form;
}

function editPage() {
  const title = topOfPage();
  const form = updateBookmark();

  return title + form;
}

function renderMain() {
  let createPage = null;

  if (store.editing) {
    createPage = editPage();
  } else if (store.adding) {
    createPage = formPage();
  } else {
    createPage = startPage();
  }

  $('main').html(createPage);
}

function handleNewClick() {
  $('main').on('click', '#newBookMark', function (e) {
    e.preventDefault();
    store.adding = true;

    renderMain();
  });
}

function handleCancelClick() {
  $('main').on('click', '#cancel', function (e) {
    e.preventDefault();

    store.adding = false;
    store.editing = false;
    store.edId = null;

    renderMain();
    handleClickEdit();
    handleClickDelete();
  });
}

$.fn.extend({
  serializeJson: function (id = null) {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    o.id = cuid();
    return JSON.stringify(o);
  }
});

function submitNewBookmark() {
  $('main').on('submit', '#new-bookmark-form', function (e) {
    e.preventDefault();
    //console.log("done")
    const url = $("input[name=url]").val();
    if (/^(http)s?:\/\/(.)*/g.test(url) === false) {
      store.error = 'url';
      renderMain();
    } else {
      let newBookmark = $(e.target).serializeJson();

      api.create(newBookmark)
        .then(newMark => {
          store.pushNewBookmark(newMark);
          store.adding = false;
          store.error = null;
          renderMain();
        });
    }
  })
}

function handleBookmarkClick() {
  $('main').on('click', '.li-title', function (e) {
    const id = $(this).parent().attr('id');
    const index = store.findIndex(id);
    //console.log(index)

    // use id to update api and then re-render
    store.expandedToggle(index);
    renderMain();
    handleClickEdit();
    handleClickDelete();
  });
}

function handleClickEdit() {
  $('li').on('click', '.edit', function (e) {
    const id = $(this).parent().parent().parent().parent().attr('id');
    const index = store.findIndex(id);

    store.editing = true;
    store.edId = id;

    renderMain();
    handleClickEdit();
    handleClickDelete();
  });
}

function handleBookmarkUpdate() {
  $('main').on('submit', '#update-bookmark-form', function (e) {
    e.preventDefault();
    const url = $("input[name=url]").val();

    if (/^(http)s?:\/\/(.)*/g.test(url) === false) {
      store.error = 'url';
      renderMain();
    } else {
      const title = $("input[name=title]").val();
      const rating = $("input[name=rating]:checked").val();
      const desc = $("textarea[name=desc]").val();

      const newObj = JSON.stringify({
        url: url,
        title: title,
        rating: rating,
        desc: desc,
      });

      api.update(store.edId, newObj)
        .then(() => {
          const parsedObj = JSON.parse(newObj);
          store.updateBookmark(store.edId, parsedObj);
          store.editing = false;
          store.edID = null;
          store.error = null;
          renderMain();
          handleClickEdit();
          handleClickDelete();
        });
    }

  });
}

function handleClickDelete() {
  $('li').on('click', '.delete', function () {
    const id = $(this).parent().parent().parent().parent().attr('id');
    api.remove(id)
      .then(() => {
        store.deleteBookmark(id);
        renderMain();
        handleClickEdit();
        handleClickDelete();
      });



    renderMain();
    handleClickEdit();
    handleClickDelete();
  });
}

function handleFilterClick() {
  $('main').on('change', '#rating', function (e) {
    const selectedVal = $('#rating option:selected').val();
    if (selectedVal === '') {
      store.filter = '0';
    } else {
      store.filter = selectedVal;
    }

    renderMain();
  });
}

export default {
  renderMain,
  handleNewClick,
  handleCancelClick,
  submitNewBookmark,
  handleBookmarkClick,
  handleClickEdit,
  handleBookmarkUpdate,
  handleClickDelete,
  handleFilterClick,
};