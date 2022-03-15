import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';

import Sidebar from '../../src/components/Sidebar';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const methods = jest.requireActual('react-router-dom');
  return {
    ...methods,
    useNavigate: () => mockNavigate,
  };
});

describe('Sidebar', () => {
  it('should be able to back to previous page', async () => {
    const { getByTestId } = render(<Sidebar />);

    fireEvent.click(getByTestId('back'));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
