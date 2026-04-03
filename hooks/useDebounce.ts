'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing input values.
 * Essential for Search inputs to reduce API calls (Requirement: F-3 Debounce >= 300ms).
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
