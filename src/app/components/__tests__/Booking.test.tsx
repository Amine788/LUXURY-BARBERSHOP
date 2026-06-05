import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Booking } from '../Booking';
import * as store from '../../../lib/store';
import * as useAsyncHook from '../../../lib/hooks/useAsync';

// Mock the dependencies
vi.mock('../../../lib/store', () => ({
  addReservation: vi.fn(),
  getBarbers: vi.fn(),
  getPricing: vi.fn(),
  getWhatsAppUrl: vi.fn(() => 'https://wa.me/mocked'),
  getBarbersSync: vi.fn(() => []), // Added just in case
}));

vi.mock('../../../lib/hooks/useAsync', () => ({
  useAsync: vi.fn(),
}));

describe('Booking Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock useAsync for barbers
    vi.spyOn(useAsyncHook, 'useAsync').mockImplementation((fn: any) => {
      if (fn.name === 'getBarbers' || fn === store.getBarbers) {
        return { data: [{ name: 'Ayman', photo: 'photo.jpg' }], loading: false, error: null, refetch: vi.fn() };
      }
      if (fn.name === 'getPricing' || fn === store.getPricing) {
        return { 
          data: [{ id: '1', label: 'Cat', icon: 'i', items: [{ name: 'Coupe', price: '50', desc: 'd' }] }], 
          loading: false, error: null, refetch: vi.fn() 
        };
      }
      return { data: [], loading: false, error: null, refetch: vi.fn() };
    });
  });

  it('renders the booking form', () => {
    render(<Booking />);
    expect(screen.getByText(/Prenez/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Votre nom complet/i)).toBeInTheDocument();
  });

  it('handles form submission and shows success message', async () => {
    render(<Booking />);
    
    const nameInput = screen.getByPlaceholderText(/Votre nom complet/i);
    const phoneInput = screen.getByPlaceholderText(/05 XX XX XX XX/i);
    const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
    const serviceSelect = document.querySelector('select[name="service"]') as HTMLSelectElement;
    const timeSelect = document.querySelector('select[name="time"]') as HTMLSelectElement;
    const submitBtn = screen.getByText(/Confirmer la Réservation/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(phoneInput, { target: { value: '0612345678' } });
    if (dateInput) fireEvent.change(dateInput, { target: { value: '2027-01-01' } });
    if (serviceSelect) fireEvent.change(serviceSelect, { target: { value: 'Coupe' } });
    if (timeSelect) fireEvent.change(timeSelect, { target: { value: '10:00' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(store.addReservation).toHaveBeenCalledWith({
        name: 'Test User',
        phone: '0612345678',
        service: 'Coupe',
        barber: '',
        date: '2027-01-01',
        time: '10:00',
      });
      expect(screen.getByText(/Demande Envoyée/i)).toBeInTheDocument();
    });
  });
});
