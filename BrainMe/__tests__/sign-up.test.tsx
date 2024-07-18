import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SignUp from '../app/sign-up'; // Ensure the path is correct

const mockCreate = jest.fn();
const mockPrepareEmailAddressVerification = jest.fn();
const mockAttemptEmailAddressVerification = jest.fn();
const mockSetActive = jest.fn();
const mockPush = jest.fn();

jest.mock('react-native-safe-area-context', () => ({
    useSafeAreaInsets: () => ({ top: 10, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('@clerk/clerk-expo', () => ({
    useSignUp: jest.fn(),
    useUser: jest.fn(),
}));

jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('SignUp Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not call signUp.create if not loaded', async () => {
        require('@clerk/clerk-expo').useSignUp.mockReturnValue({
            isLoaded: false,
            signUp: {
                create: mockCreate,
                prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
                attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
            },
            setActive: mockSetActive,
        });
        require('@clerk/clerk-expo').useUser.mockReturnValue({
            isSignedIn: false,
        });

        const { getByText, getByPlaceholderText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Rookie'), 'testuser');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        await act(async () => {
            fireEvent.press(getByText('SIGN UP'));
        });

        expect(mockCreate).not.toHaveBeenCalled();
    });

    it('does not call signUp.attemptEmailAddressVerification if not loaded', async () => {
        require('@clerk/clerk-expo').useSignUp.mockReturnValue({
            isLoaded: false,
            signUp: {
                create: mockCreate,
                prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
                attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
            },
            setActive: mockSetActive,
        });
        require('@clerk/clerk-expo').useUser.mockReturnValue({
            isSignedIn: false,
        });

        const { getByText, getByPlaceholderText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Rookie'), 'testuser');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        await act(async () => {
            fireEvent.press(getByText('SIGN UP'));
        });

        // Manually simulate the state change to pending verification
        require('@clerk/clerk-expo').useSignUp.mockReturnValue({
            isLoaded: true,
            signUp: {
                create: mockCreate,
                prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
                attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
            },
            setActive: mockSetActive,
        });

        render(<SignUp />);
        
        fireEvent.changeText(getByPlaceholderText('Insert code...'), '123456');

        await act(async () => {
            fireEvent.press(getByText('VERIFY'));
        });

        expect(mockAttemptEmailAddressVerification).not.toHaveBeenCalled();
    });

    it('logs error on verification failure', async () => {
        mockAttemptEmailAddressVerification.mockImplementationOnce(() => {
            throw new Error('Verification failed');
        });

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        require('@clerk/clerk-expo').useSignUp.mockReturnValue({
            isLoaded: true,
            signUp: {
                create: mockCreate,
                prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
                attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
            },
            setActive: mockSetActive,
        });
        require('@clerk/clerk-expo').useUser.mockReturnValue({
            isSignedIn: false,
        });

        const { getByText, getByPlaceholderText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Rookie'), 'testuser');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        await act(async () => {
            fireEvent.press(getByText('SIGN UP'));
        });

        // Manually simulate the state change to pending verification
        require('@clerk/clerk-expo').useSignUp.mockReturnValue({
            isLoaded: true,
            signUp: {
                create: mockCreate,
                prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
                attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
            },
            setActive: mockSetActive,
        });

        render(<SignUp />);

        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Insert code...'), '123456');
        });

        await act(async () => {
            fireEvent.press(getByText('VERIFY'));
        });

        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Verification failed'));

        consoleErrorSpy.mockRestore();
    });

    it('redirects if user is already signed in', async () => {
        require('@clerk/clerk-expo').useSignUp.mockReturnValue({
            isLoaded: true,
            signUp: {
                create: mockCreate,
                prepareEmailAddressVerification: mockPrepareEmailAddressVerification,
                attemptEmailAddressVerification: mockAttemptEmailAddressVerification,
            },
            setActive: mockSetActive,
        });
        require('@clerk/clerk-expo').useUser.mockReturnValue({
            isSignedIn: true,
        });

        render(<SignUp />);

        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
