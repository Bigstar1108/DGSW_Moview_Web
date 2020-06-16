import defaultApi from './defaultApi';
import { TMDB_API_KEY } from  '../../config/config.json';

export const movies = {
    getReview: (movieId) => {
        defaultApi.get(
            `${movieId}/reviews?api_key=${TMDB_API_KEY}&language=ko&page=1&region=KR`
        )
    }
};