'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('STREAMFIX App Error:', error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in zoom-in duration-300">
            <div className="relative">
                <div className="absolute inset-0 bg-brand-red blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-24 h-24 bg-bg-card rounded-3xl border border-white/10 flex items-center justify-center shadow-2xl">
                    <AlertTriangle className="w-10 h-10 text-brand-red" />
                </div>
            </div>

            <div className="space-y-3 max-w-sm">
                <h2 className="text-3xl font-black tracking-tighter text-white">Oops! Encountered a Glitch.</h2>
                <p className="text-slate-400 font-medium">
                    Our TMDB engine ran into an unexpected issue. Don't worry, your progress is safe.
                </p>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => reset()}
                    className="flex items-center gap-3 px-8 py-3.5 bg-brand-red text-white rounded-2xl font-black text-xs hover:bg-brand-red/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-red/20"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>
                <Link
                    href="/"
                    className="flex items-center gap-3 px-8 py-3.5 bg-white/5 text-white rounded-2xl font-black text-xs hover:bg-white/10 transition-all border border-white/10"
                >
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-bg-card border border-white/5 rounded-xl text-left max-w-2xl overflow-auto text-[10px] text-slate-500 font-mono">
                    {error.message}
                </div>
            )}
        </div>
    );
}
