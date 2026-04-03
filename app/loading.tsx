import React from 'react';

export default function Loading() {
    return (
        <div className="space-y-16 animate-pulse">
            {/* Hero Skeleton Layout */}
            <div className="h-[550px] w-full bg-bg-card rounded-[2.5rem] border border-white/5 opacity-40"></div>

            {/* Grid Skeletons */}
            <div className="space-y-8">
                <div className="h-8 w-48 bg-bg-card rounded-lg opacity-40"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="aspect-[2/3] bg-bg-card rounded-2xl opacity-20"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
