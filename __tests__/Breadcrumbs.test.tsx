import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Breadcrumbs from '@/components/Breadcrumbs';

describe('Breadcrumbs Component', () => {
    it('renders navigation path correctly', () => {
        const items = [
            { label: 'Sci-Fi', href: '/search?q=sci-fi' },
            { label: 'Interstellar' }
        ];
        render(<Breadcrumbs items={items} />);
        
        expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
        expect(screen.getByText('Interstellar')).toBeInTheDocument();
    });

    it('applies the correct href to linked items', () => {
        const items = [{ label: 'Action', href: '/action' }];
        render(<Breadcrumbs items={items} />);
        
        const link = screen.getByRole('link', { name: /action/i });
        expect(link).toHaveAttribute('href', '/action');
    });

    it('displays the final item as text, not a link', () => {
        const items = [{ label: 'Movie Title' }];
        render(<Breadcrumbs items={items} />);
        
        const text = screen.getByText('Movie Title');
        expect(text.tagName).not.toBe('A');
    });
});
