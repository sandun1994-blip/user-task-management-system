import { expect, test,vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

vi.mock('next/font/google', () => {
  return {
    Poppins: () => ({
      className: 'mocked-poppins',
    }),
  };
});

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});
 
test('Home', () => {
  render(<Home />);
  
  // Assert that the heading "user task management system" is rendered
  const headingElement = screen.getByText(/user task management system/i);
  expect(headingElement).toBeTruthy();

  // Example: Assert that the Sign In button is present
  const signInButton = screen.getByRole('button', { name: /sign in/i });
  expect(signInButton).toBeTruthy();
});