import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Reservations } from '../Reservations';
import * as store from '../../../../lib/store';
import { isSupabaseReady } from '../../../../lib/db';

// Mock Dependencies
vi.mock('../../../../lib/store', () => ({
  getReservations: vi.fn(),
  updateReservationStatus: vi.fn(),
  deleteReservation: vi.fn(),
}));

vi.mock('../../../../lib/db', () => ({
  supabase: {
    channel: vi.fn().mockReturnThis(),
    on: vi.fn().mockReturnThis(),
    subscribe: vi.fn(),
    removeChannel: vi.fn(),
  },
  isSupabaseReady: true,
}));

describe('Reservations Component', () => {
  const mockReservations = [
    {
      id: '1',
      name: 'John Doe',
      phone: '0600000000',
      service: 'Coupe',
      barber: 'Ayman',
      date: '2026-06-10',
      time: '10:00',
      status: 'En attente',
      submittedAt: '2026-06-01T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Doe',
      phone: '0611111111',
      service: 'Coloration',
      barber: '',
      date: '2026-06-11',
      time: '11:00',
      status: 'Confirmé',
      submittedAt: '2026-06-02T10:00:00Z',
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (store.getReservations as any).mockResolvedValue(mockReservations);
  });

  it('renders reservations on mount', async () => {
    render(<Reservations />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    // Check stats
    expect(screen.getByText('2', { selector: '.text-2xl' })).toBeInTheDocument(); // Tous
  });

  it('filters reservations', async () => {
    render(<Reservations />);
    
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    const enAttenteBtn = screen.getByText('En attente', { selector: '.uppercase.mt-1' }).closest('button');
    fireEvent.click(enAttenteBtn!);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Doe')).not.toBeInTheDocument();
    });
  });

  it('calls updateStatus when confirm button is clicked', async () => {
    render(<Reservations />);
    
    await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());

    const confirmBtns = screen.getAllByText('Confirmer');
    fireEvent.click(confirmBtns[0]);

    expect(store.updateReservationStatus).toHaveBeenCalledWith('1', 'Confirmé');
  });
});
