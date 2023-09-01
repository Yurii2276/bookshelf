import axios from 'axios';

const STORAGE_KEY = 'shopping-list';

const refs = {
  ul: document.querySelector('.shopping-list'),
  shoppingListIsEmptyMessage: document.querySelector(
    '.shopping-list-is-empty-message'
  ),
};

// axios.get(`https://books-backend.p.goit.global/books/category?category=Business Books&`).then(({data}) => {
//     console.log(data);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
// });

const books = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (books) {
  refs.shoppingListIsEmptyMessage.hidden = true;
  createMarkup(books);
}

refs.ul.addEventListener('click', deleteItem);

function createMarkup(books) {
  const markup = books
    .map(
      ({
        book_image,
        title,
        list_name,
        author,
        description,
        buy_links,
        _id,
      }) => {
        if (!description) {
          description = 'sorry';
        }

        const currentBuyLinks = buy_links
          .filter(
            ({ name }) =>
              name === 'Amazon' || name === 'Apple Books' || name === 'Bookshop'
          )
          .map(({ name, url }) => {
            if (name === 'Amazon') {
              return `<li><a href="${url}" target="_blank" rel="noopener noreferrer"><img src="./images/shopping-list/amazon.png" width="32" height="11" alt=${name}></a></li>`;
            }

            if (name === 'Apple Books') {
              return `<li><a href="${url}" target="_blank" rel="noopener noreferrer"><img src="./images/shopping-list/apple_books.png" width="16" height="16" alt=${name}></a></li>`;
            }

            if (name === 'Bookshop') {
              return `<li><a href="${url}" target="_blank" rel="noopener noreferrer"><img src="./images/shopping-list/bookshop.png" width="16" height="16" alt=${name}></a></li>`;
            }
          })
          .join('');

        return `<li class="shopping-list-item" data-id="${_id}">
        <img class="shopping-list-item-img" src="${book_image}" width="100" height="142">
            <div class="shopping-list-item-content-wrapper">
                <div class="shopping-list-item-head">
                    <div class="shopping-list-item-head-wrapper">
                        <h3 class="shopping-list-item-title">${title}</h3>
                        <p class="shopping-list-item-category">${list_name}</p>
                    </div>
                    <button type="button" class="shopping-list-delete-btn">
                        <svg class="delete-btn-icon" width="16" height="16">
                            <use href="./images/sprite.svg#icon-trash">
                        </svg>
                    </button>
                </div>
            

                <p class="shopping-list-item-description">${description}</p>

                <div class="shopping-list-item-bottom-wrapper">
                    <p class="shopping-list-item-author">${author}</p>

                <ul>${currentBuyLinks}</ul>
            </div>

        </div>
    </li>`;
      }
    )
    .join('');

  refs.ul.innerHTML = markup;
}

function deleteItem(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const itemId = event.target.closest('.shopping-list-item').dataset.id;
  const books = JSON.parse(localStorage.getItem(STORAGE_KEY));

  const filteredBooks = books.filter(({ _id }) => _id !== itemId);
  localStorage.removeItem(STORAGE_KEY);
  refs.shoppingListIsEmptyMessage.hidden = false;

  if (filteredBooks.length !== 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBooks));
    refs.shoppingListIsEmptyMessage.hidden = true;
  }

  createMarkup(filteredBooks);
}
