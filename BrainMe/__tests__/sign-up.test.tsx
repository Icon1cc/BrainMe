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
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

        expect(mockPrepareEmailAddressVerification).toHaveBeenCalledWith({
            strategy: 'email_code',
        });
    });

    it('renders verification screen after sign up', async () => {
        const { getByText, getByPlaceholderText } = render(<SignUp />);

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

        expect(mockPrepareEmailAddressVerification).toHaveBeenCalledWith({
            strategy: 'email_code',
        });

        expect(getByText('Please, insert the verification code we provided on your email address.')).toBeTruthy();
        expect(getByPlaceholderText('Insert code...')).toBeTruthy();
        expect(getByText('VERIFY')).toBeTruthy();
    });

    it('verifies user email with code', async () => {
        mockAttemptEmailAddressVerification.mockResolvedValueOnce({ createdSessionId: 'test-session-id' });

        const { getByText, getByPlaceholderText } = render(<SignUp />);

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

        expect(mockPrepareEmailAddressVerification).toHaveBeenCalledWith({
            strategy: 'email_code',
        });

        fireEvent.changeText(getByPlaceholderText('Insert code...'), '123456');

        await act(async () => {
            fireEvent.press(getByText('VERIFY'));
        });

        expect(mockAttemptEmailAddressVerification).toHaveBeenCalledWith({
            code: '123456',
        });

        expect(mockSetActive).toHaveBeenCalledWith({ session: 'test-session-id' });
    });

    it('handles sign-up error', async () => {
        mockCreate.mockImplementationOnce(() => {
            throw new Error('Sign-up failed');
        });

        const { getByText, getByPlaceholderText, queryByText } = render(<SignUp />);

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

        expect(queryByText('Please, insert the verification code we provided on your email address.')).toBeFalsy();
    });
});
