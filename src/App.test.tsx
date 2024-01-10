import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import { getCatFact } from './App'; 

describe('handleRefresh Function', () => {
  

  test('updates state with error message on failed API response', async () => {

    // Mock the fetch function to return an unsuccessful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await act(async () => {
        const fact = await getCatFact();
        //| if we don't have an error here the test should fail
        expect(fact).toContain("Failed to fetch cat");
    });

    // Restore the original fetch function
    jest.restoreAllMocks();
  });

  test('updates state with error message on network error', async () => {

    // Mock the fetch function to throw a network error
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      const fact = await getCatFact();
      //| if we don't have an error here the test should fail
      expect(fact).toContain("Network error");
    });

    // Restore the original fetch function
    jest.restoreAllMocks();
  });
});
