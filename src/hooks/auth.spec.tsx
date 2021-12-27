import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { renderHook, act } from '@testing-library/react-hooks';
import { startAsync  } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'ts-jest/utils';

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

describe('Auth book', () => {

    beforeEach(async () => {
        const userCollectionKey = '@gofinances:user'
        await mockAsyncStorage.removeItem(userCollectionKey)
     })

    it('should be able to sign in with Google account existing', async () => {
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'success',
            params: {
                access_token: 'any_token',
            }
        });
        fetchMock.mockResponseOnce(JSON.stringify(userTest));

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
          });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user.email).toBe('rafaelrocha578@gmail.com');
    });

    it('user should not connect if cancel authentication with Google', async () => {
        const googleMocked = mocked(startAsync as any);
        googleMocked.mockReturnValueOnce({
            type: 'cancel',
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider
          });

        await act(() => result.current.signInWithGoogle());

        expect(result.current.user).not.toHaveProperty('id');
    });

});