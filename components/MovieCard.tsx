'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Video } from 'lucide-react';
import { tmdb } from '@/lib/tmdb';
import { MovieCardProps } from '@/types/ui';

export default function MovieCard({ movie, priority = false }: MovieCardProps) {
    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path, 'backdrop');
    const posterUrl = tmdb.getImageUrl(movie.poster_path);
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return (
        <Link 
            href={`/items/${movie.id}`} 
            className="group block relative aspect-video sm:aspect-[3/4] bg-[#121212] rounded-lg border border-white/5 overflow-hidden transition-all duration-200 hover:border-brand-red/40 active:scale-[0.98] shadow-sm hover:shadow-xl hover:shadow-brand-red/5"
        >
            <div className="absolute inset-0">
                {posterUrl ? (
                    <Image
                        src={posterUrl}
                        alt={movie.title}
                        width={500}
                        height={750}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={priority}
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-700">
                        <Video className="w-6 h-6 opacity-20" />
                    </div>
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent group-hover:from-black/100 transition-all" />

            {/* Item Metadata */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 space-y-2">
                <h3 className="text-white font-bold leading-snug line-clamp-2 text-xs sm:text-sm tracking-wide">
                    {movie.title}
                </h3>
                
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 tracking-widest">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-amber-500">
                            <Star className="w-3 h-3 fill-amber-500" />
                            {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="opacity-50 text-white">{releaseYear}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
