import './sass/index.scss';
import Notiflix from 'notiflix';
import PhotosApiService from './js/photos-service';
import LoadMoreBtn from './js/loadMoreBtn';


const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const photosApiService = new PhotosApiService();
const loadMoreBtn = new LoadMoreBtn({ selector: '.load-more', hidden: true });

Notiflix.Notify.init({
  width: '400px',
  fontSize: '20px',
  cssAnimationStyle: 'zoom'
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  clearGallery();
  
  photosApiService.query = e.currentTarget.elements.searchQuery.value;
  photosApiService.resetPage();
  if (photosApiService.query === '') {
     return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  const responce = await photosApiService.getPhotos()
  try {
    if (photosApiService.currentTotalHits >= responce.totalHits) {
    renderPhotoCard(responce.hits);
    Notiflix.Notify.success(`Hooray! We found ${responce.totalHits} images.`);
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  if (responce.length === 0 ) {
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
  Notiflix.Notify.success(`Hooray! We found ${responce.totalHits} images.`);
  renderPhotoCard(responce.hits);
  loadMoreBtn.show();
  } catch (error) {
    console.log(error)
  }
}

async function onLoadMore() {
  const responce = await photosApiService.getPhotos()
  try {
    if (photosApiService.currentTotalHits >= responce.totalHits) {
    renderPhotoCard(responce.hits);
    loadMoreBtn.hide();
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
  renderPhotoCard(responce.hits);
  } catch (error) {
    console.log(error)
  }
}

function renderPhotoCard(photos) {
    const markup = photos.map(photo => {
        return `
        <div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class = "info-number"> ${photo.likes}</spam>
    </p>
    <p class="info-item">
      <b>Views</b> 
      <span class = "info-number">${photo.views}</spam>
    </p>
    <p class="info-item">
      <b>Comments:</b> 
      <span class = "info-number">${photo.comments}</spam>
    </p>
    <p class="info-item">
      <b>Downloads:</b> 
      <span class = "info-number">${photo.downloads}</spam>
    </p>
  </div>
</div>
        `
    }).join("");
    gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  gallery.innerHTML = "";
}




