const API_KEY = '4fb4222cba3dbff786263b6256525d6c';
const API_BASE = 'https://api.themoviedb.org/3';

/*
-originais da netflix
-recomendados
-em alta (top rated)
-ação
-comedia
-terror
-romance
-documentario
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
} /*Esta função da um Fetch na url que você quer pegar, e retorna o json*/


export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`), /*a requisição é feita na url, e o json é retornado a porta 213 é netflix*/
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`), /*esta requisição retorna os filmes em destaque da semana*/
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch('/discover/movie?with_genres=28&language=pt-BR&api_key=' + API_KEY), /*a requisição 28 é eferente a busca de ação*/
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch('/discover/movie?with_genres=35&language=pt-BR&api_key=' + API_KEY), /*a requisição 35 é eferente a busca de comédia*/
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch('/discover/movie?with_genres=27&language=pt-BR&api_key=' + API_KEY), /*a requisição 27 é eferente a busca de terror*/
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch('/discover/movie?with_genres=10749&language=pt-BR&api_key=' + API_KEY), /*a requisição 10749 é eferente a busca de romance*/
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch('/discover/movie?with_genres=99&language=pt-BR&api_key=' + API_KEY), /*a requisição 99 é eferente a busca de documentário*/
            },

        ];
    },

    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch (type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;

                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }    
        }

        return info;

    }
       

}