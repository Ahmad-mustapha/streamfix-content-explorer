'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Download, Plus, Star } from 'lucide-react';
import { tmdb } from '@/lib/tmdb';
import { FeaturedHeroProps } from '@/types/ui';

export default function FeaturedHero({ movie }: FeaturedHeroProps) {
    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path, 'backdrop');

    return (
        <section className="relative h-[360px] md:h-[500px] w-full rounded-2xl bg-bg-card border border-white/5 overflow-hidden group">
            {backdropUrl && (
                <Image
                    src={backdropUrl}
                    alt={movie.title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover opacity-60 md:opacity-50 transition-transform duration-700 group-hover:scale-[1.01]"
                    priority
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-bg-main via-bg-main/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-main/90 via-transparent to-transparent" />

            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-center max-w-xl gap-4 md:gap-5">
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-brand-red/20 text-brand-red rounded-lg text-[8px] md:text-[9px] font-black uppercase tracking-[0.25em] border border-brand-red/30">
                        Trending Now
                    </span>
                    <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-yellow-500" />
                        {movie.vote_average.toFixed(1)}
                    </div>
                </div>

                <div className="space-y-2 md:space-y-3">
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-[1] text-white italic">
                        {movie.title}
                    </h1>
                    <p className="text-slate-400 text-[13px] md:text-base font-medium leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">
                        {movie.overview}
                    </p>
                </div>

                {/* Hero Actions */}
                <div className="flex items-center flex-wrap gap-3 pt-2 md:pt-4">
                    <Link 
                        href={`/items/${movie.id}`}
                        className="flex items-center gap-2 px-6 py-2.5 md:px-8 md:py-3 bg-brand-red text-white rounded-xl font-bold text-[11px] md:text-xs hover:bg-brand-red/90 transition-all active:scale-95 shadow-lg shadow-brand-red/10"
                    >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Watch Now
                    </Link>
                    <button className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10">
                        <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10">
                        <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
