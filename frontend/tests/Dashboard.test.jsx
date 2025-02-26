import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Dashboard from '../src/Dashboard';
import '@testing-library/jest-dom/vitest';

describe('Dashboard Component', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  it('merender judul utama', () => {
    const heading = screen.getByRole('heading', { 
      name: /Multi-Account Bank Statement Analysis/i,
      level: 1
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('mb-4', 'text-center');
  });

  it('menampilkan periode analisis', () => {
    const periode = screen.getByText(/Periode Analisis: 6 Bulan/i);
    expect(periode).toBeInTheDocument();
    expect(periode).toHaveClass('small');
    expect(periode.parentElement).toHaveClass('col-md-6');
  });

  it('menampilkan dropdown dengan opsi yang benar', () => {
    const dropdown = screen.getByRole('combobox');
    const options = screen.getAllByRole('option');
    
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveClass('form-select', 'w-auto');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent('Semua Akun');
    expect(options[1]).toHaveTextContent('Chase Bank');
    expect(options[2]).toHaveTextContent('Bank of America');
  });

  it('menampilkan 5 card dengan data yang benar', () => {
    // Cari card berdasarkan parent element-nya
    const cards = screen.getAllByRole('heading', { 
      level: 5,
      // Filter hanya yang ada dalam card
      selector: '.card-body > h5' 
    });
    
    const amounts = screen.getAllByText(/Rp \d{1,3}(?:\.\d{3})*\.\d{3}|\d+/);
    
    expect(cards).toHaveLength(6);
    expect(amounts).toHaveLength(6);
    
    // Cek judul card
    expect(cards[0]).toHaveTextContent('Periode Analisis: 6 Bulan');
    expect(cards[1]).toHaveTextContent('Rata-rata Transaksi Masuk');
    expect(cards[2]).toHaveTextContent('Rata-rata Transaksi Keluar');
    expect(cards[3]).toHaveTextContent('Rata-rata Saldo');
    expect(cards[4]).toHaveTextContent('Tolak Kliring');
    expect(cards[5]).toHaveTextContent('Total Pinjaman Masuk');
    
    // Cek nilai amount
    expect(amounts[0]).toHaveTextContent('Periode Analisis: 6 Bulan');
    expect(amounts[1]).toHaveTextContent('Rp 1.702.685.333');
    expect(amounts[2]).toHaveTextContent('Rp 414.475.167');
    expect(amounts[3]).toHaveTextContent('Rp 12.425.443');
    expect(amounts[4]).toHaveTextContent('1');
    expect(amounts[5]).toHaveTextContent('Rp 12.425.442');
  });

  it('memiliki layout grid yang benar untuk cards', () => {
    const cardColumns = screen.getAllByText(/Rata-rata|Tolak|Total/)
      .map(element => element.closest('.col-md-2'));
    
    expect(cardColumns).toHaveLength(5);
    cardColumns.forEach(col => {
      expect(col).toHaveClass('col-md-2', 'mb-4', 'd-flex', 'justify-content-start');
    });
    
    const mainRow = cardColumns[0].closest('.row');
    expect(mainRow).toHaveClass('row', 'mb-4', 'justify-content-center');
  });

  it('setiap card memiliki struktur yang benar', () => {
    // Cari semua card body
    const cardBodies = screen.getAllByText(/Rata-rata|Tolak|Total/)
      .map(title => title.closest('.card-body'));
    
    cardBodies.forEach(body => {
      // Pastikan body card ada
      expect(body).toBeInTheDocument();
      
      // Cek class
      expect(body).toHaveClass('d-flex', 'flex-column', 'justify-content-between');
      
      // Cek parent card
      const card = body.parentElement;
      expect(card).toHaveClass('card', 'p-3');
    });
  });


});