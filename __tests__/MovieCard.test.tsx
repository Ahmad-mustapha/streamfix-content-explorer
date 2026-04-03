import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/types/movie';

const mockMovie: Movie = {
    id: 123,
    title: 'Interstellar',
    original_title: 'Interstellar',
    overview: 'A team of explorers...',
    poster_path: '/path.jpg',
    backdrop_path: '/back.jpg',
    release_date: '2014-11-07',
    vote_average: 8.6,
    vote_count: 30000,
    genre_ids: [12, 18, 878],
    popularity: 1500,
};

describe('MovieCard Component', () => {
    it('renders movie title and release year correctly', () => {
        render(<MovieCard movie={mockMovie} />);
        
        expect(screen.getByText('Interstellar')).toBeInTheDocument();
        expect(screen.getByText('2014')).toBeInTheDocument();
    });

    it('links to the correct detail page', () => {
        render(<MovieCard movie={mockMovie} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/items/123');
    });

    it('renders the rating correctly', () => {
        render(<MovieCard movie={mockMovie} />);
        expect(screen.getByText('8.6')).toBeInTheDocument();
    });

    it('renders N/A and video icon placeholder when data is missing', () => {
        const patchyMovie = { ...mockMovie, poster_path: null, release_date: '' } as any;
        render(<MovieCard movie={patchyMovie} />);
        
        expect(screen.getByText('N/A')).toBeInTheDocument();
        // Since we mock lucide icons, we can't easily check for the specific Video icon,
        // but the code branch for {posterUrl ? ... : ...} is now executed.
    });
});
