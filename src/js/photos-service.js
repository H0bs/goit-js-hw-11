import axios from "axios";
const API_KEY = '29676871-837cab832e208c22136e7205d';
const PER_PAGE = 40;

export default class PhotosApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async getPhotos() {
        const url = `https://pixabay.com/api/`
        const response = await axios.get(url, {
            params: {
                    key: API_KEY,
                    q: this.searchQuery,
                    image_type: "photo",
                    orientation: "horizontal",
                    safesearch: "true",
                    per_page: PER_PAGE,
                    page: this.page
                }        
            });
        // this.totalHits = this.page * PER_PAGE
        this.page += 1;
        return response.data;
    }

    resetPage() {
        this.page = 1;
    }

    get currentTotalHits() {
        return PER_PAGE * (this.page-1);
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}





















// const API_KEY = '29676871-837cab832e208c22136e7205d';
// import axios from 'axios';

// export default class PhotosApiService {
//     constructor() {
//         this.search = '';
//         this.page = 1;
//     }

//     fetchPhotos() {
//         async function getPhotos() {
//                 const response = await axios.get('https://pixabay.com/api/', {
//                 params: {
//                     key: API_KEY,
//                     q: this.search,
//                     image_type: "photo",
//                     orientation: "horizontal",
//                     safesearch: "true",
//                     per_page: 40,
//                     page: this.page
//                 }
//             })
//                 const data = await response.data.hits;
//                 this.page += 1;
//                 console.log(response)
//             if (data.length === 0) {
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//             }
//             return data;
//                 // renderPhotoCard(data);

//         }
//     }

// get query() {
//     return this.search;
// }

//     set query(newSearch) {
//         this.search = newSearch;
// }   
    
// }


