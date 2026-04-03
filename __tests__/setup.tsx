import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mocking Next.js Navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mocking Next/Image
vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));
