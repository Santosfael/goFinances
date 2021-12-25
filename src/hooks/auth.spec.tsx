import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';

import { AuthProvider, useAuth } from './auth';


jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('expo-auth-session');
fetchMock.enableMocks();

const userTest = {
    id: 'any_id',
    email: 'rafaelrocha578@gmail.com',
    name: 'Rafael',
    photo: 'any_photo.png'
};
  
jest.mock('expo-auth-session', () => {
    return {
        startAsync: () => ({
        type: 'success',
        params: {
            access_token: 'any_token',
        }
        }),
    }
})

describe('Auth book', () => {
    it('should be able to sign in with Google account existing', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(userTest));

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
          });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email).toBe('rafaelrocha578@gmail.com');
    });
});