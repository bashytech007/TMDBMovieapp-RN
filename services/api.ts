// export const TMDB_CONFIG={
//     BASE_URL:'https://api.themoviedb.org/3',
//     API_KEY:process.env.EXPO_PUBLIC_MOVIE_API_KEY,
//     headers:{
//         accept:'application/json',
//         Authorization:'Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}'
//     }
// }

// export const fetchMovies=async({query}:{query:string})=>{
//     const endpoint=query
//     ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
//     :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

//     const response =await fetch(endpoint,{
//         method:'GET',
//         headers:TMDB_CONFIG.headers,
//     });
//     if(!response.ok){
//         //@ts-ignore
//         throw new Error('Failed to fetch movies',response.statusText)
//     }
//     const data =await response.json();
//     return data.results;
// }

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        // Fixed: Use backticks for template literal, not single quotes
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({ query }: { query: string }) => {
    try {
        // Add API key to URL as a fallback
        const endpoint = query
            ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&query=${encodeURIComponent(query)}`
            : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;

        console.log('Fetching from:', endpoint.replace(TMDB_CONFIG.API_KEY || '', 'API_KEY_HIDDEN'));
        console.log('API Key exists:', !!TMDB_CONFIG.API_KEY);

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched movies count:', data.results?.length);
        
        return data.results || [];
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

export const fetchMovieDetails=async(movieId:string):Promise<MovieDetails>=>{
    try{
        const response =await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
            method:'GET',
            headers:TMDB_CONFIG.headers,

        })
        if(!response.ok) throw new Error('Failed to fetch movies')
            const data=await response.json();

        return data;
    }catch(error){
        console.log(error);
        throw error;
    }
}
// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZTM1MWIzODYxYTRhZmNiYWYxODM0Y2QwMjFhNzhkNyIsIm5iZiI6MTc1OTQ2NzU2Mi4xNzYsInN1YiI6IjY4ZGY1ODJhYWU1ODgwMTQ1ODViODQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EJEwP9jHTq6FioLswsXcAoAbb9q99vCMiAsYJD-qoLg'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));