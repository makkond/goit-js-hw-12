import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentQuery = '';
let currentPage = 1;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  const searchInput = event.target.elements.searchQuery;
  const query = searchInput.value.trim();

  if (!query) {
    window.iziToast.error({
      title: 'Помилка',
      message: 'Будь ласка, введіть пошуковий запит',
      position: 'topRight',
    });
    return;
  }

  if (query !== currentQuery) {
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
  }

  currentQuery = query;

  try {
    showLoader();
    hideLoadMoreButton();

    const data = await getImagesByQuery(query, currentPage);

    if (data.hits.length === 0) {
      window.iziToast.info({
        title: 'Інформація',
        message:
          'На жаль, за вашим запитом нічого не знайдено. Спробуйте інший запит.',
        position: 'topRight',
      });
      return;
    }

    if (currentPage === 1) {
      window.iziToast.success({
        title: 'Успіх',
        message: `Знайдено ${data.totalHits} зображень`,
        position: 'topRight',
      });
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      if (data.hits.length > 0) {
        window.iziToast.info({
          title: 'Інформація',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    }

    if (currentPage > 1) {
      smoothScroll();
    }
  } catch (error) {
    window.iziToast.error({
      title: 'Помилка',
      message: 'Щось пішло не так. Спробуйте ще раз пізніше.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  try {
    showLoader();
    hideLoadMoreButton();

    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      window.iziToast.info({
        title: 'Інформація',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    smoothScroll();
  } catch (error) {
    window.iziToast.error({
      title: 'Помилка',
      message: 'Щось пішло не так. Спробуйте ще раз пізніше.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const gallery = document.querySelector('.gallery');
  if (!gallery || !gallery.firstElementChild) {
    console.log('No cards to scroll to');
    return;
  }

  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
