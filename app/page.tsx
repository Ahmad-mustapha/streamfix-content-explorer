import React from 'react';
import { tmdb } from '@/lib/tmdb';
import FeaturedHero from '@/components/FeaturedHero';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';

export default async function Home({ searchParams }: { searchParams: { page?: string } }) {
    const page = Number(searchParams?.page) || 1;

    // Fetch initial movie data
    const trendingData = await tmdb.getTrending();
    const popularData = await tmdb.getPopular(page);

    const featuredMovie = trendingData.results[0];
    const popularMovies = popularData.results;

    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            {featuredMovie && <FeaturedHero movie={featuredMovie} />}

            <div className="space-y-12">
                <MovieGrid 
                    movies={popularMovies} 
                    title="Popular Movies" 
                />

                <Pagination 
                    currentPage={page} 
                    totalPages={Math.min(popularData.total_pages, 500)} // TMDB limit
                />

                {/* Second row for visual variety (Trending row) */}
                <MovieGrid 
                    movies={trendingData.results.slice(1, 11)} 
                    title="Trending Today" 
                />
            </div>
        </div>
    );
}
