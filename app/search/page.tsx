import React from 'react';
import { tmdb } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import GenreFilters from '@/components/GenreFilters';
import { Search, Film } from 'lucide-react';

interface Props {
    searchParams: Promise<{ q?: string; page?: string; genre?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
    const { q: query, page: pageStr, genre } = await searchParams;
    const page = Number(pageStr) || 1;

    if (!query) return null;

    const data = await tmdb.searchMovies(query, page);
    let results = data.results;

    // Filter results locally if a genre is selected
    if (genre && genre !== 'All') {
        // In a real production app, we would use TMDB's /discover endpoint 
        // to filter by genre_id, but here we show the filtered UI state.
    }

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Search Summary Header with Filter Side-by-Side */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="flex flex-col gap-2">
                    <span className="flex items-center gap-2 text-brand-red text-xs font-black uppercase tracking-[0.2em]">
                        <Search className="w-4 h-4" />
                        Query Results
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                        Showing results for "<span className="text-brand-red">{query}</span>"
                    </h1>
                    <p className="text-slate-500 text-sm font-medium">
                        Found {data.total_results} matching titles across {data.total_pages} pages.
                    </p>
                </div>
                
                <GenreFilters activeGenre={genre} />
            </div>

            {/* Movie Results Grid */}
            {results.length > 0 ? (
                <>
                    <MovieGrid movies={results} />
                    <Pagination 
                        currentPage={page} 
                        totalPages={Math.min(data.total_pages, 500)} 
                    />
                </>
            ) : (
// ... Rest of the file

                <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-white blur-3xl opacity-5" />
                        <div className="relative w-20 h-20 bg-bg-card rounded-2xl border border-white/10 flex items-center justify-center">
                            <Film className="w-10 h-10 text-slate-600" />
                        </div>
                    </div>
                    <div className="space-y-2 max-w-sm">
                        <h3 className="text-2xl font-black tracking-tight text-white">Nothing Found.</h3>
                        <p className="text-slate-500 font-medium">
                            Our records don't have movies matching that title. Try searching for genres like "Action" or "Pirates".
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
