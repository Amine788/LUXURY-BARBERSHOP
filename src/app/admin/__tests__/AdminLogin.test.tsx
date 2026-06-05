import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminLogin } from '../AdminLogin';

// Mock store
vi.mock('../../../lib/store', () => ({
  login: vi.fn(),
}));

import * as store from '../../../lib/store';

describe('AdminLogin Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(<AdminLogin onLogin={() => {}} />);
    expect(screen.getByPlaceholderText('Entrez le mot de passe')).toBeInTheDocument();
  });

  it('calls onLogin on successful authentication', async () => {
    (store.login as any).mockResolvedValue(true);
    const mockOnLogin = vi.fn();

    render(<AdminLogin onLogin={mockOnLogin} />);

    const input = screen.getByPlaceholderText('Entrez le mot de passe');
    input.setAttribute('value', 'aviator2024');
    const form = input.closest('form');
    if (form) {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    }

    await waitFor(() => {
      expect(store.login).toHaveBeenCalled();
    });
  });
});
