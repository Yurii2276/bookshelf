import Notiflix from 'notiflix';
import { fetchToAllBooks, fetchBooksByCategory } from '../services/books-api';
import { renderMarkupTopBooks, countTopBooks } from './contentFunctions';

//кі-сть загружених книг однієї категорії після того, як користувач натиснув на кнопку SEEMORE
let numberOfBooksShown = countTopBooks();
//категорія, по кнопкі якій натиснули
let selectedCategory = '';

const HowManyBooksToLoad = 5;
const containerBook = document.querySelector('.container-books');
const content = document.querySelector('.content');
const categoryItem = document.querySelector('.content_category');

containerBook.innerHTML = `<div class="content-error"> 
              <img 
              src="${require('../images/shopping-list/Books.png')}"
              alt="error"
              class="content_imgError"/>
         </div>`;

getTopBooks();

export function getTopBooks() {
  containerBook.innerHTML = '';
  fetchToAllBooks()
    .then(result => {
      return result.data;
    })
    .then(data => (containerBook.innerHTML = renderMarkupTopBooks(data)));
}

function getBooksByCat(butElem, category) {
  fetchBooksByCategory(category)
    .then(result => {
      return result.data;
    })
    .then(data => {
      renderDataBycat(butElem, data);
    })
    .catch();
}

export function renderDataBycat(butElem, data) {
  let markup = createMarkupWithFiveBooks(butElem, data);
  butElem.previousElementSibling.insertAdjacentHTML('beforeend', markup);
}

const test = document.querySelector('.container-books');
test.addEventListener('click', handleSumitSeeMore);

function handleSumitSeeMore(e) {
  e.preventDefault();
  if (e.target.type !== 'button') {
    return;
  }

  //якщо натиснули на нову категорію, то скидаємо параметри і заново беремо список книг
  if (e.target.name !== selectedCategory) {
    numberOfBooksShown = countTopBooks();
  }
  selectedCategory = e.target.name;
  getBooksByCat(e.target, selectedCategory);
}

//створюється розмітка при натисненні кнопки SeeMore. Т к декілька книг вже загружено, то
//ці перші книги не загружає, догружає ще декілька(HowManyBooksToLoad).
//Коли доходе до кінця, видаляє кнопку.
function createMarkupWithFiveBooks(elem, arrayBooks) {
  console.log(elem.parentNode.nextSibling.firstElementChild);
  let counter = 0;
  let loaded = 0;
  let markup = arrayBooks
    .map((book, index) => {
      if (index >= numberOfBooksShown && counter < HowManyBooksToLoad) {
        counter += 1;
        loaded += 1;
        //якщо загрузили останню книгу, то видаляємл кнопку
        if (index + 1 === arrayBooks.length) {
          hiddenBtnSeeMore(elem);
          elem.parentNode.nextSibling.firstElementChild.classList.add(
            'contend_categoryMove'
          );
          Notiflix.Notify.info('this is all. Check out other category books');
        }
        return `<li class="content_book">
                          <a  href="${book.book_image}" data-id="${book._id}" >
                          <img class="content__image" src="${book.book_image}" alt="${book.title}" loading="lazy" />
                          </a>
                          <span class="content_textname"><p id="content_book_name">${book.title}</p></span>
                          <span class="content_textauthor"><p id="content_book_author">${book.author}</p></span>
                </li>`;
      }
    })
    .join('');
  numberOfBooksShown += loaded;
  loaded = 0;
  return markup;
}

function hiddenBtnSeeMore(elem) {
  elem.classList.add('hidden');
}

//налаштування для Notflix
Notiflix.Notify.init({
  width: '480px',
  position: 'right-bottom',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  clickToClose: true,
  timeout: 3000,
  background: '#4f2ee8',
});
