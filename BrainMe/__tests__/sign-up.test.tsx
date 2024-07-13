import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SignUp from '../app/sign-up';

const mockCreate = jest.fn();
const mockPrepareEmailAddressVerification = jest.fn();
const mockAttemptEmailAddressVerification = jest.fn();
const mockSetActive = jest.fn();

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 10, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@clerk/clerk-expo', () => ({
    useSignUp: () => ({
        isLoaded: true,
        signUp: {
            create: mockCreate,
            prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
            attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
        },
        setActive: mockSetActive,
    }),
    useUser: () => ({
        isSignedIn: false,
    }),
}));

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('SignUp Screen', () => {
    it('renders without crashing and allows user to sign up', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUp />);

        expect(getByText('Sign up now')).toBeTruthy();
        expect(getByText('Join BrainMe and invite friends')).toBeTruthy();
        expect(getByPlaceholderText('winner@email.com')).toBeTruthy();
        expect(getByPlaceholderText('Rookie')).toBeTruthy();
        expect(getByPlaceholderText('Insert password...')).toBeTruthy();
        expect(getByText('SIGN UP')).toBeTruthy();

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Rookie'), 'testuser');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        await act(async () => {
            fireEvent.press(getByText('SIGN UP'));
        });

        expect(mockCreate).toHaveBeenCalledWith({
            username: 'testuser',
            emailAddress: 'test@example.com',
            password: 'password123',
        });
    });
});
