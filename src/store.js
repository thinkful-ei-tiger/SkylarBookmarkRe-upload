//this file will hold te functions/objects for the STORE, which is where items will be stored


const bookmarks=[];
let adding = false;
let edId = null;
let error = null;
let filter = 0;
let editing= false

function pushNewBookmark(newMark) {
    this.bookmarks.push(newMark);
} 

function updateBookmark(id, newData) {
  let obj = findById(id);
  Object.assign(obj, newData);
}

function createStoreArray(apiBookmarks) {
  apiBookmarks.forEach(bookmark => {
    this.bookmarks.push(bookmark);
  });
  addToBookmark(this.bookmarks);
}

function expandedToggle(index) {
  if (this.bookmarks[index].expand) {
    this.bookmarks[index].expand = false;
  } else if (!this.bookmarks[index].expand) {
    this.bookmarks[index].expand = true;
  }
}

function findIndex(id) {
  return bookmarks.indexOf(bookmarks.find(bookmark => bookmark.id === id));
}

function deleteBookmark(id) {
  const index = findIndex(id);
  bookmarks.splice(index, 1);
}

function addToBookmark(bookmarkArray) {
  bookmarkArray.forEach(bookmark => {
    bookmark.updated = false;
    bookmark.expand= false;
  });
}

function findById(id) {
  return bookmarks.find(bookmark => bookmark.id === id);
}

export default {
    bookmarks,
    pushNewBookmark,
    createStoreArray,
    findById,
    findIndex,
    adding,
    filter,
    deleteBookmark,
    editing,
    error,
    updateBookmark,
    expandedToggle
}
