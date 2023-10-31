require('../css/styles.css');
const $ = require('jquery');
import 'bootstrap/dist/js/bootstrap.bundle';
const Utilities = require('./utilities');

// Remove any visible alerts on page load
window.onload = () => {
    Utilities.removeAlert();
};

// Start: sticky search box functionality
$(document).scroll(() => {
    let scrollTop = $(document).scrollTop();

    if (scrollTop > 175) {
        Utilities.searchBooksForm.addClass('sticky');
    } else {
        Utilities.searchBooksForm.removeClass('sticky');
    }
});

$(document).trigger('scroll');
// End: sticky search box functionality

const removeBook = async elem => {
    const id = elem.getAttribute('data-bookid');

    try {
        const result = await fetch(`/books/deletebook/${id}`, { method: 'DELETE' });
        const jsonResponse = await result.json();
        
        Utilities.removeBookModal.modal('hide');
        Utilities.showAlert('danger', jsonResponse.msg, () => {
            window.location.reload(true);
        });
    } catch (err) {
        console.error('Fetch error: ', err);
        Utilities.showAlert('danger', err.msg);
    }
};

const getBookInfo = async elem => {
    Utilities.showLoader();
    try {
        const bookResponse = await fetch(`/books/getbookinfo?bookquery=${elem.getAttribute('data-query')}`);
        const bookData = await bookResponse.json();

        if (!bookData) {
            Utilities.showAlert('danger', 'Sorry, we could not find any information on that volume.');
            Utilities.showLoader();
            return false;
        }

        const title = bookData.volumeInfo.title || '';
        const subtitle = bookData.volumeInfo.subtitle || '';
        const imageUrl = bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.smallThumbnail : false;
        const publishedDate = bookData.volumeInfo.publishedDate || '';
        const pageCount = bookData.volumeInfo.pageCount || '';
        const description = bookData.volumeInfo.description || '';
        const categories = bookData.volumeInfo.categories ? bookData.volumeInfo.categories.join(', ') : '';
        const authors = bookData.volumeInfo.authors ? bookData.volumeInfo.authors.join(', ') : '';

        Utilities.bookDetailsModal.find('.modal-title').text(`${title} ${subtitle}`);
        Utilities.bookDetailsModal.find('img').prop('src', imageUrl ? imageUrl : Utilities.defaultBookImage);
        Utilities.bookDetailsModal.find('.published').text(publishedDate);
        Utilities.bookDetailsModal.find('.pages').text(pageCount);
        Utilities.bookDetailsModal.find('.categories').text(categories);
        Utilities.bookDetailsModal.find('.authors').text(authors);
        Utilities.bookDetailsModal.find('.description').text(description);

        Utilities.showLoader();
        Utilities.bookDetailsModal.modal('show');
    } catch (err) {
        console.error('Fetch error: ', err);
        Utilities.showAlert('danger', err.message);
        Utilities.showLoader();
    }
}

const setDataAttribute = elem => {
    const id = elem.getAttribute('data-bookid');
    document.getElementById('removeBookConfirm').setAttribute('data-bookid', id);
};

$('#search-books-submit').on('click', event => {
    event.preventDefault(); // prevent form from automatically submitting

    if (Utilities.bookSearch.val().trim()) {
        Utilities.searchBooksForm.submit();
    } else {
        Utilities.showAlert('danger', 'Please enter a search term first.');
    }
});

$('#books-table').on('click', '.get-book-info', event => {
    getBookInfo(event.currentTarget);
});

$('#book-cards-list').on('click', '.get-book-info', event => {
    getBookInfo(event.currentTarget);
});

$('#books-table').on('click', '.remove-book', event => {
    setDataAttribute(event.currentTarget);
});

$('#book-cards-list').on('click', '.remove-book', event => {
    setDataAttribute(event.currentTarget);
});

// this event triggered from "removeBookModal" yes button
$('#removeBookConfirm').on('click', event => {
    removeBook(event.currentTarget);
});