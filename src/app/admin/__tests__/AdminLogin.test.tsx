import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminLogin } from '../AdminLogin';
import * as store from '../../../lib/store';

// Mock Dependencies
vi.mock('../../../lib/store', () => ({
  login: vi.fn(),
}));

describe('AdminLogin Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    render(<AdminLogin onLogin={() => {}} />);
    expect(screen.getByPlaceholderText('Entrez le mot de passe')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('calls onLogin on successful authentication', async () => {
    (store.login as any).mockResolvedValue(true);
    const mockOnLogin = vi.fn();
    
    render(<AdminLogin onLogin={mockOnLogin} />);
    
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: 'correct_password' } });
    
    const button = screen.getByTestId('login-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.login).toHaveBeenCalledWith('correct_password');
      expect(mockOnLogin).toHaveBeenCalled();
    });
  });

  it('shows error on failed authentication', async () => {
    (store.login as any).mockResolvedValue(false);
    const mockOnLogin = vi.fn();
    
    render(<AdminLogin onLogin={mockOnLogin} />);
    
    const input = screen.getByTestId('password-input');
    fireEvent.change(input, { target: { value: 'wrong_password' } });
    
    const button = screen.getByTestId('login-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(store.login).toHaveBeenCalledWith('wrong_password');
      expect(mockOnLogin).not.toHaveBeenCalled();
      expect(screen.getByText('Mot de passe incorrect')).toBeInTheDocument();
    });
  });
});
