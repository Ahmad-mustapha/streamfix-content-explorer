import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { tmdb } from '@/lib/tmdb';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Star, Clock, Calendar, Play, Plus, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
    params: Promise<{ id: string }>;
}

// Metadata generation for SEO and social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const movie = await tmdb.getMovieDetails(id);
    const posterUrl = tmdb.getImageUrl(movie.poster_path);

    return {
        title: `${movie.title} | STREAMFIX`,
        description: movie.overview,
        openGraph: {
            images: posterUrl ? [posterUrl] : [],
            title: movie.title,
            description: movie.overview,
        },
    };
}

// Movie detail view implementation
export default async function MovieDetailPage({ params }: Props) {
    const { id } = await params;
    const movie = await tmdb.getMovieDetails(id);
    const backdropUrl = tmdb.getImageUrl(movie.backdrop_path, 'backdrop');
    const posterUrl = tmdb.getImageUrl(movie.poster_path);
    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return (
        <div className="relative animate-in fade-in duration-500">
            {/* Background Layer (Backdrop) */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                {backdropUrl && (
                    <Image
                        src={backdropUrl}
                        alt=""
                        fill
                        className="object-cover opacity-5 blur-sm"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-bg-main/50 to-bg-main" />
            </div>

            <div className="flex flex-col gap-6">
                <Link 
                    href="/"
                    className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group w-fit"
                >
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest">Back to Library</span>
                </Link>

                <Breadcrumbs items={[{ label: movie.title }]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-16 items-start mt-8">
                {/* Left: Poster Section */}
                <div className="relative aspect-[2/3] w-full rounded-2xl bg-bg-card border border-white/5 overflow-hidden shadow-lg group">
                    {posterUrl ? (
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-900/50">
                            <span className="text-xs font-bold uppercase opacity-30">No Poster</span>
                        </div>
                    )}
                </div>

                {/* Right: Info Section */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                            {movie.title}
                        </h1>

                        <div className="flex items-center flex-wrap gap-4 text-sm font-semibold text-slate-400">
                            <div className="flex items-center gap-1.5 text-amber-500">
                                <Star className="w-4 h-4 fill-amber-500" />
                                <span className="text-white font-bold">{movie.vote_average.toFixed(1)}</span>
                                <span className="opacity-50 font-normal">({movie.vote_count.toLocaleString()})</span>
                            </div>
                            <span className="text-slate-700">•</span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 opacity-70" />
                                {releaseYear}
                            </div>
                            <span className="text-slate-700">•</span>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 opacity-70" />
                                {movie.popularity.toFixed(0)} Popularity
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">Storyline</h2>
                        <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                            {movie.overview}
                        </p>
                    </div>

                    {/* Action Palette */}
                    <div className="flex items-center flex-wrap gap-4 pt-4">
                        <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-sm hover:bg-white/90 transition-all active:scale-95 shadow-md">
                            <Play className="w-4 h-4 fill-black" />
                            Play Now
                        </button>
                        <button className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all">
                            <Plus className="w-5 h-5" />
                        </button>
                        <button className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
