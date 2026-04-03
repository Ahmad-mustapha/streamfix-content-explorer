'use client';

import React from 'react';
import { GenreFiltersProps } from '@/types/ui';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const GENRES = [
    'All', 'Action', 'Adventure', 'Animation', 'Comedy', 
    'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy'
];

export default function GenreFilters({ activeGenre, onGenreSelect }: GenreFiltersProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Default to 'All' if activeGenre is not provided, or get from SearchParams if in URL mode
    const currentGenre = activeGenre || searchParams.get('genre') || 'All';

    const handleGenreSelect = (genre: string) => {
        if (onGenreSelect) {
            onGenreSelect(genre);
            return;
        }

        // Default: Update URL Search Params
        const params = new URLSearchParams(searchParams.toString());
        if (genre === 'All') {
            params.delete('genre');
        } else {
            params.set('genre', genre);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <nav aria-label="Filter by genre" className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            <ul role="list" className="flex gap-2">
                {GENRES.map((genre) => (
                    <li key={genre}>
                        <button
                            onClick={() => handleGenreSelect(genre)}
                            aria-current={currentGenre === genre ? 'page' : undefined}
                            className={`px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all duration-300 ${
                                currentGenre === genre
                                ? 'bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/20'
                                : 'bg-white/[0.03] border-white/5 text-slate-500 hover:text-white hover:border-white/10'
                            }`}
                        >
                            {genre}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
