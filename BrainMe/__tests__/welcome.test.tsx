import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Welcome from '../app/welcome';

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 10, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@clerk/clerk-expo', () => {
    const signInMock = {
        isLoaded: true,
        signIn: {
            create: jest.fn().mockResolvedValue({ createdSessionId: 'test-session-id' }),
        },
        setActive: jest.fn(),
    };

    const useOAuthMock = jest.fn().mockReturnValue({
        startOAuthFlow: jest.fn().mockResolvedValue({
            createdSessionId: 'test-session-id',
        }),
    });

    return {
        useSignIn: () => signInMock,
        useUser: () => ({
            isSignedIn: false,
        }),
        useOAuth: useOAuthMock,
    };
});

jest.mock('expo-router', () => ({
    useRouter: () => ({
        replace: jest.fn(),
    }),
}));

describe('Welcome Screen', () => {
    it('renders Welcome correctly', () => {
        const { getByText, getAllByPlaceholderText } = render(<Welcome />);

        expect(getByText('BrainMe')).toBeTruthy();
        expect(getByText('Quizz your knowledge, share your wisdom!')).toBeTruthy();
        expect(getAllByPlaceholderText('winner@email.com')).toBeTruthy();
        expect(getAllByPlaceholderText('Insert password...')).toBeTruthy();
    });

    it('allows user to sign in', async () => {
        const { getByText, getByPlaceholderText } = render(<Welcome />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        fireEvent.press(getByText('LOGIN'));

        await new Promise(resolve => setTimeout(resolve, 0));

        const { useSignIn } = require('@clerk/clerk-expo');
        expect(useSignIn().signIn.create).toHaveBeenCalledWith({
            identifier: 'test@example.com',
            password: 'password123',
        });
    });

    it('handles OAuth flow', async () => {
        const { getByTestId } = render(<Welcome />);
        const googleAuthButton = getByTestId('google-image');
        fireEvent.press(googleAuthButton);

        await new Promise(resolve => setTimeout(resolve, 0));

        const { useOAuth, useSignIn } = require('@clerk/clerk-expo');
        expect(useOAuth().startOAuthFlow).toHaveBeenCalled();

        expect(useSignIn().setActive).toHaveBeenCalledWith({ session: 'test-session-id' });
    });
});
