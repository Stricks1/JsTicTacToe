function Book(title, author, numPages, read) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
};

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function render() {
  document.getElementById('book-container').innerHTML = '';
  myLibrary.forEach((book, index) => {
    const div = document.createElement('DIV');
    div.classList.add('book');

    const h1 = document.createElement('H1');
    h1.classList.add('book-title');
    h1.innerHTML = book.title;
    div.appendChild(h1);

    const div2 = document.createElement('DIV');
    div2.classList.add('book-info');
    div.appendChild(div2);

    const sp = document.createElement('SPAN');
    sp.classList.add('span');
    sp.innerHTML = `Author: ${book.author}`;
    div2.appendChild(sp);

    const sp2 = document.createElement('SPAN');
    sp2.classList.add('span');
    sp2.innerHTML = `Num. Pages: ${book.numPages}`;
    div2.appendChild(sp2);

    const sp3 = document.createElement('SPAN');
    sp3.classList.add('span');
    sp3.innerHTML = `${book.read ? 'Already Read' : 'Not Read'}`;
    div2.appendChild(sp3);

    const div3 = document.createElement('DIV');
    div3.classList.add('btns');
    div.appendChild(div3);

    const btn = document.createElement('BUTTON');
    btn.innerHTML = 'Remove';
    btn.classList.add('btn');

    btn.setAttribute('onclick', `removeBook(${index})`);
    div3.appendChild(btn);

    const btn2 = document.createElement('BUTTON');
    btn2.innerHTML = 'Read/Unread';
    btn2.setAttribute('onClick', `toggleBook(${index})`);
    btn2.classList.add('btn');
    div3.appendChild(btn2);

    document.getElementById('book-container').appendChild(div);
  });

  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

/* eslint-disable */
function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function toggleBook(index) {
  myLibrary[index].toggleRead();
  render();
}
/* eslint-enable */
/* eslint-disable */
function createBookWithForm() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const numPages = document.getElementById('numPages');
  const etitle = document.getElementById('error-title');
  const eauthor = document.getElementById('error-author');
  const enumPages = document.getElementById('error-pages');
  etitle.classList.remove('d-inline');
  eauthor.classList.remove('d-inline');
  enumPages.classList.remove('d-inline');
  etitle.classList.add('d-none');
  eauthor.classList.add('d-none');
  enumPages.classList.add('d-none');
  if (numPages.value.trim() === '') {
    numPages.value = '';
    enumPages.classList.add('d-inline');
    numPages.focus();
  }
  if (author.value.trim() === '') {
    author.value = '';
    eauthor.classList.add('d-inline');
    author.focus();
  }
  if (title.value.trim() === '') {
    title.value = '';
    etitle.classList.add('d-inline');
    title.focus();
  }
  if (title.value.trim() === '' || author.value.trim() === '' || numPages.value.trim() === '') {
    return;
  }

  const t = document.getElementById('title').value;
  const a = document.getElementById('author').value;
  const p = document.getElementById('numPages').value;
  const r = document.getElementById('read').checked;

  const book = new Book(t, a, p, r);

  addBookToLibrary(book);
  render();
}
/* eslint-enable */

function checkStored() {
  if (localStorage.getItem('myLibrary')) {
    const myLocalLibrary = JSON.parse((localStorage.getItem('myLibrary')));
    myLocalLibrary.forEach((book) => {
      const t = book.title;
      const a = book.author;
      const p = book.numPages;
      const r = book.read;
      const book2 = new Book(t, a, p, r);
      addBookToLibrary(book2);
    });
    render();
  }
}

checkStored();