import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Table from '../table';

describe('Table Component', () => {
  const columns = ['Name', 'Age', 'Country'];
  const data = [
    { Name: 'Alice', Age: 25, Country: 'USA' },
    { Name: 'Bob', Age: 30, Country: 'UK' },
  ];

  describe('Positive cases', () => {
    test('renders table with correct headers', () => {
      render(<Table columns={columns} data={data} />);
      columns.forEach((col) => {
        expect(screen.getByText(col)).toBeInTheDocument();
      });
    });

    test('renders table with correct data', () => {
      render(<Table columns={columns} data={data} />);

      const cells = data.flatMap((row) => Object.values(row));
      cells.forEach((cell) => {
        expect(screen.getByText(String(cell))).toBeInTheDocument();
      });
    });
  });

  describe('Negative Case', () => {
    test('renders empty message when no data is provided', () => {
      render(<Table columns={columns} data={[]} />);
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    test('handles missing column keys gracefully', () => {
      const incompleteData = [{ Name: 'Alice' }];
      render(<Table columns={columns} data={incompleteData} />);

      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getAllByText('-')).toHaveLength(2);
    });

    test('renders "No columns" when columns are empty', () => {
      render(<Table columns={[]} data={data} />);
      expect(screen.getByText('No columns')).toBeInTheDocument();
    });
  });
});
