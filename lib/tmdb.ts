import { Movie, MovieResponse } from '@/types/movie';

const TMDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Fallback data for testing or when API key is not configured
const MOCK_MOVIES: Movie[] = [
    {
        id: 1,
        title: "The Curse of the Black Pearl",
        original_title: "Pirates of the Caribbean",
        overview: "Captain Jack Sparrow teams up with Will Turner to rescue Elizabeth Swann from the cursed pirates of the Black Pearl.",
        poster_path: "/z899_mock.jpg",
        backdrop_path: "/z899_bg_mock.jpg",
        release_date: "2003-07-09",
        vote_average: 8.5,
        vote_count: 15000,
        genre_ids: [28, 12, 14],
        popularity: 950
    },
    {
        id: 2,
        title: "The Incredible Hulk",
        original_title: "The Incredible Hulk",
        overview: "Scientist Bruce Banner scours the planet for an antidote to the unbridled force of rage within him.",
        poster_path: "/hulk_mock.jpg",
        backdrop_path: "/hulk_bg_mock.jpg",
        release_date: "2008-06-12",
        vote_average: 7.2,
        vote_count: 8000,
        genre_ids: [28, 878, 12],
        popularity: 500
    }
];

// Standard fetch wrapper for TMDB API with auth headers
async function tmdbFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const isMock = !TMDB_ACCESS_TOKEN || TMDB_ACCESS_TOKEN === 'your_read_access_token_here';
    
    if (isMock) {
        console.warn("⚠️ TMDB API Token missing. Returning Mock Data for demonstration.");
        return {
            results: MOCK_MOVIES,
            page: 1,
            total_pages: 1,
            total_results: MOCK_MOVIES.length
        } as unknown as T;
    }

    const url = `${TMDB_BASE_URL}${endpoint}`;
    
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
                'accept': 'application/json',
            },
            next: { revalidate: 3600 },
        });

        if (!response.ok) {
            throw new Error(`Unauthorized (Check your .env settings)`);
        }

        return response.json();
    } catch (e) {
        console.error("Fetch failed, falling back to Mock Data.");
        return {
            results: MOCK_MOVIES,
            page: 1,
            total_pages: 1,
            total_results: MOCK_MOVIES.length
        } as unknown as T;
    }
}

/**
 * TMDB API Client Service
 */
export const tmdb = {
    // Fetch trending content
    getTrending: async (page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/trending/movie/day?page=${page}`);
    },

    // Get Popular Movies (Requirement: F-1)
    getPopular: async (page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/movie/popular?page=${page}`);
    },

    // Search Movies (Requirement: F-3)
    searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
    },

    // Fetch movie details by ID
    getMovieDetails: async (id: string | number): Promise<Movie> => {
        const isMock = !TMDB_ACCESS_TOKEN || TMDB_ACCESS_TOKEN === 'your_read_access_token_here';
        if (isMock) {
            return MOCK_MOVIES[0];
        }
        return tmdbFetch<Movie>(`/movie/${id}`);
    },

    // Fetch similar movies
    getSimilarMovies: async (id: string | number, page: number = 1): Promise<MovieResponse> => {
        return tmdbFetch<MovieResponse>(`/movie/${id}/similar?page=${page}`);
    },

    // Helper to construct TMDB image URLs
    getImageUrl: (path: string | null, size: 'poster' | 'backdrop' = 'poster') => {
        if (!path) return null;
        if (path.includes('_mock.jpg')) {
            // Unsplash placeholder so Next/Image doesn't fail on DNS for missing TMDB mock urls
            return "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1080";
        }
        const width = size === 'poster' ? 'w500' : 'original';
        return `${TMDB_IMAGE_BASE_URL}/${width}${path}`;
    },

    // Filter results locally by Genre (Requirement: F-3 Logic)
    filterByCategory: (results: Movie[], category?: string) => {
        if (!category || category === 'All') return results;
        const genreMap: Record<string, number> = {
            'Action': 28, 'Adventure': 12, 'Animation': 16, 'Comedy': 35, 
            'Crime': 80, 'Documentary': 99, 'Drama': 18, 'Family': 10751, 'Fantasy': 14
        };
        const targetId = genreMap[category];
        return targetId ? results.filter(movie => movie.genre_ids?.includes(targetId)) : results;
    }
};
