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

  describe('Negative Cases', () => {
    it('should not render non-existent elements', () => {
      // Verify no unwanted navigation links exist
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
      expect(screen.queryByText('About')).not.toBeInTheDocument();
      expect(screen.queryByText('Contact')).not.toBeInTheDocument();
    });

    it('should not have multiple brand logos', () => {
      const brandLogos = screen.getAllByRole('img');
      expect(brandLogos).toHaveLength(1);
    });

    it('should not have duplicate dropdown items', () => {
      const profileLinks = screen.getAllByText('Profile');
      const settingsLinks = screen.getAllByText('Settings');
      const logoutLinks = screen.getAllByText('Logout');

      expect(profileLinks).toHaveLength(1);
      expect(settingsLinks).toHaveLength(1);
      expect(logoutLinks).toHaveLength(1);
    });

    it('should not have empty or invalid hrefs', () => {
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).not.toBe('');
        expect(href).not.toBe('#');
        expect(href).not.toBeNull();
      });
    });

    it('should not have broken image source', () => {
      const logo = screen.getByAltText('Fineksi Logo');
      expect(logo.getAttribute('src')).not.toBe('');
      expect(logo.getAttribute('src')).not.toBe('#');
      expect(logo.getAttribute('src')).not.toBeNull();
    });

    it('should not have accessibility violations', () => {
      // Check that interactive elements have proper ARIA attributes
      const dropdownButton = screen.getByRole('button');
      expect(dropdownButton).toHaveAttribute('aria-expanded');
      expect(dropdownButton).toHaveAttribute('id');

      const dropdownMenu = screen.getByRole('list');
      expect(dropdownMenu).toHaveAttribute('aria-labelledby', 'userDropdown');
    });

    it('should not have improper Bootstrap classes', () => {
      const navbar = screen.getByRole('navigation');
      expect(navbar).not.toHaveClass('navbar-dark');
      expect(navbar).not.toHaveClass('bg-dark');
      expect(navbar).not.toHaveClass('fixed-bottom');
    });
  });
});
