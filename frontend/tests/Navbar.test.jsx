import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Navbar from '../src/components/Navbar';
import '@testing-library/jest-dom/vitest';

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders the brand logo', () => {
    const brandLogo = screen.getByAltText('Fineksi Logo');
    expect(brandLogo).toBeInTheDocument();
    expect(brandLogo.closest('a')).toHaveClass('navbar-brand');
    expect(brandLogo).toHaveClass('d-inline-block', 'align-top');
    expect(brandLogo).toHaveAttribute('height', '30');
  });

  it('renders user dropdown button', () => {
    const userDropdown = screen.getByText('User Name');
    expect(userDropdown).toBeInTheDocument();
    expect(userDropdown).toHaveAttribute('data-bs-toggle', 'dropdown');
  });

  it('renders dropdown menu items', () => {
    const profile = screen.getByText('Profile');
    const settings = screen.getByText('Settings');
    const logout = screen.getByText('Logout');

    expect(profile).toBeInTheDocument();
    expect(settings).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });

  it('has correct navigation structure', () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('navbar', 'navbar-light', 'bg-light', 'fixed-top');
  });

  it('has correct container structure', () => {
    const container = screen.getByRole('navigation').querySelector('.container');
    expect(container).toHaveClass('container', 'd-flex', 'justify-content-between');
  });

  it('includes all necessary links with correct hrefs', () => {
    const links = screen.getAllByRole('link');
    const hrefs = {
      '/': 'FinDash',
      '/profile': 'Profile',
      '/settings': 'Settings',
      '/logout': 'Logout'
    };

    links.forEach(link => {
      const href = link.getAttribute('href');
      expect(hrefs[href]).toBe(link.textContent);
    });
  });

  it('has properly configured dropdown', () => {
    const dropdownButton = screen.getByRole('button');
    const dropdownMenu = screen.getByRole('list');

    expect(dropdownButton).toHaveClass('btn', 'btn-link', 'dropdown-toggle');
    expect(dropdownMenu).toHaveClass('dropdown-menu', 'dropdown-menu-end');
  });
});
