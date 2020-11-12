//this file will hold te functions/objects for the STORE, which is where items will be stored


const bookmarks=[];
let adding = false;
let error = null;
let filter = 0;

function pushNewBookmark(newMark) {
    this.bookmarks.push(newMark);
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
    error,
    expandedToggle
}
