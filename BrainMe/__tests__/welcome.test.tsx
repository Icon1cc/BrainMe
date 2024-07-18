import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import Welcome from '../app/welcome';
import { useSignIn, useOAuth, useUser } from '@clerk/clerk-expo';
import { api } from '@/convex/_generated/api';

// Mocking the required modules and components
jest.mock('@clerk/clerk-expo', () => ({
    useSignIn: jest.fn(),
    useOAuth: jest.fn(),
    useUser: jest.fn(),
}));

jest.mock('expo-router', () => ({
    useRouter: jest.fn().mockReturnValue({
        replace: jest.fn(),
    }),
}));

jest.mock('@/components/auth/structure', () => {
    const { View, Text } = require('react-native');
    return {
        Structure: ({ title, subtitle, children }: { title: string, subtitle: string, children: React.ReactNode }) => (
            <View>
                <Text>{title}</Text>
                <Text>{subtitle}</Text>
                {children}
            </View>
        ),
    };
});

jest.mock('@/components/auth/input', () => {
    const { View, Text, TextInput } = require('react-native');
    return {
        __esModule: true,
        default: ({ title, placeholder, onChangeText }: { title: string, placeholder: string, onChangeText: (text: string) => void }) => (
            <View>
                <Text>{title}</Text>
                <TextInput placeholder={placeholder} onChangeText={onChangeText} />
            </View>
        ),
    };
});

jest.mock('@/components/auth/separator', () => {
    const { View } = require('react-native');
    return {
        __esModule: true,
        default: () => <View />,
    };
});

jest.mock('@/components/auth/auth-social-button', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return {
        __esModule: true,
        default: ({ provider, onPress, activity }: { provider: string, onPress: () => void, activity: boolean }) => (
            <TouchableOpacity onPress={onPress} testID={`${provider}-image`}>
                <Text>{provider}</Text>
            </TouchableOpacity>
        ),
    };
});

jest.mock('@/components/auth/action-button', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return {
        __esModule: true,
        default: ({ text, onPress }: { text: string, onPress: () => void }) => (
            <TouchableOpacity onPress={onPress}>
                <Text>{text}</Text>
            </TouchableOpacity>
        ),
    };
});

jest.mock('@/components/auth/footer-text', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return {
        __esModule: true,
        default: ({ text, link }: { text: string, link: string }) => (
            <View>
                <Text>{text}</Text>
                <TouchableOpacity>
                    <Text>{link}</Text>
                </TouchableOpacity>
            </View>
        ),
    };
});

describe('Welcome Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useSignIn as jest.Mock).mockReturnValue({
            signIn: { create: jest.fn() },
            setActive: jest.fn(),
            isLoaded: true,
        });
        (useOAuth as jest.Mock).mockReturnValue({
            startOAuthFlow: jest.fn().mockResolvedValue({ createdSessionId: '123' }),
        });
        (useUser as jest.Mock).mockReturnValue({
            isSignedIn: false,
        });
    });

    it('renders Welcome correctly', () => {
        const { getByText, getAllByPlaceholderText } = render(<Welcome />);

        expect(getByText('BrainMe')).toBeTruthy();
        expect(getByText('Quizz your knowledge, share your wisdom!')).toBeTruthy();
    });

    it('allows user to sign in', async () => {
        const { getByText, getByPlaceholderText } = render(<Welcome />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        const signInMock = require('@clerk/clerk-expo').useSignIn().signIn;
        signInMock.create.mockResolvedValue({ createdSessionId: '123' });

        await act(async () => {
            fireEvent.press(getByText('LOGIN'));
        });

        expect(signInMock.create).toHaveBeenCalledWith({
            identifier: 'test@example.com',
            password: 'password123',
        });
    });

    it('handles OAuth flow', async () => {
        const { getByTestId } = render(<Welcome />);
        const googleAuthButton = getByTestId('google-image');

        await act(async () => {
            fireEvent.press(googleAuthButton);
        });

        const oAuthMock = require('@clerk/clerk-expo').useOAuth().startOAuthFlow;
        expect(oAuthMock).toHaveBeenCalled();
    });

    it('handles sign-in error', async () => {
        const { getByText, getByPlaceholderText } = render(<Welcome />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        const signInMock = require('@clerk/clerk-expo').useSignIn().signIn;
        signInMock.create.mockImplementationOnce(() => {
            throw new Error('Sign in error');
        });

        await act(async () => {
            fireEvent.press(getByText('LOGIN'));
        });

        expect(signInMock.create).toHaveBeenCalledWith({
            identifier: 'test@example.com',
            password: 'password123',
        });
    });

    it('handles OAuth error', async () => {
        const { getByTestId } = render(<Welcome />);
        const googleAuthButton = getByTestId('google-image');
        const oAuthMock = require('@clerk/clerk-expo').useOAuth().startOAuthFlow;
        oAuthMock.mockImplementationOnce(() => {
            throw new Error('OAuth error');
        });
    });

    it('redirects to home page after successful sign-in', async () => {
        const { getByText, getByPlaceholderText } = render(<Welcome />);

        fireEvent.changeText(getByPlaceholderText('winner@email.com'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Insert password...'), 'password123');

        const signInMock = require('@clerk/clerk-expo').useSignIn().signIn;
        signInMock.create.mockResolvedValue({ createdSessionId: '123' });

        await act(async () => {
            fireEvent.press(getByText('LOGIN'));
        });

        const useRouterMock = require('expo-router').useRouter().replace;
        expect(useRouterMock).toHaveBeenCalledWith('/home');
    });
});
