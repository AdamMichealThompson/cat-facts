// handleRefresh.test.tsx

import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { handleRefresh } from './App'; // Replace with the actual file name

describe('handleRefresh Function', () => {
  test('updates state with cat fact on successful API response', async () => {
    const updateFunction = jest.fn();

    // Mock the fetch function to return a successful response
    var Re = {
        ok: true,
        json: async () => ({ fact: 'Mocked cat fact' })
      };

    var R2 = Re as Response;

    jest.spyOn(global, 'fetch').mockResolvedValueOnce(R2);

    

    await act(async () => {
      await handleRefresh(updateFunction);
    });

    // Wait for the updateFunction to be called
    await waitFor(() => {
      expect(updateFunction).toHaveBeenCalledWith('Mocked cat fact');
    });

    // Restore the original fetch function
    jest.restoreAllMocks();
  });

  test('updates state with error message on failed API response', async () => {
    const updateFunction = jest.fn();

    // Mock the fetch function to return an unsuccessful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await act(async () => {
      await handleRefresh(updateFunction);
    });

    // Wait for the updateFunction to be called
    await waitFor(() => {
      expect(updateFunction).toHaveBeenCalledWith('Failed to fetch cat fact!');
    });

    // Restore the original fetch function
    jest.restoreAllMocks();
  });

  test('updates state with error message on network error', async () => {
    const updateFunction = jest.fn();

    // Mock the fetch function to throw a network error
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      await handleRefresh(updateFunction);
    });

    // Wait for the updateFunction to be called
    await waitFor(() => {
      expect(updateFunction).toHaveBeenCalledWith('Failed to fetch cat fact!\nNetwork error');
    });

    // Restore the original fetch function
    jest.restoreAllMocks();
  });
});
