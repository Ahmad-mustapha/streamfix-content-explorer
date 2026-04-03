'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { TopBarProps } from '@/types/layout';

export default function TopBar({ user, isCollapsed, onToggleSidebar, onOpenMobileSidebar }: TopBarProps) {
    const [inputValue, setInputValue] = React.useState('');
    const debouncedValue = useDebounce(inputValue, 350);
    const router = useRouter();

    useEffect(() => {
        if (debouncedValue.trim()) {
            router.push(`/search?q=${encodeURIComponent(debouncedValue.trim())}`);
        }
    }, [debouncedValue, router]);

    return (
        <header className={`fixed top-0 right-0 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 bg-black/80 backdrop-blur-md border-b border-white/5 z-40 transition-all duration-300 ease-out ${
            isCollapsed ? 'left-20' : 'left-0 lg:left-64'
        }`}>
            {/* Left: Collapse Toggle & Mobile Menu */}
            <div className="flex items-center gap-2 md:gap-4">
                <button 
                    onClick={onOpenMobileSidebar}
                    aria-label="Open navigation menu"
                    className="p-2 text-slate-400 hover:text-white lg:hidden"
                >
                    <Menu className="w-5 h-5" />
                </button>
                
                <button 
                    onClick={onToggleSidebar}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="hidden lg:flex items-center justify-center w-8 h-8 rounded border border-white/10 text-slate-500 hover:text-white hover:border-brand-red transition-all active:scale-95 group"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-4 h-4 group-hover:scale-110" />
                    ) : (
                        <ChevronLeft className="w-4 h-4 group-hover:scale-110" />
                    )}
                </button>
            </div>

            {/* Middle: Search bar (Geometric style) */}
            <div className="flex-1 max-w-xl px-4 md:px-8 hidden md:block">
                <div className="relative group">
                    <label htmlFor="topbar-search" className="sr-only">Search movies</label>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-brand-red transition-colors" />
                    <input 
                        id="topbar-search"
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search movies..."
                        className="w-full h-11 bg-white/[0.03] border border-white/10 rounded-lg pl-12 pr-12 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-red/30 focus:bg-white/[0.05] transition-all font-medium"
                    />
                </div>
            </div>

            {/* Right: Empty space to balance or additional actions if ever needed */}
            <div className="w-8 md:w-20 hidden md:block" />
        </header>
    );
}
